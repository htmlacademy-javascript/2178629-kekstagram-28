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

// const createSequenceArray = (length) => Array.from({length: length}, (value, index) => ++index);

// const pickRandomInRange = (lim1, lim2 = 1) => {
//   const min = Math.ceil(Math.min(lim1, lim2));
//   const max = Math.floor(Math.max(lim1, lim2));
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// };

// const pickUnicRandomInRange = (lim1, lim2 = 1) => {
//   const usedValues = [];

//   return () => {
//     let value = pickRandomInRange(lim1, lim2);
//     while (usedValues.includes(value)) {
//       value = pickRandomInRange(lim1, lim2);
//     }
//     usedValues.push(value);
//     return value;
//   };
// };

// const generateRandomInRange = (lim1, lim2 = 1) => {
//   const min = Math.ceil(Math.min(lim1, lim2));
//   const max = Math.floor(Math.max(lim1, lim2));
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// };

// const generateUnicRandomInRange = (lim1, lim2 = 1) => {
//   const usedValues = [];

//   return () => {
//     let value = generateRandomInRange(lim1, lim2);
//     while (usedValues.includes(value)) {
//       value = generateRandomInRange(lim1, lim2);
//     }
//     usedValues.push(value);
//     return value;
//   };
// };

const shuffleArray = (arr) => {
  arr.forEach((value, index) => {
    const randomIndex = index + Math.floor(Math.random() * (arr.length - index));
    [arr[index], arr[randomIndex]] = [arr[randomIndex], arr[index]];
    return value;
  });
  return arr;
};

// const setRandomIndex = (array) => Math.floor(Math.random() * (array.length));

// const pickUnicRandomFromArray = (array) => {
//   const tempArray = array.slice();
//   return () => {
//     const index = setRandomIndex(tempArray);
//     const value = tempArray.at(index);
//     tempArray.splice(index, 1);
//     return value;
//   };
// };


// const pickNDeleteRandomFromArray = (array) => {
//   const randomIndex = setRandomIndex(array);
//   const value = array.at(randomIndex);
//   array.splice(randomIndex, 1);
//   return value;
// };

isStrLengthValid('abc', 3);
isPalindrome('abc');
extractNumber('abc');
addFillToStr('abc', 1, 'a');
createIdGenerator();
shuffleArray([1, 2, 3]);
