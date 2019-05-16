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
    <div class="col-12 col-lg-4">
      <div class="card" id="ticket-${data.id}" onClick="toggleClassActive('ticket-${data.id}')">
        <div class="card-body">
          <h5 class="card-title">${data.title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">User: ${data.userId}</h6>
          <p class="card-text">Status: ${(data.completed ? "Completed" : "Open")}</p>
        </div>
      </div>
    </div>
  `
}

// create pagi button
function createPagiBtn(pageNum) {
  return $(`<li class="pagiBtn" onClick="render(state, ${pageNum})">${pageNum}</li>`);
}

// create pagination
function createPagi(ticketCount, page) {
  let arrHTML = [];
  for (let i = 1; i <= Math.ceil(ticketCount / viewQty); i++) {
    arrHTML.push(createPagiBtn(i));
  }
  // bind class "active" onto pagi button of current page
  arrHTML[page - 1].addClass('active');
  return arrHTML;
}

// create view
function createView(data, state, page) {
  const indexStart = viewQty * (page - 1);
  const filtered = createResultByState(data, state);
  const sliced = filtered.slice(indexStart, indexStart + viewQty);
  const ticketCount = filtered.length;

  return {
    ticketCount,
    HTML: sliced.map(item => createTicket(item)).join(''),
  }
}

// ==================
// toggle class "active" onto tickets
function toggleClassActive(id) {
  let target = document.querySelector(`#${id}`) || null;
  target && target.classList.toggle('active');
}

// sort method on-change event listener
let state = '';

$('#sortMethod').change(function() {
  state = $(this).val();

  if (state === '') {
    $('#view > *').remove();
    $('#viewPagi > *').remove();
  }

  render(state);
})

// fetch data & render view 
const url = "https://jsonplaceholder.typicode.com/todos";

function render(state, page = 1) {
  if (state !== "") {
    fetch(url)
      .then(result => {
        return result.json();
      })
      .then(data => {
        let { HTML, ticketCount } = createView(data, state, page);
        let pagiHTML = createPagi(ticketCount, page);

        $('#view').html(HTML);
        $('#viewPagi').html(pagiHTML);
      })
      .catch(() => $('#view')
        .html('<h1 style="font-size: 100px; font-weight: 900;">超大叉燒包</h1>')
        )
  }
}