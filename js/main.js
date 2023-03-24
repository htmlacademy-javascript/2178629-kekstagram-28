import { publications } from './mock-publications.js';
import { renderCards } from './cards.js';
import { activateBigPicture } from './card-modal.js';
import { activateUploadModal } from './upload-modal.js';

renderCards(publications);
activateBigPicture();
activateUploadModal();
