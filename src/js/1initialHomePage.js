`use strict`;
import filmGalleryTpl from '../templates/filmGalleryItem.hbs';

const apiService = {
  baseUrl: 'https://api.themoviedb.org/3/',
  API_KEY: '72466121c9676fc22348299f38033287',
  query: '',
  guest_session: '',
  pageNumber: 1,
  perPage: 20,
  language: 'en-US',

  get queryValue() {
    return this.query;
  },
  set queryValue(val) {
    return (this.query = val);
  },

  fetchFilms(inputValue, pageNumber) {
    if (inputValue && inputValue.length > 0) {
      this.queryValue = inputValue;
    }
    const params = `search/movie?api_key=${this.API_KEY}&language=${this.language}&page=${pageNumber}&include_adult=false&query=${this.queryValue}`;
    const url = `${this.baseUrl}${params}`;
    return fetch(url)
      .then(res => res.json())
      .then(({ results }) => {
        return results;
      });
  },
};

const filmGalleryRef = document.querySelector('.film-gallery');

let pageNumber = 1;

const createCardFunc = arr => {
  const galleryItemMarkup = filmGalleryTpl(arr);

  // find target
  // filmGalleryRef.addEventListener('click', activeDetailsPage(movieId, false));
  return galleryItemMarkup;
};

const fetchPopularMoviesList = () => {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=72466121c9676fc22348299f38033287&language=en-US&page=1`;
  return (
    fetch(url)
      .then(response => response.json())
      // .then(({ movies }) => movies)
      .then(movies => {
        console.log(movies.results);
        const fragment = createCardFunc(movies.results);
        filmGalleryRef.insertAdjacentHTML('beforeend', fragment);
      })
  );
};

const fetchGenres = () => {
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiService.API_KEY}&language=en-US`;
  return fetch(url)
    .then(response => response.json())
    .then(({ genres }) => genres);
};

const renderFilms = fetchPopularMoviesList;
const genres = fetchGenres;

fetchPopularMoviesList();
fetchGenres();
