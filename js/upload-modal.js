import {
  isEscapeKey,
  isUnicItems
} from './utils.js';
import { resetScale } from './upload-scale.js';
import { resetEffect } from './upload-effects.js';
import { uploadPublication } from './api.js';

const imageUploadField = document.querySelector('.img-upload__input');
const uploadModal = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('.img-upload__form');
const canselUploadModalBtn = uploadModal.querySelector('.img-upload__cancel');
const submitButton = uploadModal.querySelector('.img-upload__submit');
const tagsField = uploadForm.querySelector('.text__hashtags');
const descriptionField = uploadForm.querySelector('.text__description');
const uploadSuccessModal = document.querySelector('#success').content.querySelector('.success');
const uploadSuccessModalBtn = uploadSuccessModal.querySelector('.success__button');
const uploadErrorModal = document.querySelector('#error').content.querySelector('.error');
const uploadErrorModalBtn = uploadErrorModal.querySelector('.error__button');

const VALID_TAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_TAGS_PER_PUBLICATIONS = 5;
const ErrorMessages = {
  VALIDATE_TAG : 'Хэштег должен начинаться с \'#\', \nне может состоять только из \'#\'',
  UNIC_TAG : 'Каждый хэштег должен быть уникальным',
  TAG_COUNT : 'Допустимо не более пяти уникальных хэштегов'
};
const SubmitButtonText = {
  IDLE : 'Опубликовать',
  SENDING : 'Отправляется'
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

const normalizeStrSpaces = (str) => (str.replaceAll(/ {2,}/g, ' '));

const onTagsFieldInput = () => {
  tagsField.value = normalizeStrSpaces(tagsField.value);
};

function closeUploadModal() {
  closeSuccessModal();
  uploadModal.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.classList.remove('modal-open');
  tagsField.removeEventListener('input', onTagsFieldInput);
  canselUploadModalBtn.removeEventListener('click', closeUploadModal);
  uploadForm.reset();
}

const onImageUploadFieldChange = () => {
  resetScale();
  resetEffect();
  pristine.reset();
  uploadModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  canselUploadModalBtn.addEventListener('click', closeUploadModal);
  document.onkeydown = onDocumentKeydown;
  tagsField.addEventListener('input', onTagsFieldInput);
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

function closeSuccessModal() {
  uploadSuccessModal.remove();
}

function closeErrorModal() {
  uploadErrorModal.remove();
  document.onkeydown = onDocumentKeydown;
}

const showSuccessModal = () => {
  document.body.append(uploadSuccessModal);
  uploadSuccessModalBtn.addEventListener('click', () => {
    closeSuccessModal();
    closeUploadModal();
  });
};

const showErrorModal = () => {
  document.body.append(uploadErrorModal);
  uploadErrorModalBtn.addEventListener('click', () => {
    closeErrorModal();
  });
  document.onkeydown = (evt) => {
    if (isEscapeKey(evt) && !isTextFieldsActive()) {
      evt.preventDefault();
      uploadErrorModal.remove();
    }
  };
  document.addEventListener('click', (evt) => {
    if (!evt.target.closest('.error__inner')) {
      closeErrorModal();
    }
  });
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    tagsField.value.trim();
    const formData = new FormData(uploadForm);
    blockSubmitButton();
    uploadPublication(formData, showSuccessModal, showErrorModal, unblockSubmitButton);
  }
};

uploadForm.addEventListener('submit', onUploadFormSubmit);

const activateUploadModal = () => imageUploadField.addEventListener('change', onImageUploadFieldChange);

export { activateUploadModal };
