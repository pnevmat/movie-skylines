`use strict`;
import filmGalleryTpl from '../templates/filmGalleryItem.hbs';
import api from './apiService';
import notify from './data/pnotify';
import pagesRenderHandler from './2searchAndPlaginationHomePage';

let renderFilms = [];
let genres = [];
let pageNumber = 1;

const filmGalleryRef = document.querySelector('.film-gallery');
const searchFormRef = document.querySelector('#search-form-js');
const btnsRef = document.querySelector('.myLibraryNavigationBox_js');

btnsRef.classList.add('hideBtns');

const createCardFunc = (number, arr) => {
  if (number !== 1) {
    const moviesToRender = arr.filter((item, index) => index >= (number * 9 - 1) - 8 && index <= (number * 9 - 1));
    const galleryItemMarkup = filmGalleryTpl(moviesToRender);
    filmGalleryRef.innerHTML = '';
    filmGalleryRef.insertAdjacentHTML('beforeend', galleryItemMarkup);
  } else {
    const moviesToRender = arr.filter((item, index) => index <= (number * 9 - 1));
    const galleryItemMarkup = filmGalleryTpl(moviesToRender);
    filmGalleryRef.innerHTML = '';
    filmGalleryRef.insertAdjacentHTML('beforeend', galleryItemMarkup);
  }
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
      pagesRenderHandler(renderPages);
      const fragment = createCardFunc(pageNumber, renderFilms);
      localStorage.setItem('renderFilms', JSON.stringify(renderFilms));
    });
};

const fetchGenres = () => {
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api.API_KEY}&language=en-US`;
  return fetch(url)
    .then(response => response.json())
    .then(({ genres }) => genres);
};

fetchPopularMoviesList();
fetchGenres();

const apiService = {
  key: '72466121c9676fc22348299f38033287',
  searchQuery: '',
  page: 1,
  fetchFilms() {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${this.key}&language=en-US&page=${this.page}&include_adult=false&query=${this.searchQuery}`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        const movies = data.results;
        const fragment = createCardFunc(movies);
        filmGalleryRef.insertAdjacentHTML('beforeend', fragment);
      });
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

searchFormRef.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  apiService.query = form.elements.query.value;
  filmGalleryRef.innerHTML = '';
  apiService.fetchFilms();

  if (apiService.query === '') {
    notify.noticeMessage();
    return;
  }

  form.reset();
});

export default createCardFunc;
