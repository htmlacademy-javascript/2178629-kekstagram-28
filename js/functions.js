function addToStr (sourceStr, minLength, filler) {
  let resultStr = sourceStr;
  while (resultStr.length < minLength) {
    const charsToAdd = minLength - resultStr.length;
    resultStr = filler.slice(0, charsToAdd) + resultStr;
  }
  return resultStr;
}
