
import core.validators
import django.db.models.deletion
from django.db import migrations, models

class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ClubActivity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.PositiveIntegerField(default=0, help_text='Lower numbers show first.')),
                ('tag', models.CharField(help_text='e.g. "Sports", "Clubs", "Culture"', max_length=80)),
                ('title', models.CharField(max_length=150)),
                ('description', models.TextField(help_text='What it does.')),
                ('achievements', models.TextField(blank=True, help_text='Notable wins or milestones.')),
                ('cover_photo', models.ImageField(blank=True, null=True, upload_to='studentlife/covers/', validators=[core.validators.validate_image_file])),
            ],
            options={
                'ordering': ['order', 'id'],
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ClubActivityPhoto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.PositiveIntegerField(default=0, help_text='Lower numbers show first.')),
                ('image', models.ImageField(upload_to='studentlife/extra/', validators=[core.validators.validate_image_file])),
                ('caption', models.CharField(blank=True, max_length=200)),
                ('activity', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='extra_photos', to='studentlife.clubactivity')),
            ],
            options={
                'ordering': ['order', 'id'],
                'abstract': False,
            },
        ),
    ]
