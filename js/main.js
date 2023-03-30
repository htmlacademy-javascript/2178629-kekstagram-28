import { publications } from './mock-publications.js';
import { renderCards } from './cards.js';
import { activateBigPicture } from './card-modal.js';
import { activateUploadModal } from './upload-modal.js';
import { loader } from './load.js';

const loadPublications = loader(console.log, console.error);

renderCards(publications);
activateBigPicture();
activateUploadModal();

loadPublications();
