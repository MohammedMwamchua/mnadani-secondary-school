
import core.validators
from django.db import migrations, models

class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ContactMessage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=150)),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.CharField(blank=True, max_length=40)),
                ('message', models.TextField()),
                ('is_read', models.BooleanField(default=False)),
                ('is_replied', models.BooleanField(default=False)),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='HomeBannerSlide',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('order', models.PositiveIntegerField(default=0, help_text='Lower numbers show first.')),
                ('title', models.CharField(max_length=200)),
                ('text', models.CharField(blank=True, max_length=300)),
                ('photo', models.ImageField(upload_to='home_banner/', validators=[core.validators.validate_image_file])),
                ('alt_text', models.CharField(blank=True, max_length=200)),
                ('active', models.BooleanField(default=True)),
            ],
            options={
                'verbose_name': 'Home banner slide',
                'ordering': ['order', 'id'],
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='QuickLinkCard',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.PositiveIntegerField(default=0, help_text='Lower numbers show first.')),
                ('title', models.CharField(max_length=120)),
                ('text', models.CharField(blank=True, max_length=250)),
                ('photo', models.ImageField(blank=True, null=True, upload_to='quick_links/', validators=[core.validators.validate_image_file])),
                ('link_path', models.CharField(blank=True, help_text='Page this card links to, e.g. /academics', max_length=120)),
                ('active', models.BooleanField(default=True)),
            ],
            options={
                'ordering': ['order', 'id'],
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='SiteInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('school_name', models.CharField(default='Mnadani Secondary School', max_length=200)),
                ('vision', models.CharField(blank=True, max_length=300)),
                ('motto', models.CharField(blank=True, max_length=300)),
                ('mission', models.TextField(blank=True)),
                ('introduction', models.TextField(blank=True, help_text='Shown on the About page.')),
                ('headteacher_message', models.TextField(blank=True)),
                ('necta_centre_number', models.CharField(blank=True, max_length=20)),
                ('founded_year', models.PositiveIntegerField(blank=True, null=True)),
                ('school_type', models.CharField(blank=True, default='Government day secondary school', max_length=120)),
                ('address', models.CharField(blank=True, max_length=300)),
                ('po_box', models.CharField(blank=True, max_length=120)),
                ('email', models.EmailField(blank=True, max_length=254)),
                ('phone', models.CharField(blank=True, max_length=40)),
                ('office_hours', models.CharField(blank=True, max_length=200)),
                ('administered_by', models.CharField(blank=True, default='Dodoma City Council', max_length=200)),
                ('entrance_signboard_photo', models.ImageField(blank=True, null=True, upload_to='site/', validators=[core.validators.validate_image_file])),
            ],
            options={
                'verbose_name': 'School information',
                'verbose_name_plural': 'School information',
            },
        ),
    ]
