document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');
  const closeButton = document.querySelector('.modal-close');
  const serviceCards = document.querySelectorAll('.service-card');

  // Объект с прайсами для каждой услуги
  const priceList = {
    diagnostics: `
      <h2>Прайс на диагностику</h2>
      <ul>
        <li>Компьютерная диагностика — 1500₽</li>
        <li>Диагностика подвески — 1000₽</li>
      </ul>
    `,
    repair: `
      <h2>Прайс на ремонт</h2>
      <ul>
        <li>Замена тормозных колодок — 2000₽</li>
        <li>Ремонт двигателя — от 10000₽</li>
      </ul>
    `,
    maintenance: `
      <h2>Прайс на ТО</h2>
      <ul>
        <li>Замена масла — 1200₽</li>
        <li>Замена фильтров — 800₽</li>
      </ul>
    `
  };

  function openModal(serviceTitle, contentHtml) {
  document.getElementById('modalTitle').textContent = serviceTitle;
  document.getElementById('modal-body').innerHTML = contentHtml;
  document.getElementById('modal').classList.remove('hidden');
  }
  // Функция закрытия модального окна
  function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
  }

  // Назначение обработчиков клика на карточки услуг
  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      const service = card.getAttribute('data-service');
      const content = priceList[service] || '<p>Прайс отсутствует</p>';
      openModal(card.querySelector('p').textContent, content);
    });
  });

  // Обработчик клика на кнопку закрытия
  closeButton.addEventListener('click', () => closeModal('modal'));

  // Закрытие модального окна при клике вне его содержимого
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal('modal');
    }
  });
});
