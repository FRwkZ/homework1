# Generated by Django 5.1.2 on 2024-11-03 11:20

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('p1', '0009_remove_bill_roomtype_bill_room'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='subbranch_id',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='p1.subbranch'),
            preserve_default=False,
        ),
    ]
