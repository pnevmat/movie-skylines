import notify from './utils/pnotify';
import createCardFunc from './1initialHomePage';
import pagesRenderer from '../templates/2searchAndPlaginationHomePage.hbs';
import ApiService from './utils/apiService';
import moment from 'moment';
import allGenres from './utils/allGenres';
​
const apiService = new ApiService();
​
const paginationContainerRef = document.querySelector('.pages-container');
const searchFormRef = document.querySelector('#search-form-js');
const inputRef = document.querySelector('.header-input');
const filmGalleryRef = document.querySelector('.film-gallery');
const errorStatementRef = document.querySelector('.error');
​
// Функция рендеринга кнопок пагинатора
const pagesRenderHandler = arr => {
  const pagesMarkup = pagesRenderer(arr);
  return paginationContainerRef.insertAdjacentHTML('afterbegin', pagesMarkup);
};
​
paginationContainerRef.addEventListener('click', onLoadMore);
searchFormRef.addEventListener('submit', searchFilms);
//-----------------------------------------------------------------------------------------------------
// Достает массив фильмов из локал сторедж и запускает функцию рендера карточек фильмов из поиска или из популярных
function onLoadMore(event) {
  const pageNumber = Number(event.target.id);
  const popularFilms = localStorage.getItem('queryPopularFilms');
  if (popularFilms === 'true') {
    const filmArray = JSON.parse(localStorage.getItem('renderPopularFilms'));
    createCardFunc(pageNumber, filmArray);
  } else {
    const filmArray = JSON.parse(localStorage.getItem('renderGenreFilms'));
    createCardFunc(pageNumber, filmArray);
  }
​
  event.preventDefault();
}
​
// Обрабатывает условия для рендера карточек фильмов из поиска по жанрам
function searchFilms(e) {
  e.preventDefault();
  const inputValue = e.target.firstElementChild.value;
  if (inputValue === '') {
    errorStatementRef.classList.remove('hidden');
    return;
  }
  apiService.resetPage();
  apiService.fetchFilms(inputValue).then(result => {
    if (result === [] || result.length === 0) {
      errorStatementRef.classList.remove('hidden');
      inputRef.value = '';
      return;
    } else {
      errorStatementRef.classList.add('hidden');
      inputRef.value = '';
      filmGalleryRef.innerHTML = '';
      const popularFilms = false;
      localStorage.setItem('queryPopularFilms', popularFilms);
      localStorage.setItem('renderGenreFilms', JSON.stringify(result));
    }
    return toMakeMarkup(updateReleaseDateAndGenresHandler(result));
  });
}
​
// Запускает функцию скрытия\появления пагинатора и запускает функцию рендера карточек фильмов
function toMakeMarkup(result) {
  createCardFunc(apiService.pageNumber, result);
  // window.scrollTo({top: filmGallery.scrollHeight, behavior: 'smooth'});
  toShowBtn(result);
  // onLoadMore(result);
}
​
// Обрабатывает скрытие\появление кнопок пагинатора в зависимости от того сколько фильмов на странице
function toShowBtn(result) {
  if (result.length > 9) {
    return paginationContainerRef.classList.remove('hidden');
  }
  return paginationContainerRef.classList.add('hidden');
}
​
const myLibraryBtnContainerRef = document.querySelector(
  '.myLibraryNavigationBox_js',
);
myLibraryBtnContainerRef.classList.add('hideBtns');
​
// Замена жанров и даты релиза фильмов
function updateReleaseDateAndGenresHandler(results) {
  const movies = results.map(item => ({
    ...item,
    release_date: cutReleaseDate(item.release_date),
    genre_ids: drawGenres(allGenres, item.genre_ids),
  }));
  // pagesArrayHandler(movies);
  renderFilms(movies);
}
​
// Запуск функции для сохранени массива фильмов в локал сторедж и запуск функции рендера карточек фильмов
const renderFilms = movies => {
  let pageNumber = apiService.resetPage();
  const popularFilms = true;
  storageHandler(popularFilms, movies);
  createCardFunc(pageNumber, movies);
};
​
// Сохранение массива фильмов в локал сторедж
function storageHandler(popularFilms, movies) {
  localStorage.setItem('queryPopularFilms', popularFilms);
  localStorage.setItem('renderPopularFilms', JSON.stringify(movies));
}
// Функция сокращающая дату релиза
function cutReleaseDate(date) {
  const cutReleaseDate = moment(date).format('YYYY');
  return cutReleaseDate;
}
​
// Функция для добавления словесных наименований жанров в массив фильмов
const drawGenres = (allGenres, renderGenres) => {
  return renderGenres.map(genreId =>
    allGenres.find(genre => genre.id === genreId),
  );
};
​
// Функция, которая определяет какие карточки фильмов рендерить на первой странице
function firstPageRenderHandler(number, arr) {
  const moviesToRender = arr.filter((item, index) => index <= number * 9 - 1);
  renderCardHandler(moviesToRender);
}
​
// Функция, которая определяет какие карточки фильмов рендерить на любой последующей странице
function otherPagesRenderHandler(number, arr) {
  const moviesToRender = arr.filter(
    (item, index) => index >= number * 9 - 1 - 8 && index <= number * 9 - 1,
  );
  renderCardHandler(moviesToRender);
}
​
// Функция, которая рендерит карточки фильмов подходящие под условия всех предыдущих функций
function renderCardHandler(arr) {
  const galleryItemMarkup = filmGalleryTpl(arr);
  filmGalleryRef.innerHTML = '';
  myLibrarySectionRef.classList.add('is-hiddenLib');
  filmGalleryRef.insertAdjacentHTML('beforeend', galleryItemMarkup);
}
​
export default pagesRenderHandler;



