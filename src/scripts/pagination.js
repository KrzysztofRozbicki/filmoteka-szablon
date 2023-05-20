import { TABLET_SIZE } from './constants';

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
  listItem.classList.add('pagination__element');
  listItem.tabIndex = 0;
  listItem.role = 'button';
  listItem.setAttribute('aria-label', `page ${i}`);
  listItem.innerText = i;
  if (i === page) listItem.classList.add('pagination__element--active');
  paginationEl.appendChild(listItem);
};

export const createPagination = object => {
  const screenWidth = window.innerWidth;
  const notMobile = !!(screenWidth > TABLET_SIZE);
  const page = object.page;
  const totalPages = object.totalPages;
  paginationEl.innerHTML = '';
  if (page <= 3 && totalPages > 5) {
    for (let i = 1; i <= 5; i++) {
      createListItem(i, page);
    }
    if (notMobile) {
      createListItem('...');
      createListItem(totalPages);
    }
  } else if (page <= 3 && totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      createListItem(i, page);
    }
  } else if (page > 3 && page < totalPages - 3) {
    if (notMobile) {
      createListItem(1);
      createListItem('...');
    }
    for (let i = page - 2; i < page + 3; i++) {
      createListItem(i, page);
    }
    if (notMobile) {
      createListItem('...');
      createListItem(totalPages);
    }
  } else if (page >= totalPages - 3) {
    if (notMobile) {
      createListItem(1);
      createListItem('...');
    }

    for (let i = totalPages - 4; i <= totalPages; i++) {
      createListItem(i, page);
    }
  }
  setButtons(object);
};
