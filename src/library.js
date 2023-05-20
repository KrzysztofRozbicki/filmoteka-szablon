import axios from 'axios';
import './sass/main.scss';
import { userMovies, fetchSingleMovie } from './scripts/modal';
import { URL, IMG_URL, KEY, LANGUAGE } from './scripts/constants';
import { createMovies } from './scripts/createMovies';
import { SearchParams } from './scripts/searchParams';
//import { createPagination } from './scripts/pagination';
import debounce from 'lodash.debounce';

const wrapperEl = document.getElementById('wrapper');
// const nextBtn = document.getElementById('next-btn');
// const previousBtn = document.getElementById('previous-btn');
// const paginationEl = document.getElementById('pagination');

// paginationEl.addEventListener('click', event => {
//   if (typeof +event.target.innerText === 'number') searchParams.page = +event.target.innerText;
//   showMovies(searchParams.trending);
// });

// nextBtn.addEventListener('click', () => {
//   searchParams.incrementPage();
//   showMovies(searchParams.trending);
// });

// previousBtn.addEventListener('click', () => {
//   searchParams.decrementPage();
//   showMovies(searchParams.trending);
// });

wrapperEl.addEventListener('click', event => {
  fetchSingleMovie(+event.target.parentNode.dataset.id, axios).then(data => console.log(data));
});

// window.addEventListener(
//   'resize',
//   debounce(() => createPagination(searchParams), 100)
// );

const userWatchedBtn = document.getElementById('user-watched-btn');
const userQueueBtn = document.getElementById('user-queue-btn');

createMovies(userMovies.watched, userMovies.watched);

userWatchedBtn.addEventListener('click', () =>
  createMovies(userMovies.watched, userMovies.watched)
);
userQueueBtn.addEventListener('click', () => createMovies(userMovies.queued, userMovies.queued));
