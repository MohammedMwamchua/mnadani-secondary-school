from django.core.management.base import BaseCommand

from academics.models import Award

ACADEMIC_AWARDS = [
    {
        "title": "Award name",
        "meta": "Awarding body · Year",
        "explanation": "Placeholder — replace with the real award and what it recognised.",
    },
    {
        "title": "Award name",
        "meta": "Awarding body · Year",
        "explanation": "Placeholder — replace with the real award and what it recognised.",
    },
    {
        "title": "Award name",
        "meta": "Awarding body · Year",
        "explanation": "Placeholder — replace with the real award and what it recognised.",
    },
]

class Command(BaseCommand):
    help = "Seed starter Award rows (category=academic) for the Academics page."

    def handle(self, *args, **options):
        created = 0

        for i, row in enumerate(ACADEMIC_AWARDS):
            _, was_created = Award.objects.get_or_create(
                category=Award.Category.ACADEMIC,
                order=i,
                defaults={"title": row["title"], "meta": row["meta"], "explanation": row["explanation"]},
            )
            created += was_created

        self.stdout.write(self.style.SUCCESS(f"Academic awards seeded ({created} rows created)."))
