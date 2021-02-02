// import notify from './data/pnotify';

export default {
  baseUrl: 'https://api.themoviedb.org/3/',
  API_KEY: '72466121c9676fc22348299f38033287',
  query: '',
  guest_session: '',
  pageNumber: 1,
  perPage: 20,
  language: 'en-US',
  
  get queryValue() {
    return this.query;
  },
  set queryValue(val) {
    return (this.query = val);
  }, 

  setPage() {
    return this.page += 1;
  },
  resetPage() {
    return this.page = 1;
  },
  
  fetchFilms(inputValue) {
    if (inputValue && inputValue.length > 0) {
      this.queryValue = inputValue;
    } 
    const params = `search/movie?api_key=${this.API_KEY}&language=${this.language}&page=${this.pageNumber}&include_adult=false&query=${this.queryValue}`;
    const url = `${this.baseUrl}${params}`;
    return fetch(url)
    .then((res) => res.json())
    .then(({ results }) => {
      return results})
  },
  
  fetchGenres() {
    let genres = '';
    const params = `genre/movie/list?api_key=${this.API_KEY}&language=${this.language}&page=${this.page}`;
    const url = `${this.baseUrl}${params}`;
    return fetch(url)
    .then((res) => res.json())
    .then(({ data }) => {
      data.forEach(({data}) => {
        genres += data[i].name;
        console.log(genres);
        return genres;
      });
    });
  },

  fetchPopularsMoviesList(val) {
    this.pageNumber = val;
    const params = `movie/popular?api_key=${this.API_KEY}&language=${this.language}&page=${this.page}`;
    const url = `${this.baseUrl}${params}`;
    return fetch(url)
    .then((res) => res.json())
    .then(({ results }) => {
      return results
    })
  },
};

///////////////////////////////////////////////////////////

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
  fetchFilms(inputValue).then(createCardFunc).catch(notify.errorMessage); 
  // input.value = "";
  // gallery.innerHTML = '';
}


