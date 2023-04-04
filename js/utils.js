const createSequenceArray = (length) => Array.from({length: length}, (value, index) => ++index);

const getRandomInRange = (lim1, lim2 = 1) => {
  const min = Math.ceil(Math.min(lim1, lim2));
  const max = Math.floor(Math.max(lim1, lim2));
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomUnicValue = (array) => {
  const tempArray = [...array];

  return () => {
    const randomIndex = getRandomInRange(0, tempArray.length - 1);
    const value = tempArray.at(randomIndex);
    tempArray.splice(randomIndex, 1);
    return value;
  };
};

const createIdGenerator = (startPosition = 1) => {
  let lastItem = startPosition;
  return () => lastItem++;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const isUnicItems = (arr, isConsiderCase = true) => {
  const uniqueItemsSet = new Set(isConsiderCase ? arr : arr.map((item) => item.toLowerCase()));
  return uniqueItemsSet.size === arr.length;
};

const showAlert = (message, showAlertTime) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '20px';
  alertContainer.style.top = '20px';
  alertContainer.style.right = '20px';
  alertContainer.style.padding = '10px 6px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.lineHeight = '32px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, showAlertTime);
};

const debounce = (callback, timeoutDelay = 500) => {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
};

export {
  createSequenceArray,
  getRandomInRange,
  getRandomUnicValue,
  createIdGenerator,
  isEscapeKey,
  isUnicItems,
  showAlert,
  debounce
};
