from django.db import models

from .imaging import shrink_image_field
from .validators import validate_image_file

class TimeStamped(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Orderable(models.Model):
    order = models.PositiveIntegerField(default=0, help_text="Lower numbers show first.")

    class Meta:
        abstract = True
        ordering = ["order", "id"]

class SiteInfo(models.Model):

    school_name = models.CharField(max_length=200, default="Mnadani Secondary School")
    vision = models.CharField(max_length=300, blank=True)
    motto = models.CharField(max_length=300, blank=True)
    mission = models.TextField(blank=True)
    introduction = models.TextField(blank=True, help_text="Shown on the About page.")
    headteacher_message = models.TextField(blank=True)

    necta_centre_number = models.CharField(max_length=20, blank=True)
    founded_year = models.PositiveIntegerField(null=True, blank=True)
    school_type = models.CharField(max_length=120, blank=True, default="Government day secondary school")

    address = models.CharField(max_length=300, blank=True)
    po_box = models.CharField(max_length=120, blank=True)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=40, blank=True)
    office_hours = models.CharField(max_length=200, blank=True)
    administered_by = models.CharField(max_length=200, blank=True, default="Dodoma City Council")

    entrance_signboard_photo = models.ImageField(
        upload_to="site/", blank=True, null=True, validators=[validate_image_file]
    )

    class Meta:
        verbose_name = "School information"
        verbose_name_plural = "School information"

    def __str__(self):
        return self.school_name

    def save(self, *args, **kwargs):
        self.pk = 1
        if self.entrance_signboard_photo:
            shrink_image_field(self.entrance_signboard_photo)
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        pass

    @classmethod
    def load(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj

class HomeBannerSlide(TimeStamped, Orderable):
    title = models.CharField(max_length=200)
    text = models.CharField(max_length=300, blank=True)
    photo = models.ImageField(upload_to="home_banner/", validators=[validate_image_file])
    alt_text = models.CharField(max_length=200, blank=True)
    active = models.BooleanField(default=True)

    class Meta(Orderable.Meta):
        verbose_name = "Home banner slide"

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if self.photo:
            shrink_image_field(self.photo)
        super().save(*args, **kwargs)

class QuickLinkCard(Orderable):
    title = models.CharField(max_length=120)
    text = models.CharField(max_length=250, blank=True)
    photo = models.ImageField(upload_to="quick_links/", blank=True, null=True, validators=[validate_image_file])
    link_path = models.CharField(
        max_length=120, blank=True, help_text="Page this card links to, e.g. /academics"
    )
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if self.photo:
            shrink_image_field(self.photo)
        super().save(*args, **kwargs)

class ContactMessage(TimeStamped):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=40, blank=True)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    is_replied = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} — {self.created_at:%Y-%m-%d}"
