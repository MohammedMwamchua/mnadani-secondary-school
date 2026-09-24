
from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('alumni', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='alumnus',
            name='phone',
            field=models.CharField(blank=True, help_text="Shown publicly on the Alumni page — only add this with the person's consent.", max_length=40),
        ),
    ]
