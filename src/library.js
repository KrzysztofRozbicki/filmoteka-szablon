import axios from 'axios';
import './sass/main.scss';
import { userMovies, fetchSingleMovie } from './scripts/modal';
import { URL, IMG_URL, KEY, LANGUAGE } from './scripts/constants';
import { createMovies } from './scripts/createMovies';
import { createPagination } from './scripts/pagination';
import debounce from 'lodash.debounce';

const wrapperEl = document.getElementById('wrapper');
const nextBtn = document.getElementById('next-btn');
const previousBtn = document.getElementById('previous-btn');
const paginationEl = document.getElementById('pagination');

paginationEl.addEventListener('click', event => {
  if (typeof +event.target.innerText === 'number') searchParams.page = +event.target.innerText;
  createMovies(userMovies.watched, userMovies);
});

nextBtn.addEventListener('click', () => {
  userMovies.incrementPage();
  createMovies(userMovies.watched, userMovies);
});

previousBtn.addEventListener('click', () => {
  userMovies.decrementPage();
  createMovies(userMovies.watched, userMovies);
});

wrapperEl.addEventListener('click', event => {
  fetchSingleMovie(+event.target.parentNode.dataset.id, axios).then(data => console.log(data));
});

window.addEventListener(
  'resize',
  debounce(() => createPagination(userMovies), 100)
);

const userWatchedBtn = document.getElementById('user-watched-btn');
const userQueueBtn = document.getElementById('user-queue-btn');

createMovies(userMovies.watched, userMovies);

userWatchedBtn.addEventListener('click', () => createMovies(userMovies.watched, userMovies));
userQueueBtn.addEventListener('click', () => createMovies(userMovies.queued, userMovies));
