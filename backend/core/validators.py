import os

from django.core.exceptions import ValidationError

ALLOWED_IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024

def validate_image_file(file):
    ext = os.path.splitext(file.name)[1].lower()
    if ext not in ALLOWED_IMAGE_EXTENSIONS:
        raise ValidationError(
            f"Unsupported file type '{ext}'. Allowed types: JPG, JPEG, PNG, WEBP."
        )
    if file.size > MAX_IMAGE_SIZE_BYTES:
        raise ValidationError("Image is too large. Please upload a file under 5 MB.")

ALLOWED_VIDEO_EXTENSIONS = {".mp4", ".mov", ".webm"}
MAX_VIDEO_SIZE_BYTES = 50 * 1024 * 1024

def validate_video_file(file):
    ext = os.path.splitext(file.name)[1].lower()
    if ext not in ALLOWED_VIDEO_EXTENSIONS:
        raise ValidationError(
            f"Unsupported file type '{ext}'. Allowed types: MP4, MOV, WEBM."
        )
    if file.size > MAX_VIDEO_SIZE_BYTES:
        raise ValidationError("Video is too large. Please upload a short clip under 50 MB.")
