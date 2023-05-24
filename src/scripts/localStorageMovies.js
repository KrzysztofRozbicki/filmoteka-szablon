export class UserMovies {
  //tablica w której przechowywane są filmy zapisane przez użytkownika
  #movies = [];
  //tworzy zmienne do paginacji
  #page = 1;
  #totalPages = 1;
  #moviesPerPage = 20;

  //konstruktor pobiera z localStorage dane i zapisuje je do tablicy, jeśli ich nie ma tworzy pustą tablicę.
  constructor() {
    const movies = JSON.parse(localStorage.getItem('movies'));
    movies ? (this.#movies = movies) : (this.#movies = []);
  }

  //zwraca stronę - do paginacji
  get page() {
    return this.#page;
  }

  //Tworzy tablicę 20 filmów do paginacji.
  getArray(array) {
    let arr = [];
    const arrLength = array.length;
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

  //Zwraca tablicę 20 filmów do paginacji.
  getMovies(type) {
    return this.getArray(this.#movies);
  }

  // zwraca ilość total pages do paginacji
  get totalPages() {
    return this.#totalPages;
  }

  // Ustala total Pages do paginacji
  setTotalPages() {
    this.#totalPages = Math.ceil(this.#movies.length / 20);
  }

  //metoda sprawdza czy dany film nie jest już w localStorage zmienia mu typ w zależności od potrzeby oraz jeśli warunki są odpowiednie wrzuca go do local storage.
  checkMovie(movie, array, type) {
    movie.type = type;
    for (let i = 0; i < array.length; i++) {
      if (+array[i].id === +movie.id) {
        if (array[i].type === type) {
          return;
        }
        this.#movies[i].type = type;
        localStorage.setItem('movies', JSON.stringify(this.#movies));
        return;
      }
    }
    this.#movies.push(movie);
    localStorage.setItem('movies', JSON.stringify(this.#movies));
  }

  //metoda dodaje podstawowe informacje o filmie do bazy danych;
  addMovie(element, type) {
    const movie = {
      id: element.id,
      title: element.title,
      poster_path: element.poster_path,
      vote_average: element.vote_average,
      release_date: element.release_date,
      genre_ids: element.genres.map(genre => genre.id),
    };
    type === 'watched' ? (movie.type = 'watched') : (movie.type = 'queued');
    this.checkMovie(movie, this.#movies, type);
  }

  //metoda zwieksza strone (do paginacji)
  incrementPage() {
    this.#page++;
  }

  //metoda zmniejsza strone (do paginacji)
  decrementPage() {
    this.#page--;
  }
}
