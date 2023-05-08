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
    
class ProductPage(APIView):
    def get(self, request, pk):

        product = Product.objects.get(id=pk)
        photos = Photo_product.objects.filter(product=product)
        photo = photos[0]

        array = []

        for photo in photos:
            array.append(photo)
        array.pop()

        data = {
            'product' : product,
            'photo' : photo,
            'photos' : array,
            'params_json': json.dumps(product.parametrs)
        }
        
        return render(request, 'main/product.html', context=data)
    
class SelectProducts(APIView):
    def get(self, request):
        values = request.GET
                               
        type = values.get('type')
        data = []

        if (type == "all"):
            products =  Product.objects.all()     
        else :
            products =  Product.objects.filter(type=type)     


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

class GetCountProducts(APIView):
    def get(self, request):
        values = request.GET
        type = values.get('type')
        if (type == "all"):
            products =  Product.objects.all().count()  
        else :
            products =  Product.objects.filter(type=type).count()

        return JsonResponse(products, safe=False)

class CreateProduct(APIView):
    def post(self, request):
        if request.method == 'POST' and request.FILES['file']:

            data = request.POST
            image = request.FILES['file']
            filename = ''

            product = Product(
                title=data.get('title'),
                description=data.get('description'), 
                price=Money(float(parseToMoney(data.get('price'))), 'RUB'),
                type=data.get('type'),
                count=int(data.get('count')),
                articul=data.get('articul')
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
        

class DeleteProduct(APIView):
    def get(self, request, pk):
        product = Product.objects.get(id=pk)
        product.delete()
        return redirect('/')
class EditProduct(APIView):
    def post(self, request):
        if request.method == 'POST':
            data = request.POST

            product = Product.objects.get(id=int(data.get('id')))
            product.title = data.get('title')
            product.description = data.get('description')
            product.price = Money(float(parseToMoney(data.get('price'))), 'RUB')
            product.type = data.get('type')
            product.count = int(data.get('count'))
            product.articul = data.get('articul')
            product.parametrs = json.loads(data.get('parametrs'))

            product.save()

        return JsonResponse("ok", safe=False)
    

class AddPhoto(APIView):
    def post(self, request):
        if request.method == 'POST' and request.FILES['file']:
            data = request.POST
            filename = ''
            image = request.FILES['file']

            fss = FileSystemStorage(location='media/product_photos/')
            file = fss.save(image.name, image)
            id_product = request.POST.get('id')
            product = Product.objects.get(id = id_product)

            fileTaskModel = Photo_product(product = product, photo = file)
            fileTaskModel.save()
            return JsonResponse("ok", safe=False)


def parseToMoney(value):
    isDecimal = False
    money = ''
    for i in value:
        if i == '1' or i == '2' or i == '3' or i == '4' or i == '5' or i == '6'or i == '7' or i == '8' or i == '9' or i == '0':
            money += i
        if i == ',':
            isDecimal = True
    
    if isDecimal:
        return money[:-2]
    else:
        return money