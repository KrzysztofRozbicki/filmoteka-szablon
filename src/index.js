import axios from 'axios';
import './sass/main.scss';
import { userMovies, fetchSingleMovie } from './scripts/modal';
import { URL, IMG_URL, KEY, LANGUAGE } from './scripts/constants';
import { createMovies } from './scripts/createMovies';
import { SearchParams } from './scripts/searchParams';
import { createPagination } from './scripts/pagination';
import debounce from 'lodash.debounce';

const wrapperEl = document.getElementById('wrapper');
const searchFormEl = document.getElementById('search-form');
const searchInputEl = document.getElementById('search-input');
const nextBtn = document.getElementById('next-btn');
const previousBtn = document.getElementById('previous-btn');
const paginationEl = document.getElementById('pagination');

const searchParams = new SearchParams();

const createSearchParams = () =>
  new URLSearchParams({
    query: searchParams.query,
    api_key: KEY,
    language: LANGUAGE,
    include_adult: false,
    page: searchParams.page,
  });

const createSearchURL = () => `${URL}search/movie?${createSearchParams()}`;
const createTrendingURL = () => `${URL}trending/movie/week?${createSearchParams()}`;

const fetchMovies = url => {
  axios.get(url).then(res => createMovies(res.data, searchParams));
};

const showMovies = trending => {
  trending ? fetchMovies(createTrendingURL()) : fetchMovies(createSearchURL());
};

showMovies(searchParams.trending);
paginationEl.addEventListener('click', event => {
  if (typeof +event.target.innerText === 'number') searchParams.page = +event.target.innerText;
  showMovies(searchParams.trending);
});

nextBtn.addEventListener('click', () => {
  searchParams.incrementPage();
  showMovies(searchParams.trending);
});

previousBtn.addEventListener('click', () => {
  searchParams.decrementPage();
  showMovies(searchParams.trending);
});

searchFormEl.addEventListener('submit', event => {
  event.preventDefault();
  searchParams.query = searchInputEl.value;
  searchParams.trending = false;
  showMovies(searchParams.trending);
  searchInputEl.value = '';
});

wrapperEl.addEventListener('click', event => {
  fetchSingleMovie(+event.target.parentNode.dataset.id, axios).then(data => console.log(data));
});

window.addEventListener(
  'resize',
  debounce(() => createPagination(searchParams)),
  300
);

const userWatchedBtn = document.getElementById('user-watched-btn');
const userQueueBtn = document.getElementById('user-queue-btn');

userWatchedBtn.addEventListener('click', () => createMovies(userMovies.watched));
userQueueBtn.addEventListener('click', () => createMovies(userMovies.queued));
