import movieGalleryMarkup from '../templates/myLibrary.hbs';
// import json from './film.json'

const refs = {
  libraryList: document.getElementById('mylib-home'),
  watchedButton: document.getElementById('watched-button'),
  queueButton: document.getElementById('queue-button'),
};

function drawWatchedFilmList() {
  const main = document.querySelector('main');
  const filmGalleryRef = document.querySelector('.film-gallery');
  const header = document.querySelector('header');

  header.innerHTML = '';
  filmGalleryRef.innerHTML = '';
  let watchedMovieCards = localStorage.getItem('filmsWatched')
    ? JSON.parse(localStorage.getItem('filmsWatched'))
    : [];

  console.log('gfhhgjhk');

  if (watchedMovieCards.length == 0) {
    refs.libraryList.insertAdjacentElement(
      'beforeend',
      `<div class="no-list">
            <h2 class="no-list__item">“You do not have watched movies. Add them.”</h2>
        </div>`,
    );
  } else {
    refs.libraryList.innerHTML = '';
    const movieGallery = movieGalleryMarkup(watchedMovieCards);
    main.insertAdjacentHTML('beforebegin', movieGallery);
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
    refs.libraryList.innerHTML = '';
    queueMovieCards.forEach(movie => {
      const movieGallery = movieGalleryMarkup(movie);
      refs.libraryList.insertAdjacentHTML('beforeend', movieGallery);
    });
  }
}

const libraryLink = document.querySelector('.library-link');
refs.watchedButton.addEventListener('click', drawWatchedFilmList);
refs.queueButton.addEventListener('click', drawQueueFilmList);
libraryLink.addEventListener('click', drawWatchedFilmList);
