`use strict`;
import filmGalleryTpl from '../templates/filmGalleryItem.hbs';
import api from './apiService';
import notify from './data/pnotify';
import pagesRenderHandler from './2searchAndPlaginationHomePage';
import moment from 'moment';

let renderFilms = [];
const genres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];
let pageNumber = 1;

const filmGalleryRef = document.querySelector('.film-gallery');
const searchFormRef = document.querySelector('#search-form-js');
const btnsRef = document.querySelector('.myLibraryNavigationBox_js');

btnsRef.classList.add('hideBtns');

const createCardFunc = (number, arr) => {
  if (number !== 1) {
    otherPagesRenderHandler(number, arr);
  } else {
    firstPageRenderHandler(number, arr);
  }
};

function firstPageRenderHandler(number, arr) {
  const moviesToRender = arr.filter((item, index) => index <= number * 9 - 1);
  renderCardHandler(moviesToRender);
}

function otherPagesRenderHandler(number, arr) {
  const moviesToRender = arr.filter(
    (item, index) => index >= number * 9 - 1 - 8 && index <= number * 9 - 1,
  );
  renderCardHandler(moviesToRender);
}

function renderCardHandler(arr) {
  const galleryItemMarkup = filmGalleryTpl(arr);
  filmGalleryRef.innerHTML = '';
  myLibrarySectionRef.classList.add('is-hiddenLib');
  filmGalleryRef.insertAdjacentHTML('beforeend', galleryItemMarkup);
}

const fetchPopularMoviesList = () => {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${api.API_KEY}&language=en-US&page=1`;
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      renderFilms = data.results.map(movie => cutReleaseDate(movie));

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
      return data.results;
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

function cutReleaseDate(obj) {
  const movie = obj;
  const cutReleaseDate = moment(movie.release_date).format('YYYY');
  movie.release_date = cutReleaseDate;
  return movie;
}

export default createCardFunc;
