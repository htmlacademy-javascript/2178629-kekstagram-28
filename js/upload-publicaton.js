import { isEscapeKey } from './utils.js';
import { postPublication } from './api.js';
import {
  onDocumentKeydown,
  closeUploadModal
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

function onDocumentKeydownLocalSuccess(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessModal();
  }
}

const onDocumentKeydownLocalError = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorModal();
  }
};

const toggleSubmitButtonDisabled = (isDisabled) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled ? SubmitButtonText.SENDING : SubmitButtonText.IDLE;
};


function closeSuccessModal() {
  uploadSuccessModal.remove();
}

function closeErrorModal() {
  uploadErrorModal.remove();
  document.removeEventListener('keydown', onDocumentKeydownLocalError);
  document.addEventListener('keydown', onDocumentKeydown);
}

const showSuccessModal = () => {
  document.body.append(uploadSuccessModal);
  closeUploadModal();
  uploadSuccessModalBtn.addEventListener('click', () => {
    closeSuccessModal();
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
    toggleSubmitButtonDisabled(true);
    await postPublication(data);
    showSuccessModal();
  } catch(err) {
    showErrorModal();
  } finally {
    toggleSubmitButtonDisabled(false);
  }
};

export { uploadPublication };
