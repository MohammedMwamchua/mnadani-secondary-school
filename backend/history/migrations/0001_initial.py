
import core.validators
from django.db import migrations, models

class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Headteacher',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.PositiveIntegerField(default=0, help_text='Lower numbers show first.')),
                ('name', models.CharField(max_length=150)),
                ('initials', models.CharField(blank=True, help_text='Fallback shown until a photo is added.', max_length=4)),
                ('period_start', models.PositiveIntegerField(blank=True, null=True)),
                ('period_end', models.PositiveIntegerField(blank=True, help_text='Leave blank if still serving.', null=True)),
                ('story', models.TextField(help_text='Short explanation of their time leading the school.')),
                ('photo', models.ImageField(blank=True, null=True, upload_to='history/headteachers/', validators=[core.validators.validate_image_file])),
            ],
            options={
                'ordering': ['order', 'id'],
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='HistoryEvent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.PositiveIntegerField(default=0, help_text='Lower numbers show first.')),
                ('year', models.CharField(help_text='e.g. "2007" or "Early yrs"', max_length=40)),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField(help_text='What happened.')),
                ('photo', models.ImageField(blank=True, null=True, upload_to='history/timeline/', validators=[core.validators.validate_image_file])),
            ],
            options={
                'ordering': ['order', 'id'],
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='NotableTeacher',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.PositiveIntegerField(default=0, help_text='Lower numbers show first.')),
                ('name', models.CharField(max_length=150)),
                ('subject', models.CharField(blank=True, max_length=120)),
                ('years', models.CharField(blank=True, help_text='e.g. "1998 – 2015"', max_length=60)),
                ('story', models.TextField(help_text='Why they are remembered.')),
                ('photo', models.ImageField(blank=True, null=True, upload_to='history/teachers/', validators=[core.validators.validate_image_file])),
            ],
            options={
                'ordering': ['order', 'id'],
                'abstract': False,
            },
        ),
    ]
