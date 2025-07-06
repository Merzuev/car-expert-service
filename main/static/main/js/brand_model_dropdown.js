(function($) {
    $(function() {
        // --- Словарь марка: [модель1, модель2...] ---
        // Django прокинет это в шаблон через window.BRAND_MODEL_MAP
        var brandModelMap = window.BRAND_MODEL_MAP_MAP || {};

        // Получаем элементы формы
        var $brand = $('#id_brand');
        var $model = $('#id_model');

        // Для редактирования: вставляем выпадающий список, если не существует
        if ($model.length && $model.prop('tagName') === 'INPUT') {
            var $select = $('<select id="id_model_select" class="vTextField"></select>');
            $model.hide().after($select);
        } else {
            var $select = $model;
        }

        // Обновить список моделей
        function updateModels() {
            var brand = $brand.val();
            var models = brandModelMap[brand] || [];
            $select.empty();
            $select.append($('<option>', {value: '', text: '---'}));
            models.forEach(function(model) {
                $select.append($('<option>', {value: model, text: model}));
            });
            // Сброс значения в текстовое поле
            $model.val('');
        }

        // При изменении марки
        $brand.on('change', function() {
            updateModels();
        });

        // При выборе модели из select — записываем в input
        $select.on('change', function() {
            $model.val($select.val());
        });

        // При загрузке формы: если марка уже выбрана — показать модели
        updateModels();
    });
})(django.jQuery);
