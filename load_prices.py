import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "darksite.settings")
django.setup()

from main.models import Service, Price
import re


data = {
    "Réparation moteur": [
        ["Diagnostic informatique", "30", ""],
        ["Vérification de la compression dans les cylindres", "50", ""],
        ["Diagnostic du système d'alimentation (carburant)", "50", ""],
        ["Diagnostic du système de refroidissement", "50", ""],
        ["Diagnostic du système de lubrification", "50", ""],
        ["Démontage complet du moteur", "70", ""],
        ["Nettoyage et contrôle des pièces", "70", ""],
        ["Alésage et honnage des cylindres", "70", ""],
        ["Rectification du vilebrequin", "70", ""],
        ["Remplacement du groupe pistons", "70", ""],
        ["Remplacement des coussinets et joints", "70", ""],
        ["Remplacement des joints et garnitures", "70", ""],
        ["Assemblage et installation du moteur", "500", ""],
        ["Remplacement de la culasse", "70", ""],
        ["Remplacement du joint de culasse", "70", ""],
        ["Réparation/remplacement des soupapes", "70", ""],
        ["Remplacement de la chaîne ou courroie de distribution", "70", ""],
        ["Remplacement des tendeurs et galets", "70", ""],
        ["Remplacement des compensateurs hydrauliques", "70", ""],
        ["Remplacement de la pompe à huile", "70", ""],
        ["Réparation du système de refroidissement (pompe, thermostat)", "70", ""],
        ["Remplacement des supports moteur (silentblocs)", "70", ""],
        ["Remplacement de l'huile moteur et du filtre à huile", "30", ""],
        ["Remplacement du filtre à air et du filtre à carburant", "30", ""],
        ["Vérification des fuites d'huile/liquide de refroidissement", "70", ""],
        ["Diagnostic et réparation du système turbo", "70", ""],
        ["Nettoyage du collecteur d'admission", "70", ""],
        ["Nettoyage des injecteurs", "70", ""],
        ["Adaptation et réinitialisation des erreurs ECU", "70", ""],
    ],
    "Réparation du châssis": [
        ["Diagnostic complet de la suspension", "50", ""],
        ["Vérification des jeux dans les articulations", "50", ""],
        ["Contrôle de l'état des amortisseurs", "50", ""],
        ["Vérification de l'usure des silentblocs et bagues", "50", ""],
        ["Diagnostic des roulements de roue", "50", ""],
        ["Vérification de l'état des ressorts", "50", ""],
        ["Contrôle de la direction et des barres", "50", ""],
        ["Vérification du système de freinage", "50", ""],
        ["Remplacement des amortisseurs", "70", ""],
        ["Remplacement des barres stabilisatrices", "70", ""],
        ["Remplacement des bras de suspension", "70", ""],
        ["Remplacement des silentblocs", "70", ""],
        ["Remplacement des rotules", "70", ""],
        ["Remplacement des ressorts", "70", ""],
        ["Remplacement des sous-châssis", "70", ""],
        ["Remplacement des barres et rotules de direction", "70", ""],
        ["Remplacement de la crémaillère de direction", "70", ""],
        ["Réparation/remplacement de la pompe de direction assistée", "70", ""],
        ["Remplacement des soufflets de direction", "70", ""],
        ["Réparation/remplacement de la direction électrique (EPS)", "70", ""],
        ["Remplacement des cardans (intérieurs et extérieurs)", "70", ""],
        ["Remplacement des soufflets de cardan", "70", ""],
        ["Remplacement des arbres et croisillons de transmission", "70", ""],
        ["Remplacement des roulements de roue", "70", ""],
        ["Remplacement du moyeu complet", "70", ""],
        ["Remplacement des plaquettes de frein (avant/arrière)", "70", ""],
        ["Remplacement des disques et tambours de frein", "70", ""],
        ["Remplacement des flexibles de frein", "70", ""],
        ["Remplacement ou réparation des étriers", "70", ""],
        ["Purge du système de freinage", "70", ""],
        ["Remplacement du liquide de frein", "70", ""],
        ["Vérification et remplacement des capteurs ABS/ESP", "70", ""]
    ],
    "Vidange d'huile": [
        ["Vidange de la boîte manuelle", "30", ""],
        ["Contrôle et remplissage de l'huile de transmission", "30", ""],
        ["Vidange partielle de la boîte automatique", "70", ""],
        ["Vidange complète avec remplacement du filtre", "70", ""],
        ["Vidange avec démontage du carter et nettoyage des aimants", "70", ""],
        ["Nettoyage du système hydraulique (si nécessaire)", "70", ""],
        ["Réinitialisation des adaptations de la boîte automatique", "70", ""],
        ["Vidange de la boîte de transfert", "30", ""],
        ["Vidange du pont avant/arrière", "30", ""],
        ["Contrôle du niveau d'huile du pont", "30", ""],
        ["Diagnostic des fuites", "30", ""],
        ["Révision", "100", ""],
    ],
    "Réparation des freins": [
        ["Contrôle des plaquettes et disques de frein", "70", ""],
        ["Vérification des étriers de frein", "70", ""],
        ["Diagnostic des flexibles et conduites de frein", "70", ""],
        ["Contrôle du servofrein", "70", ""],
        ["Remplacement des plaquettes de frein", "70", ""],
        ["Remplacement des disques de frein", "70", ""],
        ["Remplacement des tambours de frein", "70", ""],
        ["Remplacement des cylindres de roue", "70", ""],
        ["Remplacement des flexibles de frein", "70", ""],
        ["Remplacement des tuyaux métalliques", "70", ""],
        ["Réparation/remplacement des étriers (glissières, pistons, joints)", "70", ""],
        ["Purge du système de freinage", "70", ""],
        ["Remplacement du liquide de frein", "70", ""],
        ["Lubrification des glissières d'étrier", "70", ""],
        ["Nettoyage des mécanismes de frein", "70", ""],
        ["Élimination des bruits et vibrations", "70", ""],
        ["Réglage du frein à main", "70", ""],
        ["Remplacement des câbles de frein à main", "70", ""],
        ["Remplacement des mécanismes de frein à main", "70", ""],
        ["Réparation/remplacement du frein à main électrique (EPB)", "70", ""],
        ["Contrôle d'étanchéité du système", "70", ""],
        ["Réparation des fuites de liquide de frein", "70", ""]
    ],
    "Diagnostic auto": [
        ["Scan et lecture des erreurs", "30", ""],
        ["Interprétation des codes défauts (DTC)", "30", ""],
        ["Effacement des erreurs après réparation", "30", ""],
        ["Vérification des paramètres en temps réel", "30", ""],
        ["Diagnostic complet via OBD-II : moteur, boîte, ABS, ESP, airbag, etc.", "30", ""],
        ["Réinitialisation des adaptations", "50", ""],
        ["Adaptation du papillon des gaz", "50", ""],
        ["Adaptation de la boîte de vitesses", "50", ""],
        ["Réinitialisation des intervalles d'entretien", "50", ""]
    ],
}

def extract_number(val):
    if not val:
        return None
    m = re.search(r'\d+([.,]\d+)?', val)
    if m:
        return float(m.group().replace(',', '.'))
    return None

added = 0
for service_name, price_list in data.items():
    service, _ = Service.objects.get_or_create(name=service_name)
    for row in price_list:
        option = row[0].strip()
        price_from = extract_number(row[1])
        price_to = extract_number(row[2])
        if not option:
            continue
        price_obj, created = Price.objects.get_or_create(
            service=service,
            option=option,
            price_from=price_from,
            price_to=price_to
        )
        if created:
            print(f"Добавлен: {service_name} — {option} ({price_from} - {price_to})")
            added += 1

print(f"Готово! Всего добавлено: {added} позиций.")
