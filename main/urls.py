from django.urls import path
from . import views

app_name = 'main'

urlpatterns = [
    path('', views.index, name='index'),
    path('service/<int:pk>/prices/', views.service_prices, name='service_prices'),
    # Новый маршрут: вывод страницы с автомобилями (основной шаблон index уже обрабатывает cars)
    # Если хочешь отдельный AJAX маршрут для загрузки деталей авто, можно добавить так:
    # path('car/<int:pk>/details/', views.car_details, name='car_details'),
]
