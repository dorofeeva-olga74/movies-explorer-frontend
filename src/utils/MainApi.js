export class MainApi {
    constructor({ url, headers }) {//на входе некий обьект с url и headers
        this._url = url;// тело конструктора// или options.url 
        // const headers = {
        //     authorization: `Bearer ${localStorage.getItem('token')}`,
        //     'Content-Type': 'application/json',
        // };
        this._headers = headers;
    }
    //приватный метод ответа сервера
    _getResponse(res) {
         console.log(res)
        if (res.ok) {
            return res.json();//дай мне ответ в формате json()
        }
        return Promise.reject(new Error("Возникла ошибка"));
    }
    _request(url, options) {
        return fetch(url, options).then(this._getResponse)
      }

    //получить сохраненные фильмы//получение данных с сервера
    getSavedMovies()  {//getAllToddos
    return this._request(`${this._url}/movies`, { headers: this._headers })
    }
      //удалить карточку из сохраненных
     deleteMovie(movieId) {
      const options = {
        headers: this._headers,
        method: 'DELETE'
    }
    return this._request(`${this._url}/movies/${movieId}`, options)
    }
    
     //отправить данные о сохраненных фильмах//сохранить фильмы
    savedMovie(data) {
      const options = {
        headers: this._headers,
        method: 'POST',
        body: JSON.stringify({
            country: data.country || '',
            director: data.director || '',
            duration: data.duration || '',
            year: data.year || '',
            description: data.description || '',
            image: `https://api.nomoreparties.co${data.image.url}` || '',
            trailerLink: data.trailerLink || '',
            thumbnail: `https://https://api.nomoreparties.co${data.image.formats.thumbnail.url}` || '',
            movieId: data.id,
            nameRU: data.nameRU || '',
            nameEN: data.nameEN || '',
        })
    }
      return this._request(`${this._url}/movies`, options)
    }
     /*профиль*/
    //получение данных пользователя с сервера

    //отправка данных на сервер   
    changeUserData(data) {
      const options = {
        headers: this._headers,
        method: 'PATCH',
        body: JSON.stringify({
            name: data.name,
            email: data.email
        })
    }
      return this._request(`${this._url}/users/me`, options)
    }
     // Регистрация пользователя:  
    register(data) {
      const options = {
        headers: this._headers,
        method: 'POST',
        body: JSON.stringify(data)
      }
      return this._request(`${this._url}/signup`, options)
    }

    //Авторизация пользователя:
    authorize(data) {
        const options = {
          headers: this._headers,
          method: 'POST',
          body: JSON.stringify(data)
        }
        return this._request(`${this._url}/signin`, options)
    }
    //Для проверки валидности токена и получения email:

    //получение данных пользователя с сервера
    checkToken(token) {
      console.log(`Bearer ${token}`)
        return this._request(`${this._url}/users/me`, { 
          headers: this._headers,
      })
    }   
    
//     getUserData() {
//       const options = {
//         headers: this._headers,
//         method: 'GET',
//     }
//       return this._request(`${this._url}/users/me`, options)
//     } 
}
    
//создание экземпляра класса MainApi
export const mainApi = new MainApi({
//url: 'https://jupiter.movies.nomoredomainsmonster.ru' 
url: "http://localhost:3001",
headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
 },
});

// //создание экземпляра класса MainApi
//     const apiConfig = {
//       //url: 'https://jupiter.movies.nomoredomainsmonster.ru' 
//       url: "http://localhost:3001",
//       headers: {
//        authorization: `Bearer ${localStorage.getItem('token')}`,
//        'Content-Type': 'application/json',
//       },
//     };
//   /*API*/
//   const mainApi = new MainApi(apiConfig);
//   export default mainApi;

/////////////////////////////////////////
// async getUserData() {
//     const res = await fetch(`${this._url}/users/me`, {
//         method: 'GET',
//         headers: this._headers,
//     })
//     return this._getResponse(res);
// }

// // Регистрация пользователя:   
// async register(data) {
//     const res = await fetch(`${this._url}/signup`, {
//         method: 'POST',
//         headers: this._headers,
//         body: JSON.stringify(data),
//     })
//     return this._getResponse(res);
// }
// //Авторизация пользователя:
// async authorize(data) {
//     const res = await fetch(`${this._url}/signin`, {
//         method: 'POST',
//         headers: this._headers,
//         body: JSON.stringify(data),
//     })
//     return this._getResponse(res);
// }

// //Для проверки валидности токена и получения email:
// async checkToken(token) {
//     const res = await fetch(`${this._url}/users/me`, {
//         method: 'GET',
//         headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json"
           
//         }
//     })
//     return this._getResponse(res);
// }

// //отправка данных на сервер 
// async changeUserData(data) {
//     const res = await fetch(`${this._url}/users/me`, {
//         method: 'PATCH',
//         headers: this._headers,
//         body: JSON.stringify({
//             name: data.name,
//             email: data.email
//         })
//     })
//     return this._getResponse(res);
// }
// //получить сохраненные фильмы
// async getSavedMovies() {
//     const res = await fetch(`${this._url}/movies`, {
//         method: 'GET',
//         headers: this._headers,
//     })
//     return this._getResponse(res);
// }
// //отправить данные о сохраненных фильмах//сохранить фильмы
// async savedMovie(data) {
//         const res = await fetch(`${this._url}/movies`, {
//             method: 'POST',
//             headers: this._headers,
//             body: JSON.stringify({
//                 country: data.country || '',
//                 director: data.director || '',
//                 duration: data.duration || '',
//                 year: data.year || '',
//                 description: data.description || '',
//                 image: `https://api.nomoreparties.co${data.image.url}` || '',
//                 trailerLink: data.trailerLink || '',
//                 thumbnail: `https://https://api.nomoreparties.co${data.image.formats.thumbnail.url}` || '',
//                 movieId: data.id,
//                 nameRU: data.nameRU || '',
//                 nameEN: data.nameEN || '',
//             })
//         })
//         return this._getResponse(res);
//     }
// //отправить данные о сохраненных фильмах//сохранить фильмы
// // async savedMovie(data) {
// //     const res = await fetch(`${this._url}/movies`, {
// //         method: 'POST',
// //         headers: this._headers,
// //         body: JSON.stringify(data)
// //     })
// //     return this._getResponse(res);
// // }
// //удалить карточку из сохраненных
// async deleteMovie(id) {
//     const res = await fetch(`${this._url}/movies/${id}`, {
//         method: 'DELETE',
//         headers: this._headers,
//     })
//     return this._getResponse(res);
// }
// }

// //создание экземпляра класса MainApi
// export const mainApi = new MainApi({
// //url: 'https://jupiter.movies.nomoredomainsmonster.ru' 
// url: "http://localhost:3001",
// headers: {
//     authorization: `Bearer ${localStorage.getItem('token')}`,
//     'Content-Type': 'application/json',
//  },
// });











