import{ publications } from './main.js';

const bigCard = document.querySelector('.big-picture');
const commentsList = bigCard.querySelector('.social__comments');
const CommentTemplate = bigCard.querySelector('.social__comment');

const renderBigPicture = (pictureUrl) => {
  const {description, likes, comments} = publications.find((item) => item.url === pictureUrl);
  bigCard.querySelector('img').src = pictureUrl;
  bigCard.querySelector('.social__caption').textContent = description;
  bigCard.querySelector('.likes-count').textContent = likes;
  bigCard.querySelector('.comments-count').textContent = comments.length;

  const commentsListFragment = document.createDocumentFragment();
  const elementsToRemove = commentsList.querySelectorAll('.social__comment');
  elementsToRemove.forEach((element) => element.parentElement.removeChild(element));

  comments.forEach(({avatar, name, message}) => {
    const newComment = CommentTemplate.cloneNode(true);
    const newCommentAvatar = newComment.querySelector('.social__picture');
    const newCommentText = newComment.querySelector('.social__text');
    newCommentAvatar.src = avatar;
    newCommentAvatar.alt = name;
    newCommentText.textContent = message;
    commentsListFragment.append(newComment);
  });

  commentsList.append(commentsListFragment);
};

export { renderBigPicture };
