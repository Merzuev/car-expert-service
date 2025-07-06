from django.db import models
from django.conf import settings
import json
from pathlib import Path

def load_brand_choices():
    try:
        fixture_path = Path(settings.BASE_DIR) / 'main' / 'fixtures' / 'initial_brands.json'
        with open(fixture_path, encoding='utf-8') as f:
            data = json.load(f)
        brands = sorted(data.keys())
        brand_choices = [(b, b) for b in brands]
        model_choices_map = {b: [(m, m) for m in data[b]] for b in brands}
        return brand_choices, model_choices_map
    except Exception:
        return [], {}

BRAND_CHOICES, MODEL_CHOICES_MAP = load_brand_choices()

class Service(models.Model):
    name = models.CharField(max_length=255, verbose_name="Nom du service")
    image = models.ImageField(upload_to='services_icons/', null=True, blank=True, verbose_name="Icône (PNG/JPG/SVG)")
    def __str__(self): return self.name

class Price(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='prices')
    option = models.CharField(max_length=255, verbose_name="Option")
    price_from = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, verbose_name="Prix à partir de")
    price_to = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, verbose_name="Prix jusqu'à")
    def __str__(self): return f"{self.service.name}: {self.option}"

class Car(models.Model):
    brand = models.CharField(
        max_length=100,
        choices=BRAND_CHOICES,
        verbose_name="Марка"
    )
    model = models.CharField(
        max_length=100,
        verbose_name="Модель"
    )
    year = models.PositiveIntegerField(verbose_name="Année de fabrication")
    mileage = models.PositiveIntegerField(verbose_name="Kilométrage (km)")
    engine_type = models.CharField(max_length=50, choices=[
        ('Essence','Essence'), ('Diesel','Diesel'), ('Hybride','Hybride'), ('Électrique','Électrique'),
    ], verbose_name="Type de moteur")
    engine_capacity = models.DecimalField(max_digits=4, decimal_places=1, verbose_name="Cylindrée (L)")
    gearbox = models.CharField(max_length=50, choices=[
        ('Manuelle','Manuelle'), ('Automatique','Automatique'), ('CVT','CVT'),
    ], verbose_name="Boîte de vitesses")
    drive = models.CharField(max_length=20, choices=[
        ('2WD Avant','2WD Avant'), ('2WD Arrière','2WD Arrière'), ('4WD','4WD'),
    ], verbose_name="Type de transmission")
    color = models.CharField(max_length=50, verbose_name="Couleur")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Prix (€)")
    main_image = models.ImageField(upload_to="cars/", verbose_name="Photo principale")
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self): return f"{self.brand} {self.model} ({self.year})"

class CarImage(models.Model):
    car = models.ForeignKey(Car, related_name="images", on_delete=models.CASCADE)
    image = models.ImageField(upload_to="cars/gallery/", verbose_name="Photo supplémentaire")
    def __str__(self): return f"Image for {self.car}"
