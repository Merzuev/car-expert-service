from django.contrib import admin
from django.utils.safestring import mark_safe
from django import forms
import json

from .models import Service, Price, Car, CarImage, MODEL_CHOICES_MAP

class PriceInline(admin.TabularInline):
    model = Price
    extra = 0
    fields = ('option', 'price_from', 'price_to')
    show_change_link = False

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name',)
    inlines = [PriceInline]

class CarImageInline(admin.TabularInline):
    model = CarImage
    extra = 1

@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = ('brand', 'model', 'year', 'price')
    inlines = [CarImageInline]
    fields = (
        'brand', 'model', 'year', 'mileage', 'engine_type',
        'engine_capacity', 'gearbox', 'drive', 'color', 'price', 'main_image'
    )
    change_form_template = "admin/main/car/change_form.html"

    def render_change_form(self, request, context, *args, **kwargs):
        # Прокидываем карту моделей в шаблон
        context['MODEL_CHOICES_MAP'] = mark_safe(json.dumps(MODEL_CHOICES_MAP, ensure_ascii=False))
        return super().render_change_form(request, context, *args, **kwargs)
