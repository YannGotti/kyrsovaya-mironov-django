from django.urls import path
from . import views

urlpatterns = [
    path('', views.MainPage.as_view()),
    path('api/v.1/selectTasks/all/', views.SelectAllProducts.as_view()),
    path('api/v.1/createProduct/', views.CreateProduct.as_view()),
]