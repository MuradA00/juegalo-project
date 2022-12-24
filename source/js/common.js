const main = document.querySelector('main'),
      header = document.querySelector('.header'),
      controlPanel = document.querySelector('.control'),
      toggles = document.querySelectorAll('.control__toggle'),
      graphDisplay = document.querySelector('.graph'),
      burger = document.querySelector('.header__burger'),
      menu = document.querySelector('.menu'),
      closeMenuIcon = document.querySelector('.menu__close'),
      body = document.body;

function setSpacing() {
  const headersHeight = header.clientHeight;
  main.style.marginTop = `${headersHeight}px`;
}

function closeMenu() {
  menu.classList.remove('show-menu');
  body.style.overflow = '';
  burger.classList.remove('active-burger')
}

function showMenu() {
  burger.classList.toggle('active-burger');
  body.style.overflow = 'hidden';
  burger.classList.contains('active-burger') ? menu.classList.add('show-menu') : menu.classList.remove('show-menu')
}

function changeToggle() {
  toggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      toggles.forEach(elem => elem.classList.remove('selected-toggle'))
      this.classList.add('selected-toggle')
      const autoToggle = document.querySelector('.auto-toggle');
      if (autoToggle.classList.contains('selected-toggle')) {
        controlPanel.classList.add('manual-toggle-selected')
        graphDisplay.classList.add('graph-active')
      } else {
        controlPanel.classList.remove('manual-toggle-selected')
        graphDisplay.classList.remove('graph-active')
      }
    })
  })
}

changeToggle();

document.addEventListener('DOMContentLoaded', setSpacing);
burger.addEventListener('click', showMenu);
closeMenuIcon.addEventListener('click', closeMenu);
