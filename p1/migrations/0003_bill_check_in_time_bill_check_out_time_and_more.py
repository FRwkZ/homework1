# Generated by Django 5.1.2 on 2024-11-01 13:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('p1', '0002_personinfo'),
    ]

    operations = [
        migrations.AddField(
            model_name='bill',
            name='check_in_time',
            field=models.DateTimeField(default='2024-01-01 00:00:00'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='bill',
            name='check_out_time',
            field=models.DateTimeField(default='2024-01-01 00:00:00'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='bill',
            name='number_of_guest',
            field=models.DecimalField(decimal_places=0, default=1, max_digits=3),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='bill',
            name='payment_status',
            field=models.CharField(choices=[('unpaid', '未支付'), ('paid', '已支付')], default='unpaid', max_length=10),
        ),
        migrations.AddField(
            model_name='bill',
            name='roomtype',
            field=models.CharField(choices=[('1', '标间'), ('2', '豪华标间'), ('3', '大床'), ('4', '豪华大床'), ('5', '行政'), ('6', '豪华行政'), ('7', '套房')], default=1, max_length=20),
            preserve_default=False,
        ),
    ]
