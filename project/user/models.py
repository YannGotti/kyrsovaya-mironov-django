from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
import datetime

class CustomUser(AbstractUser):
    photo_profile = models.ImageField('Фото профиля пользователя', upload_to='photo_profile/', blank=True, null=True)
    date_register = models.DateTimeField('Дата регистрации', auto_now_add=True)
    number = models.IntegerField('Номер телефона пользователя', default=0, null=True)
    address = models.CharField('Адрес пользователя', max_length=150)
    email = models.EmailField('Почта пользователя', max_length=254)



class Client(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )


class Employee(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    surname = models.CharField('Отчество сотрудника', max_length=100)
    dob = models.DateField('Дата рождения', default=datetime.datetime.now())