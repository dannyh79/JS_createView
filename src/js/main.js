// ==========
function appendTickets(sort, page = 1) {
  const url = "https://jsonplaceholder.typicode.com/todos";
  let state = sort;
  if (sort !== "") {
    fetch(url)
    .then(function(result) {
      return result.json();
    })
    .then(function(data) {
      console.log(`func appendTickets' state: ${state}`);
      let { html, ticketCount } = createViewTickets(data, state, page);
      let pagiHtml = createPaginations(ticketCount);

      $('#tickets-area').html(html);
      $('#pagination-container').html(pagiHtml);
    })
  }
}

const PageViewQty = 5;

function createResultByStatus(data, state) {
  switch(state) {
    case 'open':
    return data
      .filter(ticket => ticket.completed == false)
      .sort((a, b) => a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1)
      .sort((a, b) => a.userId - b.userId);
  }
}

function createViewTickets(data, state, page) {
  const startIdx = PageViewQty * (page - 1);
  const filtered = createResultByStatus(data, state);
  const sliced = filtered.slice(startIdx,  startIdx + PageViewQty)
  const ticketCount = filtered.length

  return {
    ticketCount,
    html: sliced.map(item => createViewTicket(item)).join(''),
  }


  // console.log(`func createViewTickets' state: ${state}`);

  // switch (state) {
  //   case "open":
  //     result = data
  //                 .filter(ticket => ticket.completed == false)
  //                 .sort((a, b) => a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1)
  //                 .sort((a, b) => a.userId - b.userId);

  //     ticketCount = result.length;

  //     for (let item of result) {
  //       let html = createViewTicket(item);
  //       arrHTML.push(html);
  //     }


  //     break;
  //   case "completed":
  //     result = data
  //                 .filter(ticket => ticket.completed == true)
  //                 .sort((a, b) => a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1)
  //                 .sort((a, b) => a.userId - b.userId);

  //       ticketCount = result.length;

  //       for (let item of result) {
  //       let html = createViewTicket(item);
  //       arrHTML.push(html);
  //     }
  //     break;
  //   case "user":
  //     result = data
  //                 .sort((a, b) => a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1)
  //                 .sort((a, b) => a.completed > b.completed ? 1 : -1 )
  //                 .sort((a, b) => a.userId - b.userId);

  //     ticketCount = result.length;

  //     for (let item of result) {
  //       let html = createViewTicket(item);
  //       arrHTML.push(html);
  //     }
  //     break;
  //   case "title":
  //     result = data
  //                 .sort((a, b) => a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1)
  //                 .sort((a, b) => a.userId - b.userId);

  //     ticketCount = result.length;

  //     for (let item of result) {
  //       let html = createViewTicket(item);
  //       arrHTML.push(html);
  //     }
  //     break;
  // }
  // console.log(ticketCount)
  // // create pagination here
  // return arrHTML.join('');
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

function createPaginations(ticketCount) {
  let arrHTML = []
  for (let i = 1; i <= Math.ceil(ticketCount / PageViewQty); i++) {
    arrHTML.push(createPagination(i));
  }
  return arrHTML
  // return arrHTML.join('');
}

function createPagination(pageNum) {
  const elm = $(`<li class="pageButton">${pageNum}</li>`);
  elm.click(() => appendTickets(sort, pageNum));
  return elm;
  // console.dir(elm[0]);
  // return elm[0].outerHTML;

  // return `
  //   <li class="pageButton" value="${pageNum}">${pageNum}</li>
  // `
}

// tester
// $('.pagination ul').append(createPaginations(100));


// ==========
// why sometimes there's an "event" as param????
let sort = '';
$('#sortTickets').change(function() {
  sort = $(this).val();

  $('#tickets-area > *').remove()

  appendTickets(sort);
})

$('.pageButton').click(function() {
  let pageNum = $(this).val();
  console.log(pageNum);
  appendTickets(sort, pageNum);
  // create page view according to the arg
})