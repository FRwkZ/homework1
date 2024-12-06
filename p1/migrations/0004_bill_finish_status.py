# Generated by Django 5.1.2 on 2024-11-02 09:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('p1', '0003_bill_check_in_time_bill_check_out_time_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='bill',
            name='finish_status',
            field=models.CharField(choices=[('finish', '已完成'), ('unfinish', '未完成')], default='unfinish', max_length=10),
        ),
    ]
