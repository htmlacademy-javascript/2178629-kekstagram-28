import { isEscapeKey } from './utils.js';

const imageUploadField = document.querySelector('.img-upload');
const uploadModal = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('.img-upload__form');
const canselUploadModalBtn = uploadModal.querySelector('.img-upload__cancel');
const tagsField = uploadForm.querySelector('.text__hashtags');
const descriptionField = uploadForm.querySelector('.text__description');

const VALID_TAG_REGEX = /^#[a-zа-яё0-9]{2,19}$/i;
const MAX_TAGS_PER_PUBLICATIONS = 5;
const ERROR_MESSAGES = {
  VALIDATE_TAG : 'Неверный хэштег (должен начинаться с #)',
  UNIC_TAG : 'Каждый хэштэг должен быть уникальным',
  TAG_COUNT : 'Допустимо не более пяти уникальных хэштегов'
};
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

const normalizeStrSpaces = (str) => (str.replaceAll(/ {2,}/g, ' '));

const createTags = (str) => str.trim().split(' ');

const isValidTag = (tag) => tag ? VALID_TAG_REGEX.test(tag) : true;

const validateTag = (val) => {
  tags = createTags(val);
  return tags.every(isValidTag);
};

const isUnicItems = (val) => {
  tags = createTags(val);
  const lowerCaseTags = tags.map((item) => item.toLowerCase());
  const uniqueItemsSet = new Set(lowerCaseTags);
  return uniqueItemsSet.size === lowerCaseTags.length;
};

const isTagsCountValid = (val) => {
  tags = createTags(val);
  return tags.length <= MAX_TAGS_PER_PUBLICATIONS;
};

const onTagsFieldInput = () => {
  tagsField.value = normalizeStrSpaces(tagsField.value);
};

tagsField.addEventListener('input', onTagsFieldInput);

pristine.addValidator(
  tagsField,
  validateTag,
  ERROR_MESSAGES.VALIDATE_TAG
);

pristine.addValidator(
  tagsField,
  isUnicItems,
  ERROR_MESSAGES.UNIC_TAG
);

pristine.addValidator(
  tagsField,
  isTagsCountValid,
  ERROR_MESSAGES.TAG_COUNT
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
