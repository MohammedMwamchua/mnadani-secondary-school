import os
import sqlite3
from datetime import datetime
from pathlib import Path

from django.conf import settings
from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):
    help = "Safely back up the SQLite database (works while the site is running) and keep the newest N copies."

    def add_arguments(self, parser):
        parser.add_argument("--dest", default=str(settings.BASE_DIR / "backups"))
        parser.add_argument("--keep", type=int, default=14)

    def handle(self, *args, dest, keep, **options):
        db = settings.DATABASES["default"]
        if db["ENGINE"] != "django.db.backends.sqlite3":
            raise CommandError("backup_db only handles SQLite. For PostgreSQL, use pg_dump.")
        if keep < 1:
            raise CommandError("--keep must be at least 1.")

        dest_dir = Path(dest)
        dest_dir.mkdir(parents=True, exist_ok=True)
        target = dest_dir / f"db-{datetime.now():%Y%m%d-%H%M%S}.sqlite3"

        # SQLite's backup API gives a consistent copy even mid-write; a plain file copy may not.
        source = sqlite3.connect(db["NAME"])
        backup = sqlite3.connect(target)
        try:
            source.backup(backup)
        finally:
            backup.close()
            source.close()
        os.chmod(target, 0o600)

        check = sqlite3.connect(target)
        try:
            result = check.execute("PRAGMA integrity_check").fetchone()[0]
        finally:
            check.close()
        if result != "ok":
            target.unlink(missing_ok=True)
            raise CommandError(f"Backup failed its integrity check ({result}); it was discarded.")

        for old in sorted(dest_dir.glob("db-*.sqlite3"))[:-keep]:
            old.unlink()

        self.stdout.write(self.style.SUCCESS(f"Backed up to {target}"))
