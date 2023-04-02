import { renderCards } from './cards.js';
import { activateBigPicture } from './card-modal.js';
import { activateUploadModal } from './upload-modal.js';
import { getPublications } from './api.js';

const publications = await getPublications ();

renderCards(publications);
activateBigPicture();
activateUploadModal();

export { publications };
