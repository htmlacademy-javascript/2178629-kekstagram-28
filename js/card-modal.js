import { isEscapeKey } from './utils.js';
import { renderBigPicture } from './card-modal-content.js';
import { publications } from './mock-publications.js';

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
  document.body.classList.remove('modal-open');
  closeBtn.removeEventListener('click', onCloseBtnClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

const unhideBigCard = () => {
  bigCard.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeBtn.addEventListener('click', onCloseBtnClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const onCardsClick = (evt) => {
  if (evt.target.closest('.picture')) {
    unhideBigCard();
    bigCard.querySelector('.social__comment-count').classList.add('hidden'); // временная заглушка
    bigCard.querySelector('.comments-loader').classList.add('hidden'); // временная заглушка
    document.querySelector('body').classList.add('modal-open');

    const publicationId = evt.target.closest('[data-publication-id]').getAttribute('data-publication-id');
    const publication = publications.find((item) => item.id === +publicationId);

    renderBigPicture(publication);
  }
};

const activateBigPicture = () => cards.addEventListener('click', onCardsClick);

export { activateBigPicture };
