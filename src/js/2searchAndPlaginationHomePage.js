import notify from './utils/pnotify';
import createCardFunc from './1initialHomePage';
import pagesRenderer from '../templates/2searchAndPlaginationHomePage.hbs';
import ApiService from './utils/apiService';

const apiService = new ApiService();

const paginationContainerRef = document.querySelector('.pages-container');
const searchFormRef = document.querySelector('#search-form-js');
const inputRef = document.querySelector('.header-input');
const filmGalleryRef = document.querySelector('.film-gallery');
const errorStatementRef = document.querySelector('.error');

// Функция рендеринга кнопок пагинатора
const pagesRenderHandler = arr => {
  const pagesMarkup = pagesRenderer(arr);
  return paginationContainerRef.insertAdjacentHTML('afterbegin', pagesMarkup);
};

paginationContainerRef.addEventListener('click', onLoadMore);
searchFormRef.addEventListener('submit', searchFilms);
//-----------------------------------------------------------------------------------------------------
// Достает массив фильмов из локал сторедж и запускает функцию рендера карточек фильмов из поиска или из популярных
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

// Обрабатывает условия для рендера карточек фильмов из поиска по жанрам
function searchFilms(e) {
  e.preventDefault();
  const inputValue = e.target.firstElementChild.value;
  if(inputValue === '') {
    errorStatementRef.classList.remove('hidden');
    return;
  }; 
    apiService.resetPage();
    apiService.fetchFilms(inputValue).then(result => {
      if(result === [] || result.length === 0) {
        errorStatementRef.classList.remove('hidden');
        inputRef.value = "";
        return;
      } else {   
        errorStatementRef.classList.add('hidden');
        inputRef.value = "";
        filmGalleryRef.innerHTML = '';
        const popularFilms = false;
        localStorage.setItem('queryPopularFilms', popularFilms);
        localStorage.setItem('renderGenreFilms', JSON.stringify(result));
      }
      return toMakeMarkup(result);
    }); 
};

// Запускает функцию скрытия\появления пагинатора и запускает функцию рендера карточек фильмов
function toMakeMarkup(result) { 
  createCardFunc(apiService.pageNumber, result);
  // window.scrollTo({top: filmGallery.scrollHeight, behavior: 'smooth'});  
  toShowBtn(result);
  // onLoadMore(result);
};    

// Обрабатывает скрытие\появление кнопок пагинатора в зависимости от того сколько фильмов на странице
function toShowBtn(result) {
  if (result.length > 9) {
    return paginationContainerRef.classList.remove('hidden');
  } 
  return paginationContainerRef.classList.add('hidden'); 
};

export default pagesRenderHandler;