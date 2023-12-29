# Generated by Django 3.2.23 on 2023-12-27 08:01

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('content', models.TextField(blank=True, null=True)),
                ('answer_no', models.IntegerField(primary_key=True, serialize=False)),
                ('is_correct', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'Answer',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('category_no', models.IntegerField(primary_key=True, serialize=False)),
                ('classification', models.TextField(blank=True, null=True)),
                ('category_name', models.TextField(blank=True, null=True)),
            ],
            options={
                'db_table': 'Category',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('content', models.TextField(blank=True, null=True)),
                ('question_no', models.IntegerField(primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'Question',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Result',
            fields=[
                ('result_no', models.IntegerField(primary_key=True, serialize=False)),
                ('timestamp', models.DateTimeField()),
                ('is_correct', models.IntegerField()),
                ('content', models.TextField()),
            ],
            options={
                'db_table': 'Result',
                'managed': False,
            },
        ),
    ]
