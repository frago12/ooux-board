# Generated by Django 2.2.7 on 2019-12-02 06:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('boards', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='board',
            options={'ordering': ('created',)},
        ),
        migrations.AlterField(
            model_name='board',
            name='created',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
