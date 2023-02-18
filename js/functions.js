function validateStrLength (str, limit) {
  return str.length <= limit;
}

function addToStr (Str, minLength, filler) {
  let resultStr = Str;
  while (resultStr.length < minLength) {
    const charsToAdd = minLength - resultStr.length;
    resultStr = filler.slice(0, charsToAdd) + resultStr;
  }
  return resultStr;
}
