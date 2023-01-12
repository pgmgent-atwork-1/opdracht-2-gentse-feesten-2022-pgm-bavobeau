const events = document.querySelector(".carousel");

//fetching data for events
const fetchDataEvents = async () => {
	const events = await fetch(
		"https://www.pgm.gent/data/gentsefeesten/events_500.json"
        //"https://www.pgm.gent/data/gentsefeesten/events.json"
	);

	if (events.status === 200) {
		const data = await events.json();
		renderEvents(data);
	} else {
		throw new Error("er is iets misgegaan bij het ophalen van de data");
	}
};

const renderEvents = (events) => {
	events.innerHTML = `<h2>${events.current}</h2>`;
};

fetchDataEvents();