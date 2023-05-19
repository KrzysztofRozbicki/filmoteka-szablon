export class SearchParams {
  #page = 1;
  #totalPages = 0;
  #query = '';
  #trending = true;

  get page() {
    return this.#page;
  }
  set page(val) {
    this.#page = val;
  }

  incrementPage() {
    this.#page++;
  }

  decrementPage() {
    this.#page--;
  }

  get totalPages() {
    return this.#totalPages;
  }
  set totalPages(val) {
    this.#totalPages = val;
  }

  get query() {
    return this.#query;
  }
  set query(val) {
    this.#query = val;
  }

  get trending() {
    return this.#trending;
  }
  set trending(val) {
    this.#trending = val;
  }
}
