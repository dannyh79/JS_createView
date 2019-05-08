// why sometimes there's an "event" as param????
$('#sortTickets').change(function() {
  let sort = $(this).val();

  $('#tickets-area > *').remove()

  appendTickets(sort);

})

// ==========
function appendTickets(sort) {
  const url = "https://jsonplaceholder.typicode.com/todos";
  let state = sort;
  if (sort !== "") {
    fetch(url)
    .then(function(result) {
      return result.json();
    })
    .then(function(data) {
      console.log(`func appendTickets' state: ${state}`);
      let html = createViewTickets(data, state);
  
      $('#tickets-area').append(html);
    })
  }
}

function createViewTickets(data, state) {
  let result = [];
  let arrHTML = [];
  console.log(`func createViewTickets' state: ${state}`);
  
  switch (state) {
    case "open":
      result = data
                  .filter(ticket => ticket.completed == false)
                  .sort((a, b) => a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1)
                  .sort((a, b) => a.userId - b.userId);
      for (let item of result) {
        let html = createViewTicket(item);
        arrHTML.push(html);
      }
      break;
    case "completed":
      result = data
                  .filter(ticket => ticket.completed == true)
                  .sort((a, b) => a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1)
                  .sort((a, b) => a.userId - b.userId);
      for (let item of result) {
        let html = createViewTicket(item);
        arrHTML.push(html);
      }
      break;
    case "user":
      result = data
                  .sort((a, b) => a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1)
                  .sort((a, b) => a.completed > b.completed ? 1 : -1 )
                  .sort((a, b) => a.userId - b.userId);
      for (let item of result) {
        let html = createViewTicket(item);
        arrHTML.push(html);
      }
      break;
    case "title":
      result = data
                  .sort((a, b) => a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1)
                  .sort((a, b) => a.userId - b.userId);
      for (let item of result) {
        let html = createViewTicket(item);
        arrHTML.push(html);
      }
      break;
  }


  return arrHTML.join('');
}

function createViewTicket(data) {
  return `
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${data.title}</h5>
      <h6 class="card-subtitle mb-2 text-muted">User: ${data.userId}</h6>
      <p class="card-text">Status: ${(data.completed ? "Completed" : "Open")}</p>
    </div>
  </div>
  `
}