import axios from 'axios';
import { genres } from './genres';

const URL = 'https://api.themoviedb.org/3/';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const KEY = 'e33b9f687f25ca4aa510a1d82d34b03f';
const LANGUAGE = 'en-US';

const wrapperEl = document.getElementById('wrapper');
const nextBtn = document.getElementById('next-btn');
const previousBtn = document.getElementById('previous-btn');
const paginationEl = document.getElementById('pagination');
const searchFormEl = document.getElementById('search-form');
const searchInputEl = document.getElementById('search-input');

let page = 1;
let totalPages = 0;
let querySearch = '';
let showTrending = true;

const createSearchParams = () =>
  new URLSearchParams({
    query: querySearch,
    api_key: KEY,
    language: LANGUAGE,
    include_adult: false,
    page: page,
  });

const createSearchURL = () => `${URL}search/movie?${createSearchParams()}`;
const createTrendingURL = () => `${URL}trending/movie/week?${createSearchParams()}`;

const setButtons = () => {
  console.log(`page: ${page}`);
  if (page === 1) {
    previousBtn.disabled = true;
    nextBtn.disabled = false;
  } else if (page > 1 && page !== totalPages) {
    previousBtn.disabled = false;
    nextBtn.disabled = false;
  } else if (page === totalPages) {
  }
};

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

const createListItem = i => {
  const listItem = document.createElement('li');
  listItem.classList.add('pagination-element');
  listItem.innerText = i;
  if (i === page) listItem.classList.add('current-page');
  paginationEl.appendChild(listItem);
};

const createPagination = () => {
  paginationEl.innerHTML = '';
  if (page <= 3 && totalPages > 5) {
    for (let i = 1; i <= 5; i++) {
      createListItem(i);
    }
    createListItem('...');
    createListItem(totalPages);
  } else if (page <= 3 && totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      createListItem(i);
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
  setButtons();
};

const fetchMovies = url => {
  axios.get(url).then(res => {
    console.log(res);
    totalPages = res.data.total_pages;
    createMovies(res.data.results);
    createPagination();
  });
};

const showMovies = () => {
  showTrending ? fetchMovies(createTrendingURL()) : fetchMovies(createSearchURL());
};

showMovies();
paginationEl.addEventListener('click', event => {
  if (typeof +event.target.innerText === 'number') page = +event.target.innerText;
  showMovies();
});

nextBtn.addEventListener('click', () => {
  page++;
  showMovies();
});

previousBtn.addEventListener('click', () => {
  page--;
  showMovies();
});

searchFormEl.addEventListener('submit', event => {
  event.preventDefault();
  querySearch = searchInputEl.value;
  showTrending = false;
  showMovies();
});

const backdropEl = document.getElementById('modal-backdrop');
const closeModalBtn = document.getElementById('close-modal-btn');
const modalTitleEl = document.getElementById('modal-title');
const modalRankingEl = document.getElementById('modal-ranking');
const modalVotesEl = document.getElementById('modal-votes');
const modalPopularityEl = document.getElementById('modal-popularity');
const modalOriginalTitleEl = document.getElementById('modal-original-title');
const modalGenreEl = document.getElementById('modal-genre');
const modalDescriptionEl = document.getElementById('modal-description');
const modalImageEl = document.getElementById('modal-image');

closeModalBtn.addEventListener('click', () => {
  backdropEl.classList.toggle('hidden');
});

const showSingleMovie = data => {
  const genres = data.genres.map(movie => movie.name).join(' ');
  modalImageEl.src = `${IMG_URL}${data.poster_path}`;
  modalTitleEl.innerText = data.title;
  modalRankingEl.innerText = data.vote_average;
  modalVotesEl.innerText = data.vote_count;
  modalPopularityEl.innerText = data.popularity;
  modalOriginalTitleEl.innerText = data.original_title;
  modalGenreEl.innerText = genres;
  modalDescriptionEl.innerText = data.overview;
  backdropEl.classList.toggle('hidden');
};
const fetchSingleMovie = id => {
  axios.get(`${URL}movie/${id}?api_key=${KEY}`).then(res => showSingleMovie(res.data));
};

wrapperEl.addEventListener('click', event => {
  fetchSingleMovie(+event.target.parentNode.dataset.id);
});
