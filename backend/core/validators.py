import os
import re

from django.core.exceptions import ValidationError
from PIL import Image

ALLOWED_IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
ALLOWED_IMAGE_FORMATS = {"JPEG", "PNG", "WEBP"}
MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024
# Stops small, highly compressed files that decode into gigabytes of memory.
MAX_IMAGE_PIXELS = 60_000_000

ALLOWED_VIDEO_EXTENSIONS = {".mp4", ".mov", ".webm"}
MAX_VIDEO_SIZE_BYTES = 50 * 1024 * 1024
WEBM_SIGNATURE = b"\x1a\x45\xdf\xa3"
QUICKTIME_ATOMS = {b"ftyp", b"moov", b"mdat", b"wide", b"free", b"skip", b"pnot"}


COORDINATES_RE = re.compile(r"^\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*$")
TANZANIA_LAT = (-12.0, -0.9)
TANZANIA_LNG = (29.0, 40.5)


def parse_coordinates(value):
    match = COORDINATES_RE.match(value or "")
    if not match:
        return None
    return float(match.group(1)), float(match.group(2))


def _in_tanzania(lat, lng):
    return TANZANIA_LAT[0] <= lat <= TANZANIA_LAT[1] and TANZANIA_LNG[0] <= lng <= TANZANIA_LNG[1]


def validate_map_coordinates(value):
    coords = parse_coordinates(value)
    if coords is None:
        raise ValidationError('Enter the two numbers from Google Maps separated by a comma, e.g. "-6.13834, 35.74642".')
    lat, lng = coords
    if _in_tanzania(lat, lng):
        return
    if _in_tanzania(lng, lat):
        raise ValidationError("The two numbers look swapped — the first one should be the negative number (latitude).")
    raise ValidationError("These coordinates aren't in Tanzania. Copy them again from Google Maps.")


def _is_new_upload(file):
    # Files already in storage were checked when first uploaded.
    return not getattr(file, "_committed", False)


def validate_image_file(file):
    ext = os.path.splitext(file.name)[1].lower()
    if ext not in ALLOWED_IMAGE_EXTENSIONS:
        raise ValidationError(
            f"Unsupported file type '{ext}'. Allowed types: JPG, JPEG, PNG, WEBP."
        )
    if file.size > MAX_IMAGE_SIZE_BYTES:
        raise ValidationError("Image is too large. Please upload a file under 5 MB.")

    if not _is_new_upload(file):
        return

    try:
        file.seek(0)
        with Image.open(file) as img:
            fmt = img.format
            width, height = img.size
    except Exception:
        raise ValidationError("This file isn't a valid image.")
    finally:
        file.seek(0)

    if fmt not in ALLOWED_IMAGE_FORMATS:
        raise ValidationError("This file isn't a JPG, PNG, or WEBP image.")
    if width * height > MAX_IMAGE_PIXELS:
        raise ValidationError("Image dimensions are too large. Please upload a smaller photo.")


def validate_video_file(file):
    ext = os.path.splitext(file.name)[1].lower()
    if ext not in ALLOWED_VIDEO_EXTENSIONS:
        raise ValidationError(
            f"Unsupported file type '{ext}'. Allowed types: MP4, MOV, WEBM."
        )
    if file.size > MAX_VIDEO_SIZE_BYTES:
        raise ValidationError("Video is too large. Please upload a short clip under 50 MB.")

    if not _is_new_upload(file):
        return

    file.seek(0)
    head = file.read(12)
    file.seek(0)
    if not (head[:4] == WEBM_SIGNATURE or head[4:8] in QUICKTIME_ATOMS):
        raise ValidationError("This file isn't a valid MP4, MOV, or WEBM video.")
