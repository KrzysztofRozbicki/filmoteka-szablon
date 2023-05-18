export class UserMovies {
  #watched = [];
  #queued = [];

  constructor() {
    const watched = JSON.parse(localStorage.getItem('watched-movies'));
    const queued = JSON.parse(localStorage.getItem('queued-movies'));
    watched ? (this.#watched = watched) : (this.#watched = []);
    queued ? (this.#queued = queued) : (this.#queued = []);
  }

  get watched() {
    return this.#watched;
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
}
