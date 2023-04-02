import { postPublication } from './api.js';
import {
  showErrorModal,
  showSuccessModal
} from './upload-modal.js';

const submitButton = document.querySelector('.img-upload__submit');
const SubmitButtonText = {
  IDLE : 'Опубликовать',
  SENDING : 'Отправляется'
};

const toggleSubmitButtonDisabled = (isDisabled, buttonText) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = buttonText;
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
