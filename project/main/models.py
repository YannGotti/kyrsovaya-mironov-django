from django.db import models
from djmoney.models.fields import MoneyField
from user.models import Client, Employee

class Product(models.Model):
    title = models.CharField('Название', max_length=100)
    description = models.TextField('Описание')

    types = [
        (1, 'Ноутбуки'),
        (2, 'Персональные компьютеры'),
        (3, 'Моноблоки'),
        (4, 'Мониторы'),
        (5, 'Клавиатуры'),
        (6, 'Мыши'),
        (7, 'Комплекты клавиатура+мышь'),
        (8, 'Игровые наборы'),
        (9, 'Видеокамеры'),
        (10, 'Наушники'),
        (11, 'Колонки')
    ]

    type = models.IntegerField('Тип', choices=types)
    parametrs = models.JSONField('Характеристики', null=True)
    price = MoneyField(max_digits=14, decimal_places=2, default_currency='RU')
    availability = models.BooleanField('Есть ли товар?', default=False)
    count = models.BigIntegerField('Кол-во товара', default=0, null=True)
    date_create = models.DateField('Дата добавления', auto_now=True)

    def __str__(self):
        return f'{self.title}, {self.description}, {self.type}, {self.availability}'
    class Meta:
        verbose_name = 'Товару'
        verbose_name_plural = 'Товары'

class Photo_product(models.Model):
    product = models.ForeignKey(Product, verbose_name= 'К какому товару привязан', on_delete=models.CASCADE)
    photo = models.ImageField('Фото товара', upload_to='product_photos/', blank=True, null=True)

class Order(models.Model):
    employee = models.ForeignKey(Employee, verbose_name='К какому сотруднику привязан', on_delete=models.CASCADE)
    client = models.ForeignKey(Client, verbose_name='К какому клиенту привязан', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, verbose_name= 'К какому товару привязан', on_delete=models.CASCADE)
    date_order = models.DateField('Дата создания товара', auto_now=True)