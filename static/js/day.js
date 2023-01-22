(() => {
    const $list = document.getElementById("list");
    const $categories = document.getElementById("categories");
    let params = new URLSearchParams(location.search);
    let day = params.get('day');
  
    const fetchCategories = async () => {
      let response = await fetch(
        "https://www.pgm.gent/data/gentsefeesten/categories.json"
      );
      return await response.json();
    };
  
    const fetchEvents = async () => {
      let response = await fetch(
        "https://www.pgm.gent/data/gentsefeesten/events_500.json"
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
        return "../static/img/bg-twitterfeed.jpg";
      }
    };

    checkTicket = (ticket) => {
      if (ticket === "paid") {
        return `paid`
      } return `free`;
    };

    const renderCategories = (categories) => {
      const html = categories
      .map((category) => {
        return `
        <li>
          <a href="#${category}">
            ${category}
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
            <div class="list_title"> 
              <h2 id="${category}">${category}</h2>
              <a href="#filter"><img src="../static/img/gentse-feesten-icoontjes/arrow-up.svg"></a>
            </div>
            <ul class="events">${filteredEvents.map((event) => {
                  return `
                      <li class="event">
                        <a href="#" class="event_link">
                          <div class="event_image">
                            <img src="${checkImage(event.image)}" class="event_image">
                          </div>
                          <div class="event_info">
                            <h3 class="event_title">${event.title}</h3>
                            <div class="red_field">${event.location}</div>
                            <p>${event.start}</p>
                            <img src="../static/img/gentse-feesten-icoontjes/euro.svg" class="euro ${checkTicket(event.ticket)}">
                          </div>
                        </a>
                      </li>`;
                }).join("")}
            </ul>`;
        }).join("");

      $list.innerHTML = html;
    };
  })();