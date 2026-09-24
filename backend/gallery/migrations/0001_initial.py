
import core.validators
import django.db.models.deletion
from django.db import migrations, models

class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='GalleryAlbum',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.PositiveIntegerField(default=0, help_text='Lower numbers show first.')),
                ('name', models.CharField(max_length=150)),
                ('category', models.CharField(choices=[('campus', 'Campus'), ('classrooms', 'Classrooms'), ('sports', 'Sports Day'), ('graduation', 'Graduation'), ('cultural', 'Cultural Day'), ('assembly', 'Assembly'), ('clubs', 'Clubs'), ('staff', 'Staff'), ('other', 'Other')], default='other', max_length=20)),
                ('cover_photo', models.ImageField(blank=True, null=True, upload_to='gallery/covers/', validators=[core.validators.validate_image_file])),
            ],
            options={
                'ordering': ['order', 'id'],
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='GalleryPhoto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.PositiveIntegerField(default=0, help_text='Lower numbers show first.')),
                ('image', models.ImageField(upload_to='gallery/photos/', validators=[core.validators.validate_image_file])),
                ('caption', models.CharField(blank=True, max_length=200)),
                ('album', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='photos', to='gallery.galleryalbum')),
            ],
            options={
                'ordering': ['order', 'id'],
                'abstract': False,
            },
        ),
    ]
