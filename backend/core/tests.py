from django.contrib.auth.models import User
from django.core.cache import cache
from django.core.exceptions import ValidationError
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase, override_settings
from django.urls import reverse

from .models import ContactMessage
from .validators import validate_video_file

LOCMEM_CACHE = {"default": {"BACKEND": "django.core.cache.backends.locmem.LocMemCache"}}
CONTACT_URL = "/api/contact-messages/"


@override_settings(CACHES=LOCMEM_CACHE)
class ContactEndpointSecurityTests(TestCase):
    def setUp(self):
        cache.clear()

    def message(self):
        return {"name": "Parent", "email": "parent@example.com", "message": "Hello"}

    def test_messages_cannot_be_listed_or_read_publicly(self):
        self.client.post(CONTACT_URL, self.message())
        self.assertEqual(self.client.get(CONTACT_URL).status_code, 405)
        self.assertEqual(self.client.get(f"{CONTACT_URL}1/").status_code, 404)

    def test_submitter_cannot_mark_message_as_read(self):
        self.client.post(CONTACT_URL, {**self.message(), "is_read": "true", "is_replied": "true"})
        msg = ContactMessage.objects.get()
        self.assertFalse(msg.is_read)
        self.assertFalse(msg.is_replied)

    def test_contact_form_is_rate_limited(self):
        for _ in range(10):
            self.assertEqual(self.client.post(CONTACT_URL, self.message()).status_code, 201)
        self.assertEqual(self.client.post(CONTACT_URL, self.message()).status_code, 429)


@override_settings(CACHES=LOCMEM_CACHE)
class AdminLoginBruteForceTests(TestCase):
    password = "Correct-horse-battery-9"

    def setUp(self):
        User.objects.create_superuser("staff", "staff@example.com", self.password)
        self.login_url = reverse("admin:login")

    def attempt(self, password):
        return self.client.post(self.login_url, {"username": "staff", "password": password, "next": "/admin/"})

    def test_account_locks_after_five_failures_even_with_correct_password(self):
        for _ in range(5):
            self.attempt("wrong-password")
        response = self.attempt(self.password)
        self.assertEqual(response.status_code, 429)
        self.assertNotIn("_auth_user_id", self.client.session)

    def test_login_page_sends_staff_to_the_dashboard(self):
        self.assertContains(self.client.get(self.login_url), 'name="next" value="/admin/"')

    def test_correct_password_still_works_before_lockout(self):
        for _ in range(3):
            self.attempt("wrong-password")
        response = self.attempt(self.password)
        self.assertEqual(response.status_code, 302)
        self.assertIn("_auth_user_id", self.client.session)


class VideoValidatorTests(TestCase):
    def test_rejects_non_video_named_mp4(self):
        fake = SimpleUploadedFile("clip.mp4", b"<html>not a video</html>")
        with self.assertRaises(ValidationError):
            validate_video_file(fake)

    def test_accepts_real_mp4_signature(self):
        mp4 = SimpleUploadedFile("clip.mp4", b"\x00\x00\x00\x18ftypmp42" + b"\x00" * 64)
        validate_video_file(mp4)

    def test_accepts_real_webm_signature(self):
        webm = SimpleUploadedFile("clip.webm", b"\x1a\x45\xdf\xa3" + b"\x00" * 64)
        validate_video_file(webm)
