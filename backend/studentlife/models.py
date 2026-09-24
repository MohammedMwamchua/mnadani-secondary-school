from django.db import models

from core.imaging import shrink_image_field
from core.models import Orderable
from core.validators import validate_image_file


class ClubActivity(Orderable):
    tag = models.CharField(max_length=80, help_text='e.g. "Sports", "Clubs", "Culture"')
    title = models.CharField(max_length=150)
    description = models.TextField(help_text="What it does.")
    achievements = models.TextField(blank=True, help_text="Notable wins or milestones.")
    cover_photo = models.ImageField(upload_to="studentlife/covers/", blank=True, null=True, validators=[validate_image_file])

    class Meta(Orderable.Meta):
        verbose_name_plural = "Club activities"

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if self.cover_photo:
            shrink_image_field(self.cover_photo)
        super().save(*args, **kwargs)


class ClubActivityPhoto(Orderable):
    activity = models.ForeignKey(ClubActivity, related_name="extra_photos", on_delete=models.CASCADE)
    image = models.ImageField(upload_to="studentlife/extra/", validators=[validate_image_file])
    caption = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.caption or f"Photo for {self.activity.title}"

    def save(self, *args, **kwargs):
        if self.image:
            shrink_image_field(self.image)
        super().save(*args, **kwargs)
