from pathlib import Path

from django.conf import settings
from django.core.files.base import ContentFile
from django.core.management.base import BaseCommand

from core.models import HomeBannerSlide

SIGNBOARD_SOURCE = Path(settings.BASE_DIR).parent / "public" / "images" / "mnadani-signboard.jpg"

class Command(BaseCommand):
    help = "Seed one real Home banner slide using the school's signboard photo."

    def handle(self, *args, **options):
        if HomeBannerSlide.objects.filter(title="Welcome to Mnadani Secondary School").exists():
            self.stdout.write(self.style.SUCCESS("Home banner slide already exists — nothing to do."))
            return

        if not SIGNBOARD_SOURCE.exists():
            self.stdout.write(self.style.WARNING("Signboard source photo not found — skipped."))
            return

        slide = HomeBannerSlide(
            title="Welcome to Mnadani Secondary School",
            text="A government day secondary school serving Bochela and Nkuhungu since 2007.",
            alt_text="The Mnadani Secondary School entrance signboard",
            active=True,
            order=0,
        )
        with open(SIGNBOARD_SOURCE, "rb") as f:
            slide.photo.save("mnadani-signboard.jpg", ContentFile(f.read()), save=False)
        slide.save()

        self.stdout.write(self.style.SUCCESS("Home banner slide seeded."))
