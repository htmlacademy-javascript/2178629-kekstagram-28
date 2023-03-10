import { createPublications } from './mock-publications.js';
import { renderCards } from './cards.js';

const publications = createPublications();
renderCards(publications);
