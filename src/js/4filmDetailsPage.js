import filmDetailsTpl from '../templates/filmDetails.hbs';

const apiKey = '72466121c9676fc22348299f38033287';


const movieRef = document.querySelector(".movie");
const movieListRef = document.querySelector('.film-gallery');
const modalRef = document.querySelector(".backdrop");
const backdropRef = document.querySelector(".backdrop");
const watchedBtnRef = document.querySelector(".js-watched"); 
const queueBtnRef = document.querySelector(".js-queue");


movieListRef.addEventListener('click', createMovieDetails);
backdropRef.addEventListener('click', backdropClickHandler);



//create modal content with template
function createMovieDetails(e) {
  
  const movieId = e.target.getAttribute('data-id');
  let url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;
  

  fetch(url)
    .then(response => response.json())
    .then((data) => {

      movieRef.insertAdjacentHTML('beforeend', filmDetailsTpl(data));
      openModalHandler();
      
    });
};

// open modal
function openModalHandler() {
  window.addEventListener('keydown', closeModalByEsc);
  modalRef.classList.remove("is-hidden");
  document.body.classList.add("scroll-hidden");
};

//close modal
function closeModalHandler() {
  window.removeEventListener('keydown', closeModalByEsc);
  movieRef.innerHTML = "";
  document.body.classList.remove("scroll-hidden");
  
  modalRef.classList.add("is-hidden");
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



/* if (localStorage.getItem('filmsWatched') !== movieId) {
    watchedBtnRef.textContent = 'Add to watched';
  } else watchedBtnRef.textContent = 'Delete from watched';

  if (localStorage.getItem('filmsQueue') !== movieId) {
    queueBtnRef.textContent = 'Add to queue';
  } else queueBtnRef.textContent = 'Delete from queue'; */


