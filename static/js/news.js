const news = document.querySelector(".news_items");

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

fetchDataNews();