// `use strict`;
// import filmGalleryTpl from '../templates/filmGalleryItem.hbs';
// import ApiService from './apiService';
// import notify from './data/pnotify';
// import pagesRenderHandler from './2searchAndPlaginationHomePage';

// let renderFilms = [];
// let genres = [];
// let pageNumber = 1;
// const api = new ApiService();

// const filmGalleryRef = document.querySelector('.film-gallery');
// const btnsRef = document.querySelector('.myLibraryNavigationBox_js');
// const myLibrarySectionRef = document.querySelector('#myLib-section');

// btnsRef.classList.add('hideBtns');

// const createCardFunc = (number, arr) => {
//   if (number !== 1) {
//     otherPagesRenderHandler(number, arr);
//   } else {
//     firstPageRenderHandler(number, arr);
//   }
// };

// function firstPageRenderHandler(number, arr) {
//   const moviesToRender = arr.filter((item, index) => index <= (number * 9 - 1));
//   renderCardHandler(moviesToRender);
// };

// function otherPagesRenderHandler(number, arr) {
//   const moviesToRender = arr.filter((item, index) => index >= (number * 9 - 1) - 8 && index <= (number * 9 - 1));
//   renderCardHandler(moviesToRender);
// };

// function renderCardHandler(arr) {
//   const galleryItemMarkup = filmGalleryTpl(arr);
//   filmGalleryRef.innerHTML = '';
//   myLibrarySectionRef.classList.add('is-hiddenLib');
//   filmGalleryRef.insertAdjacentHTML('beforeend', galleryItemMarkup);
// };

// const fetchPopularMoviesList = () => {
//   const url = `https://api.themoviedb.org/3/movie/popular?api_key=${api.API_KEY}&language=en-US&page=1`;
//   return fetch(url)
//     .then(response => response.json())
//     .then(data => {
//       renderFilms = data.results;
//       const renderPages = [];
//       renderFilms.forEach((item, index) => {
//         if (index <= renderFilms.length / 9 + 1 && index !== 0) {
//           renderPages.push(index);
//         }
//       });
//       const popularFilms = true;
//       localStorage.setItem('queryPopularFilms', popularFilms);
//       pagesRenderHandler(renderPages);
//       createCardFunc(pageNumber, renderFilms);
//       localStorage.setItem('renderPopularFilms', JSON.stringify(renderFilms));
//     });
// };

// fetchPopularMoviesList();

// export const apiService = {
//   key: '72466121c9676fc22348299f38033287',
//   searchQuery: '',
//   page: 1,

//   fetchFilms(inputValue) {
//     const url = encodeURI(`https://api.themoviedb.org/3/search/movie?api_key=${this.key}&language=en-US&include_adult=false&query=${inputValue}`);
//     return fetch(url)
//       .then(response => response.json())
//       .then(data => data.results);
//   },
//   resetPage() {
//     this.page = 1;
//   },
//   get query() {
//     return this.searchQuery;
//   },
//   set query(newQery) {
//     this.searchQuery = newQery;
//   },
// };

// export default createCardFunc;