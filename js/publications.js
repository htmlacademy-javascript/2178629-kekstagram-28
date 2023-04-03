import { renderCards } from './render-cards.js';
import { activateBigPicture } from './card-modal.js';
import {
  getPublications,
  onGetDataError
} from './api.js';

const renderPublications = async () => {
  try {
    const publications = await getPublications();
    renderCards(publications);
    activateBigPicture(publications);
  } catch(err) {
    onGetDataError();
  }
};

export { renderPublications };
