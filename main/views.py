from django.shortcuts import render
from datetime import datetime

def index(request):
    context = {
        'title': 'Главная',
        'company_name': 'AVTIVNA',
        'services': [
            'Ремонт турбин',
            'Обслуживание двигателей',
            'Диагностика электрооборудования',
            # Добавьте остальные услуги
        ],
        'current_year': datetime.now().year,
    }
    return render(request, 'main/index.html', context)

def about(request):
    context = {
        'title': 'О нас',
        'company_name': 'AVTIVNA',
        'current_year': datetime.now().year,
    }
    return render(request, 'main/about.html', context)