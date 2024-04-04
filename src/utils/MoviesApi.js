export class MoviesApi {
  constructor({ url }) {
    this._url = url;
  }
  // Приватный метод ответа сервера
  _getResponse(res) {
    //console.log(response)
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  async getMovies() {
    if (!this.savedMoives) {
      const res = await fetch(`${this._url}`, {
        method: 'GET',
      });
      this.savedMoives = await this._getResponse(res);
    }

    return this.savedMoives;
  }
  resetSave() {
    delete this.savedMoives; // удалить свойство из объекта
  }  
}

// Создание экземпляра класса MoviesApi
export const moviesApi = new MoviesApi({
  url: 'https://api.nomoreparties.co/beatfilm-movies',
});
