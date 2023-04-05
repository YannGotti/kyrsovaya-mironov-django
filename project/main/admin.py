from django.contrib import admin
from .models import Product, Photo_product

@admin.register(Product)
class ProductAdminPanel(admin.ModelAdmin):
    list_display = ('title', 'price')

@admin.register(Photo_product)
class PhotoProductAdminPanel(admin.ModelAdmin):
    list_display = ('product', 'photo')