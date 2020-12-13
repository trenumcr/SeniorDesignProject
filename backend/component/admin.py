from django.contrib import admin
from component.models import Component, Comment, Specification
# Register your models here.
admin.site.register(Component)
admin.site.register(Comment)
admin.site.register(Specification)
