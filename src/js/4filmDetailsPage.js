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
    
    const queueArr = ["555", "300"];
    const watchedArr = ["411", "258", "555"];

    localStorage.setItem('filmsQueue', JSON.stringify(queueArr));
    localStorage.setItem('filmsWatched', JSON.stringify(watchedArr));

    monitorButtonStatusText(movieId);
    };
};

// open modal
function openModalHandler() {
  window.addEventListener('keydown', closeModalByEsc);
  backdropRef.classList.remove("is-hidden");
  document.body.classList.add("scroll-hidden");

  queueBtnRef.addEventListener('click', toggle (function (){
    console.log("first");
    if (queueBtnRef.textContent = 'Add to queue') {
      queueBtnRef.textContent = 'Delete from queue';
      return;
    };
    if (queueBtnRef.textContent = 'Delete from queue') {
      queueBtnRef.textContent = 'Add to queue';
      return;
    }; 
  }, function (){
      console.log("second");
      if (queueBtnRef.textContent = 'Delete from queue') {
        queueBtnRef.textContent = 'Add to queue';
        return;
      };
      if (queueBtnRef.textContent = 'Add to queue') {
        queueBtnRef.textContent = 'Delete from queue';
        return;
      };
}));
};

//close modal
function closeModalHandler() {
  window.removeEventListener('keydown', closeModalByEsc);
  movieRef.innerHTML = "";
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
    queueBtnRef.textContent = 'Delete from queue';
  } else {
    queueBtnRef.textContent = 'Add to queue';
  };

  if (JSON.parse(savedWatched.includes(movieId, 0))) {
    watchedBtnRef.textContent = 'Delete from watched';
  } else {
    watchedBtnRef.textContent = 'Add to watched';
  };
};

let queueArr = [];
let watchedArr = [];

var toggle = function (a, b) {
    var togg = false;
    return function () {
        // passes return value back to caller
        return (togg = !togg) ? a() : b();
    };
};



function toggleToQueue() {
  let queueArr = [];
  const idInfo = selectFilm.id;
  
  if (queueBtnRef.textContent = 'Add to queue') {
    queueArr = JSON.parse(localStorage.getItem('filmsQueue'));
    queueArr.push(idInfo);
    localStorage.setItem('filmsQueue', JSON.stringify(queueArr));
    queueBtnRef.textContent = 'Remove from queue';
    let queueArr = [];
    return;
  };
  if (queueBtnRef.textContent = 'Remove from queue') {
    queueArr = JSON.parse(localStorage.getItem('filmsQueue'));
    queueArr = queueArr.filter(item => item !== idInfo);
    localStorage.setItem('filmsQueue', JSON.stringify(queueArr));
    queueBtnRef.textContent = 'Add to queue';
    let queueArr = [];
    return;
  };
};



/* let queueArr = [];
let watchedArr = []

function toggleToQueue() {
  if (queueBtnRef.textContent = 'Add to queue')
  const idInfo = selectFilm.id;
  if (queueBtnRef.textContent = 'Add to queue') {
    queueArr = JSON.parse(localStorage.getItem('filmsQueue'));
    queueArr.push(idInfo);
  }
} */


