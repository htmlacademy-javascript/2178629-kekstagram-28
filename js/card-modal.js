import { isEscapeKey } from './utils.js';

const bigCard = document.querySelector('.big-picture');
const cards = document.querySelector('.pictures');
const closeBtn = bigCard.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigCard.classList.add('hidden');
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const onCloseBtnClick = () => {
  bigCard.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onCardsClick = (evt) => {
  if (evt.target.closest('.picture')) {
    bigCard.classList.remove('hidden');
    closeBtn.addEventListener('click', onCloseBtnClick);
    document.addEventListener('keydown', onDocumentKeydown);
  }
};

const activateBigPicture = () => cards.addEventListener('click', onCardsClick);

export { activateBigPicture };
