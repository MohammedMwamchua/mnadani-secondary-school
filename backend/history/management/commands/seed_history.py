from django.core.management.base import BaseCommand

from history.models import Headteacher, HistoryEvent, NotableTeacher

TIMELINE = [
    {
        "year": "2007",
        "title": "School registered",
        "description": "Mnadani Secondary School is officially registered as a government day secondary school in Bochela, Nkuhungu ward — NECTA Centre Number S2732.",
    },
    {
        "year": "Early yrs",
        "title": "First cohorts settle in",
        "description": "The school begins serving day students from across Nkuhungu, building its early academic reputation.",
    },
    {
        "year": "2010s",
        "title": "Steady exam presence",
        "description": "Mnadani becomes a regular CSEE examination centre, with generations of students sitting Form 4 national exams.",
    },
    {
        "year": "Today",
        "title": "A growing alumni network",
        "description": "Former students now work across Tanzania and beyond — this website is a first step toward bringing that community back together.",
    },
]

HEADTEACHERS = [
    {
        "name": "Founding headteacher",
        "initials": "FH",
        "period_start": 2007,
        "period_end": 2012,
        "story": "Led the school through its earliest years, establishing its first classes and staff.",
    },
    {
        "name": "Second headteacher",
        "initials": "SH",
        "period_start": 2012,
        "period_end": 2018,
        "story": "Oversaw growth in enrolment and the school's early exam results.",
    },
    {
        "name": "Current headteacher",
        "initials": "CH",
        "period_start": 2018,
        "period_end": None,
        "story": "Continues to guide the school's academic and community role in Bochela.",
    },
]

NOTABLE_TEACHERS = [
    {
        "name": "Teacher name",
        "subject": "Subject",
        "years": "Years",
        "story": "Placeholder — add what this teacher was known for and their years at the school.",
    },
    {
        "name": "Teacher name",
        "subject": "Subject",
        "years": "Years",
        "story": "Placeholder — add what this teacher was known for and their years at the school.",
    },
    {
        "name": "Teacher name",
        "subject": "Subject",
        "years": "Years",
        "story": "Placeholder — add what this teacher was known for and their years at the school.",
    },
]

class Command(BaseCommand):
    help = "Seed starter Timeline / Headteacher / Notable Teacher rows for the History page."

    def handle(self, *args, **options):
        created = 0

        for i, row in enumerate(TIMELINE):
            _, was_created = HistoryEvent.objects.get_or_create(
                year=row["year"], title=row["title"],
                defaults={"description": row["description"], "order": i},
            )
            created += was_created

        for i, row in enumerate(HEADTEACHERS):
            _, was_created = Headteacher.objects.get_or_create(
                name=row["name"],
                defaults={
                    "initials": row["initials"],
                    "period_start": row["period_start"],
                    "period_end": row["period_end"],
                    "story": row["story"],
                    "order": i,
                },
            )
            created += was_created

        for i, row in enumerate(NOTABLE_TEACHERS):
            _, was_created = NotableTeacher.objects.get_or_create(
                order=i,
                defaults={
                    "name": row["name"], "subject": row["subject"],
                    "years": row["years"], "story": row["story"],
                },
            )
            created += was_created

        self.stdout.write(self.style.SUCCESS(f"History app seeded ({created} rows created)."))
