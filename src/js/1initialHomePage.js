`use strict`;
import ApiService from './utils/apiService';
import allGenres from './utils/allGenres';
import filmGalleryTpl from '../templates/filmGalleryItem.hbs';
import unposteredFilmGalleryTpl from '../templates/unposteredFilmGalleryTpl.hbs';
import movieGalleryMarkup from '../templates/myLibrary.hbs';
import unposteredMovieGalleryMarkup from '../templates/unposteredMyLibrary.hbs';
import notify from './utils/pnotify';
import pagesRenderHandler from './2searchAndPlaginationHomePage';
import moment from 'moment';
import placeholder from '../images/no-poster.png';

const api = new ApiService();

const filmGalleryRef = document.querySelector('.film-gallery');
const myLibraryBtnContainerRef = document.querySelector('.myLibraryNavigationBox_js');
const myLibrarySectionRef = document.querySelector('#myLib-section');

myLibraryBtnContainerRef.classList.add('hideBtns');

// Обработка запроса на получение популярных фильмов
api.fetchPopularMoviesList().then(results => {
  popularFilmsRenderIdentifier(results);
});

// Функция определяющая рендер популярных фильмов
function popularFilmsRenderIdentifier(results) {
  const popularFilms = true;
  let pageNumber = api.resetPage();
  updateReleaseDateAndGenresHandler(results, popularFilms, pageNumber);
};

// Замена жанров и даты релиза фильмов
export function updateReleaseDateAndGenresHandler(results, popularFilms, pageNumber) {
  const movies = results.map(item => ({
    ...item,
    release_date: cutReleaseDate(item.release_date),
    genre_ids: drawGenres(allGenres, item.genre_ids),
  }));
  unposteredFilmsHandler(movies, popularFilms, pageNumber);
};

// Функция для замены отсутствующих постеров фильмов на плейсхолдеры
function unposteredFilmsHandler(movies, popularFilms, pageNumber) {
  const addMissedPlaceholders = movies.map(item => {
    if (item.poster_path === null) {
      item.poster_path = placeholder;
      return item;
    } else {
      return item;
    };
  });
  pagesArrayHandler(addMissedPlaceholders);
  renderFilms(addMissedPlaceholders, popularFilms, pageNumber);
}

// Формирование массива номеров кнопок пагинатора
export function pagesArrayHandler(arr) {
  const renderPages = [];
  arr.forEach((item, index) => {
    if (index <= arr.length / 9 + 1 && index !== 0) {
      renderPages.push(index);
    };
  });
  return pagesRenderHandler(renderPages);
};

// Запуск функции для сохранения массива фильмов в локал сторедж и запуск функции рендера карточек фильмов
const renderFilms = (movies, popularFilms, pageNumber) => {
  storageHandler(popularFilms, movies);
  createCardFunc(pageNumber, movies);
};

// Сохранение массива фильмов в локал сторедж
function storageHandler(popularFilms, movies) {
  localStorage.setItem('queryPopularFilms', popularFilms);
  if (popularFilms === true || popularFilms === 'true') {
    localStorage.setItem('renderPopularFilms', JSON.stringify(movies));
  } else {
    localStorage.setItem('renderGenreFilms', JSON.stringify(movies));
  };
};

// Функция сокращающая дату релиза
function cutReleaseDate(date) {
  const cutReleaseDate = moment(date).format('YYYY');
  return cutReleaseDate;
};

// Функция для добавления словесных наименований жанров в массив фильмов
const drawGenres = (allGenres, renderGenres) => {
  return renderGenres.map(genreId =>
    allGenres.find(genre => genre.id === genreId)
  );
};

// Функция для создания карточек фильмов
export const createCardFunc = (number, arr) => {
  if (number !== 1) {
    otherPagesRenderHandler(number, arr);
  } else {
    firstPageRenderHandler(number, arr);
  };
};

