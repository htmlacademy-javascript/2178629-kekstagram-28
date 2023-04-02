import { isEscapeKey } from './utils.js';
import { postPublication } from './api.js';
import {
  onDocumentKeydown,
  closeUploadModal
  // showErrorModal,
  // showSuccessModal,
} from './upload-modal.js';

const uploadSuccessModal = document.querySelector('#success').content.querySelector('.success');
const uploadSuccessModalBtn = uploadSuccessModal.querySelector('.success__button');
const uploadErrorModal = document.querySelector('#error').content.querySelector('.error');
const uploadErrorModalBtn = uploadErrorModal.querySelector('.error__button');
const submitButton = document.querySelector('.img-upload__submit');
const SubmitButtonText = {
  IDLE : 'Опубликовать',
  SENDING : 'Отправляется'
};

function closeAllModals() {
  document.removeEventListener('keydown', onDocumentKeydownLocalSuccess);
  closeUploadModal();
  closeSuccessModal();
}

function onDocumentKeydownLocalSuccess(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeAllModals();
  }
}

const onDocumentKeydownLocalError = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorModal();
  }
};

const toggleSubmitButtonDisabled = (isDisabled, buttonText) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = buttonText;
};


function closeSuccessModal() {
  uploadSuccessModal.remove();
  closeAllModals();
}

function closeErrorModal() {
  uploadErrorModal.remove();
  document.removeEventListener('keydown', onDocumentKeydownLocalError);
  document.addEventListener('keydown', onDocumentKeydown);
}

const showSuccessModal = () => {
  document.body.append(uploadSuccessModal);
  uploadSuccessModalBtn.addEventListener('click', () => {
    closeAllModals();
  });
  document.addEventListener('keydown', onDocumentKeydownLocalSuccess);
};

const showErrorModal = () => {
  document.body.append(uploadErrorModal);
  uploadErrorModalBtn.addEventListener('click', () => {
    closeErrorModal();
  });
  document.addEventListener('keydown', onDocumentKeydownLocalError);
  document.addEventListener('click', (evt) => {
    if (!evt.target.closest('.error__inner')) {
      closeErrorModal();
    }
  });
};

const uploadPublication = async (data) => {
  try {
    toggleSubmitButtonDisabled(true, SubmitButtonText.SENDING);
    await postPublication(data);
    showSuccessModal();
  } catch(err) {
    showErrorModal();
  } finally {
    toggleSubmitButtonDisabled(false, SubmitButtonText.IDLE);
  }
};

export { uploadPublication };
