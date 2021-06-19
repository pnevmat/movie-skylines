import notify from './utils/pnotify';
import {createCardFunc} from './1initialHomePage';
import {updateReleaseDateAndGenresHandler} from './1initialHomePage';
import pagesRenderer from '../templates/2searchAndPlaginationHomePage.hbs';
import ApiService from './utils/apiService';

const apiService = new ApiService();

const paginationPreviousButtonRef = document.querySelector('.paginator-previous');
const paginationNextButtonRef = document.querySelector('.paginator-next');
const paginationContainerRef = document.querySelector('.pages-container');
const searchFormRef = document.querySelector('#search-form-js');
const inputRef = document.querySelector('.header-input');
const filmGalleryRef = document.querySelector('.film-gallery');
const errorStatementRef = document.querySelector('.error');

// Функция рендеринга кнопок пагинатора
const pagesRenderHandler = arr => {
  paginationContainerRef.innerHTML = '';
  const pagesMarkup = pagesRenderer(arr);
  return paginationContainerRef.insertAdjacentHTML('afterbegin', pagesMarkup);
};

paginationPreviousButtonRef.addEventListener('click', onLeftRightButtonClick);
paginationNextButtonRef.addEventListener('click', onLeftRightButtonClick);
paginationContainerRef.addEventListener('click', onLeftRightButtonClick);
searchFormRef.addEventListener('submit', searchFilms);
//-----------------------------------------------------------------------------------------------------
// Функция определяет нажали ли на кнопу, если да,
// то на какую кнопку нажали и соответственно устанавливает значение pageNumber
function onLeftRightButtonClick(event) {
  if (event.target.nodeName === 'BUTTON' || event.target.nodeName === 'svg' || event.target.nodeName === 'path') {
  } else {return};
  if (event.target.id !== 'previous' && event.target.id !== 'next') {
    const pageNumber = Number(event.target.id);
    console.log(pageNumber);
    apiService.pageNumber = pageNumber;
    pageActiveFilterHandler(pageNumber);
  } else if (event.target.id === 'next' && apiService.pageNumber < paginationContainerRef.childElementCount) {
    const pageNumber = apiService.setPage();
    pageActiveFilterHandler(pageNumber);
  } else if (event.target.id === 'previous' && apiService.pageNumber !== 1) {
    const pageNumber = apiService.decreasePage();
    pageActiveFilterHandler(pageNumber);
  };

  event.preventDefault();
};

function pageActiveFilterHandler(pageNumber) {
  if (localStorage.getItem('activePage') === 'activeHomePage') {
    onLoadMoreHomePage(pageNumber);
  } else {
    onLoadMoreLibraryPage(pageNumber);
  };
};

// Достает массив фильмов из локал сторедж и запускает функцию рендера карточек фильмов из поиска или из популярных
function onLoadMoreHomePage(pageNumber) {
  // debugger;
  const popularFilms = localStorage.getItem('queryPopularFilms');
  if (popularFilms === 'true') {
    const filmArray = JSON.parse(localStorage.getItem('renderPopularFilms'));
    createCardFunc(pageNumber, filmArray);
  } else {
    const filmArray = JSON.parse(localStorage.getItem('renderGenreFilms'));
    createCardFunc(pageNumber, filmArray);
  };
};

function onLoadMoreLibraryPage(pageNumber) {
  const WatchedFilms = localStorage.getItem('queryWatchedFilms');
  if (WatchedFilms === 'true') {
    const filmArray = JSON.parse(localStorage.getItem('filmsWatched'));
    createCardFunc(pageNumber, filmArray);
  } else {
    const filmArray = JSON.parse(localStorage.getItem('filmsQueue'));
    createCardFunc(pageNumber, filmArray);
  };
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
    localStorage.setItem('queryValue', inputValue);
    apiService.queryValue = inputValue;
    apiService.fetchFilms().then(result => {
      if(result === [] || result.length === 0) {
        errorStatementRef.classList.remove('hidden');
        inputRef.value = "";
        return;
      } else {   
        errorStatementRef.classList.add('hidden');
        inputRef.value = "";
        filmGalleryRef.innerHTML = '';
      };
      return genreFilmsRenderIdentifier(result);
    }); 
};

// Функция определяющая рендер фильмов по жанрам
function genreFilmsRenderIdentifier(result) {
  const popularFilms = false;
  let pageNumber = apiService.pageNumber;
  toMakeMarkup(result, popularFilms, pageNumber);
};

// Запускает функцию скрытия\появления пагинатора и запускает функцию рендера карточек фильмов
function toMakeMarkup(result, popularFilms, pageNumber) {
  updateReleaseDateAndGenresHandler(result, popularFilms, pageNumber);
  // window.scrollTo({top: filmGallery.scrollHeight, behavior: 'smooth'});  
  toShowBtn(result);
  // onLoadMore(result);
};    

// Обрабатывает скрытие\появление кнопок пагинатора в зависимости от того сколько фильмов на странице
function toShowBtn(result) {
  if (result.length > 9) {
    return paginationContainerRef.classList.remove('hidden');
  }; 
  return paginationContainerRef.classList.add('hidden'); 
};

export default pagesRenderHandler;