const cardsContainer = document.querySelector('.pictures');
const cardTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const cardsFragment = document.createDocumentFragment();

const createCard = ({url, comments, likes}) => {
  const card = cardTemplate.cloneNode(true);

  card.querySelector('.picture__img').src = url;
  card.querySelector('.picture__comments').textContent = comments.length;
  card.querySelector('.picture__likes').textContent = likes;

  return card;
};

const renderCards = (publicationsArr) => {
  publicationsArr.forEach((publication) => {
    const card = createCard(publication);
    cardsFragment.append(card);
  });

  cardsContainer.append(cardsFragment);
};

export { renderCards };
