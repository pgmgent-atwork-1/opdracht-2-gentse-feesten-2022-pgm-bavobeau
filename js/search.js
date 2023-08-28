// set search input equal to params
let params = new URLSearchParams(document.location.search);
let search = params.get('search');
document.getElementById("search-input").value = search;

// change grid style
const grid = document.getElementById("list");
const grid_button = document.getElementById("grid-button");
const list_button = document.getElementById("list-button");

function toggleGrid() {
  grid.classList.add("grid--list");
  grid.classList.remove("grid--list");
  grid_button.classList.add("button--on");
  list_button.classList.remove("button--on");
}

function toggleList() {
  grid.classList.remove("grid--list");
  grid.classList.add("grid--list");
  list_button.classList.add("button--on");
  grid_button.classList.remove("button--on");
}

grid_button.addEventListener("click", toggleGrid);
list_button.addEventListener("click", toggleList);


const $list = document.getElementById("list");

//fetching data for events
const fetchDataEvents = async () => {
	const events = await fetch(
    "https://www.pgm.gent/data/gentsefeesten/events.json"
	);

	if (events.status === 200) {
		const data = await events.json();
		renderEvents(data);
	} else {
		throw new Error("er is iets misgegaan bij het ophalen van de data");
	}
};
  
// // search for events with correct params
// const renderEvents = (events) => {
//   for (let index = 0; index < events.length; index++) {
//     if (events.includes(search)) {
//       const filteredEvents = events[index];
//       const html = filteredEvents.map((event_element) => {
//         return`
//         <li class="event">
//         <a href="#" class="event__link">
//         <div class="event__image">
//         <img src="${event_element.image ? event_element.image.full : "../img/bg-twitterfeed.jpg"}">
//         <div class="black__field">${event_element.day_of_week.slice(0,2)} ${event_element.day} juli</div>
//         </div>
//         <div class="event__info">
//         <h3 class="event__title">${event_element.title}</h3>
//         <div class="red__field">${event_element.location}</div>
//         <p>${event_element.start} u.</p>
//         </div>
//         </a>
//         </li>`
//       }).join("");
      
//       $list.innerHTML = html;
//     } 
// }
// };

fetchDataEvents();
