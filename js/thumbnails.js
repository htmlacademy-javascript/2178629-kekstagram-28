import { createPublications } from './mock-publications.js';

const publications = createPublications();

const publicationsList = document.querySelector('.pictures');
const publicationTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const publicationsListFragment = document.createDocumentFragment();

publications.forEach(({url, comments, likes}) => {
  const currentPublication = publicationTemplate.cloneNode(true);
  currentPublication.querySelector('.picture__img').src = url;
  currentPublication.querySelector('.picture__comments').textContent = comments.length;
  currentPublication.querySelector('.picture__likes').textContent = likes;
  publicationsListFragment.appendChild(currentPublication);
});

publicationsList.appendChild(publicationsListFragment);
