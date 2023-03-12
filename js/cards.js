
const createCard = ({url, comments, likes}) => {
  const cardTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  const card = cardTemplate.cloneNode(true);

  card.querySelector('.picture__img').src = url;
  card.querySelector('.picture__comments').textContent = comments.length;
  card.querySelector('.picture__likes').textContent = likes;

  return card;
};

const renderCards = (publicationsArr) => {
  const cardsFragment = document.createDocumentFragment();
  const cardsContainer = document.querySelector('.pictures');

  publicationsArr.forEach((publication) => {
    const card = createCard(publication);
    cardsFragment.append(card);
  });

  cardsContainer.append(cardsFragment);
};

export { renderCards };
