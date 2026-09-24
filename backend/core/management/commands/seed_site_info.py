from pathlib import Path

from django.conf import settings
from django.core.files.base import ContentFile
from django.core.management.base import BaseCommand

from core.models import SiteInfo

FIELDS = {
    "vision": "Come to Learn, Go to Serve",
    "motto": "Academic and Discipline Excellency",
    "mission": (
        "To provide accessible, quality secondary education to students in Bochela and "
        "Nkuhungu, and across the wider Dodoma community."
    ),
    "introduction": (
        "Since registering in 2007, Mnadani Secondary School has grown alongside its "
        "neighbourhood, welcoming new students from Bochela and the surrounding areas of "
        "Dodoma City every year.\n\n"
        "The school follows the national curriculum, preparing students for the Certificate "
        "of Secondary Education Examination (CSEE), with a particular strength in Kiswahili "
        "and English Language.\n\n"
        "As a day school, Mnadani plays a distinct role in the community: students return "
        "home each evening, keeping the school closely woven into family and neighbourhood "
        "life in Bochela."
    ),
    "necta_centre_number": "S2732",
    "founded_year": 2007,
    "school_type": "Government day secondary school",
    "address": "Bochela, Nkuhungu Ward, Dodoma City, Tanzania",
    "po_box": "P.O. Box 3399, Dodoma",
    "email": "info@mnadanisecondary.sc.tz",
    "phone": "+255 xx xxx xxxx",
    "administered_by": "Dodoma City Council",
}

SIGNBOARD_SOURCE = Path(settings.BASE_DIR).parent / "public" / "images" / "mnadani-signboard.jpg"

class Command(BaseCommand):
    help = "Seed the SiteInfo singleton with the school's real facts."

    def handle(self, *args, **options):
        info = SiteInfo.load()
        changed = []

        for field, value in FIELDS.items():
            if not getattr(info, field):
                setattr(info, field, value)
                changed.append(field)

        if not info.entrance_signboard_photo and SIGNBOARD_SOURCE.exists():
            with open(SIGNBOARD_SOURCE, "rb") as f:
                info.entrance_signboard_photo.save(
                    "mnadani-signboard.jpg", ContentFile(f.read()), save=False,
                )
            changed.append("entrance_signboard_photo")

        info.save()
        self.stdout.write(self.style.SUCCESS(f"SiteInfo seeded ({', '.join(changed) or 'nothing to fill in'})."))
