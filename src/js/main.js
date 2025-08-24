const btnMobile = document.querySelector('.header__btn');
const navList = document.querySelector('.header__list'); // твое меню
const headerLinks = document.querySelectorAll('.header__link');

btnMobile.addEventListener('click', () => {
  // Переключение класса active для анимации кнопки
  btnMobile.classList.toggle('active');

  // Переключение меню
  if (navList.classList.contains('open')) {
    navList.style.maxHeight = '0';
    navList.classList.remove('open');
  } else {
    navList.classList.add('open');
    navList.style.maxHeight = navList.scrollHeight + 'px';
  }
});

// Закрытие меню при клике на ссылку
headerLinks.forEach(link => link.addEventListener('click', () => {
  navList.style.maxHeight = '0';
  navList.classList.remove('open');
  btnMobile.classList.remove('active'); // убрать анимацию кнопки
}));


// слайдер............

document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.works__list');
  let slides = Array.from(document.querySelectorAll('.works__item'));
  const prevButton = document.querySelector('.works__btn--prev');
  const nextButton = document.querySelector('.works__btn--next');

  // === создаём клоны для бесконечности ===
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);

  track.appendChild(firstClone);
  track.insertBefore(lastClone, slides[0]);

  slides = Array.from(document.querySelectorAll('.works__item'));
  const slideCount = slides.length;

  let slideIndex = 1; // начинаем со второго (первый — клон)
  let isTransitioning = false;

  function getSlideWidth() {
    return slides[0].offsetWidth;
  }

  function setTranslate(index, withTransition = true) {
    const slideWidth = getSlideWidth();
    track.style.transition = withTransition ? 'transform 0.6s ease' : 'none';
    track.style.transform = `translateX(-${index * slideWidth}px)`;
  }

  // === Инициализация ===
  setTranslate(slideIndex, false);

  function moveToSlide(newIndex) {
    if (isTransitioning) return;
    isTransitioning = true;

    slideIndex = newIndex;
    setTranslate(slideIndex, true);

    track.addEventListener('transitionend', () => {
      if (slides[slideIndex].isSameNode(firstClone)) {
        slideIndex = 1;
        setTranslate(slideIndex, false);
      }
      if (slides[slideIndex].isSameNode(lastClone)) {
        slideIndex = slideCount - 2;
        setTranslate(slideIndex, false);
      }
      isTransitioning = false;
    }, { once: true });
  }

  // === Кнопки ===
  prevButton.addEventListener('click', () => {
    moveToSlide(slideIndex - 1);
  });

  nextButton.addEventListener('click', () => {
    moveToSlide(slideIndex + 1);
  });

  // === Пересчёт ширины при загрузке и ресайзе ===
  window.addEventListener('load', () => setTranslate(slideIndex, false));
  window.addEventListener('resize', () => setTranslate(slideIndex, false));

  // === Свайпы (тач-события) ===
  let startX = 0;
  let isDragging = false;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diffX = currentX - startX;

    track.style.transition = 'none';
    track.style.transform = `translateX(${ -slideIndex * getSlideWidth() + diffX }px)`;
  });

  track.addEventListener('touchend', (e) => {
    isDragging = false;
    const endX = e.changedTouches[0].clientX;
    const diffX = endX - startX;

    if (diffX > 50) {
      moveToSlide(slideIndex - 1); // свайп вправо
    } else if (diffX < -50) {
      moveToSlide(slideIndex + 1); // свайп влево
    } else {
      setTranslate(slideIndex, true); // вернуться на место
    }
  });
});
