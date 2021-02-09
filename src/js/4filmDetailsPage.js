import filmDetailsTpl from '../templates/filmDetails.hbs';
import { drawWatchedFilmList, drawQueueFilmList } from './5libraryPage.js';
import ApiService from './apiService';

const api = new ApiService();
const movieRef = document.querySelector(".movie");
const movieListRef = document.querySelector(".film-gallery");
const backdropRef = document.querySelector(".backdrop");
const headQueueBtnRef = document.getElementById('queue-button');
const headWatchedBtnRef = document.getElementById('watched-button');

movieListRef.addEventListener('click', createMovieDetails);
backdropRef.addEventListener('click', backdropClickHandler);
  
let selectFilm = {};


//create modal content with template
function createMovieDetails(e) {
  
  if (e.target.hasAttribute('data-id')) { 
    const movieId = e.target.getAttribute('data-id');
    let url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api.API_KEY}&language=en-US`;
  
    
    fetch(url)
      .then(response => response.json())
      .then((data) => {
        movieRef.insertAdjacentHTML('beforeend', filmDetailsTpl(data));
        
        selectFilm.id = movieId;
        selectFilm.title = data.title;
        selectFilm.vote_average = data.vote_average;
        selectFilm.poster_path = data.poster_path;
        selectFilm.release_date = (data.release_date).substr(0, 4);
        selectFilm.genres = data.genres;
        
        openModalHandler();
        monitorButtonStatusText(movieId);
      });
    };
};

//open modal
function openModalHandler() {

  const watchedBtnRef = document.querySelector(".js-watched");
  const queueBtnRef = document.querySelector(".js-queue");
  const btnCloseRef = document.querySelector(".btn-close");
  
  backdropRef.classList.remove("is-hidden");
  document.body.classList.add("scroll-hidden");
  
  window.addEventListener('keydown', closeModalByEsc);
  btnCloseRef.addEventListener('click', closeModalHandler);
  watchedBtnRef.addEventListener('click', toggleToWatched);
  queueBtnRef.addEventListener('click', toggleToQueue);
};

//close modal
function closeModalHandler() {
  const watchedBtnRef = document.querySelector(".js-watched");
  const queueBtnRef = document.querySelector(".js-queue");
  const btnCloseRef = document.querySelector(".btn-close");

  movieRef.innerHTML = "";
  window.removeEventListener('keydown', closeModalByEsc);
  btnCloseRef.removeEventListener('click', closeModalHandler);
  watchedBtnRef.removeEventListener('click', toggleToWatched);
  queueBtnRef.removeEventListener('click', toggleToQueue);
  document.body.classList.remove("scroll-hidden");
  
  backdropRef.classList.add("is-hidden");
};

//close modal by Esc
function closeModalByEsc(event) {
  if (event.code === 'Escape') {
    closeModalHandler();
  };
};

//close modal by click on backdrop
function backdropClickHandler(event) {
  if (event.target === event.currentTarget) {
    closeModalHandler();
  };
};

//KOSTYL (--____--) remove an error from the console when checking a null array. Use in function monitorButtonStatusText
function createEmptyLocalStorage() {

  if (localStorage.getItem('filmsQueue') === null) {
    localStorage.setItem('filmsQueue', JSON.stringify([]));
  };

  if (localStorage.getItem('filmsWatched') === null) {
    localStorage.setItem('filmsWatched', JSON.stringify([]));
  };
};

//set text content to buttons on modal
function monitorButtonStatusText(movieId) {
  createEmptyLocalStorage();

  const watchedBtnRef = document.querySelector(".js-watched"); 
  const queueBtnRef = document.querySelector(".js-queue");

  const savedQueue = localStorage.getItem('filmsQueue');
  const savedWatched = localStorage.getItem('filmsWatched');

  if (JSON.parse(savedQueue.includes(movieId, 0))) {
    queueBtnRef.textContent = 'DELETE FROM QUEUE';
  } else {
    queueBtnRef.textContent = 'ADD TO QUEUE';
  };

  if (JSON.parse(savedWatched.includes(movieId, 0))) {
    watchedBtnRef.textContent = 'DELETE FROM WATCHED';
  } else {
    watchedBtnRef.textContent = 'ADD TO WATCHED';
  };
};

//toggle btn Queue name and toggle id in local storage
function toggleToQueue() {
  
  let queueArr = [];
  const queueBtnRef = document.querySelector(".js-queue");
  
  if (queueBtnRef.innerHTML === 'ADD TO QUEUE') {
    queueBtnRef.innerHTML = 'DELETE FROM QUEUE'
    queueArr = JSON.parse(localStorage.getItem('filmsQueue'));
    queueArr.push(selectFilm);
    localStorage.setItem('filmsQueue', JSON.stringify(queueArr));

  } else {
    queueBtnRef.innerHTML = 'ADD TO QUEUE';
    queueArr = JSON.parse(localStorage.getItem('filmsQueue'));
    queueArr = queueArr.filter(n => n.id !== selectFilm.id);
    localStorage.setItem('filmsQueue', JSON.stringify(queueArr));
  };

  if (headQueueBtnRef.classList.contains("orangeBtn")) {
    drawQueueFilmList();
    closeModalHandler();
  };
};

//toggle btn Watched name and toggle id in local storage
function toggleToWatched() {
  
  let watchedArr = [];
  const watchedBtnRef = document.querySelector(".js-watched"); 
  
  if (watchedBtnRef.innerHTML === 'ADD TO WATCHED') {
    watchedBtnRef.innerHTML = 'DELETE FROM WATCHED'
    watchedArr = JSON.parse(localStorage.getItem('filmsWatched'));
    watchedArr.push(selectFilm);
    localStorage.setItem('filmsWatched', JSON.stringify(watchedArr));

  } else {
    watchedBtnRef.innerHTML = 'ADD TO WATCHED';
    watchedArr = JSON.parse(localStorage.getItem('filmsWatched'));
    watchedArr = watchedArr.filter(n => n.id !== selectFilm.id);
    localStorage.setItem('filmsWatched', JSON.stringify(watchedArr));
  };

  if (headWatchedBtnRef.classList.contains("orangeBtn")) {
    drawWatchedFilmList();
    closeModalHandler();
  };
};