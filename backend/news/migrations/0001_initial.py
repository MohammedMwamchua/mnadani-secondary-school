
import core.validators
import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models

class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='NewsPost',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=200)),
                ('date', models.DateField(default=django.utils.timezone.now)),
                ('category', models.CharField(choices=[('announcement', 'Announcement'), ('results', 'Results'), ('event', 'Event')], default='announcement', max_length=20)),
                ('summary', models.CharField(help_text='1–2 sentences shown on Home and the News list.', max_length=300)),
                ('body', models.TextField(help_text='The complete news story.')),
                ('cover_photo', models.ImageField(blank=True, null=True, upload_to='news/covers/', validators=[core.validators.validate_image_file])),
                ('status', models.CharField(choices=[('draft', 'Draft'), ('published', 'Published')], default='draft', max_length=10)),
            ],
            options={
                'ordering': ['-date', '-created_at'],
            },
        ),
        migrations.CreateModel(
            name='NewsPhoto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.PositiveIntegerField(default=0, help_text='Lower numbers show first.')),
                ('image', models.ImageField(upload_to='news/extra/', validators=[core.validators.validate_image_file])),
                ('caption', models.CharField(blank=True, max_length=200)),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='photos', to='news.newspost')),
            ],
            options={
                'ordering': ['order', 'id'],
                'abstract': False,
            },
        ),
    ]
