from django.core.management.base import BaseCommand

from gallery.models import GalleryAlbum

ALBUMS = [
    ("campus", "Campus"),
    ("classrooms", "Classrooms"),
    ("sports", "Sports Day"),
    ("graduation", "Graduation"),
    ("cultural", "Cultural Day"),
    ("assembly", "Assembly"),
    ("clubs", "Clubs"),
    ("staff", "Staff"),
]

class Command(BaseCommand):
    help = "Seed one empty album per category for the Gallery page."

    def handle(self, *args, **options):
        created = 0

        for i, (category, name) in enumerate(ALBUMS):
            _, was_created = GalleryAlbum.objects.get_or_create(
                category=category, defaults={"name": name, "order": i},
            )
            created += was_created

        self.stdout.write(self.style.SUCCESS(f"Gallery albums seeded ({created} created)."))
