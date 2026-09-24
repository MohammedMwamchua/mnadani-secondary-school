# Mnadani Secondary School — Admin Backend

Django + Django REST Framework backend implementing the `Mnadani-Admin-Guide.md`
admin panel: News, Alumni (with a submit/approve workflow), History (timeline,
headteachers, notable teachers), Academics (subjects, awards), Student Life
(clubs/activities), Gallery (albums + photos), Contact messages, School
Information, and role-based staff accounts — all managed through Django's
built-in admin site at `/admin/`, themed with
[django-jazzmin](https://github.com/farridav/django-jazzmin) in the school's
white/light-blue colors (settings in `config/settings.py`
`JAZZMIN_SETTINGS`/`JAZZMIN_UI_TWEAKS`, exact colors in
`core/static/admin/mnadani-admin.css`).

## Quick start (already done once, kept here for reference)

```bash
cd backend
python -m venv venv
venv\Scripts\activate          # Windows
pip install -r requirements.txt

python manage.py migrate
python manage.py seed_roles          # creates the Editor / News Writer / Alumni Manager groups
python manage.py seed_history        # starter timeline/headteacher/notable-teacher rows
python manage.py seed_awards         # starter Academics "Awards & honours" rows
python manage.py seed_student_awards # starter Student Life "Achievements" rows
python manage.py seed_news           # starter News posts
python manage.py seed_alumni         # starter Alumni rows (one marked Featured, as a demo)
python manage.py seed_gallery        # one empty album per Gallery category
python manage.py seed_site_info      # School Information singleton (vision, motto, address, signboard photo...)
python manage.py seed_quick_links    # Home page's 3 Quick Link cards
python manage.py seed_subjects       # Academics page's core subjects
python manage.py seed_clubs          # Student Life page's clubs/activities
python manage.py createsuperuser
python manage.py runserver 8000
```

Then open `http://127.0.0.1:8000/admin/`.

## Database: SQLite now, PostgreSQL is a one-line switch

This runs on **SQLite** by default (`db.sqlite3`, zero setup) so it works
immediately. PostgreSQL 18 is installed and running on this machine, but I
don't have its `postgres` superuser password and couldn't restart the
Windows service to reconfigure auth without admin rights — so I couldn't
create the app's database/role myself. `psycopg2-binary` is already
installed and `settings.py` already reads `DB_ENGINE=postgres` from `.env`,
so switching over takes two steps whenever you're ready:

**1. Create the database and a dedicated role** (run once, as whoever knows
the postgres password — e.g. in `psql` or pgAdmin):

```sql
CREATE DATABASE mnadani;
CREATE USER mnadani_user WITH PASSWORD 'choose-a-password';
GRANT ALL PRIVILEGES ON DATABASE mnadani TO mnadani_user;
```

**2. Add to `backend/.env`:**

```
DB_ENGINE=postgres
DB_NAME=mnadani
DB_USER=mnadani_user
DB_PASSWORD=choose-a-password
DB_HOST=localhost
DB_PORT=5432
```

Then `python manage.py migrate` again to build the schema in Postgres. (Or
just tell me the postgres password and I'll do all of this myself.)

## Staff accounts & roles (guide Section 8)

- **Super Admin** — a Django superuser (`createsuperuser`). Full access, including managing other users.
- **Editor** — add/change/delete on all content, no access to Users.
- **News Writer** — News only.
- **Alumni Manager** — Alumni only.

To create a staff account: Django admin → **Users** → **Add user** → tick
**Staff status** → assign one of the three groups above (created by
`seed_roles`) in the **Groups** field.

## Photos (guide Section 5)

Every content model's photo field:
- Accepts JPG/JPEG/PNG/WEBP only, rejects files over 5MB (`core/validators.py`).
- Auto-shrinks anything wider/taller than 1600px on save, keeping aspect ratio (`core/imaging.py`) — matches "big photos are shrunk automatically."
- Shows a placeholder on the public site until a photo is uploaded — nothing breaks if it's left empty.
- Has a **"Missing photo"** list filter in its admin changelist, and there's a sitewide summary at **Admin → Missing photos report** (linked from the dashboard sidebar).

## Alumni submit/approve workflow (guide Section 4.2)

- Public form → `POST /api/alumni-submissions/` → saved with
  `approval_status=pending`, invisible on the site.
- Admin reviews under **Alumni** filtered by **Waiting for approval**, then
  uses the **Approve selected** / **Reject selected** actions (or edits the
  `approval_status` field directly).
- Only alumni that are `show_on_website=True`, `permission_received=True`,
  and `approval_status=approved` are ever returned by the public
  `GET /api/alumni/` endpoint.

## Gallery videos (added alongside photos)

`GalleryVideo` sits next to `GalleryPhoto` on the same `GalleryAlbum` —
add both from the same album's admin page (two separate "add another"
inline sections). Accepts MP4/MOV/WEBM only, up to 50MB (short clips, not
full event recordings) — see `core/validators.py`'s `validate_video_file`.
No auto-processing happens to videos (the auto-shrink pipeline is
image-only); they're stored and served as uploaded.

## API endpoints (all under `/api/`, all read as JSON)

| Endpoint | Notes |
|---|---|
| `GET site-info/` | The singleton School Information row |
| `GET/POST home-banner/`, `quick-links/` | Home page content |
| `POST contact-messages/` | Contact form — write-only |
| `GET news/`, `news/<id>/` | Only `status=published` posts |
| `GET history-events/`, `headteachers/`, `notable-teachers/` | History page |
| `GET subjects/`, `awards/?category=academic\|student` | Academics + Student Life awards |
| `GET club-activities/` | Student Life clubs/sports/culture |
| `GET gallery-albums/?category=...` | Gallery, with nested `photos` and `videos` per album |
| `GET alumni/`, `POST alumni-submissions/` | Public list is filtered to approved/visible only |

## Frontend integration

The React frontend (`../src/`) now calls this API for:

- **History page** — timeline, headteachers, notable teachers.
- **Academics page** — "Awards & honours" (`awards/?category=academic`).
- **Student Life page** — "Achievements" (`awards/?category=student`, same `Award` model, different category).
- **News page + Home page teaser** — news posts. The API (and the model's
  `ordering = ["-date", "-created_at"]`) always returns the newest post
  first, and the frontend renders whichever post that is as the "Top
  story" — there's no separate featured flag to set, the most recent
  **published** post with the newest `date` always wins.
- **Alumni page** — profiles, with a real "Submit your story" form
  (`src/pages/AlumniSubmit.jsx`, at `/alumni/submit`) that posts to
  `POST /api/alumni-submissions/`. A `Featured` alumnus gets a distinct
  spotlight card at the top of the page; everyone else appears below in a
  grid.
- **Gallery page** — albums with a category filter, each opening a
  lightbox with its photos and short videos.
- **About + Contact pages** — read the `SiteInfo` singleton (`site-info/`):
  vision, motto, mission, the "Who we are" introduction, founded year,
  NECTA centre number, address, phone, email, and the entrance signboard
  photo — all one row, editable from **Admin → Site Settings → School
  information**. An optional headteacher's message shows on About if set.
- **Home page** — the hero's right-hand panel shows the first active `Home
  banner slide`'s photo if one exists (falls back to the plain gradient
  otherwise), and the "Explore the school" cards read from `Quick link
  cards` instead of being hard-coded.
- **Academics page** — the core subjects grid reads from `Subject`.
- **Student Life page** — the clubs/activities grid reads from
  `ClubActivity` (a "notable achievements" line shows if set).
- **Contact page's message form** — now actually posts to
  `POST /api/contact-messages/` instead of only simulating a send; messages
  land in **Admin → Site Settings → Contact messages**.

All of this goes through `src/lib/api.js` + `src/lib/useFetch.js`, with a
loading skeleton, a friendly message if the backend is unreachable, and a
"nothing added yet" message if a list is empty, so pages never break even
before the admin panel has real content. Every admin-registered model now
has a real, working place on the live site — nothing in the admin panel is
disconnected.

Run these once to fill each app with starter/placeholder rows (matching
the text the old static pages used, using the school's real confirmed
facts where known) so nothing is empty on a fresh database — replace them
with real content from the admin panel whenever ready:

```bash
python manage.py seed_history          # History: timeline, headteachers, notable teachers
python manage.py seed_awards           # Academics: Awards & honours
python manage.py seed_student_awards   # Student Life: Achievements
python manage.py seed_news             # News posts (staggered dates, so the newest shows as top story)
python manage.py seed_alumni           # Alumni rows (one marked Featured)
python manage.py seed_gallery          # One empty album per Gallery category
python manage.py seed_site_info        # School Information singleton
python manage.py seed_quick_links      # Home page's Quick Link cards
python manage.py seed_subjects         # Academics page's core subjects
python manage.py seed_clubs            # Student Life page's clubs/activities
```
