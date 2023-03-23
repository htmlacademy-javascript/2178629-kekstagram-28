import { isEscapeKey } from './utils.js';

const imageUploadField = document.querySelector('.img-upload');
const uploadModal = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('.img-upload__form');
const canselUploadModalBtn = uploadModal.querySelector('.img-upload__cancel');
const tagsField = uploadForm.querySelector('.text__hashtags');
const descriptionField = uploadForm.querySelector('.text__description');

const VALID_TAG_REGEX = /^#[a-zа-яё0-9]{2,19}$/i;
const MAX_TAGS_PER_PUBLICATIONS = 5;
let tags = '';

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const isTextFieldsActive = () => (
  document.activeElement === tagsField ||
  document.activeElement === descriptionField
);

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !isTextFieldsActive()) {
    evt.preventDefault();
    closeUploadModal();
  }
};

function closeUploadModal() {
  uploadModal.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.classList.remove('modal-open');
  uploadForm.reset();
  canselUploadModalBtn.removeEventListener('click', closeUploadModal);
}

const onImageUploadFieldChange = () => {
  uploadModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  canselUploadModalBtn.addEventListener('click', closeUploadModal);
  document.addEventListener('keydown', onDocumentKeydown);
  pristine.reset();
};

const normalizeStrSpaces = (str) => (str.replaceAll(/ {2,}/g, ' ').trim());

const createTags = (str) => normalizeStrSpaces(str).split(' ');

const isValidTag = (tag) => tag ? VALID_TAG_REGEX.test(tag) : true;

const isUnicItems = (arr) => {
  const lowerCaseArr = arr.map((item) => item.toLowerCase());
  const uniqueItemsSet = new Set(lowerCaseArr);
  return uniqueItemsSet.size === lowerCaseArr.length;
};

const isTagsCountValid = (arr, maxLength) => arr.length <= maxLength;

const validateHashtags = (val) => {
  tags = createTags(val);
  return isUnicItems(tags) && tags.every(isValidTag) && isTagsCountValid(tags, MAX_TAGS_PER_PUBLICATIONS);
};

pristine.addValidator(
  tagsField,
  validateHashtags,
  'Недопустимая форма указания хэш-тэгов'
);

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    tagsField.value = tags.join(' ');
    uploadForm.submit();
  }
};

uploadForm.addEventListener('submit', onUploadFormSubmit);

const activateUploadModal = () => imageUploadField.addEventListener('change', onImageUploadFieldChange);

export { activateUploadModal };
