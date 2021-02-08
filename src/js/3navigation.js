const header = document.querySelector('header');
const libraryLink = document.querySelector('.library-link');
const homeLink = document.querySelector('.home-link');
const homeLogo = document.querySelector('.logo-link');
const libraryPage = document.querySelector('.myLibraryNavigationBox_js');
const libraryBtn = document.querySelector('.myLibraryBtn');
const libraryhed = document.querySelector('.new-bcg');

homeLink.addEventListener('click', activeHomePage);
homeLogo.addEventListener('click', activeHomePage);

function activeHomePage() {
  inputValue = '';
  activeInput();
  header.classList.add('header');
  header.classList.remove('header');
  libraryLink.classList.remove('current');
  homeLink.classList.add('current');
  libraryPage.classList.add('hidden');
  localStorage.setItem('activePage', 'activeHomePage');
}

function activeLibraryPage() {
  header.classList.remove('header');
  header.classList.add('header');
  libraryPage.classList.remove('hidden');
  localStorage.setItem('activePage', 'activeLibraryPage');
}

if (localStorage.getItem('activePage') === 'activeHomePage') {
  activeHomePage();
} else {
  activeLibraryPage();
}
