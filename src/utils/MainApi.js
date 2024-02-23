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
      //  console.log(res)
        if (res.ok) {
            return res.json();//дай мне ответ в формате json()
        }
        // return Promise.reject(new Error("Возникла ошибка"));
        return Promise.reject(`Error: ${res.status}`);
    }
    // _request(url, options) {
    //     return fetch(url, options).then(this._getResponse);
    //   }
    // _request(url, options) {
    //   console.log(options);
    //   return fetch(url, {...options, authorization: `Bearer ${localStorage.getItem('token')}`, credentials: `same-origin`,}).then(this._getResponse)
    // }
    // _request(url, options) {
    //   return fetch(url, {...options, 
    //     authorization: `Bearer ${localStorage.getItem('token')}`}).then(this._getResponse)
    //  }
     _request(url, options) {
      // console.log(url)
      return fetch(url, {...options, 'authorization': `Bearer ${localStorage.getItem('token')}`}).then(this._getResponse)
     }
    //получить сохраненные фильмы//получение данных с сервера
    getSavedMovies()  {
    return this._request(`${this._url}/movies`, { headers: this._headers })
    }
      //удалить карточку из сохраненных
     deleteMovie(movieId) {
      const options = {
        headers: this._headers,
        method: 'DELETE',
        // credentials: 'same-origin',
    }
    return this._request(`${this._url}/movies/${movieId}`, options)
    }
    register(data) {
      const options = {
        headers: this._headers,
        method: 'POST',
        body: JSON.stringify(data),       
      }
      return this._request(`${this._url}/signup`, options)
    }
     //отправить данные о сохраненных фильмах//сохранить фильмы
     savedMovie(movie) {
      const options = {
        headers: this._headers,
        method: 'POST',
        body: JSON.stringify(movie),        
    }
      return this._request(`${this._url}/movies`, options)
    }
 
    /*профиль*/
  //получение данных пользователя с сервера
  getProfileInfo() {
    // console.log(localStorage.getItem('token')) 
    return this._request(`${this._url}/users/me`, { headers: this._headers, })   
  }
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
    // register(data) {
    //   const options = {
    //     headers: this._headers,
    //     method: 'POST',
    //     body: JSON.stringify(data),       
    //   }
    //   return this._request(`${this._url}/signup`, options)
    // }

    //Авторизация пользователя:
    authorize(data) {
        const options = {
          headers: this._headers,
          method: 'POST',
          body: JSON.stringify(data),
          credentials: 'same-origin',
        }
        return this._request(`${this._url}/signin`, options)
    }
    //Для проверки валидности токена и получения email:

    // получение данных пользователя с сервера
    // checkToken(token) {
    //   console.log(token)
    //   return this._request(`${this._url}/users/me`, { headers: {'authorization': `Bearer ${token}`,
    //   'Content-Type': 'application/json' }})
    // }   
    //получение данных пользователя с сервера
    checkToken(token) {
     //console.log(`Bearer ${('token')}`)
    // console.log(`Bearer ${token}`) 
    return this._request(`${this._url}/users/me`, { headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }})
    }

    // getUserData() {
    //   const options = {
    //     headers: this._headers,
    //     method: 'GET',
    //     credentials: 'same-origin',
    // }
    //   return this._request(`${this._url}/users/me`, options)
    // } 
//     async getUserData() {
//     const res = await fetch(`${this._url}/users/me`, {
//         method: 'GET',
//         headers: this._headers,
//     })
//     return this._getResponse(res);
// }

//Для проверки валидности токена и получения email:
// export const checkToken = async (token) => {
//     //const token = localStorage.getItem("token");
//     const res = await fetch(`${BASE_URL}/users/me`, {
//         method: "GET",
//         headers: {
//             "Accept": "application/json",
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`
//         }
//     });
//     return getResponse(res);
// } 
  }   
//создание экземпляра класса MainApi
export const mainApi = new MainApi({
//url: 'https://api.jupiter.movies.nomoredomainsmonster.ru'
url: "http://localhost:3000",
headers: {
  "Content-Type": "application/json",
  "Accept": "application/json",
  "authorization": `Bearer ${localStorage.getItem('token')}`,
  //"authorization": "ae84b954-9fdb-4967-8466-ffa99a62c9a2",
},
});












