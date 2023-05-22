const wrapperEl = document.getElementById('wrapper');
import { URL, IMG_URL, KEY, LANGUAGE } from './constants';
import { genres } from './genres';
import { createPagination } from './pagination';

const convertIdToGenre = array => {
  let string = '';
  array.forEach(
    id => (string += `${genres.filter(genre => genre.id === id)[0].name.toString()}, `)
  );
  return string.slice(0, -2);
};

const getGenre = data => data.genres.map(movie => movie.name).join(', ');

export const createMovies = (data, object) => {
  let array = data;
  let genres = '';
  if (!!data.results) {
    array = data.results;
  }
  wrapperEl.innerHTML = '';
  console.log(array);

  array.forEach(movie => {
    const movieBox = document.createElement('figure');
    movieBox.dataset.id = movie.id;
    movieBox.tabIndex = 0;
    movieBox.setAttribute('role', 'button');
    movieBox.setAttribute('aria-label', `${movie.title}`);
    movieBox.className = 'posters__box';
    movieBox.innerHTML = movie.poster_path
      ? `<img class="posters__img" src="${IMG_URL}${movie.poster_path}" alt="${movie.title} poster"/>`
      : '<img class="posters__img" src="https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-476x700.jpg" alt="There is no poster for this movie"/>';
    movieBox.innerHTML += `<h3 id="poster-title" class="posters__title">${movie.title}</h3>
    <p class="posters__details">${
      !!data.results ? convertIdToGenre(movie.genre_ids) : getGenre(movie)
    } | ${movie.release_date.slice(0, 4)}</p>`;
    wrapperEl.appendChild(movieBox);
  });
  if (data.total_pages) object.totalPages = data.total_pages;
  createPagination(object);
};
