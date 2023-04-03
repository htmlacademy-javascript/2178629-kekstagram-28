import { isEscapeKey } from './utils.js';
import { renderBigPicture } from './card-modal-content.js';
import { renderCommentsPortion } from './card-modal-comments.js';

const bigCard = document.querySelector('.big-picture');
const cards = document.querySelector('.pictures');
const closeBtn = bigCard.querySelector('.big-picture__cancel');
const commentsLoaderBtn = bigCard.querySelector('.comments-loader');
let publication;
let renderComments;


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
  bigCard.removeEventListener('click', onCommentsLoaderButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

const openBigCard = () => {
  bigCard.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeBtn.addEventListener('click', onCloseBtnClick);
  bigCard.addEventListener('click', onCommentsLoaderButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const onCardsClick = (publications) => (evt) => {
  if (evt.target.closest('.picture')) {
    openBigCard();
    document.querySelector('body').classList.add('modal-open');

    const publicationId = evt.target.closest('[data-publication-id]').getAttribute('data-publication-id');
    publication = publications.find((item) => item.id === +publicationId);

    renderBigPicture(publication);

    renderComments = renderCommentsPortion(publication);
    renderComments();
  }
};

function onCommentsLoaderButtonClick (evt) {
  if (evt.target === commentsLoaderBtn) {
    renderComments();
  }
}

const activateBigPicture = (publicationsArray) => cards.addEventListener('click', onCardsClick(publicationsArray));

export { activateBigPicture };
