import { isEscapeKey } from './utils.js';
import { renderBigPicture } from './card-modal-content.js';

const bigCard = document.querySelector('.big-picture');
const cards = document.querySelector('.pictures');
const closeBtn = bigCard.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideBigCard();
  }
};

const onCloseBtnClick = () => {
  hideBigCard();
};

function hideBigCard() {
  bigCard.classList.add('hidden');
  closeBtn.removeEventListener('click', onCloseBtnClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

const unhideBigCard = () => {
  bigCard.classList.remove('hidden');
  closeBtn.addEventListener('click', onCloseBtnClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const onCardsClick = (evt) => {
  if (evt.target.closest('.picture')) {
    unhideBigCard();
    bigCard.querySelector('.social__comment-count').classList.add('hidden'); // временная заглушка
    bigCard.querySelector('.comments-loader').classList.add('hidden'); // временная заглушка
    document.querySelector('body').classList.add('.modal-open');

    const publicationImgUrl = evt.target.closest('.picture').querySelector('.picture__img').getAttribute('src');

    renderBigPicture(publicationImgUrl);
  }
};

const activateBigPicture = () => cards.addEventListener('click', onCardsClick);

export { activateBigPicture };
