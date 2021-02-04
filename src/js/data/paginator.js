// import { pagination } from 'pagination';
import api from '../2searchAndPlaginationHomePage';

const paginationBtn = document.querySelector('.paginator');
paginationBtn.addEventListener('click', () => {
  e.preventDefault();
  api.fetchFilms(query, pageNumber);
  setPage();
  onPaginator();
});

export default {
  prelink: '/',
  current: 1,
  previous: 0,
  next: 2,
  first: 1,
  last: 51,
  range: [ 1, 2, 3, 4, 5 ],
  total_results: '',
  total_pages: '',
 
  onPaginator() {
   this.total_results = totalResult;
   this.total_pages = pageCount;

   const pagination = require('pagination');
   const paginator = new pagination.SearchPaginator({
     prelink:'/', 
     current: 3, 
     rowsPerPage: 20, 
     totalResult: 10020});
   console.log(paginator.getPaginationData());
  }
}; 