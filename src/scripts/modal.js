import { URL, IMG_URL, KEY, LANGUAGE } from './constants';
import { UserMovies } from './localStorageMovies';
import { TABLET_SIZE } from './constants';

const backdropEl = document.getElementById('modal-backdrop');
export const userMovies = new UserMovies();

const showSingleMovie = data => {
  const genres = data.genres.map(movie => movie.name).join(' ');
  const img = data.poster_path
    ? `${IMG_URL}${data.poster_path}`
    : 'https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-476x700.jpg';
  backdropEl.innerHTML = `
  <div class="container">
    <div id="modal" class="modal">
        <button id="close-modal-btn" type="button" class="modal__close">X</button>
        <img id="modal-image" src="${img}" alt="${data.title}" class="modal__image" />
        <button id="show-more" class="button modal__more" >Show more...</button>
        <div id="modal-text" class="modal__text">
          <h3 id="modal-title" class="modal__title">${data.title}</h3>
          
          <div class="modal__info">
              <p class="modal__info__category">Vote / Votes</p>
              <p class="modal__info__details">  <span class="modal__info__details__ranking">${data.vote_average.toFixed(
                1
              )}</span> /
                <span>${data.vote_count}</span>
          </div>
          <div class="modal__info">
            <p class="modal__info__category">Popularity</p>
            <p class="modal__info__details">${Math.round(data.popularity)}</p>
          </div>
          <div class="modal__info">
            <p class="modal__info__category">Original Title</p>
            <p class="modal__info__details">${data.original_title}</p>
          </div>
          <div class="modal__info">
            <p class="modal__info__category">Genre</p>
            <p class="modal__info__details">${genres}</p>
          </div>            
          <article class="modal__description">
            <p class="modal__description__header">ABOUT</p>
            <p id="modal-description">${data.overview}</p>
          </article>
          <div class="modal__buttons">
            <button id="watch-btn" class="button button--modal">ADD TO WATCHED</button>
            <button id="queue-btn" class="button button--modal">ADD TO QUEUE</button>
          </div>
          </div>
        </div>
      </div>
  </div>`;
  backdropEl.classList.toggle('hidden');
  const closeModalBtn = document.getElementById('close-modal-btn');

  closeModalBtn.addEventListener('click', () => {
    backdropEl.classList.toggle('hidden');
  });

  const watchBtn = document.getElementById('watch-btn');
  const queueBtn = document.getElementById('queue-btn');
  watchBtn.addEventListener('click', () => userMovies.addToWatch(data));
  queueBtn.addEventListener('click', () => userMovies.addToQueue(data));

  const screenWidth = window.innerWidth;
  const notMobile = !!(screenWidth > TABLET_SIZE);
  const moreEl = document.getElementById('show-more');
  const modalTextEl = document.getElementById('modal-text');
  const modalEl = document.getElementById('modal');
  if (screenWidth < TABLET_SIZE) {
    let showContent = false;
    moreEl.addEventListener('click', () => {
      if (showContent) {
        moreEl.innerHTML = `Show more...`;
        modalTextEl.style.display = 'none';
        modalEl.style.height = 'auto';
        showContent = false;
      } else if (!showContent) {
        moreEl.innerHTML = `Show less`;
        modalTextEl.style.display = 'block';
        modalEl.style.height = '100%';
        showContent = true;
      }
    });
  } else {
    moreEl.classList.add('hidden');
    modalTextEl.style.display = 'block';
  }
};

export const fetchSingleMovie = (id, axios) =>
  axios.get(`${URL}movie/${id}?api_key=${KEY}`).then(res => showSingleMovie(res.data));
