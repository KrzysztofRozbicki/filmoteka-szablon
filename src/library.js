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

userMovies.setTotalPagesWatched();
createMovies(userMovies.watched, userMovies);

userWatchedBtn.addEventListener('click', () => {
  userWatchedBtn.classList.add('button--active');
  userMovies.setTotalPagesWatched();
  createMovies(userMovies.watched, userMovies);
});
userQueueBtn.addEventListener('click', () => {
  userWatchedBtn.classList.remove('button--active');
  userMovies.setTotalPagesQueued();
  createMovies(userMovies.queued, userMovies);
});

paginationEl.addEventListener('click', event => {
  if (typeof +event.target.innerText === 'number') userMovies.page = +event.target.innerText;
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

////////////////////////////////////////

// import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
// //import firebase from 'firebase';
// //import firebaseui from 'firebaseui';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: 'AIzaSyB0FxWwjInqh4F0be_50HwVzJ0iqkETgXY',
//   authDomain: 'filmoteka-f3080.firebaseapp.com',
//   projectId: 'filmoteka-f3080',
//   storageBucket: 'filmoteka-f3080.appspot.com',
//   messagingSenderId: '339706643558',
//   appId: '1:339706643558:web:94b37fe16030e950b259a7',
//   measurementId: 'G-81MRNCTEB6',
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// const ui = new firebaseui.auth.AuthUI(firebase.auth());
