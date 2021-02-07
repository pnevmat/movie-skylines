import notify from './data/pnotify';
import createCardFunc from './1initialHomePage';
import { paginator } from "pagination";
import api from './apiService';


const paginationBtn = document.querySelector('.pgn');
const searchForm = document.querySelector('.header-input');
const filmGallery = document.querySelector('.film-gallery');
const elem = document.querySelector('.error');
console.log(elem);
console.log(filmGallery);
console.log(searchForm);

let paginat = new pagination.SearchPaginator({prelink: '/', current: 1,rowsPerPage: 9, totalResult: 1000});

paginationBtn.addEventListener('click', onLoadMore);
searchForm.addEventListener('submit', searchFilms);
//-----------------------------------------------------------------------------------------------------
function searchFilms(e) {
  e.preventDefault();
  const inputValue = e.target.query.value;
  console.dir(inputValue);
  if(inputValue === []) {
    elem.classList.remove('hidden');
    return;
  }; 
    resetPage();
    fetchFilms(inputValue).then(toMakeMarkup).catch(notify.errorMessage); 
    elem.classList.add('hidden');
    inputValue = "";
    filmGallery.innerHTML = '';
    
};

function toMakeMarkup(result) {
  if(result.results.length === 0) {
    notify.noticeMessage();
    return;
  };
    toShowBtn();
    onLoadMore();
    return createCardFunc();
};    
  
function toShowBtn(result) {
  if (result.results.length > 9) {
    console.log(result.results.length);
    return paginationBtn.classList.remove('hidden');
  } 
  return paginationBtn.classList.add('hidden'); 
};

function onLoadMore(event) {
  event.preventDefault();
  api.setPage();
  paginat.getPaginationData('/', 1, 9, 943);
  window.scrollTo({
    top: document.documentElement.scrollHeight, behavior: 'smooth'
  });  
  api.fetchFilms(null).then(toMakeMarkup);
};  




