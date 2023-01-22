const menu = document.querySelector(".hamburger_nav");
const hamburger = document.querySelector(".hamburger");
const close = document.querySelector(".close_hamburger");

function toggleMenu() {
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
  } else {
    menu.classList.add("showMenu");
  }
}

hamburger.addEventListener("click", toggleMenu);
close.addEventListener("click", toggleMenu);