from django.core.management.base import BaseCommand

from alumni.models import Alumnus

ALUMNI = [
    {
        "full_name": "Alumni name", "year_finished": 2015,
        "featured": True,
        "message_to_students": (
            "Placeholder — write a short message to current students here (advice, encouragement, "
            "a memory of your time at Mnadani). This appears as a spotlight card at the top of the "
            "Alumni page, ahead of everyone else, for as long as \"Featured\" is ticked."
        ),
    },
    {"full_name": "Alumni name", "year_finished": 2018},
    {"full_name": "Alumni name", "year_finished": 2021},
]

class Command(BaseCommand):
    help = "Seed starter, publicly-visible Alumnus rows for the Alumni page."

    def handle(self, *args, **options):
        created = 0

        for row in ALUMNI:
            _, was_created = Alumnus.objects.get_or_create(
                full_name=row["full_name"],
                year_finished=row["year_finished"],
                defaults={
                    "current_role": "What they're doing now",
                    "city": "Where they are",
                    "country": "",
                    "show_on_website": True,
                    "permission_received": True,
                    "approval_status": Alumnus.ApprovalStatus.APPROVED,
                    "featured": row.get("featured", False),
                    "message_to_students": row.get("message_to_students", ""),
                },
            )
            created += was_created

        self.stdout.write(self.style.SUCCESS(f"Alumni seeded ({created} rows created)."))
