import axios from 'axios';
import { genres } from './genres';
import { fetchSingleMovie } from './modal';
import { URL, IMG_URL, KEY, LANGUAGE } from './constants';
import { createPagination } from './pagination';
import { SearchParams } from './searchParams';

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

const convertIdToGenre = array => {
  let string = '';
  array.forEach(
    id => (string += `${genres.filter(genre => genre.id === id)[0].name.toString()}, `)
  );
  return string;
};

const createMovies = array => {
  wrapperEl.innerHTML = '';
  array.forEach(movie => {
    const movieBox = document.createElement('div');
    movieBox.dataset.id = movie.id;
    movieBox.className = 'movie-box';
    movieBox.innerHTML = movie.poster_path
      ? `<img class="poster" src="${IMG_URL}${movie.poster_path}"/>`
      : '<img class="poster" src="https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-476x700.jpg"/>';
    movieBox.innerHTML += `<h3 class="movie-title">${movie.title}</h3>
    <p class="movie-genres">${convertIdToGenre(movie.genre_ids)}</p>`;
    wrapperEl.appendChild(movieBox);
  });
};

const fetchMovies = url => {
  axios.get(url).then(res => {
    console.log(res);
    searchParams.totalPages = res.data.total_pages;
    createMovies(res.data.results);
    createPagination(searchParams);
  });
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
});

wrapperEl.addEventListener('click', event => {
  fetchSingleMovie(+event.target.parentNode.dataset.id, axios);
});
