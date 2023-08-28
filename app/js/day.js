(() => {
    const $list = document.getElementById("list");
    const $categories = document.getElementById("categories");
    const title = document.getElementById("title");
    let params = new URLSearchParams(location.search);
    let day = params.get('day');
    if (day <= '14' | day >= '25') {
      day = '15'
    };
    let activeDay = document.getElementById(`day${day}`);

    const setActiveDay = async () => {
      activeDay.classList.add("day__items--active")
    };

    setActiveDay();
  
    const fetchCategories = async () => {
      let response = await fetch(
        "https://www.pgm.gent/data/gentsefeesten/categories.json"
      );
      return await response.json();
    };
  
    const fetchEvents = async () => {
      let response = await fetch(
        "https://www.pgm.gent/data/gentsefeesten/events.json"
      );
      return await response.json();
    };
  
    const fetchData = async () => {
      try {
        const categories = await fetchCategories();
        const events = await fetchEvents();
        renderEvents(categories, events);
        renderCategories(categories);
      } catch (error) {
        document.getElementById("categories").innerHTML = error.message;
      }
    };
  
    fetchData();
    
    const checkImage = (image) => {
      if (image != null) {
        return image.full;
      } else {
        return "../img/bg-twitterfeed.jpg";
      }
    };

    checkTicket = (ticket) => {
      if (ticket === "paid") {
        return `euro--paid`
      } return `euro--free`;
    };

    const renderCategories = (categories) => {
      const html = categories
      .map((category) => {
        return `
        <li>
          <a class="category__item" href="#${category}">
            <p class="text--w-medium" id="category">${category}</p>
          </a>
        </li>`;
      }).join("");

      $categories.innerHTML = html;
    };

    // filter events on day and per category and renders them
    const renderEvents = (categories, events) => {
      const html = categories
        .map((category) => {
          const filteredEvents = events.filter((event) => {
            return event.day === day && event.category.includes(category);
          });
          
          return `
            <div> 
              <a class="list__title" href="#filter"><h2 class="text--c-white" id="${category}">${category}</h2><img src="../img/gentse-feesten-icoontjes/arrow-up.svg"></a>
            </div>
            <ul class="events">${filteredEvents.map((event) => {
                  title.innerHTML = `${event.day_of_week} ${day} juli`;
                  return `
                      <li class="event">
                        <a class="event__link" href="detail.html?day=${event.day}&slug=${event.slug}" class="event_link">
                          <div class="event__image">
                            <img src="${checkImage(event.image)}" class="event_image">
                          </div>
                          <div class="event__info">
                            <h3 class="event__title">${event.title}</h3>
                            <div class="red__field">${event.location}</div>
                            <p>${event.start} u.</p>
                            <div class="euro ${checkTicket(event.ticket)}">
                              <img src="../img/gentse-feesten-icoontjes/euro.svg">
                            </div>
                          </div>
                        </a>
                      </li>`;
                }).join("")}
            </ul>`;
        }).join("");

      $list.innerHTML = html;
    };
  })();

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