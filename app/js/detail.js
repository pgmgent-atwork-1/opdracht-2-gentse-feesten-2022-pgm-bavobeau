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
        "https://www.pgm.gent/data/gentsefeesten/events.json"
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
        $date.innerHTML = `Overzicht ${event.day_of_week} ${event.day} juli`;
        return `
      <div class="event__main">
        <h1 class="event__title text--c-white">${event.title}</h1>
        <div class="red__field">${event.location}</div>
        <div class="event__time text--c-white">${event.start} - ${event.end}</div>
      </div>
      <p class="event__desc text--c-white">${event.description}</p>
      <img src="${checkContent(event.image.full)}">
      <ul class="event__details">
        <li>Organisator:</li>
        <li><a href="#">${event.organizer}</a></li>
        <li>Categorieën:</li>
        <li><a href="#">${event.category.map((element) => {return `<p>${element}</p>`})}</a></li>
      </ul>
      <ul class="socials">
        <li><a href=""></a></li>
        <li><a href=""></a></li>
        <li><a href=""></a></li>
      </ul>
      <div class="event__map">
        <div class="red__area">
          <div class="red__field red__field--black">${event.location}</div>
          <a href="#">Open in Google Maps</a>
          <div class="red__field red__field--transparant">${event.location}</div>
        </div>
        <img src="../img/maps.png">
      </div>
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
        <a href="detail.html?day=${event.day}&slug=${event.slug}" class="event__link">
          <div class="event__image">
            <img src="${checkContent(event.image.full)}" class="event_image">
          </div>
          <div class="event__info">
            <h3 class="event__title">${event.title}</h3>
            <div class="red__field">${event.location}</div>
            <p>${event.day_of_week.slice(0,2)} ${event.day} juli  ${event.start}</p>
            <div class="euro ${checkContent(event.ticket)}">
              <img src="../img/gentse-feesten-icoontjes/euro.svg">
            </div>
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
      .slice(0,4).map(event => {
        return `
      <li class="event">
        <a class="event__link href="detail.html?day=${event.day}&slug=${event.slug}" class="event_link">
          <div class="event__image">
            <img src="${checkContent(event.image.full)}" class="event_image">
          </div>
          <div class="event__info">
            <h3 class="event__title text--c-white">${event.title}</h3>
            <div class="red__field">${event.location}</div>
            <p class="text--c-white">${event.day_of_week.slice(0,2)} ${event.day} juli  ${event.start}</p>
            <div class="euro ${checkContent(event.ticket)}">
              <img src="../img/gentse-feesten-icoontjes/euro.svg">
            </div>
          </div>
        </a>
      </li>
      `;
      }).join("");

      $location.innerHTML = html;
        }; 
  })();