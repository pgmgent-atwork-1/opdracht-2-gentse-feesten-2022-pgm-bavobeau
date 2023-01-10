const menu = document.querySelector(".hamburger_nav");
const hamburger= document.querySelector(".hamburger");

function toggleMenu() {
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
    hamburger.classList.remove("cross");
  } else {
    menu.classList.add("showMenu");
    hamburger.classList.add("cross");
  }
}

hamburger.addEventListener("click", toggleMenu);