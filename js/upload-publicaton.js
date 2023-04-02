import { postPublication } from './api.js';
import {
  toggleSubmitButtonDisabled,
  showErrorModal,
  showSuccessModal
} from './upload-modal.js';


const SubmitButtonText = {
  IDLE : 'Опубликовать',
  SENDING : 'Отправляется'
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
