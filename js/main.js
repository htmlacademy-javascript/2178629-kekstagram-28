import { createPublications } from './mock-publications.js';
import { renderCards } from './cards.js';
import { activateBigPicture } from './card-modal.js';

const publications = createPublications();
renderCards(publications);
activateBigPicture();

export { publications };
