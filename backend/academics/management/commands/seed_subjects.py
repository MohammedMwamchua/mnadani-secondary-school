from django.core.management.base import BaseCommand

from academics.models import Subject

SUBJECTS = [
    {"tag": "Languages", "title": "Kiswahili & English", "description": "The school's strongest subject areas — a foundation for every other area of study."},
    {"tag": "Sciences", "title": "Physics, Chemistry, Biology", "description": "Core science subjects taught toward CSEE, with practical sessions where facilities allow."},
    {"tag": "Humanities", "title": "Geography, History, Civics", "description": "Building students' understanding of Tanzania and the wider world."},
    {"tag": "Mathematics", "title": "Core & Additional Maths", "description": "A structured path from Form 1 fundamentals through CSEE-level problem solving."},
    {"tag": "Business", "title": "Commerce & Bookkeeping", "description": "Practical grounding in trade and record-keeping for students headed toward business."},
    {"tag": "Faith & Ethics", "title": "Religious Education", "description": "Moral and religious studies offered alongside the academic curriculum."},
]

class Command(BaseCommand):
    help = "Seed the Academics page's core subjects."

    def handle(self, *args, **options):
        created = 0
        for i, row in enumerate(SUBJECTS):
            _, was_created = Subject.objects.get_or_create(
                title=row["title"],
                defaults={"tag": row["tag"], "description": row["description"], "order": i},
            )
            created += was_created
        self.stdout.write(self.style.SUCCESS(f"Subjects seeded ({created} created)."))
