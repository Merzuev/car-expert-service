document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modal-body');
<<<<<<< HEAD
  const closeButton = document.querySelector('.modal-close');
=======
  const closeModalBtn = document.getElementById('closeModal');
>>>>>>> cc69404 (Fix structure and Procfile for Render deployment)
  const serviceCards = document.querySelectorAll('.service-card');

  const priceList = {
    diagnostics: `
      <ul>
        <li>Компьютерная диагностика — 1500₽</li>
        <li>Диагностика подвески — 1000₽</li>
      </ul>
    `,
    repair: `
      <ul>
        <li>Замена тормозных колодок — 2000₽</li>
        <li>Ремонт двигателя — от 10000₽</li>
      </ul>
    `,
    maintenance: `
      <ul>
        <li>Замена масла — 1200₽</li>
        <li>Замена фильтров — 800₽</li>
      </ul>
    `
  };

  function openModal(serviceKey, title = "Titre du service") {
    modalTitle.textContent = title;
    modalBody.innerHTML = priceList[serviceKey] || '<p>Прайс отсутствует</p>';
    modal.style.display = 'block';
  }

  function closeModal() {
    modal.style.display = 'none';
  }

  // Назначение обработчиков клика
  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      const service = card.getAttribute('data-service');
<<<<<<< HEAD
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
=======
      const title = card.querySelector('p')?.textContent || "Service";
      openModal(service, title);
    });
  });

  closeModalBtn.addEventListener('click', closeModal);

  // Закрытие при клике вне модального окна
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
>>>>>>> cc69404 (Fix structure and Procfile for Render deployment)
    }
  });
});
