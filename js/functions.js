function isPaliondrome (str) {
  const processedStr = str.replace(/ /g, '').toLowerCase();
  let reversedStr = '';
  for (let i = 1; i <= processedStr.length; i++) {
    reversedStr += processedStr[processedStr.length - i];
  }
  return processedStr === reversedStr;
}

function isStrLengthValid (str, limit) {
  return str.length <= limit;
}

function addFillToStr (str, minLength, filler) {
  let resultStr = str;
  while (resultStr.length < minLength) {
    const charsToAdd = minLength - resultStr.length;
    resultStr = filler.slice(0, charsToAdd) + resultStr;
  }
  return resultStr;
}
