import {
  isEscapeKey,
} from './utils.js';
import { resetScale } from './upload-scale.js';
import { resetEffect } from './upload-effects.js';
import {
  resetPristine,
  validateForm
} from './validation.js';
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
const SubmitButtonText = {
  IDLE : 'Опубликовать',
  SENDING : 'Отправляется'
};
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
  closeSuccessModal();
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
  document.onkeydown = onDocumentKeydown;
};

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

const toggleSubmitButtonDisabled = (isDisabled, buttonText) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = buttonText;
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = validateForm();
  if (isValid) {
    tagsField.value.trim();
    const formData = new FormData(uploadForm);
    toggleSubmitButtonDisabled(true, SubmitButtonText.SENDING);
    uploadPublication(formData, showSuccessModal, showErrorModal, toggleSubmitButtonDisabled(false, SubmitButtonText.IDLE));
  }
};

uploadForm.addEventListener('submit', onUploadFormSubmit);

const activateUploadModal = () => imageUploadField.addEventListener('change', onImageUploadFieldChange);

export { activateUploadModal };
