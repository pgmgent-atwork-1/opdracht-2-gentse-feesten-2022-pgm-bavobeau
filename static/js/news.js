const news = document.querySelector(".news_list");

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
    const html = data.map((news_element) => {
        return `
        <li class="news_article">
            <a href="news.html" class="news_link">
                <div class="news_title">
                    <h3>${news_element.title}</h3>
                    <div class="arrow"></div>
                </div>
                <img src="https://www.pgm.gent/data/gentsefeesten/${news_element.picture.large}" class="news_image">
            </a>
        </li>`
    }).join("");

    news.innerHTML = html;
};

fetchDataNews();