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
        img = ImageOps.exif_transpose(img)
        width, height = img.size
    except Exception:
        return

    if width <= max_dimension and height <= max_dimension:
        return

    img.thumbnail((max_dimension, max_dimension), Image.LANCZOS)

    ext = os.path.splitext(image_field.name)[1].lower().lstrip(".")
    fmt = {"jpg": "JPEG", "jpeg": "JPEG", "png": "PNG", "webp": "WEBP"}.get(ext, "JPEG")
    if fmt == "JPEG" and img.mode in ("RGBA", "P"):
        img = img.convert("RGB")

    buffer = ContentFile(b"")
    img.save(buffer, format=fmt, quality=85)
    image_field.save(os.path.basename(image_field.name), buffer, save=False)
