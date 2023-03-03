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

export { createSequenceArray, getRandomInRange, getRandomUnicValue, createIdGenerator };
