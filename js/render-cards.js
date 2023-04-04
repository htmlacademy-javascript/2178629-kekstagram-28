
const createCard = ({id, url, comments, likes}) => {
  const cardTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  const card = cardTemplate.cloneNode(true);

  card.dataset.publicationId = id;
  card.querySelector('.picture__img').src = url;
  card.querySelector('.picture__comments').textContent = comments.length;
  card.querySelector('.picture__likes').textContent = likes;

  return card;
};

const clearCardsList = (cardsListParent, cardsAtrr) => {
  const elementsToRemove = cardsListParent.querySelectorAll(cardsAtrr);
  elementsToRemove.forEach((item) => item.remove());
};

const renderCards = (publicationsArr) => {

  const cardsFragment = document.createDocumentFragment();
  const cardsContainer = document.querySelector('.pictures');

  clearCardsList(cardsContainer, '.picture');

  publicationsArr.forEach((publication) => {
    const card = createCard(publication);
    cardsFragment.append(card);
  });

  cardsContainer.append(cardsFragment);
};

export { renderCards };
