const bigCard = document.querySelector('.big-picture');
const commentsList = bigCard.querySelector('.social__comments');
const commentTemplate = document.createDocumentFragment();
commentTemplate.append(commentsList.firstElementChild);
const commentsLoaderBtn = bigCard.querySelector('.comments-loader');

const renderBigPicture = (publicationsItem) => {
  const {url, description, likes} = publicationsItem;
  commentsLoaderBtn.classList.remove('hidden');

  bigCard.querySelector('img').src = url;
  bigCard.querySelector('.social__caption').textContent = description;
  bigCard.querySelector('.likes-count').textContent = likes;

  commentsList.innerHTML = '';
};

export { renderBigPicture };
