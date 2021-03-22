from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField
from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail

ROLE_CHOICES = (
    ('s', 'Student'),
    ('p', 'Professor')
)



class UserProfile(models.Model):
    # Preset user data provided by Django
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # Additional User data needed for project
    firstname = models.CharField(max_length=50, default='')
    lastname = models.CharField(max_length=50, default='')
    image = models.ImageField(default='default-user.jpg', upload_to='profile_pics')
    role = models.CharField(max_length=9,choices=ROLE_CHOICES)
    school = models.CharField(max_length=50, default='')
    field_study = models.CharField(max_length=50, default='')
    about_me = models.CharField(max_length=255, default='')
    component_knowledge = ArrayField(models.CharField(max_length=50, blank=True), default=list)
    posts_made  = ArrayField(models.CharField(max_length=24, blank=True, default=''), default=list)

    def __str__(self):
        return f'{self.user.username} Profile'


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):

    email_plaintext_message = "Click this link to reset your password: http://localhost:3000/password-reset/{token}".format(token=reset_password_token.key)

    send_mail(
        # title:
        "Password Reset for {title}".format(title="Component Review"),
        # message:
        email_plaintext_message,
        # from:
        "noreply@somehost.local",
        # to:
        [reset_password_token.user.email]
    )
