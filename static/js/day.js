(() => {
    const $list = document.getElementById("list");
    const $categories = document.getElementById("categories");
    const day = "15";
  
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
        console.log(categories, events);
        renderEvents(categories, events);
        renderCategories(categories);
      } catch (error) {
        document.getElementById("categories").innerHTML = error.message;
      }
    };
  
    fetchData();
    
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

    const renderEvents = (categories, events) => {
      const html = categories
        .map((category) => {
          const filteredEvents = events.filter((event) => {
            return event.day === day && event.category.includes(category);
          });
  
          return `
            <h2 id="${category}">${category}</h2>
            <ul>${filteredEvents.map((event) => {
                  return `
                    <li>${event.title}</li>`;
                }).join("")}
            </ul>`;
        }).join("");

      $list.innerHTML = html;
    };
  })();