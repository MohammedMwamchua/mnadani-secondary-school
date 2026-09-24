
import core.validators
from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('alumni', '0002_alumnus_phone'),
    ]

    operations = [
        migrations.AlterField(
            model_name='alumnus',
            name='city',
            field=models.CharField(help_text='Where they are now.', max_length=100),
        ),
        migrations.AlterField(
            model_name='alumnus',
            name='current_role',
            field=models.CharField(help_text='What they\'re doing now, e.g. "Nurse", "Software Developer"', max_length=150),
        ),
        migrations.AlterField(
            model_name='alumnus',
            name='phone',
            field=models.CharField(help_text="Shown publicly on the Alumni page — only add this with the person's consent.", max_length=40),
        ),
        migrations.AlterField(
            model_name='alumnus',
            name='photo',
            field=models.ImageField(null=True, upload_to='alumni/', validators=[core.validators.validate_image_file]),
        ),
    ]
