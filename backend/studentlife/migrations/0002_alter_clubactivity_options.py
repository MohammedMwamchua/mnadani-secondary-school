
from django.db import migrations

class Migration(migrations.Migration):

    dependencies = [
        ('studentlife', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='clubactivity',
            options={'ordering': ['order', 'id'], 'verbose_name_plural': 'Club activities'},
        ),
    ]
