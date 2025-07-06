document.addEventListener('DOMContentLoaded', () => {
  /* ===== ПРАЙС-МОДАЛЬ ===== */
  const priceModal = document.getElementById('priceModal');
  if (priceModal) {
    const closeModal = priceModal.querySelector('.close');
    const priceTables = priceModal.querySelectorAll('.price-table-container');
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-service');
        priceTables.forEach(pt => pt.style.display = 'none');
        const tbl = priceModal.querySelector(`#service-table-${id}`);
        if (tbl) {
          tbl.style.display = 'block';
          priceModal.classList.add('visible');
        }
      });
    });

    const closePriceModal = () => {
      priceModal.classList.remove('visible');
      priceTables.forEach(pt => pt.style.display = 'none');
    };

    closeModal.addEventListener('click', closePriceModal);
    priceModal.addEventListener('click', e => { if (e.target === priceModal) closePriceModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && priceModal.classList.contains('visible')) closePriceModal(); });
  }

  /* ===== КАРУСЕЛЬ АВТО (2 карточки + слайдер фото + лайтбокс) ===== */
  const container = document.querySelector('.cars-carousel');
  if (container) {
    const carsWrapper = container.querySelector('.cars-wrapper');
    const carCards = container.querySelectorAll('.car-card');
    let currentCarIndex = 0;

    // Получаем ширину карточки с учётом gap между ними
    function getCardWidth() {
      if (carCards.length === 0) return 0;
      const style = getComputedStyle(carCards[0]);
      const width = carCards[0].offsetWidth;
      const gap = parseInt(style.marginRight) || 0; // Если есть margin-right
      return width + gap;
    }

    // Показывать 2 машины одновременно, двигаем wrapper
    function showCars(index) {
      const cardWidth = getCardWidth();
      const maxIndex = carCards.length - 2; // максимум сдвига для 2 карточек

      if (index < 0) index = 0;
      if (index > maxIndex) index = maxIndex;

      currentCarIndex = index;
      const shift = cardWidth * index;
      carsWrapper.style.transform = `translateX(-${shift}px)`;
    }

    // --- Слайдер фото внутри карточки ---
    carCards.forEach(card => {
      const images = card.querySelectorAll('.car-slide');
      const dotsContainer = card.querySelector('.dots-container');
      let currentImgIndex = 0;

      function showImage(idx) {
        images.forEach((img, i) => {
          img.classList.toggle('active', i === idx);
          dotsContainer.children[i].classList.toggle('active', i === idx);
        });
      }

      // Создаём точки-индикаторы
      images.forEach(() => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dotsContainer.appendChild(dot);
      });

      // Навигация по точкам
      Array.from(dotsContainer.children).forEach((dot, i) => {
        dot.addEventListener('click', () => {
          currentImgIndex = i;
          showImage(currentImgIndex);
        });
      });

      // Клик по фото открывает лайтбокс
      images.forEach((img, i) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => openLightbox(images, i));
      });

      showImage(0);
    });

    // --- Кнопки перелистывания авто ---
    container.querySelector('.carousel-prev').addEventListener('click', () => {
      showCars(currentCarIndex - 1);
    });

    container.querySelector('.carousel-next').addEventListener('click', () => {
      showCars(currentCarIndex + 1);
    });

    showCars(currentCarIndex);

    // --- ЛАЙТБОКС ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');

    let currentLightboxImages = [];
    let currentLightboxIndex = 0;

    function openLightbox(images, startIdx) {
      currentLightboxImages = Array.from(images).map(img => img.src);
      currentLightboxIndex = startIdx;
      updateLightboxImage();
      lightbox.style.display = 'flex';
    }

    function updateLightboxImage() {
      lightboxImg.src = currentLightboxImages[currentLightboxIndex];
    }

    function closeLightbox() {
      lightbox.style.display = 'none';
      currentLightboxImages = [];
      currentLightboxIndex = 0;
    }

    lightboxClose.addEventListener('click', closeLightbox);

    lightboxPrev.addEventListener('click', () => {
      currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxImages.length) % currentLightboxImages.length;
      updateLightboxImage();
    });

    lightboxNext.addEventListener('click', () => {
      currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxImages.length;
      updateLightboxImage();
    });

    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && lightbox.style.display === 'flex') {
        closeLightbox();
      }
      if (e.key === 'ArrowLeft' && lightbox.style.display === 'flex') {
        currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxImages.length) % currentLightboxImages.length;
        updateLightboxImage();
      }
      if (e.key === 'ArrowRight' && lightbox.style.display === 'flex') {
        currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxImages.length;
        updateLightboxImage();
      }
    });
  }
});
