document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modal-body');
  const closeButton = document.querySelector('.modal-close');
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
    modal.classList.remove('hidden');
  }

  function closeModal() {
    modal.classList.add('hidden');
  }

  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      const serviceKey = card.getAttribute('data-service');
      const title = card.querySelector('p')?.textContent || 'Service';
      openModal(serviceKey, title);
    });
  });

  closeButton.addEventListener('click', closeModal);

  window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal-overlay')) {
      closeModal();
    }
  });
});
