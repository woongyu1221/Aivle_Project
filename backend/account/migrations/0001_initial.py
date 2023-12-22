# Generated by Django 3.2.23 on 2023-12-22 05:16

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('user_no', models.AutoField(primary_key=True, serialize=False)),
                ('id', models.CharField(max_length=128, unique=True)),
                ('password', models.CharField(max_length=128)),
                ('is_admin', models.BooleanField(default=False)),
                ('email', models.EmailField(max_length=255, unique=True, verbose_name='email')),
                ('dept', models.IntegerField()),
                ('name', models.CharField(max_length=255)),
                ('phone', models.IntegerField()),
            ],
            options={
                'abstract': False,
            },
        ),
    ]