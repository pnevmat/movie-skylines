import header from '../html/header.html';
import homePage from '../html/homePage.html';
import myFilmLibraryPage from '../html/myFilmLibraryPage.html';
import detailsPage from '../html/detailsPage.html';
import main from '../html/main.html';
import footer from '../html/footer.html';

const htmlArray = [
    {
        header: header,
        main: main,
        footer: footer
    },
    {
        homePage: homePage,
        myFilmLibraryPage: myFilmLibraryPage,
        detailsPage: detailsPage,
    },
];

const bodyRef = document.querySelector('body');
// debugger
function bodyContentHanndler(arr) {
    arr.map((item,index) => {
        if (index === 0) {
            bodyRef.insertAdjacentHTML('afterBegin', item.footer);
            bodyRef.insertAdjacentHTML('afterBegin', item.main);
            bodyRef.insertAdjacentHTML('afterBegin', item.header);
        }
    })
};

function mainContentHandler(arr) {
    const mainRef = document.querySelector('main');
    arr.map((item,index) => {
        if (index === 1 && mainRef !== null) {
            mainRef.insertAdjacentHTML('beforeEnd', item.homePage);
            mainRef.insertAdjacentHTML('beforeEnd', item.myFilmLibraryPage);
            mainRef.insertAdjacentHTML('beforeEnd', item.detailsPage);
        }
    })
}

bodyContentHanndler(htmlArray);
mainContentHandler(htmlArray);

