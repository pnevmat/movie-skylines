import notify from './data/pnotify';
import createCardFunc from './1initialHomePage';
import pagesRenderer from '../templates/2searchAndPlaginationHomePage.hbs';
import ApiService from './apiService';

const apiService = new ApiService();
const paginationContainerRef = document.querySelector('.pages-container');
const searchForm = document.querySelector('#search-form-js');
const input = document.querySelector('.header-input');
const filmGallery = document.querySelector('.film-gallery');
const elem = document.querySelector('.error');

// Функция рендеринга кнопок пагинатора
const pagesRenderHandler = arr => {
  const pagesMarkup = pagesRenderer(arr);
  return paginationContainerRef.insertAdjacentHTML('afterbegin', pagesMarkup);
};

paginationContainerRef.addEventListener('click', onLoadMore);
searchForm.addEventListener('submit', searchFilms);
//-----------------------------------------------------------------------------------------------------
function searchFilms(e) {
  e.preventDefault();
  const inputValue = e.target.firstElementChild.value;
  if(inputValue === '') {
    elem.classList.remove('hidden');
    return;
  }; 
    apiService.resetPage();
    apiService.fetchFilms(inputValue).then(result => {
      console.log(result);
      if(result === [] || result.length === 0) {
        elem.classList.remove('hidden');
        input.value = "";
        return;
      } else {   
          elem.classList.add('hidden');
          input.value = "";
          filmGallery.innerHTML = '';
          const popularFilms = false;
          localStorage.setItem('queryPopularFilms', popularFilms);
          localStorage.setItem('renderGenreFilms', JSON.stringify(result));
      }
      return toMakeMarkup(result);
    }); 
};
  
function toMakeMarkup(result) { 
  createCardFunc(apiService.pageNumber, result);
  // window.scrollTo({top: filmGallery.scrollHeight, behavior: 'smooth'});  
  toShowBtn(result);
  // onLoadMore(result);
};    
  
function toShowBtn(result) {
  if (result.length > 9) {
    return paginationContainerRef.classList.remove('hidden');
  } 
  return paginationContainerRef.classList.add('hidden'); 
};

function onLoadMore(event) {
  const pageNumber = Number(event.target.id);
  const popularFilms = localStorage.getItem('queryPopularFilms');
  if (popularFilms === 'true') {
    const filmArray = JSON.parse(localStorage.getItem('renderPopularFilms'));
    createCardFunc(pageNumber, filmArray);
  } else {
    const filmArray = JSON.parse(localStorage.getItem('renderGenreFilms'));
    createCardFunc(pageNumber, filmArray);
  }
  
  event.preventDefault();
};  

export default pagesRenderHandler;