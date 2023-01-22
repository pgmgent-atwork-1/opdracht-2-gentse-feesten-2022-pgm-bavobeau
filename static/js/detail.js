(() => {
    const $event = document.getElementById("event");
    const $date = document.getElementById("date");
    const $more = document.getElementById("events");
    const $location = document.getElementById("location");
    let params = new URLSearchParams(document.location.search);
    let day = params.get('day');
    let slug = params.get('slug');  
  
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
        renderEvent(active);
        renderMore(events, active);
        renderLocation(events, active);
      } catch (error) {
        document.getElementById("list").innerHTML = error.message;
      }
    };
  
    fetchData();

    checkContent = (event) => {
      if (event != null) {
        return event;
      }return ;
    };

    // render one event
    const renderEvent = (event) => {
      const html = event.map((event) => {
        $date.innerHTML += `${event.day_of_week} ${event.day} juli`;
        return `
      <div class="event_main">
        <h1 class="event_title">${event.title}</h1>
        <div class="red_field">${event.location}</div>
        <div class="event_time">${event.start} - ${event.end}</div>
      </div>
      <p class="event_desc">${event.description}</p>
      <img src="${checkContent(event.image.full)}">
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

    //render 4 more events of organisator 
    const renderMore = (events, active) => {
      const organizer = active[0].organizer;
      const html = events.filter(event => event.organizer === organizer)
      .slice(0,4).map(event => {
        return `
        <li class="event">
        <a href="detail.html?day=${event.day}&slug=${event.slug}" class="event_link">
          <div class="event_image">
            <img src="${checkContent(event.image.full)}" class="event_image">
          </div>
          <div class="event_info">
            <h3 class="event_title">${event.title}</h3>
            <div class="red_field">${event.location}</div>
            <p>${event.day_of_week.slice(0,2)} ${event.day} juli  ${event.start}</p>
            <img src="../static/img/gentse-feesten-icoontjes/euro.svg" class="euro ${checkContent(event.ticket)}">
          </div>
        </a>
      </li>
      `;
      }).join("");

      $more.innerHTML = html;
    }; 

    //render 4 more events on location 
    const renderLocation = (events, active) => {
      const location = active[0].location;
      const html = events.filter(event => event.location === location)
      .map(event => {
        return `
        <li class="event">
        <a href="detail.html?day=${event.day}&slug=${event.slug}" class="event_link">
          <div class="event_image">
            <img src="${checkContent(event.image.full)}" class="event_image">
          </div>
          <div class="event_info">
            <h3 class="event_title">${event.title}</h3>
            <div class="red_field">${event.location}</div>
            <p>${event.day_of_week.slice(0,2)} ${event.day} juli  ${event.start}</p>
            <img src="../static/img/gentse-feesten-icoontjes/euro.svg" class="euro ${checkContent(event.ticket)}">
          </div>
        </a>
      </li>
      `;
      }).join("");

      $location.innerHTML = html;
        }; 
  })();