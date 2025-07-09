'use strict';

const btnMenuToggle = document.querySelector('.menu-toggle');
const iconMenu = btnMenuToggle.querySelector('img');
const linkNav = document.querySelector('.nav__links');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnShowModal = document.querySelectorAll('.btn--show-modal');

btnMenuToggle.addEventListener('click', () => {
    linkNav.classList.toggle('show');
    iconMenu.style.opacity = 0;
    setTimeout(() => {
        if (linkNav.classList.contains('show')) {
            iconMenu.src = '/assets/close-icon.svg';
        } else {
            iconMenu.src = '/assets/menu-icon.svg';
        }
        iconMenu.style.opacity = 1;
    }, 100);
});

const openModal = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

btnShowModal.forEach(btn => {
    btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);