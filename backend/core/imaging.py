import os

from django.core.files.base import ContentFile
from PIL import Image, ImageOps

MAX_DIMENSION = 1600


def shrink_image_field(image_field, max_dimension=MAX_DIMENSION):
    if not image_field or not image_field.name:
        return

    try:
        image_field.open()
        img = Image.open(image_field)
        has_exif = len(img.getexif()) > 0
        img = ImageOps.exif_transpose(img)
        width, height = img.size
    except Exception:
        return

    too_big = width > max_dimension or height > max_dimension
    # Re-encoding also strips EXIF (GPS location, camera details) from photos served publicly.
    if not too_big and not has_exif:
        return

    if too_big:
        img.thumbnail((max_dimension, max_dimension), Image.LANCZOS)

    ext = os.path.splitext(image_field.name)[1].lower().lstrip(".")
    fmt = {"jpg": "JPEG", "jpeg": "JPEG", "png": "PNG", "webp": "WEBP"}.get(ext, "JPEG")
    if fmt == "JPEG" and img.mode in ("RGBA", "P"):
        img = img.convert("RGB")

    save_kwargs = {"format": fmt, "quality": 85}
    icc_profile = img.info.get("icc_profile")
    if icc_profile:
        save_kwargs["icc_profile"] = icc_profile

    buffer = ContentFile(b"")
    img.save(buffer, **save_kwargs)
    image_field.save(os.path.basename(image_field.name), buffer, save=False)
