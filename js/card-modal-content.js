const bigCard = document.querySelector('.big-picture');
const commentsList = bigCard.querySelector('.social__comments');
const commentTemplate = document.createDocumentFragment();
commentTemplate.append(commentsList.firstElementChild);

const commentsListFragment = document.createDocumentFragment();

const createComment = ({avatar, name, message}) => {
  const newComment = commentTemplate.cloneNode(true);
  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;
  commentsListFragment.append(newComment);
};

const renderBigPicture = (publicationsItem) => {
  const {url, description, likes, comments} = publicationsItem;
  bigCard.querySelector('img').src = url;
  bigCard.querySelector('.social__caption').textContent = description;
  bigCard.querySelector('.likes-count').textContent = likes;
  bigCard.querySelector('.comments-count').textContent = comments.length;

  commentsList.innerHTML = '';

  comments.forEach(createComment);

  commentsList.append(commentsListFragment);
};

export { renderBigPicture };
