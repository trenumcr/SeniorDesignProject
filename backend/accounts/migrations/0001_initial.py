# Generated by Django 3.1.5 on 2021-01-14 19:34

from django.conf import settings
import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(default='default-user.jpg', upload_to='profile_pics')),
                ('role', models.CharField(choices=[('s', 'Student'), ('p', 'Professor')], max_length=9)),
                ('school', models.CharField(default='', max_length=50)),
                ('field_study', models.CharField(default='', max_length=50)),
                ('about_me', models.CharField(default='', max_length=255)),
                ('component_knowledge', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=50), default=list, size=None)),
                ('posts_made', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=24), default=list, size=None)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
