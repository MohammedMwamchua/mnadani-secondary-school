
import alumni.models
import core.validators
from django.db import migrations, models

class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Alumnus',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('full_name', models.CharField(max_length=150)),
                ('year_finished', models.PositiveIntegerField(validators=[alumni.models.validate_not_future_year])),
                ('level', models.CharField(choices=[('form_iv', 'Form IV'), ('form_vi', 'Form VI')], default='form_iv', max_length=10)),
                ('photo', models.ImageField(blank=True, null=True, upload_to='alumni/', validators=[core.validators.validate_image_file])),
                ('current_role', models.CharField(blank=True, help_text='e.g. "Nurse", "Software Developer"', max_length=150)),
                ('organisation', models.CharField(blank=True, help_text='Where they work or study, e.g. "UDOM"', max_length=150)),
                ('city', models.CharField(blank=True, max_length=100)),
                ('country', models.CharField(blank=True, default='Tanzania', max_length=100)),
                ('history_at_school', models.TextField(blank=True, help_text='Memories, clubs, achievements at school.')),
                ('achievements_after', models.TextField(blank=True, help_text="What they've done since.")),
                ('message_to_students', models.TextField(blank=True, help_text='Advice or encouragement.')),
                ('featured', models.BooleanField(default=False, help_text='Show at the top of the Alumni page.')),
                ('show_on_website', models.BooleanField(default=True)),
                ('permission_received', models.BooleanField(default=False, help_text='Tick only after the person agrees to be published.')),
                ('source', models.CharField(choices=[('admin', 'Added by admin'), ('self_submitted', 'Submitted via website')], default='admin', max_length=20)),
                ('approval_status', models.CharField(choices=[('approved', 'Approved'), ('pending', 'Waiting for approval'), ('rejected', 'Rejected')], default='approved', max_length=10)),
            ],
            options={
                'verbose_name_plural': 'Alumni',
                'ordering': ['-featured', '-year_finished', 'full_name'],
            },
        ),
    ]
