from django.shortcuts import render, redirect, HttpResponse
from django.core.files.storage import FileSystemStorage
from django.http import JsonResponse
from django.views.generic.base import View
from rest_framework.views import APIView
from main.models import Product, Photo_product
from django.core import serializers
from djmoney.money import Money
import json

class MainPage(View):
    def get(self, request):
        data = request.GET.get("info")

        if(data): 
            return render(request, 'base.html', context={'error_reg': data})
        
        return render(request, 'main/index.html')
    
class SelectAllProducts(APIView):
    def get(self, request):
        data = []
        products =  Product.objects.all()      

        for product in products:
            photos = Photo_product.objects.filter(product=product)
            data_photo = []
            for photo in photos:
                data_photo.append(photo.photo.name)

            info = {
                'product': json.loads(serializers.serialize('json', [product])),
                'photos': data_photo
            }

            data.append(info)

        return JsonResponse(data, safe=False)
        
class CreateProduct(APIView):
    def post(self, request):
        if request.method == 'POST' and request.FILES['file']:

            data = request.POST
            image = request.FILES['file']
            filename = ''

            product = Product(
                title=data.get('title'),
                description=data.get('description'), 
                price=Money(float(data.get('price')), 'RUB'),
                type=data.get('type'),
                count=int(data.get('count')),
                articul=int(data.get('articul'))
                )
            product.save()

            fss = FileSystemStorage(location='media/product_photos/')
            file = fss.save(image.name, image)
            
            fileTaskModel = Photo_product(product = product, photo=file)
            fileTaskModel.save()

            data = []

            info = {
                'product': json.loads(serializers.serialize('json', [product])),
                'photos': [fileTaskModel.photo.name]
            }

            data.append(info)

            return JsonResponse(data, safe=False)