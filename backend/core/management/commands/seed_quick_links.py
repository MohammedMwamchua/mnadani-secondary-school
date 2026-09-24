from django.core.management.base import BaseCommand

from core.models import QuickLinkCard

CARDS = [
    {"title": "Academics", "text": "Subjects, departments, and CSEE results.", "link_path": "/academics"},
    {"title": "Alumni", "text": "Reconnect and see where former students are now.", "link_path": "/alumni"},
    {"title": "Gallery", "text": "Campus life, events, and school memories.", "link_path": "/gallery"},
]

class Command(BaseCommand):
    help = "Seed the Home page's Quick Link cards."

    def handle(self, *args, **options):
        created = 0
        for i, row in enumerate(CARDS):
            _, was_created = QuickLinkCard.objects.get_or_create(
                link_path=row["link_path"],
                defaults={"title": row["title"], "text": row["text"], "order": i},
            )
            created += was_created
        self.stdout.write(self.style.SUCCESS(f"Quick links seeded ({created} created)."))
