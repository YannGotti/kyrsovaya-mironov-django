# Generated by Django 4.1.5 on 2023-04-05 17:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_alter_product_availability'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='type',
            field=models.CharField(max_length=150, verbose_name='Тип'),
        ),
    ]
