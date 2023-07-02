const events = document.getElementById("events");
//const news = document.querySelector(".news_items");

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

const renderEvents = (event) => {
	let i = Math.floor(Math.random() * event.length + 1);
	let j = i + 8;
	const html = event.slice(i,j).map((event_element) => {
		return`
		<li class="event">
			<a href="#" class="event__link">
				<div class="event__image">
					<img src="${event_element.image ? event_element.image.full : "../img/bg-twitterfeed.jpg"}" class="event__image">
					<div class="black__field">${event_element.day_of_week.slice(0,2)} ${event_element.day} juli</div>
				</div>
				<div class="event__info">
					<h3 class="event__title">${event_element.title}</h3>
					<div class="red__field">${event_element.location}</div>
					<p>${event_element.start}</p>
				</div>
			</a>
		</li>`
	}).join("");

	events.innerHTML = html;
};

// // fetch data for news
// const fetchDataNews = async () => {
// 	const news = await fetch(
// 		"https://www.pgm.gent/data/gentsefeesten/news.json"
// 	);

// 	if (news.status === 200) {
// 		const data = await news.json();
// 		renderNews(data);
// 	} else {
// 		throw new Error("er is iets misgegaan bij het ophalen van de data");
// 	}
// };

// const renderNews = (data) => {
//     const html = data.slice(0, 3).map((news_element) => {
//         return`
// 		  <li class="news_article">
//         <a href="news.html" class="news_link">
//             <h3>${news_element.title}</h3>
//             <div class="arrow"></div>
//         </a>
// 		  </li>`
//     }).join("");

// 	news.innerHTML = html;
// };

fetchDataEvents();
// fetchDataNews();