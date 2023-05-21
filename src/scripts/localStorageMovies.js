export class UserMovies {
  #watched = [];
  #queued = [];
  #page = 1;
  #totalPages = 1;

  constructor() {
    const watched = JSON.parse(localStorage.getItem('watched-movies'));
    const queued = JSON.parse(localStorage.getItem('queued-movies'));
    watched ? (this.#watched = watched) : (this.#watched = []);
    queued ? (this.#queued = queued) : (this.#queued = []);
    this.#totalPages = Math.ceil(this.#watched.length / 20);
  }

  get page() {
    return this.#page;
  }

  get watched() {
    return this.#watched;
  }

  get totalPages() {
    return this.#totalPages;
  }

  get queued() {
    return this.#queued;
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
