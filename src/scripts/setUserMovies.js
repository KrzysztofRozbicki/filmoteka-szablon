import { UserMovies } from './localStorageMovies';
export const userMovies = new UserMovies();

export const setModalButtons = data => {
  const watchBtn = document.getElementById('watch-btn');
  const queueBtn = document.getElementById('queue-btn');
  watchBtn.addEventListener('click', () => userMovies.addMovie(data, 'watched'));
  queueBtn.addEventListener('click', () => userMovies.addMovie(data, 'queued'));
};
