from django.db import models

from core.imaging import shrink_image_field
from core.models import Orderable
from core.validators import validate_image_file, validate_video_file


class GalleryAlbum(Orderable):
    CATEGORY_CHOICES = [
        ("campus", "Campus"), ("classrooms", "Classrooms"), ("sports", "Sports Day"),
        ("graduation", "Graduation"), ("cultural", "Cultural Day"), ("assembly", "Assembly"),
        ("clubs", "Clubs"), ("staff", "Staff"), ("other", "Other"),
    ]

    name = models.CharField(max_length=150)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default="other")
    cover_photo = models.ImageField(upload_to="gallery/covers/", blank=True, null=True, validators=[validate_image_file])

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.cover_photo:
            shrink_image_field(self.cover_photo)
        super().save(*args, **kwargs)


class GalleryPhoto(Orderable):
    album = models.ForeignKey(GalleryAlbum, related_name="photos", on_delete=models.CASCADE)
    image = models.ImageField(upload_to="gallery/photos/", validators=[validate_image_file])
    caption = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.caption or f"Photo in {self.album.name}"

    def save(self, *args, **kwargs):
        if self.image:
            shrink_image_field(self.image)
        super().save(*args, **kwargs)


class GalleryVideo(Orderable):
    album = models.ForeignKey(GalleryAlbum, related_name="videos", on_delete=models.CASCADE)
    video = models.FileField(
        upload_to="gallery/videos/", validators=[validate_video_file],
        help_text="Short clips only — MP4, MOV, or WEBM, up to 50MB.",
    )
    caption = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.caption or f"Video in {self.album.name}"
