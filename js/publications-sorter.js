import { renderCards } from './render-cards.js';
import {
  debounce,
  getRandomUnicValue,
} from './utils.js';

const publicationsSorter = document.querySelector('.img-filters');
const sorterButtons = publicationsSorter.querySelectorAll('.img-filters__button');

const RERENDER_DELAY = 500;
const DISPLAY_RANDOM_PUBLICATIONS = 10;
let currentSorter = '';
let currentPublications;

const getDiscussedPublications = (sourcePublications) => {
  const disscussedPublications = sourcePublications.slice();
  return disscussedPublications.sort((a, b) => b.comments.length - a.comments.length);
};

const generateRandomPublications = (sourcePublications, maxAmount) => {
  const getRandomPublication = getRandomUnicValue(sourcePublications);
  return Array.from({length : maxAmount}, getRandomPublication);
};

const sortAndRenderCards = (sourcePublications) => {
  currentPublications = sourcePublications.slice();
  if (currentSorter === 'filter-random') {
    currentPublications = generateRandomPublications(sourcePublications, DISPLAY_RANDOM_PUBLICATIONS);
  }
  if (currentSorter === 'filter-discussed') {
    currentPublications = getDiscussedPublications(sourcePublications);
  }
  renderCards(currentPublications);
};

const setSorter = (cb) => {
  publicationsSorter.addEventListener('click', (evt) => {
    currentSorter = (evt.target.getAttribute('id'));
    sorterButtons.forEach((item) => item.getAttribute('id') === currentSorter ?
      item.classList.add('img-filters__button--active') :
      item.classList.remove('img-filters__button--active'));
    cb();
  });
};

const initPublicationsSorter = (publications) => {
  setTimeout(() => publicationsSorter.classList.remove('img-filters--inactive'), RERENDER_DELAY);
  setSorter(debounce(() => sortAndRenderCards(publications), RERENDER_DELAY));
};

export { initPublicationsSorter };
