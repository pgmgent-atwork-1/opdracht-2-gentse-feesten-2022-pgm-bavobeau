(() => {
    const $event = document.getElementById("event");
    let params = new URLSearchParams(location.search);
    let day = params.get('day');
    let slug = params.get('slug'); 
  
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
        console.log(events);
        renderEvent(events);
        renderCategories(categories);
      } catch (error) {
        document.getElementById("list").innerHTML = error.message;
      }
    };
  
    fetchData();

    // render one event
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

      $event.innerHTML = html;
    };
  });