from django.db import models

from core.imaging import shrink_image_field
from core.models import Orderable
from core.validators import validate_image_file


class HistoryEvent(Orderable):
    year = models.CharField(max_length=40, help_text='e.g. "2007" or "Early yrs"')
    title = models.CharField(max_length=200)
    description = models.TextField(help_text="What happened.")
    photo = models.ImageField(upload_to="history/timeline/", blank=True, null=True, validators=[validate_image_file])

    def __str__(self):
        return f"{self.year} — {self.title}"

    def save(self, *args, **kwargs):
        if self.photo:
            shrink_image_field(self.photo)
        super().save(*args, **kwargs)


class Headteacher(Orderable):
    name = models.CharField(max_length=150)
    initials = models.CharField(max_length=4, blank=True, help_text="Fallback shown until a photo is added.")
    period_start = models.PositiveIntegerField(null=True, blank=True)
    period_end = models.PositiveIntegerField(null=True, blank=True, help_text="Leave blank if still serving.")
    story = models.TextField(help_text="Short explanation of their time leading the school.")
    photo = models.ImageField(upload_to="history/headteachers/", blank=True, null=True, validators=[validate_image_file])

    def __str__(self):
        return self.name

    @property
    def period_label(self):
        if self.period_start and not self.period_end:
            return f"{self.period_start} – Present"
        if self.period_start and self.period_end:
            return f"{self.period_start} – {self.period_end}"
        return ""

    def save(self, *args, **kwargs):
        if self.photo:
            shrink_image_field(self.photo)
        super().save(*args, **kwargs)


class CampusPhoto(Orderable):
    image = models.ImageField(upload_to="history/campus/", validators=[validate_image_file])
    caption = models.CharField(max_length=200, blank=True)

    class Meta(Orderable.Meta):
        verbose_name_plural = "Campus photos"

    def __str__(self):
        return self.caption or "Campus photo"

    def save(self, *args, **kwargs):
        if self.image:
            shrink_image_field(self.image)
        super().save(*args, **kwargs)


class NotableTeacher(Orderable):
    name = models.CharField(max_length=150)
    subject = models.CharField(max_length=120, blank=True)
    years = models.CharField(max_length=60, blank=True, help_text='e.g. "1998 – 2015"')
    story = models.TextField(help_text="Why they are remembered.")
    photo = models.ImageField(upload_to="history/teachers/", blank=True, null=True, validators=[validate_image_file])

    def __str__(self):
        return self.name

    @property
    def meta_label(self):
        return " · ".join(p for p in [self.subject, self.years] if p)

    def save(self, *args, **kwargs):
        if self.photo:
            shrink_image_field(self.photo)
        super().save(*args, **kwargs)
