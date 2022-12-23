const main = document.querySelector('main'),
      header = document.querySelector('.header');

function setSpacing() {
  const headersHeight = header.clientHeight;
  main.style.marginTop = `${headersHeight}px`;
}

document.addEventListener('DOMContentLoaded', setSpacing);
