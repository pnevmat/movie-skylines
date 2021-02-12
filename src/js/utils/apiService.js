import initialHomeJs from '../1initialHomePage';

export default class ApiService {
  constructor() {
    this.baseUrl = 'https://api.themoviedb.org/3/';
    this.API_KEY = '72466121c9676fc22348299f38033287';
    this.query = '';
    this.language = 'en-US';
    this.pageNumber = 1;
  }

  get queryValue() {
    return this.query;
  };
  set queryValue(val) {
    return (this.query = val);
  };
  setPage = () => {
    return this.pageNumber += 1;
  };
  resetPage = () => {
    return this.pageNumber = 1;
  };

  fetchPopularMoviesList = () => {
    const params = `movie/popular?api_key=${this.API_KEY}&language=${this.language}&page=${this.pageNumber}`;
    const url = `${this.baseUrl}${params}`;
    return fetch(url)
      .then(response => response.json())
      .then(data => data.results);
  };

  fetchFilms = (inputValue) => {
    if (inputValue && inputValue.length > 0) {
      this.queryValue = inputValue;
    } 
    const params = `search/movie?api_key=${this.API_KEY}&language=${this.language}&page=${this.pageNumber}&include_adult=false&query=${this.queryValue}`;
    const url = `${this.baseUrl}${params}`;
    return fetch(url)
    .then((res) => res.json())
    .then((result) => {
      return result.results;   
    });
    
  };
};
