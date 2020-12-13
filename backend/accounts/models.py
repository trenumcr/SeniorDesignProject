from django.db import models
#from django.contrib.auth.models import User
from django.contrib.auth import get_user_model

User = get_user_model()

ROLE_CHOICES = (
    ('s', 'Student'),
    ('p', 'Professor')
)
# Create your models here.
class UserProfileInfo(models.Model):
    # Preset user data
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # Additional
    post_made = models.ForeignKey('component.Component', blank=True, on_delete=models.CASCADE)
    role = models.CharField(max_length=9,choices=ROLE_CHOICES)
    school = models.CharField(max_length=50, default='')
    profile_pic = models.ImageField(upload_to='profile_pics',blank=True)

    def __str__(self):
        return self.user.username
