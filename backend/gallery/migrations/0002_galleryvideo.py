
import core.validators
import django.db.models.deletion
from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('gallery', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='GalleryVideo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.PositiveIntegerField(default=0, help_text='Lower numbers show first.')),
                ('video', models.FileField(help_text='Short clips only — MP4, MOV, or WEBM, up to 50MB.', upload_to='gallery/videos/', validators=[core.validators.validate_video_file])),
                ('caption', models.CharField(blank=True, max_length=200)),
                ('album', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='videos', to='gallery.galleryalbum')),
            ],
            options={
                'ordering': ['order', 'id'],
                'abstract': False,
            },
        ),
    ]
