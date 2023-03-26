const imageUploadField = document.querySelector('.img-upload');
const imagePreview = imageUploadField.querySelector('.img-upload__preview img');
const scaleIncreaseBtn = imageUploadField.querySelector('.scale__control--bigger');
const scaleDecreaseBtn = imageUploadField.querySelector('.scale__control--smaller');
const scaleControlValue = imageUploadField.querySelector('.scale__control--value');

const IMG_SCALE_MAX = 100;
const IMG_SCALE_MIN = 25;
const IMG_INITIAL_SCALE = 100;
const IMG_SCALE_STEP = 25;
let imgScale = IMG_INITIAL_SCALE;

const setItemsScale = (scaleInPercent) => {
  imagePreview.style.transform = `scale(${scaleInPercent / 100})`;
  scaleControlValue.value = `${scaleInPercent}%`;
};

const resetScale = () => {
  setItemsScale(IMG_INITIAL_SCALE);
  imgScale = IMG_INITIAL_SCALE;
};

const onScaleDecreaseBtnClick = () => {
  imgScale -= IMG_SCALE_STEP;
  if (imgScale < IMG_SCALE_MIN) {
    imgScale = IMG_SCALE_MIN;
  }
  setItemsScale(imgScale);
  return imgScale;
};

const onScaleIncreaseBtnClick = () => {
  imgScale += IMG_SCALE_STEP;
  if (imgScale > IMG_SCALE_MAX) {
    imgScale = IMG_SCALE_MAX;
  }
  setItemsScale(imgScale);
  return imgScale;
};

scaleIncreaseBtn.addEventListener('click', onScaleIncreaseBtnClick);
scaleDecreaseBtn.addEventListener('click', onScaleDecreaseBtnClick);

export {
  resetScale,
};
