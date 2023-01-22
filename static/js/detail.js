(() => {
    const $event = document.getElementById("event");
    let params = new URLSearchParams(document.location.search);
    let day = params.get('day');
    let slug = params.get('slug'); 
    console.log(slug);
  
    const fetchEvents = async () => {
      let response = await fetch(
        "https://www.pgm.gent/data/gentsefeesten/events_500.json"
      );
      return await response.json();
    };
  
    const fetchData = async () => {
      try {
        const events = await fetchEvents();
        const active = events.filter(event => event.day === day & event.slug === slug);
        console.log(active)
        renderEvent(active);
      } catch (error) {
        document.getElementById("list").innerHTML = error.message;
      }
    };
  
    fetchData();

    checkContent = (event) => {
      if (event =! null) {
        return event;
      } return "";
    };

    // render one event
    const renderEvent = (event) => {
      const html = event.map((event) => {
        return `
        <div class="event_main">
        <h1 class="event_title">${event.title}</h1>
        <div class="red_field">${event.location}</div>
        <div class="event_time">${event.start} - ${event.end}</div>
      </div>
      <p class="event_desc">${event.description}</p>
      <ul class="event_info">
        <li><span>Organisator:</span>${event.organizer}</li>
        <li><span>Website:</span><a href="${event.url}"></a>${event.url}</li>
        <li><span>Categorieën:</span><ul>${event.category.map((element) => {return `<li>${element}</li>`})}</ul></li>
        <li><span>Prijs:</span>${event.ticket}</li>
        <li><span>Leeftijd:</span>${event.organisator}</li>
      </ul>
      `;
      }).join("");

      $event.innerHTML = html;
    }; 
  })();