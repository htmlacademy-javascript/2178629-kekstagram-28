const EffectsSettings = {
  NONE : {
    filter : 'none',
    units : '',
    options : {
      connect : 'lower',
      start : 0,
      step : 1,
      range : {
        min : 0,
        max : 100,
      }
    }
  },
  CHROME : {
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
  SEPIA : {
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
  MARVIN : {
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
  PHOBOS : {
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
  HEAT : {
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
const DEFAULT_EFFECT = 'NONE';

let currentEffect = DEFAULT_EFFECT;

const hideSlider = () => {
  sliderContainer.classList.add('hidden');
};

const showSlider = () => {
  sliderContainer.classList.remove('hidden');
};

noUiSlider.create(slider, EffectsSettings[currentEffect].options);

const removeFilter = () => {
  imagePreview.style.filter = '';
};

const updateSlider = (effect) => {
  imagePreview.className = `effects__preview--${effect}`;
  slider.noUiSlider.updateOptions(EffectsSettings[effect].options);
  if (effect === DEFAULT_EFFECT) {
    hideSlider();
    removeFilter();
  } else {
    showSlider();
  }
};

const onEffectsChange = (evt) => {
  if (evt.target.matches('.effects__radio')) {
    currentEffect = evt.target.value.toUpperCase();
  }
  updateSlider(currentEffect);
};

slider.noUiSlider.on('update', () => {
  const filterName = EffectsSettings[currentEffect].filter;
  const filterValue = slider.noUiSlider.get();
  const filterUnits = EffectsSettings[currentEffect].units;
  imagePreview.style.filter = `${filterName}(${filterValue}${filterUnits})`;
  effectLevelValue.value = filterValue;
});


const resetEffect = () => {
  updateSlider(DEFAULT_EFFECT);
};

effects.addEventListener('change', onEffectsChange);

export { resetEffect };
