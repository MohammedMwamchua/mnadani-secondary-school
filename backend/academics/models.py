from django.db import models

from core.imaging import shrink_image_field
from core.models import Orderable
from core.validators import validate_image_file

class Subject(Orderable):
    tag = models.CharField(max_length=80, help_text='Department/group label, e.g. "Sciences"')
    title = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    photo = models.ImageField(upload_to="academics/subjects/", blank=True, null=True, validators=[validate_image_file])

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if self.photo:
            shrink_image_field(self.photo)
        super().save(*args, **kwargs)

class Award(Orderable):

    class Category(models.TextChoices):
        ACADEMIC = "academic", "Academic"
        STUDENT = "student", "Student"

    category = models.CharField(max_length=10, choices=Category.choices, default=Category.ACADEMIC)
    title = models.CharField(max_length=200, help_text="Award name.")
    meta = models.CharField(max_length=150, help_text='e.g. "Dodoma Region · 2023" or "Zonal Debate · 2022"')
    explanation = models.TextField(help_text="What it recognised.")
    photo = models.ImageField(upload_to="academics/awards/", blank=True, null=True, validators=[validate_image_file])

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if self.photo:
            shrink_image_field(self.photo)
        super().save(*args, **kwargs)

class AwardPhoto(Orderable):
    award = models.ForeignKey(Award, related_name="extra_photos", on_delete=models.CASCADE)
    image = models.ImageField(upload_to="academics/awards/extra/", validators=[validate_image_file])
    caption = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.caption or f"Photo for {self.award.title}"

    def save(self, *args, **kwargs):
        if self.image:
            shrink_image_field(self.image)
        super().save(*args, **kwargs)
