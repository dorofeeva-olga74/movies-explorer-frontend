export class MainApi {
  constructor({ url, headers }) {
    // на входе некий обьект с url и headers
    this._url = url; // тело конструктора// или options.url
    this._headers = headers;
  }
  // приватный метод ответа сервера
  _getResponse(res) {
    // console.log(res)
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  async _request(url, options) {
    try {
      const res = await fetch(url, {
        ...options,
        headers: {
          ...this._headers,
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return this._getResponse(res);
    } catch (error) {
      console.log(error);
    }
  }
  // получение сохраненных фильмов
  async getSavedMovies() {
    try {
      const res = await this._request(`${this._url}/movies`, {
        headers: {
          ...this._headers,
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  // удаление карточки из сохраненных
  async deleteMovie(movieId) {
    const options = {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'DELETE',
    };
    try {
      const res = await this._request(`${this._url}/movies/${movieId}`, options);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  // отправление данных о сохраненных фильмах // сохранить фильмы
  async savedMovie(movie) {
    const options = {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'POST',
      body: JSON.stringify(movie),
    };
    try {
      const res = await this._request(`${this._url}/movies`, options);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
}
//создание экземпляра класса MainApi
export const mainApi = new MainApi({
  url: 'https://api.jupiter.movies.nomoredomainsmonster.ru',
  // url: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
