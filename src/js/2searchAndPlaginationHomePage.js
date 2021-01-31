
export default {
  baseUrl: 'https://api.themoviedb.org/3/movie/',
  API_KEY: '72466121c9676fc22348299f38033287',
  movie_id: '',
  page: 1,
  perPage: 20,
  language: en-US,
  sort_by: created_at.desc,
  
  get queryValue() {
    return this.movie_id;
  },
  set queryValue(val) {
    return (this.movie_id = val);
  }, 
  
  getFetch(val) {
    // this.queryValue = val; 
    if (val && val.length > 0) {
      this.queryValue = val
    } 
      const params = `${this.movie_id}/account_states?api_key=${this.API_KEY}&language=${this.language}&sort_by=${this.sort_by}`;
      const url = `${this.baseUrl}${params}`;
      let options = {
        method: "GET",
        headers: {
          
        }
      },  

    return fetch(url, options)
    .then((res) => res.json())
    .then((response) => response)
  },

  // метод добавления стницы
  setPage() {
    return this.page += 1;
  },
  // метод сброса страниц
  resetPage() {
    return this.page = 1;
  },
};  



  // async getFetch() {
    //   // this.queryValue = val;
    //   const URL = `${this.baseUrl}?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=${this.perPage}&key=${this.API_KEY}`;
    //   const response = await fetch(URL);
    //   const fetchResult = await response.json();
    //   const imgs = await fetchResult.hits;
    //   return imgs;
    // },