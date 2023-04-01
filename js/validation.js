import {
  isUnicItems
} from './utils.js';

const uploadForm = document.querySelector('.img-upload__form');
const tagsField = uploadForm.querySelector('.text__hashtags');

const VALID_TAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_TAGS_PER_PUBLICATIONS = 5;
const ErrorMessages = {
  VALIDATE_TAG : 'Хэштег должен начинаться с \'#\', \nне может состоять только из \'#\'',
  UNIC_TAG : 'Каждый хэштег должен быть уникальным',
  TAG_COUNT : 'Допустимо не более пяти уникальных хэштегов'
};
let tags = '';

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const normalizeStrSpaces = (str) => (str.replaceAll(/ {2,}/g, ' '));

const onTagsFieldInput = () => {
  tagsField.value = normalizeStrSpaces(tagsField.value);
};

const createTags = (str) => str.trim().split(' ');

const isValidTag = (tag) => tag ? VALID_TAG_REGEX.test(tag) : true;

const validateTag = (val) => {
  tags = createTags(val);
  return tags.every(isValidTag);
};

const isUnicTags = (val) => {
  tags = createTags(val);
  return isUnicItems(tags, false);
};

const isTagsCountValid = (val) => {
  tags = createTags(val);
  return tags.length <= MAX_TAGS_PER_PUBLICATIONS;
};

tagsField.addEventListener('input', onTagsFieldInput);

pristine.addValidator(
  tagsField,
  validateTag,
  ErrorMessages.VALIDATE_TAG,
  2,
  true
);

pristine.addValidator(
  tagsField,
  isUnicTags,
  ErrorMessages.UNIC_TAG,
  1,
  true
);

pristine.addValidator(
  tagsField,
  isTagsCountValid,
  ErrorMessages.TAG_COUNT,
);

const validateForm = () => pristine.validate();

const resetPristine = () => pristine.reset();

export { validateForm, resetPristine };
