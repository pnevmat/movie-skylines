`use strict`;
import filmGalleryTpl from '../templates/filmGalleryItem.hbs';
import ApiService from './apiService';
import notify from './data/pnotify';
import pagesRenderHandler from './2searchAndPlaginationHomePage';

let renderFilms = [];
let genres = [];
let pageNumber = 1;
const api = new ApiService();

const filmGalleryRef = document.querySelector('.film-gallery');
const searchFormRef = document.querySelector('#search-form-js');
const btnsRef = document.querySelector('.myLibraryNavigationBox_js');
const myLibrarySectionRef = document.querySelector('#myLib-section');

btnsRef.classList.add('hideBtns');

const createCardFunc = (number, arr) => {
  if (number !== 1) {
    otherPagesRenderHandler(number, arr);
  } else {
    firstPageRenderHandler(number, arr);
  }
};

function firstPageRenderHandler(number, arr) {
  const moviesToRender = arr.filter((item, index) => index <= (number * 9 - 1));
  renderCardHandler(moviesToRender);
};

function otherPagesRenderHandler(number, arr) {
  const moviesToRender = arr.filter((item, index) => index >= (number * 9 - 1) - 8 && index <= (number * 9 - 1));
  renderCardHandler(moviesToRender);
};

function renderCardHandler(arr) {
  // console.log(arr);
  const galleryItemMarkup = filmGalleryTpl(arr);
  console.log(galleryItemMarkup);
  filmGalleryRef.innerHTML = '';
  myLibrarySectionRef.classList.add('is-hiddenLib');
  filmGalleryRef.insertAdjacentHTML('beforeend', galleryItemMarkup);
};

const fetchPopularMoviesList = () => {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${api.API_KEY}&language=en-US&page=1`;
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      renderFilms = data.results;
      const renderPages = [];
      renderFilms.forEach((item, index) => {
        if (index <= renderFilms.length / 9 + 1 && index !== 0) {
          renderPages.push(index);
        }
      });
      const popularFilms = true;
      localStorage.setItem('queryPopularFilms', popularFilms);
      pagesRenderHandler(renderPages);
      createCardFunc(pageNumber, renderFilms);
      localStorage.setItem('renderPopularFilms', JSON.stringify(renderFilms));
    });
};

// const fetchGenres = () => {
//   const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api.API_KEY}&language=en-US`;
//   return fetch(url)
//     .then(response => response.json())
//     .then(({ genres }) => genres);
// };

fetchPopularMoviesList();
// fetchGenres();

export const apiService = {
  key: '72466121c9676fc22348299f38033287',
  searchQuery: '',
  page: 1,
  // fetchGenres() {
  //   const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api.API_KEY}&language=en-US`;
  //   return fetch(url)
  //     .then(response => response.json())
  //     .then(({ genres }) => {
  //       const queryOject = genres.filter(item => item.name === `${apiService.searchQuery}`)
  //       const query = toString(queryOject[0].id);
  //       apiService.fetchFilms(query);
  //     });
  // },
  fetchFilms(inputValue) {
    const url = encodeURI(`https://api.themoviedb.org/3/search/movie?api_key=${this.key}&language=en-US&include_adult=false&query=${inputValue}`);
    return fetch(url)
      .then(response => response.json())
      .then(data => console.log(data.results));
  },
  resetPage() {
    this.page = 1;
  },
  get query() {
    return this.searchQuery;
  },
  set query(newQery) {
    this.searchQuery = newQery;
  },
};

// function fo() {
//   const movies = data.results;
//         // console.log(movies);
//         // debugger;
//         const popularFilms = false;
//         localStorage.setItem('queryPopularFilms', popularFilms);
//         localStorage.setItem('renderGenreFilms', JSON.stringify(movies));
//         const fragment = createCardFunc(pageNumber, movies);
//         filmGalleryRef.insertAdjacentHTML('beforeend', fragment);
// }

// searchFormRef.addEventListener('submit', event => {
//   event.preventDefault();
//   const form = event.currentTarget;
//   apiService.query = form.elements.query.value;
//   filmGalleryRef.innerHTML = '';
//   apiService.fetchFilms();

//   if (apiService.query === '') {
//     notify.noticeMessage();
//     return;
//   }

//   form.reset();
// });

export default createCardFunc;