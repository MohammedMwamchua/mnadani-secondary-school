from django.contrib.auth.models import Group, Permission
from django.core.management.base import BaseCommand

CONTENT_APPS = ["core", "news", "history", "academics", "studentlife", "gallery", "alumni"]

def perms_for_apps(app_labels, actions=("add", "change", "delete", "view")):
    return Permission.objects.filter(
        content_type__app_label__in=app_labels,
        codename__regex=r"^(" + "|".join(actions) + ")_",
    )

class Command(BaseCommand):
    help = "Create/update the Editor, News Writer, and Alumni Manager admin groups."

    def handle(self, *args, **options):
        editor, _ = Group.objects.get_or_create(name="Editor")
        editor.permissions.set(perms_for_apps(CONTENT_APPS))

        news_writer, _ = Group.objects.get_or_create(name="News Writer")
        news_writer.permissions.set(perms_for_apps(["news"]))

        alumni_manager, _ = Group.objects.get_or_create(name="Alumni Manager")
        alumni_manager.permissions.set(perms_for_apps(["alumni"]))

        self.stdout.write(self.style.SUCCESS(
            "Roles ready: Editor, News Writer, Alumni Manager. "
            "(Super Admin = a superuser account, created separately.)"
        ))
