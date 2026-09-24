
import core.validators
import django.db.models.deletion
from django.db import migrations, models

class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Award',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.PositiveIntegerField(default=0, help_text='Lower numbers show first.')),
                ('category', models.CharField(choices=[('academic', 'Academic'), ('student', 'Student')], default='academic', max_length=10)),
                ('title', models.CharField(help_text='Award name.', max_length=200)),
                ('meta', models.CharField(help_text='e.g. "Dodoma Region · 2023" or "Zonal Debate · 2022"', max_length=150)),
                ('explanation', models.TextField(help_text='What it recognised.')),
                ('photo', models.ImageField(blank=True, null=True, upload_to='academics/awards/', validators=[core.validators.validate_image_file])),
            ],
            options={
                'ordering': ['order', 'id'],
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Subject',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.PositiveIntegerField(default=0, help_text='Lower numbers show first.')),
                ('tag', models.CharField(help_text='Department/group label, e.g. "Sciences"', max_length=80)),
                ('title', models.CharField(max_length=150)),
                ('description', models.TextField(blank=True)),
                ('photo', models.ImageField(blank=True, null=True, upload_to='academics/subjects/', validators=[core.validators.validate_image_file])),
            ],
            options={
                'ordering': ['order', 'id'],
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='AwardPhoto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.PositiveIntegerField(default=0, help_text='Lower numbers show first.')),
                ('image', models.ImageField(upload_to='academics/awards/extra/', validators=[core.validators.validate_image_file])),
                ('caption', models.CharField(blank=True, max_length=200)),
                ('award', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='extra_photos', to='academics.award')),
            ],
            options={
                'ordering': ['order', 'id'],
                'abstract': False,
            },
        ),
    ]
