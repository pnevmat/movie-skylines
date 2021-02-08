import notify from './data/pnotify';
import createCardFunc from './1initialHomePage';
import pagesRenderer from '../templates/2searchAndPlaginationHomePage.hbs';
// import fetchPopularMoviesList from './1initialHomePage';
// import { paginator } from "pagination";
import ApiService from './apiService';

const apiService = new ApiService();
const paginationContainerRef = document.querySelector('.pages-container');
const searchForm = document.querySelector('#search-form-js');
const filmGallery = document.querySelector('.film-gallery');
const elem = document.querySelector('.error');

// console.log(elem);
// console.log(filmGallery);
// console.log(searchForm);

// Функция рендеринга кнопок пагинатора
const pagesRenderHandler = arr => {
  const pagesMarkup = pagesRenderer(arr);
  return paginationContainerRef.insertAdjacentHTML('afterbegin', pagesMarkup);
};

paginationContainerRef.addEventListener('click', onLoadMore);
searchForm.addEventListener('submit', searchFilms);
console.log(searchForm);
//-----------------------------------------------------------------------------------------------------
function searchFilms(e) {
  e.preventDefault();
  // console.dir(e.target);
  const inputValue = e.target.firstElementChild.value;
  console.log(inputValue);
  if(inputValue === '') {
    elem.classList.remove('hidden');
    return;
  }; 
    apiService.resetPage();
    // apiService.searchQuery = inputValue;
    apiService.fetchFilms(inputValue).then(films => toMakeMarkup(films)).catch(notify.errorMessage); 
    elem.classList.add('hidden');
    // inputValue = "";
    filmGallery.innerHTML = '';
    
  };
  
  function toMakeMarkup(result) {
    
    if(result.length === 0) {
      console.log(result);
      notify.noticeMessage();
      return;
    };
      createCardFunc(apiService.pageNumber, result);
      // const markup = cardsTpl(result.results);
      // filmGallery.insertAdjacentHTML('beforeend', markup);
      window.scrollTo({
        top: document.documentElement.scrollHeight, behavior: 'smooth'
      });  
      toShowBtn(result);
      onLoadMore(result);
};    
  
function toShowBtn(result) {
  if (result.results.length > 9) {
    // console.log(result.results.length);
    return paginationBtn.classList.remove('hidden');
  } 
  return paginationBtn.classList.add('hidden'); 
};

function onLoadMore(event) {
  const pageNumber = Number(event.target.id);
  const popularFilms = localStorage.getItem('queryPopularFilms');
  if (popularFilms === true) {
    const filmArray = JSON.parse(localStorage.getItem('renderPopularFilms'));
    createCardFunc(pageNumber, filmArray);
  } else {
    const filmArray = JSON.parse(localStorage.getItem('renderGenreFilms'));
    createCardFunc(pageNumber, filmArray);
  }
  
  event.preventDefault();
};  

export default pagesRenderHandler;

