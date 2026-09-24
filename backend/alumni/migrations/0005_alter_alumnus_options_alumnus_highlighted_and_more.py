
from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('alumni', '0004_alter_alumnus_options'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='alumnus',
            options={'ordering': ['-featured', 'order', 'created_at', 'full_name'], 'verbose_name_plural': 'Alumni'},
        ),
        migrations.AddField(
            model_name='alumnus',
            name='highlighted',
            field=models.BooleanField(default=False, help_text='Show a small star badge on their card in the regular grid — a subtle highlight, without the full spotlight treatment that Featured gives.'),
        ),
        migrations.AddField(
            model_name='alumnus',
            name='order',
            field=models.PositiveIntegerField(default=0, help_text='Lower numbers show first.'),
        ),
    ]
