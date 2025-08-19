let btnMobile = document.querySelector('.header__btn');
let navList = document.querySelector('.header__list');
let headerLink = document.querySelectorAll('.header__link');

btnMobile.addEventListener('click', toggleMenu);

headerLink.forEach(link => {
  link.addEventListener('click', toggleMenu);
});

function toggleMenu() {
  navList.classList.toggle('visually-hidden');
  btnMobile.classList.toggle('header__btn--vert');
}