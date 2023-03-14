import { isEscapeKey } from './utils.js';
import { renderBigPicture } from './card-modal-content.js';

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
    bigCard.querySelector('.social__comment-count').classList.add('hidden'); // временная заглушка
    bigCard.querySelector('.comments-loader').classList.add('hidden'); // временная заглушка
    closeBtn.addEventListener('click', onCloseBtnClick);
    document.querySelector('body').classList.add('.modal-open');
    document.addEventListener('keydown', onDocumentKeydown);

    const publicationImgUrl = evt.target.closest('.picture').querySelector('.picture__img').getAttribute('src');

    renderBigPicture(publicationImgUrl);
  }
};

const activateBigPicture = () => cards.addEventListener('click', onCardsClick);

export { activateBigPicture };
