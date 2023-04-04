import { renderCards } from './render-cards.js';
import { startPublicationsSorter } from './publications-sorter.js';
import { activateBigPicture } from './card-modal.js';
import {
  getPublications,
  onGetDataError
} from './api.js';

const renderPublications = async () => {
  try {
    const publications = await getPublications();
    renderCards(publications);
    startPublicationsSorter(publications);
    activateBigPicture(publications);
  } catch(err) {
    onGetDataError();
  }
};

export { renderPublications };
