from django.core.management.base import BaseCommand

from studentlife.models import ClubActivity

CLUBS = [
    {"tag": "Sports", "title": "Football & Athletics", "description": "Inter-class and inter-school competitions held throughout the year."},
    {"tag": "Clubs", "title": "Debate Club", "description": "Student-led discussions meeting weekly to build public-speaking skills."},
    {"tag": "Clubs", "title": "Environment Club", "description": "Tree planting and clean-up initiatives around the school compound."},
    {"tag": "Culture", "title": "Cultural Day & Music", "description": "Annual events celebrating Tanzanian culture, music, and the arts."},
]

class Command(BaseCommand):
    help = "Seed the Student Life page's clubs/activities."

    def handle(self, *args, **options):
        created = 0
        for i, row in enumerate(CLUBS):
            _, was_created = ClubActivity.objects.get_or_create(
                title=row["title"],
                defaults={"tag": row["tag"], "description": row["description"], "order": i},
            )
            created += was_created
        self.stdout.write(self.style.SUCCESS(f"Club activities seeded ({created} created)."))
