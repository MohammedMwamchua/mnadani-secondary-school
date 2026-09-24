from django.core.exceptions import ValidationError
from django.db import models
from django.utils import timezone

from core.imaging import shrink_image_field
from core.models import Orderable, TimeStamped
from core.validators import validate_image_file

def validate_not_future_year(value):
    current_year = timezone.now().year
    if value > current_year:
        raise ValidationError(f"Year finished cannot be in the future (it's currently {current_year}).")

class Alumnus(TimeStamped, Orderable):
    class Level(models.TextChoices):
        FORM_IV = "form_iv", "Form IV"
        FORM_VI = "form_vi", "Form VI"

    class Source(models.TextChoices):
        ADMIN = "admin", "Added by admin"
        SELF_SUBMITTED = "self_submitted", "Submitted via website"

    class ApprovalStatus(models.TextChoices):
        APPROVED = "approved", "Approved"
        PENDING = "pending", "Waiting for approval"
        REJECTED = "rejected", "Rejected"

    full_name = models.CharField(max_length=150)
    year_finished = models.PositiveIntegerField(validators=[validate_not_future_year])
    photo = models.ImageField(upload_to="alumni/", null=True, validators=[validate_image_file])
    current_role = models.CharField(max_length=150, help_text='What they\'re doing now, e.g. "Nurse", "Software Developer"')
    city = models.CharField(max_length=100, help_text="Where they are now.")
    phone = models.CharField(
        max_length=40,
        help_text="Shown publicly on the Alumni page — only add this with the person's consent.",
    )

    level = models.CharField(max_length=10, choices=Level.choices, default=Level.FORM_IV)
    organisation = models.CharField(max_length=150, blank=True, help_text='Where they work or study, e.g. "UDOM"')
    country = models.CharField(max_length=100, blank=True, default="Tanzania")

    history_at_school = models.TextField(blank=True, help_text="Memories, clubs, achievements at school.")
    achievements_after = models.TextField(blank=True, help_text="What they've done since.")
    message_to_students = models.TextField(blank=True, help_text="Advice or encouragement.")

    featured = models.BooleanField(default=False, help_text="Show at the top of the Alumni page.")
    highlighted = models.BooleanField(
        default=False,
        help_text="Show a small star badge on their card in the regular grid — a subtle "
        "highlight, without the full spotlight treatment that Featured gives.",
    )
    show_on_website = models.BooleanField(default=True)
    permission_received = models.BooleanField(
        default=False, help_text="Tick only after the person agrees to be published."
    )

    source = models.CharField(max_length=20, choices=Source.choices, default=Source.ADMIN)
    approval_status = models.CharField(
        max_length=10, choices=ApprovalStatus.choices, default=ApprovalStatus.APPROVED
    )

    class Meta(Orderable.Meta):
        ordering = ["-featured", "order", "created_at", "full_name"]
        verbose_name_plural = "Alumni"

    def __str__(self):
        return f"{self.full_name} ({self.year_finished})"

    @property
    def is_visible(self):
        return (
            self.show_on_website
            and self.permission_received
            and self.approval_status == self.ApprovalStatus.APPROVED
        )

    def save(self, *args, **kwargs):
        if self.photo:
            shrink_image_field(self.photo)
        super().save(*args, **kwargs)
