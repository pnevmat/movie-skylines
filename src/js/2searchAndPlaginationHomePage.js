import notify from './data/pnotify';
// import { paginator } from "pagination";
// import filmGallaryItem from '../templates/filmGallaryItem.hbs';
const gallery = document.querySelector('.film-gallery');
const paginationBtn = document.querySelector('.paginator');
const paginator = new pagination.SearchPaginator({prelink:'/', current: 1, rowsPerPage: 9, totalResult: 1000});

paginationBtn.addEventListener('click', onLoadMore);


export default {
  baseUrl: 'https://api.themoviedb.org/3/',
  API_KEY: '72466121c9676fc22348299f38033287',
  query: '',
  pageNumber: 1,
  language: 'en-US',
  
  get queryValue() {
    return this.query;
  },
  set queryValue(val) {
    return (this.query = val);
  }, 
  setPage() {
    return this.pageNumber += 1;
  },
  resetPage() {
    return this.pageNumber = 1;
  },
  
  fetchFilms(inputValue) {
    if (inputValue && inputValue.length > 0) {
      this.queryValue = inputValue;
    } 
    const params = `search/movie?api_key=${this.API_KEY}&language=${this.language}&page=${this.pageNumber}&include_adult=false&query=${this.queryValue}`;
    const url = `${this.baseUrl}${params}`;
    return fetch(url)
    .then((res) => res.json())
    .then((result) => {
      // createCardFunc(result);
      renderFilms = result.results;
      // return renderFilms; 
      return result;   
    });
  },
 //--------- --------------------------------------------------------------------------------------------
  fetchGenres() {
    let genres = '';
    const params = `genre/movie/list?api_key=${this.API_KEY}&language=${this.language}&page=${this.pageNumber}`;
    const url = `${this.baseUrl}${params}`;
    return fetch(url)
    .then((res) => res.json())
    .then(({ data }) => {
      data.forEach(({data}) => {
        genres += data[i].name;
        console.log(genres);
      });
      return genres;
    })
  },
//---------------------------------------------------------------------------------------------
  fetchPopularsMoviesList(val) {
    this.pageNumber = val;
    const params = `movie/popular?api_key=${this.API_KEY}&language=${this.language}&page=${this.pageNumber}`;
    const url = `${this.baseUrl}${params}`;
    return fetch(url)
    .then((res) => res.json())
    .then((results ) => results)
    .then((result) => {
      // createCardFunc(result);
      renderFilms = result.results;
      // return renderFilms; 
      return result;   
    });
  },
  

//   onLoadMore(e) {
//     e.preventDefault();
//     fetchFilms(this.query, this.pageNumber);
//     setPage();
//     onPaginator();
//   },
};

///////////////////////////////////////////////////////////////////////////////////////////////
function createCardFunc(result) {
  if(result.results.length === 0) {
    notify.noticeMessage();
    return;
  };
    const card = filmDetails(result.results);
    gallery.insertAdjacentHTML("beforeend", card);
    window.scrollTo({
      top: document.documentElement.scrollHeight, behavior: 'smooth'
    });
    toShowBtn();
    onLoadMore();

    return gallery;
};

function onLoadMore(event) {
  event.preventDefault();
  api.setPage();
  paginator.getPaginationData('/', 1, 9, 943);
  api.fetchFilms(null).then(createCardFunc);
};

function toShowBtn(result) {
  if (result.results.length > 9) {
    console.log(result.results.length);
    return paginationBtn.classList.remove('hidden');
  } 
  return paginationBtn.classList.add('hidden'); 
};


//-----------------------------------------------------------------------------------------
form.addEventListener('submit', searchFilms);

function searchFilms(e) {
  e.preventDefault();
  const inputValue = e.target.query.value;
  // console.log(inputValue);
  if(inputValue === '') {
    const elem = document.querySelector('.error');
    elem.classList.remove('hidden');
    return;
  }; 
    resetPage();
    fetchFilms(inputValue).catch(notify.errorMessage); 
    elem.classList.add('hidden');
    inputValue = "";
    gallery.innerHTML = '';
};