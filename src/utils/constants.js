// Константы для точек перелома ширины экрана
const SCREEN_WIDTH_LARGE = 1150;
const SCREEN_WIDTH_MEDIUM = 800;
const SCREEN_WIDTH_SMALL = 650;

// Константы для количества фильмов на странице
const MOVIES_COUNT_LARGE = 16;
const MOVIES_COUNT_MEDIUM = 12;
const MOVIES_COUNT_SMALL = 8;
const MOVIES_COUNT_EXTRA_SMALL = 5;

// Константы для дополнительных фильмов при нажатии кнопки 'Еще'
const MOVIES_TO_ADD_LARGE = 4;
const MOVIES_TO_ADD_MEDIUM = 3;
const MOVIES_TO_ADD_SMALL = 2;
const MOVIES_TO_ADD_EXTRA_SMALL = 2;

// Константа для продолжительности короткометражного фильма
const SHORT_FILM_DURATION = 40;

// Константа для задержки таймера
const RESIZE_DELAY = 300;

export {
    SCREEN_WIDTH_LARGE,
    SCREEN_WIDTH_MEDIUM,
    SCREEN_WIDTH_SMALL,
    MOVIES_COUNT_LARGE,
    MOVIES_COUNT_MEDIUM,
    MOVIES_COUNT_SMALL,
    MOVIES_COUNT_EXTRA_SMALL,
    MOVIES_TO_ADD_LARGE,
    MOVIES_TO_ADD_MEDIUM,
    MOVIES_TO_ADD_SMALL,
    MOVIES_TO_ADD_EXTRA_SMALL,
    SHORT_FILM_DURATION,
    RESIZE_DELAY,
}

 // управление кнопкой 'Еще'
  // function handleMoreClick() {
  //   let moviesToAd = 0;
  //   if (screenWidth > 1150) {
  //     moviesToAd = 4;
  //   } else if (screenWidth > 800) {
  //     moviesToAd = 3;
  //   } else if (screenWidth > 650) {
  //     moviesToAd = 2;
  //   } else {
  //     moviesToAd = 2;
  //   }
  //   // добавление фильмов для дополнительной загрузки на страницу к предыдущим
  //   setMoviesCountOnPage((prevCount) => prevCount + moviesToAd);
  // }
  