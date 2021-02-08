import movieGalleryMarkup from '../templates/myLibrary.hbs';
// import json from './film.json'



const refs = {
  libraryList: document.getElementById('mylib-home'),
  watchedButton: document.getElementById('watched-button'),
  queueButton: document.getElementById('queue-button'),
  header: document.querySelector(".header-js"),
  libHeaderNavigationBtns: document.querySelector(".myLibraryNavigationBox_js"),
  searchField: document.querySelector(".input-container"),
  libraryLink: document.querySelector(".library-link"),
  homeLink: document.querySelector(".home-link")
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
    refs.libraryList.insertAdjacentElement(
      'beforeend',
      `<div class="no-list">
            <h2 class="no-list__item">“You do not have watched movies. Add them.”</h2>
        </div>`,
    );
  } else {
    /* refs.libraryList.innerHTML = ''; */
    const movieGallery = movieGalleryMarkup(watchedMovieCards);
    filmGalleryRef.insertAdjacentHTML('beforeend', movieGallery);
  }
}

// =======
//     let watchedMovieCards = localStorage.getItem('filmsWatched')? JSON.parse(localStorage.getItem('filmsWatched')) : [];
//   if (watchedMovieCards.length == 0) {
//         refs.libraryList.insertAdjacentElement('beforeend',
//          `<div class="no-list">
//             <h2 class="no-list__item">“You do not have watched movies. Add them.”</h2>
//         </div>`);
//   } else {
//         refs.libraryList.innerHTML = '';
//         watchedMovieCards.forEach(movie => {
//         const movieGallery = movieGalleryMarkup(movie);
//         refs.libraryList.insertAdjacentHTML('beforeend', movieGallery);
//     });
//   }
// }

function drawQueueFilmList() {

  refs.queueButton.classList.add("orangeBtn");
  refs.watchedButton.classList.remove("orangeBtn");
  
  filmGalleryRef.innerHTML = ''; ///очищаем юєльку
  let queueMovieCards = localStorage.getItem('filmsQueue')
    ? JSON.parse(localStorage.getItem('filmsQueue'))
    : [];
  if (queueMovieCards.length === 0) {
    return refs.libraryList.insertAdjacentElement(
      'beforeend',
      `<div class="no-list">
            <h2 class="no-list__item">You do not have to queue movies to watch. Add them.</h2>
        </div>`,
    );
  } else {
    console.log(queueMovieCards);
    /* refs.libraryList.innerHTML = ''; */
    
      const movieGallery = movieGalleryMarkup(queueMovieCards);
      filmGalleryRef.insertAdjacentHTML('beforeend', movieGallery);

  }
}


refs.watchedButton.addEventListener('click', drawWatchedFilmList);
refs.queueButton.addEventListener('click', drawQueueFilmList);
refs.libraryLink.addEventListener('click', drawWatchedFilmList);




////////////////////////////// это я включаю один хеадер и выключаю
/* const mainHeadRef = document.querySelector(".header");
const libHeadRef = document.querySelector('.new-bcg');
  
mainHeadRef = style.display = "none";

libHeadRef.style.display = "block"; */




