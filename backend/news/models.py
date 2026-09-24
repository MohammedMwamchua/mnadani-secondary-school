from django.db import models
from django.utils import timezone

from core.imaging import shrink_image_field
from core.models import Orderable, TimeStamped
from core.validators import validate_image_file


class NewsPost(TimeStamped):
    class Category(models.TextChoices):
        ANNOUNCEMENT = "announcement", "Announcement"
        RESULTS = "results", "Results"
        EVENT = "event", "Event"

    class Status(models.TextChoices):
        DRAFT = "draft", "Draft"
        PUBLISHED = "published", "Published"

    title = models.CharField(max_length=200)
    date = models.DateField(default=timezone.now)
    category = models.CharField(max_length=20, choices=Category.choices, default=Category.ANNOUNCEMENT)
    summary = models.CharField(max_length=300, help_text="1–2 sentences shown on Home and the News list.")
    body = models.TextField(help_text="The complete news story.")
    cover_photo = models.ImageField(upload_to="news/covers/", blank=True, null=True, validators=[validate_image_file])
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.DRAFT)

    class Meta:
        ordering = ["-date", "-created_at"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if self.cover_photo:
            shrink_image_field(self.cover_photo)
        super().save(*args, **kwargs)


class NewsPhoto(Orderable):
    post = models.ForeignKey(NewsPost, related_name="photos", on_delete=models.CASCADE)
    image = models.ImageField(upload_to="news/extra/", validators=[validate_image_file])
    caption = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.caption or f"Photo for {self.post.title}"

    def save(self, *args, **kwargs):
        if self.image:
            shrink_image_field(self.image)
        super().save(*args, **kwargs)
