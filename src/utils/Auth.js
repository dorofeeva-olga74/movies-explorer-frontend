// const BASE_URL = 'jupiter.movies.nomoredomainsmonster.ru'
//const BASE_URL = "https://api.jupiter.nomoredomainsmonster.ru";
const BASE_URL = 'http://localhost:3000';

// Приватный метод ответа сервера
const getResponse = (res) => {
  // console.log(res);
  if (res.ok) {
    return res.json();
  }
  if (res.status === 403) {
    // Выбрасываю исключение с текстом ошибки
    throw new Error("INVALID_TOKEN");
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

// Регистрация пользователя:
export const register = async (data) => {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // отправляю данные на сервер
  };
  try {
    const res = await fetch(`${BASE_URL}/signup`, options);
    return getResponse(res);
  } catch (error) {
    console.log(error);
  }
};

// Авторизация пользователя:
export const authorize = async ({ password, email }) => {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  };
  try {
    const res = await fetch(`${BASE_URL}/signin`, options);
    return getResponse(res);
  } catch (error) {
    console.log(error);
  }
};
// Получение данных пользователя от сервера
export const getProfileInfo = async (token) => {
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await fetch(`${BASE_URL}/users/me`, options);
    return getResponse(res);
  } catch (error) {
    console.log(error);
  }
};

// Для проверки валидности токена и получения email:
export const checkToken = async (token) => {
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await fetch(`${BASE_URL}/users/me`, options);
    return getResponse(res);
  } catch (error) {
    console.log(error);
  }
};
// Изменение данных пользователя - отправляет запрос на изменение данных пользователя
export const changeUserData = async (data, token) => {
  console.log(data);
  const options = {
    method: 'PATCH',
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
    }),
  };
  try {
    const res = await fetch(`${BASE_URL}/users/me`, options);
    return getResponse(res);
  } catch (error) {
    console.log(error);
  }
};
