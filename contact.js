const vacancy = document.getElementById("vacancy");
const dropbox = document.getElementById("vacancy-box");
const list = document.getElementsByName("vacancy-item");
const inputIcon = document.querySelector(".input-icon");

function clickCombo() {
  dropbox.click();
  if (inputIcon.classList.contains("rotate")) {
    inputIcon.classList.remove("rotate");
  } else {
    inputIcon.classList.add("rotate");
  }
}

vacancy.addEventListener("click", clickCombo);
inputIcon.addEventListener("click", clickCombo);

vacancy.addEventListener("onkeypress", (e) => {
  e.preventDefault();
});

for (let i = 0; i < list.length; i++) {
  list[i].addEventListener("click", (e) => {
    vacancy.value = e.target.title;
    clickCombo();
  });
}
