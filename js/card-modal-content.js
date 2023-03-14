import{ publications } from './main.js';

const bigCard = document.querySelector('.big-picture');
const commentsList = bigCard.querySelector('.social__comments');
const commentTemplate = document.createDocumentFragment();
commentTemplate.append(commentsList.firstElementChild);

const commentsListFragment = document.createDocumentFragment();

const createComments = ({avatar, name, message}) => {
  const newComment = commentTemplate.cloneNode(true);
  const newCommentAvatar = newComment.querySelector('.social__picture');
  const newCommentText = newComment.querySelector('.social__text');
  newCommentAvatar.src = avatar;
  newCommentAvatar.alt = name;
  newCommentText.textContent = message;
  commentsListFragment.append(newComment);
};

const renderBigPicture = (pictureUrl) => {
  const {description, likes, comments} = publications.find((item) => item.url === pictureUrl);
  bigCard.querySelector('img').src = pictureUrl;
  bigCard.querySelector('.social__caption').textContent = description;
  bigCard.querySelector('.likes-count').textContent = likes;
  bigCard.querySelector('.comments-count').textContent = comments.length;

  commentsList.innerHTML = '';

  comments.forEach(createComments);

  commentsList.append(commentsListFragment);
};

export { renderBigPicture };
