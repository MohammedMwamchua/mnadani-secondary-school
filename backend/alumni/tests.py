import io
import shutil
import tempfile

from django.core.cache import cache
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase, override_settings
from PIL import Image

from .models import Alumnus

TEMP_MEDIA = tempfile.mkdtemp()
LOCMEM_CACHE = {"default": {"BACKEND": "django.core.cache.backends.locmem.LocMemCache"}}
SUBMIT_URL = "/api/alumni-submissions/"


def image_upload(name="photo.jpg", fmt="JPEG", size=(40, 40), mode="RGB", **save_kwargs):
    buf = io.BytesIO()
    Image.new(mode, size, "red" if mode == "RGB" else 1).save(buf, format=fmt, **save_kwargs)
    return SimpleUploadedFile(name, buf.getvalue(), content_type=f"image/{fmt.lower()}")


def submission(photo, **overrides):
    data = {
        "full_name": "Test Alumnus",
        "year_finished": 2019,
        "level": "form_iv",
        "current_role": "Engineer",
        "city": "Dodoma",
        "phone": "0700000000",
        "photo": photo,
    }
    data.update(overrides)
    return data


@override_settings(MEDIA_ROOT=TEMP_MEDIA, CACHES=LOCMEM_CACHE)
class AlumniSubmissionSecurityTests(TestCase):
    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()
        shutil.rmtree(TEMP_MEDIA, ignore_errors=True)

    def setUp(self):
        cache.clear()

    def post(self, data):
        return self.client.post(SUBMIT_URL, data)

    def test_rejects_disallowed_image_type(self):
        response = self.post(submission(image_upload("photo.gif", "GIF")))
        self.assertEqual(response.status_code, 400)
        self.assertIn("photo", response.json())

    def test_rejects_file_over_5mb(self):
        big = image_upload("photo.png", "PNG", size=(1500, 1500), compress_level=0)
        self.assertGreater(big.size, 5 * 1024 * 1024)
        response = self.post(submission(big))
        self.assertEqual(response.status_code, 400)
        self.assertIn("photo", response.json())

    def test_rejects_non_image_disguised_as_jpg(self):
        fake = SimpleUploadedFile("photo.jpg", b"<html><script>alert(1)</script></html>", content_type="image/jpeg")
        response = self.post(submission(fake))
        self.assertEqual(response.status_code, 400)

    def test_rejects_image_with_huge_pixel_dimensions(self):
        bomb = image_upload("photo.png", "PNG", size=(8000, 8000), mode="1")
        self.assertLess(bomb.size, 5 * 1024 * 1024)
        response = self.post(submission(bomb))
        self.assertEqual(response.status_code, 400)

    def test_valid_submission_lands_pending_and_hidden(self):
        response = self.post(submission(image_upload()))
        self.assertEqual(response.status_code, 201)
        alumnus = Alumnus.objects.get()
        self.assertEqual(alumnus.approval_status, Alumnus.ApprovalStatus.PENDING)
        self.assertEqual(self.client.get("/api/alumni/").json()["count"], 0)

    def test_submitter_cannot_self_approve_or_feature(self):
        self.post(submission(image_upload(), approval_status="approved", featured="true", source="admin"))
        alumnus = Alumnus.objects.get()
        self.assertEqual(alumnus.approval_status, Alumnus.ApprovalStatus.PENDING)
        self.assertFalse(alumnus.featured)
        self.assertEqual(alumnus.source, Alumnus.Source.SELF_SUBMITTED)

    def test_gps_metadata_is_stripped_from_stored_photo(self):
        exif = Image.Exif()
        exif[0x8825] = {1: "S", 2: (6.0, 10.0, 0.0), 3: "E", 4: (35.0, 44.0, 0.0)}
        photo = image_upload(exif=exif)
        with Image.open(io.BytesIO(photo.read())) as original:
            self.assertTrue(original.getexif().get_ifd(0x8825))
        photo.seek(0)
        response = self.post(submission(photo))
        self.assertEqual(response.status_code, 201)
        with Image.open(Alumnus.objects.get().photo.path) as stored:
            self.assertFalse(stored.getexif().get_ifd(0x8825))

    def test_submissions_are_rate_limited(self):
        for _ in range(10):
            self.assertEqual(self.post(submission(image_upload())).status_code, 201)
        self.assertEqual(self.post(submission(image_upload())).status_code, 429)
