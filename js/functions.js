function addToStr (sourceStr, minLength, additionalChars) {
  let resultStr = sourceStr;
  while (resultStr.length < minLength) {
    const charsToAdd = minLength - resultStr.length;
    resultStr = additionalChars.slice(0, charsToAdd) + resultStr;
  }
  return resultStr;
}
