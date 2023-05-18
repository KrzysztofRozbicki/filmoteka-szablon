import { URL, IMG_URL, KEY, LANGUAGE } from './constants';

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

export const showSingleMovie = data => {
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

export const fetchSingleMovie = (id, axios) => {
  axios.get(`${URL}movie/${id}?api_key=${KEY}`).then(res => showSingleMovie(res.data));
};
