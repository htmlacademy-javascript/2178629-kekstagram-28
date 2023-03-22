import { isEscapeKey } from './utils.js';

const openUploadModalBtn = document.querySelector('.img-upload');
const uploadModal = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('.img-upload__form');
const canselUploadModalBtn = uploadModal.querySelector('.img-upload__cancel');
const hashtagsField = uploadForm.querySelector('.text__hashtags');
const descriptionField = uploadForm.querySelector('.text__description');

const isTextFieldsActive = () => (
  document.activeElement === hashtagsField ||
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


const onOpenUploadModalBtnChange = () => {
  uploadModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  canselUploadModalBtn.addEventListener('click', closeUploadModal);
  document.addEventListener('keydown', onDocumentKeydown);
};

const activateUploadModal = () => openUploadModalBtn.addEventListener('change', onOpenUploadModalBtnChange);

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    console.log('Можно отправлять');
  } else {
    console.log('Не можно оптправлять');
  }
});

export { activateUploadModal };
