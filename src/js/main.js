let btnMobile = document.querySelector('.header__btn');
let navList = document.querySelector('.header__list');

btnMobile.addEventListener('click', toggleMenu);

function toggleMenu() {
  navList.classList.toggle('visually-hidden');
  btnMobile.classList.toggle('header__btn--vert');
}