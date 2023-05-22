export class UserMovies {
  #watched = [];
  #queued = [];
  #page = 1;
  #totalPages = 1;
  #moviesPerPage = 20;

  constructor() {
    const watched = JSON.parse(localStorage.getItem('watched-movies'));
    const queued = JSON.parse(localStorage.getItem('queued-movies'));
    watched ? (this.#watched = watched) : (this.#watched = []);
    queued ? (this.#queued = queued) : (this.#queued = []);
  }

  get page() {
    return this.#page;
  }

  getArray(array) {
    let arr = [];
    const arrLength = array.length;
    console.log(arrLength);
    let end = 0;
    let start = 0;
    if (this.#page * this.#moviesPerPage > arrLength) end = arrLength;
    else {
      end = his.#page * this.#moviesPerPage;
      start = end - this.#moviesPerPage;
    }
    for (let i = start; i < end; i++) {
      arr.push(array[i]);
    }
    return arr;
  }

  get watched() {
    return this.getArray(this.#watched);
  }

  get queued() {
    return this.getArray(this.#queued);
  }

  get totalPages() {
    return this.#totalPages;
  }

  setTotalPagesWatched() {
    this.#totalPages = Math.ceil(this.#watched.length / 20);
  }

  setTotalPagesQueued() {
    this.#totalPages = Math.ceil(this.#queued.length / 20);
  }

  isAdded(element, array) {
    for (let i = 0; i < array.length; i++) {
      if (+array[i].id === +element.id) {
        return false;
      }
    }
    return true;
  }

  addToWatch(element) {
    console.log(element.title);
    if (this.isAdded(element, this.#watched)) {
      this.#watched.push(element);
      localStorage.setItem('watched-movies', JSON.stringify(this.#watched));
    }
  }

  addToQueue(element) {
    console.log(element.title);
    if (this.isAdded(element, this.#queued)) {
      this.#queued.push(element);
      localStorage.setItem('queued-movies', JSON.stringify(this.#queued));
    }
  }

  incrementPage() {
    this.#page++;
  }

  decrementPage() {
    this.#page--;
  }
}
