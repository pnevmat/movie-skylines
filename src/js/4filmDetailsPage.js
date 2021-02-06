import filmDetailsTpl from '../templates/filmDetails.hbs';

const apiKey = '72466121c9676fc22348299f38033287';


const movieRef = document.querySelector(".template-container");
const movieListRef = document.querySelector('.film-gallery');
const backdropRef = document.querySelector(".backdrop");
const watchedBtnRef = document.querySelector(".js-watched"); 
const queueBtnRef = document.querySelector(".js-queue");


movieListRef.addEventListener('click', createMovieDetails);
backdropRef.addEventListener('click', backdropClickHandler);

let selectFilm = {};


//create modal content with template
function createMovieDetails(e) {
  
  if (e.target.hasAttribute('data-id')) { 
    const movieId = e.target.getAttribute('data-id');
    let url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;
  
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
      });

    monitorButtonStatusText(movieId);
    };
};

//open modal
function openModalHandler() {
  window.addEventListener('keydown', closeModalByEsc);
  backdropRef.classList.remove("is-hidden");
  document.body.classList.add("scroll-hidden");
  watchedBtnRef.addEventListener('click', toggleToWatched);
  queueBtnRef.addEventListener('click', toggleToQueue);
  console.log(selectFilm);
  console.log(selectFilm.id);
};

//close modal
function closeModalHandler() {
  movieRef.innerHTML = "";
  window.removeEventListener('keydown', closeModalByEsc);
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
  
  if (queueBtnRef.innerHTML === 'ADD TO QUEUE') {
    queueBtnRef.innerHTML = 'DELETE FROM QUEUE'
    queueArr = JSON.parse(localStorage.getItem('filmsQueue'));
    queueArr.push(selectFilm);
    localStorage.setItem('filmsQueue', JSON.stringify(queueArr));

  } else {
    queueBtnRef.innerHTML = 'ADD TO QUEUE';
    queueArr = JSON.parse(localStorage.getItem('filmsQueue'));
    queueArr = queueArr.filter(item => item !== selectFilm);
    localStorage.setItem('filmsQueue', JSON.stringify(queueArr));
  };
};

//toggle btn Watched name and toggle id in local storage
function toggleToWatched() {
  let watchedArr = [];
  
  if (watchedBtnRef.innerHTML === 'ADD TO WATCHED') {
    watchedBtnRef.innerHTML = 'DELETE FROM WATCHED'
    watchedArr = JSON.parse(localStorage.getItem('filmsWatched'));
    watchedArr.push(selectFilm);
    localStorage.setItem('filmsWatched', JSON.stringify(watchedArr));

  } else {
    watchedBtnRef.innerHTML = 'ADD TO WATCHED';
    console.log('жмак');
    watchedArr = JSON.parse(localStorage.getItem('filmsWatched'));
    watchedArr = watchedArr.filter(item => item !== selectFilm);
    localStorage.setItem('filmsWatched', JSON.stringify(watchedArr));
  };
};