from datetime import timedelta

from django.core.management.base import BaseCommand
from django.utils import timezone

from news.models import NewsPost

POSTS = [
    {
        "title": "Welcome to the new Mnadani Secondary School website",
        "category": NewsPost.Category.ANNOUNCEMENT,
        "days_ago": 0,
        "summary": "Placeholder — replace with a real school announcement, result, or event update once available.",
        "body": "Placeholder — replace with the full story once a real announcement is ready.",
    },
    {
        "title": "Upcoming school event",
        "category": NewsPost.Category.EVENT,
        "days_ago": 7,
        "summary": "Placeholder — replace with a real update once available.",
        "body": "Placeholder — replace with the full story once a real update is ready.",
    },
    {
        "title": "CSEE results update",
        "category": NewsPost.Category.RESULTS,
        "days_ago": 21,
        "summary": "Placeholder — replace with a real update once available.",
        "body": "Placeholder — replace with the full story once a real update is ready.",
    },
    {
        "title": "Community notice",
        "category": NewsPost.Category.ANNOUNCEMENT,
        "days_ago": 35,
        "summary": "Placeholder — replace with a real update once available.",
        "body": "Placeholder — replace with the full story once a real update is ready.",
    },
]

class Command(BaseCommand):
    help = "Seed starter News posts, staggered by date, so ordering (newest = top story) is visible."

    def handle(self, *args, **options):
        today = timezone.localdate()
        created = 0

        for row in POSTS:
            _, was_created = NewsPost.objects.get_or_create(
                title=row["title"],
                defaults={
                    "date": today - timedelta(days=row["days_ago"]),
                    "category": row["category"],
                    "summary": row["summary"],
                    "body": row["body"],
                    "status": NewsPost.Status.PUBLISHED,
                },
            )
            created += was_created

        self.stdout.write(self.style.SUCCESS(f"News posts seeded ({created} rows created)."))
