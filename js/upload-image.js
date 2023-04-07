import { showAlert } from './utils.js';
import { ALERT_SHOW_TIME } from './constants.js';
import { closeUploadModal } from './upload-modal.js';

const fileChooser = document.querySelector('.img-upload__input');
const preview = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.img-upload__effects');
const effectsThumbs = effectsList.querySelectorAll('.effects__preview');

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const TYPE_ERROR_MESSAGE = 'Пожалуйста, загрузите файл изображения допустимого типа';

const isFileValid = (testedFile, criteria) => {
  const fileName = testedFile.name.toLowerCase();
  const matches = criteria.some((it) => fileName.endsWith(it));
  return matches;
};

const showUserImage = () => {
  const file = fileChooser.files[0];

  if (isFileValid(file, FILE_TYPES)) {
    const fileUrl = URL.createObjectURL(file);
    preview.src = fileUrl;
    effectsThumbs.forEach((elem) => {
      elem.style.backgroundImage = `url(${fileUrl})`;
    });
  } else {
    closeUploadModal();
    showAlert(TYPE_ERROR_MESSAGE, ALERT_SHOW_TIME);
  }
};

export { showUserImage };
