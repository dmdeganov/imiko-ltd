const vacancy = document.getElementById('vacancy');
const dropbox = document.getElementById('vacancy-box');
const list = document.getElementsByName('vacancy-item');
const inputIcon = document.querySelector('.input-icon');

function clickCombo() {
  dropbox.click();
  if (inputIcon.classList.contains('rotate')) {
    inputIcon.classList.remove('rotate');
    vacancy.dataset.selecting = true;
  } else {
    inputIcon.classList.add('rotate');
    vacancy.dataset.selecting = false;
  }
}

vacancy.addEventListener('click', e => {
  e.stopPropagation();
  clickCombo();
});
inputIcon.addEventListener('click', e => {
  e.stopPropagation();
  clickCombo();
});

window.addEventListener('click', e => {
  e.stopPropagation();
  const isDropBoxOpened = !inputIcon.classList.contains('rotate');
  const elemClicked = e.target;
  const isClickedOutside = !elemClicked.closest('#vacancy-list');
  if (e.target === dropbox && isDropBoxOpened) return;

  if (isClickedOutside && isDropBoxOpened) {
    clickCombo();
  }
});

vacancy.addEventListener('onkeypress', e => {
  e.preventDefault();
});
vacancy.addEventListener('input', e => {
  e.preventDefault();
  vacancy.value = '';
});

for (let i = 0; i < list.length; i++) {
  list[i].addEventListener('click', e => {
    e.stopPropagation();
    vacancy.value = e.target.title;
    clickCombo();
  });
}
