# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-01-17 14:19
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0007_auto_20180117_1359'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='productinbasket',
            options={'verbose_name': 'Товар в корзине', 'verbose_name_plural': 'Товары в корзине'},
        ),
    ]