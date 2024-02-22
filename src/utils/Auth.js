// const BASE_URL = 'jupiter.movies.nomoredomainsmonster.ru' 
// const BASE_URL =  'localhost:3000';
//const BASE_URL = "https://api.jupiter.nomoredomainsmonster.ru";
const BASE_URL = "http://localhost:3000" ;

//приватный метод ответа сервера
const getResponse = (res) => {
    //console.log(res)
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

// Регистрация пользователя:
export const register = async (data) => {//data /* здесь должны быть параметры */
    const res = await fetch(`${BASE_URL}/signup`, {
    //       const res = await fetch(`signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),//data /* отправляем данные на сервер */
    });
    //console.log(res)
    return getResponse(res);
};
//Авторизация пользователя:
export const authorize = async ({ password, email }) => {
    const res = await fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email }),
    });
    return getResponse(res);
};

//Для проверки валидности токена и получения email:
// export const checkToken = async (token) => {
//     const res = await fetch(`${BASE_URL}/users/me`, {
//         method: 'GET',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`
//         }
//     });
//     return getResponse(res);
// }
//Для проверки валидности токена и получения email:
export const checkToken = async (token) => {
    //const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    });
    return getResponse(res);
}