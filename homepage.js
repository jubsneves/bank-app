'use strict';

const btnMenuToggle = document.querySelector('.menu-toggle');
const iconMenu = btnMenuToggle.querySelector('img');
const linkNav = document.querySelector('.nav__links');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnShowModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const navLinks = document.querySelectorAll('.nav__link');


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

btnScrollTo.addEventListener('click', () => {
    section1.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.nav__links').addEventListener('click', (el) => {
    el.preventDefault();
    if (el.target.classList.contains('nav__link')) {
        const id = el.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({behaviour: 'smooth'});
    }
});

// Tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tabs');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', (e) => {
    const clicked = e.target.closest('.operations__tab');
    if (clicked) {
        tabs.forEach(t => t.classList.remove('operations__tab--active'));
        tabsContent.forEach(c => c.classList.remove('operations__content--active'));
        clicked.classList.add('operations__tab--active');

       document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
    }
});