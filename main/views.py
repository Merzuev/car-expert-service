from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .models import Service, Car

def index(request):
    """
    Главная страница: выводит все услуги с прайсами и все автомобили для продажи.
    Услуги загружаем вместе с прайсами, автомобили – вместе с дополнительными изображениями.
    """
    services = Service.objects.prefetch_related('prices').all()
    cars = Car.objects.prefetch_related('images').order_by('-created').all()
    return render(request, 'main/index.html', {
        'services': services,
        'cars': cars,
    })

def service_prices(request, pk):
    """
    AJAX: возвращает JSON с прайсами для конкретной услуги.
    """
    service = get_object_or_404(Service, pk=pk)
    prices = [
        {
            'option': price.option,
            'price_from': float(price.price_from) if price.price_from is not None else None,
            'price_to': float(price.price_to) if price.price_to is not None else None,
        }
        for price in service.prices.all()
    ]
    return JsonResponse({'service': service.name, 'prices': prices})

def car_list_json(request):
    """
    AJAX: возвращает JSON список автомобилей с основными данными и URL картинок.
    """
    cars_qs = Car.objects.prefetch_related('images').all()
    cars_data = []
    for car in cars_qs:
        cars_data.append({
            'id': car.id,
            'brand': car.brand,
            'model': car.model,
            'year': car.year,
            'mileage': car.mileage,
            'engine_type': car.engine_type,
            'engine_capacity': float(car.engine_capacity),
            'gearbox': car.gearbox,
            'drive': car.drive,
            'color': car.color,
            'price': float(car.price),
            'main_image': car.main_image.url,
            'gallery': [img.image.url for img in car.images.all()],
        })
    return JsonResponse({'cars': cars_data})
