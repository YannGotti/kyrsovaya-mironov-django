from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    photo_profile = models.ImageField('Фото профиля пользователя', upload_to='photo_profile/',default='defaut_profile.png', blank=True, null=True)
    date_register = models.DateField('Дата регистрации', auto_now_add=True)
    number = models.CharField('Номер телефона пользователя', null=True, max_length=150)
    address = models.CharField('Адрес пользователя', max_length=150)
    email = models.EmailField('Почта пользователя', max_length=254)