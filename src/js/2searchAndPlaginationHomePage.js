import notify from './data/pnotify';


export default {
  baseUrl: 'https://api.themoviedb.org/3/',
  API_KEY: '72466121c9676fc22348299f38033287',
  query: '',
  guest_session: '',
  pageNumber: 1,
  perPage: 20,
  language: 'en-US',
  // sort_by: created_at.desc,
  
  get queryValue() {
    return this.query;
  },
  set queryValue(val) {
    return (this.query = val);
  }, 
  
  fetchFilms(val) {
    if (val && val.length > 0) {
      this.queryValue = val
    } 
    const params = `search/movie?api_key=${this.API_KEY}&language=${this.language}&page=${this.pageNumber}&include_adult=false&query=${this.queryValue}`;
    const url = `${this.baseUrl}${params}`;
    return fetch(url)
    .then((res) => res.json())
    .then(({ results }) => {
      return results})
  },
  
  fetchGenres() {
    const params = `genre/movie/list?api_key=${this.API_KEY}&language=${this.language}&page=${this.page}`;
    const url = `${this.baseUrl}${params}`;
    return fetch(url)
    .then((res) => res.json())
    .then(({ data }) => {
      data.forEach(({data}) => {
        const genres = '';
        genres += data[i].name;
        console.log(genres);
        return genres;
      });
    });
  },

  fetchPopulars() {
    const params = `movie/popular?api_key=${this.API_KEY}&language=${this.language}&page=${this.page}`;
    const url = `${this.baseUrl}${params}`;
    return fetch(url)
    .then((res) => res.json())
    .then(({ results }) => {
      return results})
  },

};


///////////////////////////////////////////////////////////

form.addEventListener('submit', searchFilms);

function searchFilms(e) {
  e.preventDefault();
  const inputValue = e.target.query.value;
  // console.log(inputValue);
  if(inputValue === '') {
    notify.noticeMessage();
    return;
  }; 
  // apiObject.resetPage();
  apiObject.fetchFilms(inputValue).then(toMakeMarkup).catch(notify.errorMessage); 
  // input.value = "";
  // gallery.innerHTML = '';

}


























  // метод добавления стницы
  // setPage() {
  //   return this.page += 1;
  // },
  // метод сброса страниц
  // resetPage() {
  //   return this.page = 1;
  // },
  // async getFetch() {
    //   // this.queryValue = val;
    //   const URL = `${this.baseUrl}?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=${this.perPage}&key=${this.API_KEY}`;
    //   const response = await fetch(URL);
    //   const fetchResult = await response.json();
    //   const imgs = await fetchResult.hits;
    //   return imgs;
    // },