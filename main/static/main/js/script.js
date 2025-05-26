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
      const title = card.getAttribute('data-service');
      const prices = card.getAttribute('data-prices');
      
      if (!title || !prices) {
        console.error('Missing data attributes on service card');
        return;
      }

      const titleElement = modalContent.querySelector('h3');
      const listElement = modalContent.querySelector('ul');
      
      if (!titleElement || !listElement) {
        console.error('Modal content elements not found');
        return;
      }

      titleElement.textContent = `Прайс: ${title}`;
      const priceList = prices.split(';').map(item => `<li>${item}</li>`).join('');
      listElement.innerHTML = priceList;
      
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