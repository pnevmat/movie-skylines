import initialHomeJs from './1initialHomePage';

export default {
  baseUrl: 'https://api.themoviedb.org/3/',
  API_KEY: '72466121c9676fc22348299f38033287',
  query: '',
  language: 'en-US',
  pageNumber: 1,

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
    const params = `search/movie?api_key=${this.API_KEY}&language=${this.language}&page=${pageNumber}&include_adult=false&query=${this.queryValue}`;
    const url = `${this.baseUrl}${params}`;
    return fetch(url)
    .then((res) => res.json())
    .then((result) => {
      // renderFilms = result.results;
      // return renderFilms; 
      return result;   
    });
    
  },

    // fetchGenres() {
  //   let genres = '';
  //   const params = `genre/movie/list?api_key=${this.API_KEY}&language=${this.language}&page=${this.pageNumber}`;
  //   const url = `${this.baseUrl}${params}`;
  //   return fetch(url)
  //   .then((res) => res.json())
  //   .then(({ data }) => {
  //     data.forEach(({data}) => {
  //       genres += data[i].name;
  //       console.log(genres);
  //     });
  //     return genres;
  //   })
  // },
//---------------------------------------------------------------------------------------------
  // fetchPopularsMoviesList(val) {
  //   this.pageNumber = val;
  //   const params = `movie/popular?api_key=${this.API_KEY}&language=${this.language}&page=${this.pageNumber}`;
  //   const url = `${this.baseUrl}${params}`;
  //   return fetch(url)
  //   .then((res) => res.json())
  //   .then((results ) => results)
  //   .then((result) => {
  //     // createCardFunc(result);
  //     renderFilms = result.results;
  //     // return renderFilms; 
  //     return result;   
  //   });
  // },
  
};
