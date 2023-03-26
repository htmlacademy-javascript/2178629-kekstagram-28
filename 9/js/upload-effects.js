const EFFECTS_SETTINGS = {
  none : {
    filter : 'none',
    units : '',
    options : {
      connect : 'lower',
      start : 100,
      step : 1,
      range : {
        min : 0,
        max : 100,
      }
    }
  },
  chrome : {
    filter : 'grayscale',
    units : '',
    options : {
      connect : 'lower',
      start : 1,
      step : 0.1,
      range : {
        min : 0,
        max : 1,
      }
    }
  },
  sepia : {
    filter : 'sepia',
    units : '',
    options : {
      connect : 'lower',
      start : 1,
      step : 0.1,
      range : {
        min : 0,
        max : 1,
      }
    }
  },
  marvin : {
    filter : 'invert',
    units : '%',
    options : {
      connect : 'lower',
      start : 100,
      step : 1,
      range : {
        min : 0,
        max : 100,
      },
    }
  },
  phobos : {
    filter : 'blur',
    units : 'px',
    options : {
      connect : 'lower',
      start : 3,
      step : 0.1,
      range : {
        min : 0,
        max : 3,
      },
    }
  },
  heat : {
    filter : 'brightness',
    units : '',
    options : {
      connect : 'lower',
      start : 3,
      step : 0.1,
      range : {
        min : 0,
        max : 3,
      }
    }
  },
};

const effects = document.querySelector('.effects__list');
const imagePreview = document.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const slider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const DEFAULT_EFFECT = 'none';

let currentEffect = DEFAULT_EFFECT;

const hideSlider = () => {
  sliderContainer.classList.add('hidden');
};

const showSlider = () => {
  sliderContainer.classList.remove('hidden');
};

noUiSlider.create(slider, EFFECTS_SETTINGS[currentEffect].options);

const removeFilter = () => {
  imagePreview.style.filter = '';
};

const updateSlider = (effect) => {
  imagePreview.className = `effects__preview--${effect}`;
  slider.noUiSlider.updateOptions(EFFECTS_SETTINGS[effect].options);
  if (effect === DEFAULT_EFFECT) {
    hideSlider();
    removeFilter();
  } else {
    showSlider();
  }
};

const onEffectsChange = (evt) => {
  if (evt.target.matches('.effects__radio')) {
    currentEffect = evt.target.value;
  }
  updateSlider(currentEffect);
};

slider.noUiSlider.on('update', () => {
  const filterName = EFFECTS_SETTINGS[currentEffect].filter;
  const filterValue = slider.noUiSlider.get();
  const filterUnits = EFFECTS_SETTINGS[currentEffect].units;
  imagePreview.style.filter = `${filterName}(${filterValue}${filterUnits})`;
  effectLevelValue.value = filterValue;
});


const resetEffect = () => {
  updateSlider(DEFAULT_EFFECT);
};

effects.addEventListener('change', onEffectsChange);

export { resetEffect };
