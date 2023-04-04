import { renderCards } from './render-cards.js';
import {
  getRandomUnicValue,
} from './utils.js';

const DISPLAY_RANDOM_PUBLICATIONS = 10;

const publicationsSorter = document.querySelector('.img-filters');
const sorterButtons = publicationsSorter.querySelectorAll('.img-filters__button');

let currentSorter = '';
let currentPublications = [];

const getDiscussedPublications = (sourcePublications) => {
  const disscussedPublications = sourcePublications.sort((a, b) => b.comments.length - a.comments.length);
  return disscussedPublications;
};

const generateRandomPublications = (sourcePublications, maxAmount) => {
  const getRandomPublication = getRandomUnicValue(sourcePublications);
  return Array.from({length : maxAmount}, getRandomPublication);
};

const sortAndRenderCards = (sourcePublications) => {
  if (currentSorter === 'filter-discussed') {
    currentPublications = getDiscussedPublications(sourcePublications);
  }
  if (currentSorter === 'filter-random') {
    currentPublications = generateRandomPublications(sourcePublications, DISPLAY_RANDOM_PUBLICATIONS);
  }
  renderCards(currentPublications);
};

const startPublicationsSorter = (publications) => {

  setTimeout(() => publicationsSorter.classList.remove('img-filters--inactive'), 500);

  publicationsSorter.addEventListener('click', (evt) => {

    currentPublications = publications.slice();

    currentSorter = (evt.target.getAttribute('id'));
    sorterButtons.forEach((item) => item.getAttribute('id') === currentSorter ?
      item.classList.add('img-filters__button--active') :
      item.classList.remove('img-filters__button--active'));
    sortAndRenderCards(currentPublications);
  });
};

export { startPublicationsSorter };
