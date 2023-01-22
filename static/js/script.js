const menu = document.querySelector(".hamburger_nav");
const hamburger = document.querySelector(".hamburger");
const close = document.querySelector(".close_hamburger");
const grid = document.getElementById("list");
const grid_button = document.querySelector(".grid");
const list_button = document.querySelector(".list");

function toggleMenu() {
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
  } else {
    menu.classList.add("showMenu");
  }
}

function toggleGrid() {
  grid.classList.remove("off");
  grid.classList.add("on");
  grid_button.classList.add("on");
  list_button.classList.remove("on");
}

function toggleList() {
  grid.classList.add("off");
  grid.classList.remove("on");
  list_button.classList.add("on");
  grid_button.classList.remove("on");
}

hamburger.addEventListener("click", toggleMenu);
close.addEventListener("click", toggleMenu);
grid_button.addEventListener("click", toggleGrid);
list_button.addEventListener("click", toggleList);