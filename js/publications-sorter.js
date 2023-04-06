import { renderCards } from './render-cards.js';
import {
  debounce,
  getRandomUnicValue,
} from './utils.js';

const publicationsSorter = document.querySelector('.img-filters');
const publicationsSorterButtons = document.querySelector('.img-filters__form');

const RERENDER_DELAY = 500;
const DISPLAY_RANDOM_PUBLICATIONS = 10;
let sourcePublications;
let currentPublications;
let currentSorter = '';

const Sorters = {
  DEFAULT :
    {
      idName : 'filter-default',
      considerSecondClick : false,
      handler() {
        getDefaultPublications();
      },
    },
  RANDOM :
    {
      idName : 'filter-random',
      considerSecondClick : true,
      handler() {
        generateRandomPublications();
      }
    },
  DISCUSSED :
    {
      idName : 'filter-discussed',
      considerSecondClick : false,
      handler() {
        getDiscussedPublications();
      },
    },
};

const getSorterKey = (value) => Object.keys(Sorters).find((key) => Sorters[key].idName === value);

const sortAndRenderCards = () => {
  Sorters[currentSorter].handler();
  renderCards(currentPublications);
};

const setSorterButton = (elementToSetActive) => {
  const currentActiveElevent = publicationsSorterButtons.querySelector('.img-filters__button--active');
  currentActiveElevent.classList.remove('img-filters__button--active');
  elementToSetActive.classList.add('img-filters__button--active');
};

const onPublicationsSorterButtonsClick = (cb) => (evt) => {
  const clickedElement = evt.target;
  if (!clickedElement.classList.contains('img-filters__button--active')) {
    setSorterButton(clickedElement);
    currentSorter = getSorterKey(clickedElement.id);
    cb();
  } else if (Sorters[currentSorter].considerSecondClick) {
    cb();
  }
};

const setSorter = (cb) => {
  publicationsSorterButtons.addEventListener('click', onPublicationsSorterButtonsClick(cb));
};

const initPublicationsSorter = (enteredArray) => {
  sourcePublications = enteredArray;
  publicationsSorter.classList.remove('img-filters--inactive');
  setSorter(debounce(sortAndRenderCards, RERENDER_DELAY));
};


function getDefaultPublications() {
  currentPublications = sourcePublications.slice();
  return currentPublications;
}

function generateRandomPublications() {
  const getRandomPublication = getRandomUnicValue(sourcePublications);
  currentPublications = Array.from({length : DISPLAY_RANDOM_PUBLICATIONS}, getRandomPublication);
  return currentPublications;
}

function getDiscussedPublications() {
  currentPublications = sourcePublications.slice();
  return currentPublications.sort((a, b) => b.comments.length - a.comments.length);
}

export { initPublicationsSorter };
