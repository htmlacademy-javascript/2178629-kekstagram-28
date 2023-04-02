import { renderCards } from './render-cards.js';
import { activateBigPicture } from './card-modal.js';
import { activateUploadModal } from './upload-modal.js';
import {
  getPublications,
  onGetDataError
} from './api.js';

// let publications = [];

(async () => {
  try {
    const publications = await getPublications ();
    renderCards(publications);
    activateBigPicture(publications);
  } catch(err) {
    onGetDataError();
  }
})();

activateUploadModal();
