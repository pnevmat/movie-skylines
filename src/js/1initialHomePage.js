`use strict`;
import ApiService from './utils/apiService';
import allGenres from './utils/allGenres';
import filmGalleryTpl from '../templates/filmGalleryItem.hbs';
import notify from './utils/pnotify';
import pagesRenderHandler from './2searchAndPlaginationHomePage';
import moment from 'moment';

const api = new ApiService();

const filmGalleryRef = document.querySelector('.film-gallery');
const myLibraryBtnContainerRef = document.querySelector('.myLibraryNavigationBox_js');
const myLibrarySectionRef = document.querySelector('#myLib-section');

myLibraryBtnContainerRef.classList.add('hideBtns');

// Обработка запроса на получение популярных фильмов
api.fetchPopularMoviesList().then(results => {
  updateReleaseDateAndGenresHandler(results);
});

// Замена жанров и даты релиза фильмов
function updateReleaseDateAndGenresHandler(results) {
  const movies = results.map(item => ({
    ...item,
    release_date: cutReleaseDate(item.release_date),
    genre_ids: drawGenres(allGenres, item.genre_ids),
  }));
  pagesArrayHandler(movies);
  renderFilms(movies);
};

// Формирование массива номеров кнопок пагинатора
function pagesArrayHandler(arr) {
  const renderPages = [];
  arr.forEach((item, index) => {
    if (index <= arr.length / 9 + 1 && index !== 0) {
      renderPages.push(index);
    };
  });
  return pagesRenderHandler(renderPages);
};

// Запуск функции для сохранени массива фильмов в локал сторедж и запуск функции рендера карточек фильмов
const renderFilms = (movies) => {
  let pageNumber = api.resetPage();
  const popularFilms = true;
  storageHandler(popularFilms, movies);
  createCardFunc(pageNumber, movies);
};

// Сохранение массива фильмов в локал сторедж
function storageHandler(popularFilms, movies) {
  localStorage.setItem('queryPopularFilms', popularFilms);
  localStorage.setItem('renderPopularFilms', JSON.stringify(movies));
}

// Этот фетч я оставил нам для доработки - когда мы решим запустить подгрузку следующей страницы фильмов из сервака
// function fetchGenres() {
//   const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api.API_KEY}&language=en-US`;
//   return fetch(url)
//     .then(response => response.json())
//     .then(({ genres }) => {
//       return genres;
//     });
// }

// fetchGenres();

// Функция сокращающая дату релиза
function cutReleaseDate(date) {
  const cutReleaseDate = moment(date).format('YYYY');
  return cutReleaseDate;
};

// Функция для добавления словесных наименований жанров в массив фильмов
const drawGenres = (allGenres, renderGenres) => {
  return renderGenres.map(genreId =>
    allGenres.find(genre => genre.id === genreId),
  );
};

// Функция для создания карточек фильмов
const createCardFunc = (number, arr) => {
  if (number !== 1) {
    otherPagesRenderHandler(number, arr);
  } else {
    firstPageRenderHandler(number, arr);
  }
};

// Функция, которая определяет какие карточки фильмов рендерить на первой странице
function firstPageRenderHandler(number, arr) {
  const moviesToRender = arr.filter((item, index) => index <= number * 9 - 1);
  renderCardHandler(moviesToRender);
}

// Функция, которая определяет какие карточки фильмов рендерить на любой последующей странице
function otherPagesRenderHandler(number, arr) {
  const moviesToRender = arr.filter(
    (item, index) => index >= number * 9 - 1 - 8 && index <= number * 9 - 1,
  );
  renderCardHandler(moviesToRender);
}

// Функция, которая рендерит карточки фильмов подходящие под условия всех предыдущих функций
function renderCardHandler(arr) {
  const galleryItemMarkup = filmGalleryTpl(arr);
  filmGalleryRef.innerHTML = '';
  myLibrarySectionRef.classList.add('is-hiddenLib');
  filmGalleryRef.insertAdjacentHTML('beforeend', galleryItemMarkup);
}

export default createCardFunc;
