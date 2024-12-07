# Generated by Django 5.1.2 on 2024-11-03 08:24

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('p1', '0006_alter_order_order_status'),
    ]

    operations = [
        migrations.CreateModel(
            name='RoomUsage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_time', models.DateTimeField()),
                ('end_time', models.DateTimeField()),
                ('use_day', models.DecimalField(decimal_places=0, max_digits=3)),
                ('room', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='p1.room')),
            ],
            options={
                'db_table': '房间占用',
            },
        ),
    ]
