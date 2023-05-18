import { URL, IMG_URL, KEY, LANGUAGE } from './constants';
import { UserMovies } from './localStorageMovies';

const backdropEl = document.getElementById('modal-backdrop');
export const userMovies = new UserMovies();

const showSingleMovie = data => {
  const genres = data.genres.map(movie => movie.name).join(' ');
  const img = data.poster_path
    ? `${IMG_URL}${data.poster_path}`
    : 'https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-476x700.jpg';
  backdropEl.innerHTML = `
    <div class="modal">
        <button id="close-modal-btn" type="button" class="close-modal-btn">X</button>
        <img id="modal-image" src="${img}" alt="${data.title}" class="modal-image" />
        <div>
          <h3 id="modal-title" class="modal-title">${data.title}</h3>
          <div class="modal-info">
            <div class="modal-category">
              <p>Vote / Votes</p>
              <p>Popularity</p>
              <p>Original Title</p>
              <p>Genre</p>
            </div>
            <div class="modal-detailed-info">
              <p>
                <span class="modal-ranking">${data.vote_average}</span> /
                <span>${data.vote_count}</span>
              </p>
              <p>${data.popularity}</p>
              <p>${data.original_title}</p>
              <p>${genres}</p>
            </div>
          </div>
          <article class="modal-description">
            <h4>ABOUT</h4>
            <p id="modal-description">${data.overview}</p>
          </article>
          <div class="modal-btns">
            <button id="watch-btn" class="nav-btn">ADD TO WATCHED</button>
            <button id="queue-btn" class="nav-btn">ADD TO QUEUE</button>
          </div>
        </div>
      </div>
    
    
    `;
  backdropEl.classList.toggle('hidden');
  const closeModalBtn = document.getElementById('close-modal-btn');

  closeModalBtn.addEventListener('click', () => {
    backdropEl.classList.toggle('hidden');
  });

  const watchBtn = document.getElementById('watch-btn');
  const queueBtn = document.getElementById('queue-btn');
  watchBtn.addEventListener('click', () => userMovies.addToWatch(data));
  queueBtn.addEventListener('click', () => userMovies.addToQueue(data));
};

export const fetchSingleMovie = (id, axios) =>
  axios.get(`${URL}movie/${id}?api_key=${KEY}`).then(res => showSingleMovie(res.data));
