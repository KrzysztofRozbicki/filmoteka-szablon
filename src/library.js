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
const userWatchedBtn = document.getElementById('user-watched-btn');
const userQueueBtn = document.getElementById('user-queue-btn');

// userMovies.setTotalPagesWatched();
// createMovies(userMovies.watched, userMovies);

// userWatchedBtn.addEventListener('click', () => {
//   userWatchedBtn.classList.add('button--active');
//   userMovies.setTotalPagesWatched();
//   createMovies(userMovies.watched, userMovies);
// });
// userQueueBtn.addEventListener('click', () => {
//   userWatchedBtn.classList.remove('button--active');
//   userMovies.setTotalPagesQueued();
//   createMovies(userMovies.queued, userMovies);
// });

// paginationEl.addEventListener('click', event => {
//   if (typeof +event.target.innerText === 'number') userMovies.page = +event.target.innerText;
//   createMovies(userMovies.watched, userMovies);
// });

// nextBtn.addEventListener('click', () => {
//   userMovies.incrementPage();
//   createMovies(userMovies.watched, userMovies);
// });

// previousBtn.addEventListener('click', () => {
//   userMovies.decrementPage();
//   createMovies(userMovies.watched, userMovies);
// });

// wrapperEl.addEventListener('click', event => {
//   fetchSingleMovie(+event.target.parentNode.dataset.id, axios);
// });

// window.addEventListener(
//   'resize',
//   debounce(() => createPagination(userMovies), 100)
// );

////////////////////////////////////////

import { setRegisterAndSignUp } from './scripts/firebase';

setRegisterAndSignUp();
