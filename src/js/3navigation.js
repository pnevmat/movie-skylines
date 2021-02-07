
const header = document.querySelector('header');
const libraryLink = document.querySelector('.library-link');
const homeLink = document.querySelector('.home-link');
const homePageLogo = document.querySelector('.link-logo');
// взять класс у андрея
const libraryPage = document.querySelector('.library-page'); 
const libraryBtn = document.querySelector('.myLibraryBtn');

libraryLink.addEventListener('click', () => {
    activeLibraryPage();
    drawQueueFilmList();
  });


homeLink.addEventListener('click', activeHomePage);
// homePageLogo.addEventListener('click', activeHomePage);
libraryLink.addEventListener('click', activeLibraryPage);


function activeHomePage() {
  input = '';
    activeInput();
  header.classList.add('header');
  header.classList.remove('header');
  libraryLink.classList.remove('current');
  homeLink.classList.add('current');
  libraryPage.classList.add('library');  
  libraryBtn.classList.add('library');
  localStorage.setItem('activePage', 'activeHomePage');
}

function activeLibraryPage() {
  header.classList.remove('header');
  header.classList.add('header');
  libraryLink.classList.add('current');
  libraryBtn.classList.remove('library');
  localStorage.setItem('activePage', 'activeLibraryPage');
      
}
  
function activeDetalilsPage() {
  header.classList.remove('header');
  header.classList.add('header');
  libraryLink.classList.add('current');
  libraryBtn.classList.remove('library');
  localStorage.setItem('activePage', 'activeLibraryPage');
      
}


if (localStorage.getItem('activePage') === 'activeHomePage') {
  activeHomePage();
} else {
  activeLibraryPage();
}