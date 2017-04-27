'use strict';

function stringToNCharArray(str, number) {
  const charArray = [];
  for (let i = 0, size = str.length; i < size; i = i + number) {
    charArray.push(str.slice(i, i + number));
  }
  return charArray;
}

module.exports = { stringToNCharArray };
