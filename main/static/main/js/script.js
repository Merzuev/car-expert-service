document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('priceModal');
  if (!modal) {
    console.error('Modal element not found');
    return;
  }

  const modalContent = modal.querySelector('.modal-content');
  const closeModal = modal.querySelector('.close');
  if (!modalContent || !closeModal) {
    console.error('Modal content or close button not found');
    return;
  }

  // Добавляем обработчики для всех карточек услуг
  const serviceCards = document.querySelectorAll('.service-card');
  if (serviceCards.length === 0) {
    console.error('No service cards found');
    return;
  }

  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      const serviceName = card.getAttribute('data-service');
      
      if (!serviceName) {
        console.error('Missing data-service attribute on service card');
        return;
      }

      const titleElement = modalContent.querySelector('h3');
      const contentElement = modalContent.querySelector('.table-container');
      
      if (!titleElement || !contentElement) {
        console.error('Modal content elements not found');
        return;
      }

      titleElement.textContent = `Прайс: ${serviceName}`;
      
      // Для "Vente de voitures" показываем простое сообщение
      if (serviceName === "Vente de voitures") {
        contentElement.innerHTML = '<p>Contactez-nous pour les prix des voitures disponibles</p>';
        modal.classList.add('visible');
        return;
      }

      // Получаем данные для выбранной услуги
      const serviceData = priceData[serviceName];
      if (!serviceData) {
        contentElement.innerHTML = '<p>Информация о ценах временно недоступна</p>';
        modal.classList.add('visible');
        return;
      }

      // Создаем HTML для таблицы
      let tableHTML = `
        <table class="price-table">
          <thead>
            <tr>
              <th>${serviceData.sheetName}</th>
              <th>Prix à partir de</th>
              <th>Prix jusqu'à</th>
            </tr>
          </thead>
          <tbody>
      `;

      // Добавляем строки данных
      serviceData.data.forEach(row => {
        tableHTML += `
          <tr>
            <td>${row[0] || ''}</td>
            <td>${row[1] || ''}</td>
            <td>${row[2] || ''}</td>
          </tr>
        `;
      });

      tableHTML += `
          </tbody>
        </table>
      `;

      // Вставляем таблицу в контейнер
      contentElement.innerHTML = tableHTML;
      modal.classList.add('visible');
    });
  });

  // Закрытие модального окна по клику на крестик
  closeModal.addEventListener('click', () => {
    modal.classList.remove('visible');
  });

  // Закрытие модального окна по клику вне его области
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('visible');
    }
  });

  // Закрытие модального окна по нажатию Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('visible')) {
      modal.classList.remove('visible');
    }
  });
});

serviceCards.forEach(card => {
  card.addEventListener('click', () => {
    const serviceName = card.dataset.service;
    const serviceData = priceData[serviceName];

    if (!serviceData || !serviceData.data) {
      console.error('Данные не найдены для услуги:', serviceName);
      return;
    }

    const tableContainer = modal.querySelector('.table-container');
    tableContainer.innerHTML = ''; // Очистить предыдущее содержимое

    const table = document.createElement('table');
    table.classList.add('price-table');

    serviceData.data.forEach(row => {
      const tr = document.createElement('tr');
      row.forEach(cell => {
        const td = document.createElement('td');
        td.textContent = cell;
        tr.appendChild(td);
      });
      table.appendChild(tr);
    });

    tableContainer.appendChild(table);

    const modalTitle = modal.querySelector('.modal-title');
    modalTitle.textContent = serviceName;

    modal.style.display = 'block';
  });
});

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});