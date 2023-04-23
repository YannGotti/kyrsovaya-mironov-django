from django.urls import path
from . import views

urlpatterns = [
    path('', views.MainPage.as_view()),
    path('api/v.1/selectTasks/', views.SelectProducts.as_view()),
    path('api/v.1/getCountProducts/', views.GetCountProducts.as_view()),
    path('api/v.1/createProduct/', views.CreateProduct.as_view()),
]