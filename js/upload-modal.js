import { isEscapeKey } from './utils.js';
import { resetScale } from './upload-scale.js';
import { resetEffect } from './upload-effects.js';
import {
  resetPristine,
  validateForm
} from './validation.js';
import { uploadPublication } from './upload-publicaton.js';

const imageUploadField = document.querySelector('.img-upload__input');
const uploadModal = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('.img-upload__form');
const canselUploadModalBtn = uploadModal.querySelector('.img-upload__cancel');
const tagsField = uploadForm.querySelector('.text__hashtags');
const descriptionField = uploadForm.querySelector('.text__description');

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
  canselUploadModalBtn.removeEventListener('click', closeUploadModal);
  uploadForm.reset();
}

const onImageUploadFieldChange = () => {
  resetScale();
  resetEffect();
  resetPristine();
  uploadModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  canselUploadModalBtn.addEventListener('click', closeUploadModal);
  document.addEventListener('keydown', onDocumentKeydown);
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  document.removeEventListener('keydown', onDocumentKeydown);
  const isValid = validateForm();
  if (isValid) {
    tagsField.value.trim();
    const formData = new FormData(uploadForm);
    uploadPublication(formData);
  }
};

uploadForm.addEventListener('submit', onUploadFormSubmit);

const initUploadModal = () => imageUploadField.addEventListener('change', onImageUploadFieldChange);

export {
  initUploadModal,
  onDocumentKeydown,
  closeUploadModal
};
