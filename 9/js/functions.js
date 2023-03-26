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


isStrLengthValid('abc', 3);
isPalindrome('abc');
extractNumber('abc');
addFillToStr('abc', 1, 'a');
