from django.core.management.base import BaseCommand

from academics.models import Award

STUDENT_AWARDS = [
    {
        "title": "Award name",
        "meta": "Competition · Year",
        "explanation": "Placeholder — replace with the real competition, placing, and year.",
    },
    {
        "title": "Award name",
        "meta": "Competition · Year",
        "explanation": "Placeholder — replace with the real competition, placing, and year.",
    },
    {
        "title": "Award name",
        "meta": "Competition · Year",
        "explanation": "Placeholder — replace with the real competition, placing, and year.",
    },
]

class Command(BaseCommand):
    help = "Seed starter Award rows (category=student) for the Student Life page."

    def handle(self, *args, **options):
        created = 0

        for i, row in enumerate(STUDENT_AWARDS):
            _, was_created = Award.objects.get_or_create(
                category=Award.Category.STUDENT,
                order=i,
                defaults={"title": row["title"], "meta": row["meta"], "explanation": row["explanation"]},
            )
            created += was_created

        self.stdout.write(self.style.SUCCESS(f"Student achievements seeded ({created} rows created)."))
