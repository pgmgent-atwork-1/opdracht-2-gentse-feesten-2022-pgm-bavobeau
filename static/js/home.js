const events = document.querySelector(".events");
const event = document.querySelector(".event");
const news = document.querySelector(".news_items");

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
					<div class="black_field">${event_element.day_of_week.slice(0,2)} ${event_element.day} juli</div>
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

// fetch data for news
const fetchDataNews = async () => {
	const news = await fetch(
		"https://www.pgm.gent/data/gentsefeesten/news.json"
	);

	if (news.status === 200) {
		const data = await news.json();
		console.log(data);
		renderNews(data);
	} else {
		throw new Error("er is iets misgegaan bij het ophalen van de data");
	}
};

const renderNews = (data) => {
    data.slice(0, 3).map((news_element) => {
        let createNews = document.createElement("li");
        createNews.className = "news_article"
        createNews.innerHTML = `
        <a href="news.html" class="news_link">
            <h3>${news_element.title}</h3>
            <div class="arrow"></div>
        </a>`
        news.appendChild(createNews);
    })
};

fetchDataEvents();
fetchDataNews();