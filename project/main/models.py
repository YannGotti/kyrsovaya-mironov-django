from django.db import models
from djmoney.models.fields import MoneyField
from user.models import CustomUser

class Product(models.Model):
    title = models.CharField('Название', max_length=100)
    description = models.TextField('Описание')
   

    type = models.CharField('Тип', max_length=150)
    parametrs = models.JSONField('Характеристики',null=True, default=list)
    price = MoneyField(max_digits=14, decimal_places=2, default_currency='RUB')
    availability = models.BooleanField('Есть ли товар?', default=True)
    count = models.BigIntegerField('Кол-во товара', default=0, null=True)
    date_create = models.DateField('Дата добавления', auto_now=True)
    articul = models.CharField('Артикул', max_length=100)

    def __str__(self):
        return f'{self.title}, {self.description}, {self.type}, {self.availability}'
    class Meta:
        verbose_name = 'Товару'
        verbose_name_plural = 'Товары'

class Photo_product(models.Model):
    product = models.ForeignKey(Product, verbose_name= 'К какому товару привязан', on_delete=models.CASCADE)
    photo = models.ImageField('Фото товара', upload_to='product_photos/', blank=True, null=True)

class Order(models.Model):
    employee = models.ForeignKey(CustomUser, verbose_name='К какому сотруднику привязан', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, verbose_name= 'К какому товару привязан', on_delete=models.CASCADE)
    date_order = models.DateField('Дата создания товара', auto_now=True)