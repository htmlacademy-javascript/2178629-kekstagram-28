const bigCard = document.querySelector('.big-picture');
const commentsList = bigCard.querySelector('.social__comments');
const commentsListFragment = document.createDocumentFragment();
const commentsLoaderBtn = bigCard.querySelector('.comments-loader');

const commentTemplate = document.createDocumentFragment();
commentTemplate.append(commentsList.firstElementChild);

const COMMENTS_PER_PORTION = 5;

const createComment = ({avatar, name, message}) => {
  const newComment = commentTemplate.cloneNode(true);
  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;
  commentsListFragment.append(newComment);
};

const renderCommentsPortion = ({comments}) => {
  const commentsToDisplay = comments.slice();
  let commentsDisplayed = 0;

  return () => {
    const currentComments = commentsToDisplay.splice(0, COMMENTS_PER_PORTION);
    currentComments.forEach(createComment);
    commentsList.append(commentsListFragment);

    commentsDisplayed += currentComments.length;

    bigCard.querySelector('.social__comment-count').textContent = `Комментарии: ${commentsDisplayed} из ${comments.length}`;

    if (!commentsToDisplay.length) {
      commentsLoaderBtn.classList.add('hidden');
    }
  };
};

export { renderCommentsPortion };
