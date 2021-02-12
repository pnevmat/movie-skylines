const headerRef = document.querySelector('header');
const libraryLinkRef = document.querySelector('.library-link');
const homeLinkRef = document.querySelector('.home-link');
const homeLogoRef = document.querySelector('.logo-link');
const libraryPage = document.querySelector('.myLibraryNavigationBox_js');
const libraryBtn = document.querySelector('.myLibraryBtn');
const libraryhed = document.querySelector('.new-bcg');

homeLinkRef.addEventListener('click', activeHomePage);
homeLogoRef.addEventListener('click', activeHomePage);

// Активирует стили хедера домашней страницы
function activeHomePage() {
  inputValue = '';
  activeInput();
  // headerRef.classList.add('header');
  headerRef.classList.remove('header');
  libraryLinkRef.classList.remove('current');
  homeLinkRef.classList.add('current');
  libraryPage.classList.add('hidden');
  localStorage.setItem('activePage', 'activeHomePage');
};

// Активирует стили хедера страницы библиотеки фильмов
function activeLibraryPage() {
  // headerRef.classList.remove('header');
  headerRef.classList.add('header');
  libraryPage.classList.remove('hidden');
  localStorage.setItem('activePage', 'activeLibraryPage');
}

// Вызывает функции замены стилей хедера домашней страницы или билиотеки фильмов по условию
if (localStorage.getItem('activePage') === 'activeHomePage') {
  activeHomePage();
} else {
  activeLibraryPage();
}
