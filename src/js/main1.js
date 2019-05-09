const url = "https://jsonplaceholder.typicode.com/todos";


// fetch & render
// selector to be set
function render(state, page = 1) {
  if (state !== "") {
    fetch(url)
      .then(result => {
        return result.json();
      })
      .then(data => {
        let { HTML, ticketCount } = createView(data, state, page);

        // BUGGGED============================
        let pagiHTML = createPagi(ticketCount);

        // selectors to be set
        $('#view').html(HTML);
        $('#viewPagi').html(pagiHTML);
      })
      .catch(() => console.log("something went wrong..."))
  }
}


// create result by state
const viewQty = 18;

function createResultByState(data, state) {
  switch (state) {
    case 'open':
      return data
        .filter(ticket => ticket.completed == false)
    case 'completed':
      return data
        .filter(ticket => ticket.completed == true)
    case 'user':
      return data
        .sort((a, b) => a.userId - b.userId)
    case 'title':
      return data
      .sort((a, b) => a.title.toUpperCase() > b.title.toUpperCase ? 1 : -1)
    }
}

// create ticket
function createTicket(data) {
  return `
    <div class="col-12 col-sm-6 col-md-4 card">
      <div class="card-body">
        <h5 class="card-title">${data.title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">User: ${data.userId}</h6>
        <p class="card-text">Status: ${(data.completed ? "Completed" : "Open")}</p>
      </div>
    </div>  
  `
}

// create pagi button
// ??? find a better way to construct it so class "active" can be bound on one ???
function createPagiBtn(pageNum) {
  const el = $(`<li class="pageButton">${pageNum}</li>`);
  // WiP
  el.click(() => createView(state, pageNum));
  return el;
}

// create pagination
function createPagi(ticketCount) {
  let arrHTML = [];
  for (let i = 1; i <= Math.ceil(ticketCount / viewQty); i++) {
    arrHTML.push(createPagiBtn(i));
  }
  return arrHTML;
}

// create view
function createView(data, state, page) {
  const indexStart = viewQty * (page - 1);
  const filtered = createResultByState(data, state);
  const sliced = filtㄦered.slice(indexStart, indexStart + viewQty);
  const ticketCount = filtered.length

  return {
    ticketCount,
    HTML: sliced.map(item => createTicket(item)).join(''),
  }
}

// event listeners
let state = '';

$('#sortMethod').change(function() {
  state = $(this).val();

  $('#view > *').remove();
  // $('#viewPagi > *').remove();

  render(state);
})

$('.pageButton').click(() => {
  let pageNum = $(this).val();
  console.log(pageNum);
  render(state, pageNum);
})