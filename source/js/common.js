const main = document.querySelector('main'),
      header = document.querySelector('.header'),
      controlPanel = document.querySelector('.control'),
      toggles = document.querySelectorAll('.control__toggle');

function setSpacing() {
  const headersHeight = header.clientHeight;
  main.style.marginTop = `${headersHeight}px`;
}

function changeToggle() {
  toggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      toggles.forEach(elem => elem.classList.remove('selected-toggle'))
      this.classList.add('selected-toggle')
      const autoToggle = document.querySelector('.auto-toggle');
      autoToggle.classList.contains('selected-toggle') ? controlPanel.classList.add('manual-toggle-selected') : controlPanel.classList.remove('manual-toggle-selected');
    })
  })
}

changeToggle();

document.addEventListener('DOMContentLoaded', setSpacing);
