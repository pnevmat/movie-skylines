import movieGalleryMarkup from '../templates/myLibrary.hbs';

const refs = {
  libraryList: document.getElementById('mylib-home'),
  watchedButton: document.getElementById('watched-button'),
  queueButton: document.getElementById('queue-button'),
  header: document.querySelector(".header-js"),
  libHeaderNavigationBtns: document.querySelector(".myLibraryNavigationBox_js"),
  searchField: document.querySelector(".input-container"),
  libraryLink: document.querySelector(".library-link"),
  homeLink: document.querySelector(".home-link"),
    noList: document.querySelector('.no-list__item')

};

const filmGalleryRef = document.querySelector('.film-gallery');

function drawWatchedFilmList() {
  
  refs.header.classList.add("header-library");
  refs.libHeaderNavigationBtns.classList.remove("hideBtns");
  refs.searchField.classList.add("hideBtns");
  refs.watchedButton.classList.add("orangeBtn");
  refs.queueButton.classList.remove("orangeBtn");
  refs.libraryLink.classList.add("current");
  refs.homeLink.classList.remove("current");

  /* header.innerHTML = ''; */ //// чтобы шапка не чистилась
  filmGalleryRef.innerHTML = ''; ///очищаем юєльку
  let watchedMovieCards = localStorage.getItem('filmsWatched')
    ? JSON.parse(localStorage.getItem('filmsWatched'))
    : [];

  ////// filmGalleryRef указал это, и теперь пулит куда надо
  if (watchedMovieCards.length == 0) {
    refs.libraryList.innerHTML = '';
    refs.noList.classList.remove('is__hiden__lib');
  } else {
    refs.noList.classList.add('is__hiden__lib');
    const movieGallery = movieGalleryMarkup(watchedMovieCards);
    filmGalleryRef.insertAdjacentHTML('beforeend', movieGallery);
  }
}

function drawQueueFilmList() {

  refs.queueButton.classList.add("orangeBtn");
  refs.watchedButton.classList.remove("orangeBtn");
  
  filmGalleryRef.innerHTML = ''; ///очищаем юєльку
  let queueMovieCards = localStorage.getItem('filmsQueue')
    ? JSON.parse(localStorage.getItem('filmsQueue'))
    : [];
  if (queueMovieCards.length === 0) {
    refs.libraryList.innerHTML = '';
    refs.noList.classList.remove('is__hiden__lib');
  } else {
    refs.noList.classList.add('is__hiden__lib');
    const movieGallery = movieGalleryMarkup(queueMovieCards);
    filmGalleryRef.insertAdjacentHTML('beforeend', movieGallery);
  }
}

refs.watchedButton.addEventListener('click', drawWatchedFilmList);
refs.queueButton.addEventListener('click', drawQueueFilmList);
refs.libraryLink.addEventListener('click', drawWatchedFilmList);