// Функция, которая определяет какие карточки фильмов рендерить на первой странице
function firstPageRenderHandler(number, arr) {
  const moviesToRender = arr.filter((item, index) => index <= number * 9 - 1);
  moviesArrayDevider(moviesToRender);
};

// Функция, которая определяет какие карточки фильмов рендерить на любой последующей странице
function otherPagesRenderHandler(number, arr) {
  // debugger;
  const moviesToRender = arr.filter(
    (item, index) => index >= number * 9 - 1 - 8 && index <= number * 9 - 1,
  );
  const popularFilms = localStorage.getItem('queryPopularFilms');
  const activePage = localStorage.getItem('activePage');
  if (moviesToRender.length < 9 && popularFilms === 'true' && activePage === 'activeHomePage') {
    api.setFetchPage();
    api.fetchPopularMoviesList().then(result => {
      const upendNextPageArray = [...arr, ...result];
      return updateReleaseDateAndGenresHandler(upendNextPageArray, popularFilms, number);
    });
  } else if (moviesToRender.length < 9 && popularFilms === 'false' && activePage === 'activeHomePage') {
    api.setFetchPage();
    api.queryValue = localStorage.getItem('queryValue');
    api.fetchFilms().then(result => {
      const upendNextPageArray = [...arr, ...result];
      return updateReleaseDateAndGenresHandler(upendNextPageArray, popularFilms, number);
    });
  } else {
    moviesArrayDevider(moviesToRender);
  };
};

// Функция, которая разделяет массив фильмов на те что с постерами и без
function moviesArrayDevider(arr) {
  const posteredFilms = arr.filter(item => item.poster_path !== placeholder);
  const unposteredFilms = arr.filter(item => item.poster_path === placeholder);
  if (unposteredFilms.length === 0) {
    renderCardHandler(posteredFilms);
  } else {
    renderCardHandler(posteredFilms, unposteredFilms);
  };
};

// Функция, которая создает разметку
function renderCardHandler(posteredFilms, unposteredFilms) {
  if (localStorage.getItem('activePage') === 'activeLibraryPage') {
    watchedAndQueueMovieGalleryMarkup(posteredFilms, unposteredFilms);
  } else {
    popularAndGenreMovieGalleryMarkup(posteredFilms, unposteredFilms);
  };
};

// Функция, которая создает разметку для библиотеки фильмов
function watchedAndQueueMovieGalleryMarkup(posteredFilms, unposteredFilms) {
  if (unposteredFilms === undefined) {
    const galleryItemMarkup = movieGalleryMarkup(posteredFilms);
    insertMarkupToDomHandler(galleryItemMarkup);
  } else {
    const posteredFilmMarkup = movieGalleryMarkup(posteredFilms);
    const unposteredFilmMarkup = unposteredMovieGalleryMarkup(unposteredFilms);
    const galleryItemMarkup = posteredFilmMarkup + unposteredFilmMarkup;
    insertMarkupToDomHandler(galleryItemMarkup);
  };
};

// Функция, которая создает разметку для главной страницы и поиска по жанрам
function popularAndGenreMovieGalleryMarkup(posteredFilms, unposteredFilms) {
  if (unposteredFilms === undefined) {
    const galleryItemMarkup = filmGalleryTpl(posteredFilms);
    insertMarkupToDomHandler(galleryItemMarkup);
  } else {
    const posteredFilmMarkup = filmGalleryTpl(posteredFilms);
    const unposteredFilmMarkup = unposteredFilmGalleryTpl(unposteredFilms);
    const galleryItemMarkup = posteredFilmMarkup + unposteredFilmMarkup;
    insertMarkupToDomHandler(galleryItemMarkup);
  };
};

// Функция, которая рендерит карточки фильмов подходящие под условия всех предыдущих функций
function insertMarkupToDomHandler(markup) {
  filmGalleryRef.innerHTML = '';
  myLibrarySectionRef.classList.add('is-hiddenLib');
  filmGalleryRef.insertAdjacentHTML('beforeend', markup);
};