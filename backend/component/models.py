from django.db import models

# Create your models here.
class Component(models.Model):
    name = models.CharField(max_length=30, default='')
    picture = models.ImageField(upload_to='uploads', blank=True, null=True)
    category = models.CharField(max_length=30, default='')
    manufacture_name = models.CharField(max_length=50, default='')
    manufacture_num = models.CharField(max_length=30, default='')
    price = models.DecimalField(max_digits=8, decimal_places=2)
    datasheet = models.FileField(upload_to='uploads', blank=True, null=True)
    who =  models.ForeignKey('accounts.UserProfileInfo', on_delete=models.CASCADE,)
    review = models.CharField(max_length=500, default='')
    rating = models.DecimalField(max_digits=3, decimal_places=2)
    updated = models.DateTimeField(auto_now=True, null=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Comment(models.Model):
    component = models.ForeignKey(Component, related_name='comments', on_delete=models.CASCADE,)
    who = models.ForeignKey('accounts.UserProfileInfo', on_delete=models.CASCADE,)
    created = models.DateTimeField(auto_now_add=True)
    comment = models.CharField(max_length=500, default='')
    up_vote = models.IntegerField()
    down_vote = models.IntegerField()

    def __str__(self):
        return self.comment

class Specification(models.Model):
    component = models.ForeignKey(Component, related_name='specifications', on_delete=models.CASCADE,)
    key = models.CharField(max_length=50, default='')

    def __str__(self):
        return self.key
