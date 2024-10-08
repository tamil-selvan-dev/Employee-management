# Generated by Django 4.2.16 on 2024-09-29 09:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app1', '0005_register_access'),
    ]

    operations = [
        migrations.CreateModel(
            name='leave',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('leave1', models.CharField(max_length=20)),
                ('date1', models.CharField(max_length=20)),
                ('permission', models.CharField(choices=[('pending', 'pending'), ('yes', 'yes'), ('no', 'no')], default='pending', max_length=20, null=True)),
                ('emp_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app1.register')),
            ],
        ),
    ]
