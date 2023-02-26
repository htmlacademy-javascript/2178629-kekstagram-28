const isStrLengthValid = (str, limit) => str.length <= limit;

const reverseStr = (str) => str.split('').reverse().join('');

const isPalindrome = (str) => {
  const processedStr = str.replace(/ /g, '').toLowerCase();
  const reversedStr = reverseStr(processedStr);
  return processedStr === reversedStr;
};

const extractNumber = (str) => {
  if (typeof(str) === 'number') {
    str += '';
  }
  return parseInt(str.replace(/\D/g, ''), 10);
};

const addFillToStr = (str, minLength, filler) => {
  let resultStr = str;
  while (resultStr.length < minLength) {
    const charsToAdd = minLength - resultStr.length;
    resultStr = filler.slice(0, charsToAdd) + resultStr;
  }
  return resultStr;
};

const createIdGenerator = () => {
  let lastItem = 0;
  return () => ++lastItem;
};

const shuffleArray = (arr) => {
  const shuffledArray = [...arr];
  shuffledArray.forEach((value, index) => {
    const randomIndex = index + Math.floor(Math.random() * (shuffledArray.length - index));
    [shuffledArray[index], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[index]];
    return value;
  });
  return shuffledArray;
};

isStrLengthValid('abc', 3);
isPalindrome('abc');
extractNumber('abc');
addFillToStr('abc', 1, 'a');
createIdGenerator();
shuffleArray([1, 2, 3]);

