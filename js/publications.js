import { renderCards } from './render-cards.js';
import { initPublicationsSorter } from './publications-sorter.js';
import { initBigPicture } from './card-modal.js';
import {
  getPublications,
  onGetDataError
} from './api.js';

const renderPublications = async () => {
  try {
    const publications = await getPublications();
    renderCards(publications);
    initPublicationsSorter(publications);
    initBigPicture(publications);
  } catch(err) {
    onGetDataError();
  }
};

export { renderPublications };
