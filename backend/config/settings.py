
import os
from pathlib import Path

from django.templatetags.static import static
from django.urls import reverse_lazy
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

SECRET_KEY = os.environ.get(
    "DJANGO_SECRET_KEY", "django-insecure-dev-only-change-me-before-deploying"
)
DEBUG = os.environ.get("DJANGO_DEBUG", "True") == "True"
ALLOWED_HOSTS = [h.strip() for h in os.environ.get("DJANGO_ALLOWED_HOSTS", "localhost,127.0.0.1").split(",") if h.strip()]

INSTALLED_APPS = [
    "unfold",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    "rest_framework",
    "django_filters",
    "corsheaders",

    "core",
    "news",
    "history",
    "academics",
    "studentlife",
    "gallery",
    "alumni",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"

if os.environ.get("DB_ENGINE") == "postgres":
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": os.environ["DB_NAME"],
            "USER": os.environ["DB_USER"],
            "PASSWORD": os.environ["DB_PASSWORD"],
            "HOST": os.environ.get("DB_HOST", "localhost"),
            "PORT": os.environ.get("DB_PORT", "5432"),
        }
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "en-us"
TIME_ZONE = "Africa/Dar_es_Salaam"
USE_I18N = True
USE_TZ = True

STATIC_URL = "static/"

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

REST_FRAMEWORK = {
    "DEFAULT_FILTER_BACKENDS": ["django_filters.rest_framework.DjangoFilterBackend"],
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 50,
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.AllowAny"],
}

CORS_ALLOWED_ORIGINS = [
    o.strip()
    for o in os.environ.get("CORS_ALLOWED_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173").split(",")
    if o.strip()
]

UNFOLD = {
    "SITE_TITLE": "Mnadani Admin",
    "SITE_HEADER": "Mnadani Secondary School",
    "SITE_SUBHEADER": "Admin panel",
    "SITE_URL": os.environ.get("FRONTEND_URL", "http://localhost:5173/"),
    "SITE_ICON": lambda request: static("admin/mnadani-crest.png"),
    "SITE_LOGO": lambda request: static("admin/mnadani-crest.png"),
    "SITE_SYMBOL": "school",
    "SHOW_HISTORY": True,
    "SHOW_VIEW_ON_SITE": False,
    "SHOW_BACK_BUTTON": True,
    "BORDER_RADIUS": "10px",
    "STYLES": [
        lambda request: static("admin/mnadani-admin.css"),
    ],
    "DASHBOARD_CALLBACK": "core.dashboard.dashboard_callback",
    "COLORS": {
        "primary": {
            "50": "#EEF7FC",
            "100": "#DCEEFA",
            "200": "#BFE0F5",
            "300": "#8CC5EA",
            "400": "#4FA3D6",
            "500": "#1D6FA8",
            "600": "#175D8D",
            "700": "#124F80",
            "800": "#0E3E66",
            "900": "#0A2F4D",
            "950": "#061D30",
        },
    },
    "SIDEBAR": {
        "show_search": True,
        "show_all_applications": False,
        "navigation": [
            {
                "title": "Overview",
                "items": [
                    {"title": "Dashboard", "icon": "dashboard", "link": reverse_lazy("admin:index")},
                    {"title": "Missing photos", "icon": "image_search", "link": reverse_lazy("missing_photos_report")},
                ],
            },
            {
                "title": "Site settings",
                "items": [
                    {"title": "School information", "icon": "domain", "link": reverse_lazy("admin:core_siteinfo_changelist")},
                    {"title": "Home banner slides", "icon": "wallpaper", "link": reverse_lazy("admin:core_homebannerslide_changelist")},
                    {"title": "Quick link cards", "icon": "grid_view", "link": reverse_lazy("admin:core_quicklinkcard_changelist")},
                    {"title": "Contact messages", "icon": "mail", "link": reverse_lazy("admin:core_contactmessage_changelist")},
                ],
            },
            {
                "title": "News",
                "items": [
                    {"title": "News posts", "icon": "newspaper", "link": reverse_lazy("admin:news_newspost_changelist")},
                ],
            },
            {
                "title": "History",
                "items": [
                    {"title": "Timeline events", "icon": "history_edu", "link": reverse_lazy("admin:history_historyevent_changelist")},
                    {"title": "Former headteachers", "icon": "person", "link": reverse_lazy("admin:history_headteacher_changelist")},
                    {"title": "Notable teachers", "icon": "co_present", "link": reverse_lazy("admin:history_notableteacher_changelist")},
                ],
            },
            {
                "title": "Academics",
                "items": [
                    {"title": "Subjects", "icon": "menu_book", "link": reverse_lazy("admin:academics_subject_changelist")},
                    {"title": "Awards & honours", "icon": "military_tech", "link": reverse_lazy("admin:academics_award_changelist")},
                ],
            },
            {
                "title": "Student life",
                "items": [
                    {"title": "Clubs & activities", "icon": "sports_soccer", "link": reverse_lazy("admin:studentlife_clubactivity_changelist")},
                ],
            },
            {
                "title": "Gallery",
                "items": [
                    {"title": "Albums", "icon": "photo_library", "link": reverse_lazy("admin:gallery_galleryalbum_changelist")},
                ],
            },
            {
                "title": "Alumni",
                "items": [
                    {"title": "Alumni", "icon": "school", "link": reverse_lazy("admin:alumni_alumnus_changelist")},
                ],
            },
            {
                "title": "Access",
                "items": [
                    {"title": "Users", "icon": "manage_accounts", "link": reverse_lazy("admin:auth_user_changelist")},
                    {"title": "Groups", "icon": "group", "link": reverse_lazy("admin:auth_group_changelist")},
                ],
            },
        ],
    },
}
