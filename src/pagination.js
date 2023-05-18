const nextBtn = document.getElementById('next-btn');
const previousBtn = document.getElementById('previous-btn');
const paginationEl = document.getElementById('pagination');

const setButtons = object => {
  const page = object.page;
  const totalPages = object.totalPages;
  console.log(`page: ${page}`);
  if (page === 1) {
    previousBtn.disabled = true;
    nextBtn.disabled = false;
  } else if (page > 1 && page !== totalPages) {
    previousBtn.disabled = false;
    nextBtn.disabled = false;
  } else if (page === totalPages) {
    previousBtn.disabled = false;
    nextBtn.disabled = true;
  }
};

const createListItem = (i, page) => {
  const listItem = document.createElement('li');
  listItem.classList.add('pagination-element');
  listItem.innerText = i;
  if (i === page) listItem.classList.add('current-page');
  paginationEl.appendChild(listItem);
};

export const createPagination = object => {
  const page = object.page;
  const totalPages = object.totalPages;
  paginationEl.innerHTML = '';
  if (page <= 3 && totalPages > 5) {
    for (let i = 1; i <= 5; i++) {
      createListItem(i, page);
    }
    createListItem('...');
    createListItem(totalPages);
  } else if (page <= 3 && totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      createListItem(i, page);
    }
  } else if (page > 3 && page < totalPages - 3) {
    createListItem(1);
    createListItem('...');
    for (let i = page - 2; i < page + 3; i++) {
      createListItem(i);
    }
    createListItem('...');
    createListItem(totalPages);
  } else if (page >= totalPages - 3) {
    createListItem(1);
    createListItem('...');
    for (let i = totalPages - 4; i <= totalPages; i++) {
      createListItem(i);
    }
  }
  setButtons(object);
};
