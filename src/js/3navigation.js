
const header = document.querySelector('header');
const libraryLink = document.querySelector('.library-link');
const homeLink = document.querySelector('.home-link');
const homeLogo = document.querySelector('.link-logo');
const libraryPage = document.querySelector('.myLibraryNavigationBox_js'); 
const libraryBtn = document.querySelector('.myLibraryBtn');
 const libraryhed = document.querySelector('.new-bcg');

libraryLink.addEventListener('click', () => {
    activeLibraryPage();
    drawQueueFilmList();
  });


homeLink.addEventListener('click', activeHomePage);
homeLogo.addEventListener('click', activeHomePage);
// libraryLink.addEventListener('click', activeLibraryPage);


function activeHomePage() {
  inputValue = '';
  activeInput();
   header.classList.add('header');
  header.classList.remove('header');
  libraryLink.classList.remove('current');
  homeLink.classList.add('current');
  libraryPage.classList.add('hidden');  
  // libraryBtn.classList.add('hidden');
  localStorage.setItem('activePage', 'activeHomePage');
  libraryhed.classList.add('is-hiddenLib')
}

function activeLibraryPage() {
  header.classList.remove('header');
  header.classList.add('header');
  libraryLink.classList.add('current');
  // libraryBtn.classList.remove('library');
  libraryPage.classList.remove('hidden');
  localStorage.setItem('activePage', 'activeLibraryPage');
libraryhed.classList.remove('is-hiddenLib')
}
  
// // function activeDetalilsPage() {



if (localStorage.getItem('activePage') === 'activeHomePage') {
  activeHomePage();
} else {
  activeLibraryPage();
}