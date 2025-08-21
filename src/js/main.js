let btnMobile = document.querySelector('.header__btn');
let navList = document.querySelector('.header__list');
let headerLink = document.querySelectorAll('.header__link');

btnMobile.addEventListener('click', toggleMenu);

headerLink.forEach(link => {
  link.addEventListener('click', toggleMenu);
});

function toggleMenu() {
  navList.classList.toggle('header__list--visually-hidden');
  btnMobile.classList.toggle('header__btn--vert');
}

let prevButton = document.querySelector('.works__btn--prev');
let nextButton = document.querySelector('.works__btn--next');
let slides = Array.from(document.querySelectorAll('.works__item'));
let slideCount = slides.length;
let slideIndex = 0;

// Устанавливаем обработчики событий для кнопок
prevButton.addEventListener('click', showPreviousSlide);
nextButton.addEventListener('click', showNextSlide);

// Функция для показа предыдущего слайда
function showPreviousSlide() {
  slideIndex = (slideIndex - 1 + slideCount) % slideCount;
  updateSlider();
}

// Функция для показа следующего слайда
function showNextSlide() {
  slideIndex = (slideIndex + 1) % slideCount;
  updateSlider();
}

// Функция для обновления отображения слайдера
function updateSlider() {
  slides.forEach((slide, index) => {
    if (index === slideIndex) {
      slide.classList.remove('visually-hidden');
    } else {
      slide.classList.add('visually-hidden');
    }
  });
}

// Инициализация слайдера
updateSlider();
