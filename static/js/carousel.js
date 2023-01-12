const events = document.querySelector(".events");

//fetching data for events
const fetchDataEvents = async () => {
	const events = await fetch(
		"https://www.pgm.gent/data/gentsefeesten/events_500.json"
        //"https://www.pgm.gent/data/gentsefeesten/events.json"
	);

	if (events.status === 200) {
		const data = await events.json();
		console.log(data);
		renderEvents(data);
	} else {
		throw new Error("er is iets misgegaan bij het ophalen van de data");
	}
};

const renderEvents = (event) => {
	let i = Math.floor(Math.random() * event.length + 1);
	let j = i + 8;
	event.slice(i,j).map((event_element) => {
		let createEvent = document.createElement("li");
		createEvent.className = `event`;
		createEvent.innerHTML = `
			<a href="#" class="event_link">
				<div class="event_image">
					<img src="${event_element.image.full}" class="event_image">
					<div class="black_field">${event_element.day} juli</div>
				</div>
				<div class="event_info">
					<h3 class="event_title">${event_element.title}</h3>
					<div class="red_field">${event_element.location}</div>
					<p>${event_element.start}</p>
				</div>
			</a>`
		events.appendChild(createEvent);
	})
	
};

fetchDataEvents();