`use strict`;
import filmGalleryTpl from '../templates/filmGalleryItem.hbs';
import api from './apiService';

let renderFilms = [];
let genres = [];
let pageNumber = 1;

const filmGalleryRef = document.querySelector('.film-gallery');

const createCardFunc = arr => {
  const galleryItemMarkup = filmGalleryTpl(arr);
  return galleryItemMarkup;
};

const fetchPopularMoviesList = () => {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${api.API_KEY}&language=en-US&page=1`;
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const movies = data.results;
      const fragment = createCardFunc(movies);
      filmGalleryRef.insertAdjacentHTML('beforeend', fragment);
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

export default { createCardFunc };
