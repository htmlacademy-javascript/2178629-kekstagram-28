const COMMENTS_DISPLAY_ONCE = 5;

const bigCard = document.querySelector('.big-picture');
const commentsList = bigCard.querySelector('.social__comments');
const commentTemplate = document.createDocumentFragment();
commentTemplate.append(commentsList.firstElementChild);
const commentsLoaderBtn = bigCard.querySelector('.comments-loader');

const commentsListFragment = document.createDocumentFragment();
let commentsDisplayed = 0;
const isAllCommentsDisplayed = (commentsArr) => commentsDisplayed === commentsArr.length;

const createComment = ({avatar, name, message}) => {
  const newComment = commentTemplate.cloneNode(true);
  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;
  commentsListFragment.append(newComment);
};

const renderBigPicture = (publicationsItem) => {
  const {url, description, likes, comments} = publicationsItem;
  const commentsToDisplay = comments.slice();
  commentsLoaderBtn.classList.remove('hidden');

  bigCard.querySelector('img').src = url;
  bigCard.querySelector('.social__caption').textContent = description;
  bigCard.querySelector('.likes-count').textContent = likes;

  commentsList.innerHTML = '';

  const onCommentsLoaderBtnClick = () => {
    const currentComments = commentsToDisplay.splice(0, COMMENTS_DISPLAY_ONCE);
    currentComments.forEach(createComment);
    commentsList.append(commentsListFragment);

    commentsDisplayed = commentsList.childElementCount;

    bigCard.querySelector('.social__comment-count').textContent = `Комментарии: ${commentsDisplayed} из ${comments.length}`;

    if (isAllCommentsDisplayed(comments)) {
      commentsLoaderBtn.classList.add('hidden');
      commentsLoaderBtn.removeEventListener('click', onCommentsLoaderBtnClick);
    } else {
      commentsLoaderBtn.addEventListener('click', onCommentsLoaderBtnClick, {once: true});
    }
  };

  onCommentsLoaderBtnClick();

};

export { renderBigPicture };
