import { renderCards } from './render-cards.js';
import {
  getRandomUnicValue,
  // getRandomInRange
} from './utils.js';

const publicationsSorter = document.querySelector('.img-filters');
const sorterButtons = publicationsSorter.querySelectorAll('.img-filters__button');
// const sorterDefault = publicationsSorter.querySelector('#filter-default');
// const sorterRandom = publicationsSorter.querySelector('#filter-random');
// const sorterDiscussed = publicationsSorter.querySelector('#filter-discussed');

let selectedSorter;

const generateRandomPublications = (sourcePublicationsArray, maxAmount) => {
  const getRandomPublication = getRandomUnicValue(sourcePublicationsArray);
  return Array.from({length : maxAmount}, getRandomPublication);
};

const startPublicationsSorter = (publications) => {

  setTimeout(() => publicationsSorter.classList.remove('img-filters--inactive'), 750);

  publicationsSorter.addEventListener('click', (evt) => {
    let currentPublications = publications.slice();
    selectedSorter = (evt.target.getAttribute('id'));
    sorterButtons.forEach((item) => item.getAttribute('id') === selectedSorter ?
      item.classList.add('img-filters__button--active') :
      item.classList.remove('img-filters__button--active'));

    if (selectedSorter === 'filter-discussed') {
      currentPublications = currentPublications.slice(5, 13);
    }
    if (selectedSorter === 'filter-random') {
      currentPublications = generateRandomPublications(currentPublications, 12);
    }
    renderCards(currentPublications);
  });
};

export { startPublicationsSorter };
