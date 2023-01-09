const menu = document.querySelector(".hamburger_nav");
const hamburger= document.querySelector(".hamburger");
const closeBurger= document.querySelector(".close");

function toggleMenu() {
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
    closeBurger.style.display = "none";
    menuIcon.style.display = "block";
  } else {
    menu.classList.add("showMenu");
    closeBurger.style.display = "block";
    menuIcon.style.display = "none";
  }
}

closeBurger.addEventListener("click", toggleMenu);
hamburger.addEventListener("click", toggleMenu);