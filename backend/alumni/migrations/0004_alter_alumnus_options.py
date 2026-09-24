
from django.db import migrations

class Migration(migrations.Migration):

    dependencies = [
        ('alumni', '0003_alter_alumnus_city_alter_alumnus_current_role_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='alumnus',
            options={'ordering': ['-featured', 'created_at', 'full_name'], 'verbose_name_plural': 'Alumni'},
        ),
    ]
