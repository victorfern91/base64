const encodeDictionary = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

/**
 * This method is used for block decoding.
 * @param {string} slice
 * @return {string} decoded block
 */


 /**
  * decodingBlock - private function
  * This method receive 4-byte encoded slice and decode to 3 char string.
  * Update: Changed binary masks into Hexadecimal
  */
function decodingBlock(slice) {
  return slice.split('')
    .map((char, index) => {
      switch (index) {
        case 0:
          char = encodeDictionary.indexOf(char) << 2;
          char += (encodeDictionary.indexOf(slice[index + 1]) & 0x30) >> 4;
          return String.fromCharCode(char);
        case 1:
          char = (encodeDictionary.indexOf(char) & 0xF) << 4;
          char += (encodeDictionary.indexOf(slice[index + 1]) & 0x3C) >> 2;
          return String.fromCharCode(char);
        case 2:
          char = (encodeDictionary.indexOf(char) & 0x3) << 6;
          char += (encodeDictionary.indexOf(slice[index + 1]) & 0x3F);
          return String.fromCharCode(char);
      }
    })
    .join('');
};


function encodingBlock(slice) {
    var encodedSlice = '',
        j,
        sliceLength,
        charOne,
        charTwo,
        charThree,
        charFour;

    for (j = 0, sliceLength = slice.length; j < sliceLength; j++) {
        switch (j) {
        case 0:
            charOne = (slice.charCodeAt(j)) >> 2;
            encodedSlice += encodeDictionary[charOne];
            break;
        case 1:
            charTwo = (slice.charCodeAt(j - 1) & 0x3) << 4;
            charTwo += (slice.charCodeAt(j) & 0xF0) >> 4;
            encodedSlice += encodeDictionary[charTwo];
            charThree = (slice.charCodeAt(j) & 0xF) << 2;
            charThree += (slice.charCodeAt(j + 1) & 0xC0) >> 6;
            encodedSlice += encodeDictionary[charThree];
            break;
        case 2:
            charFour = slice.charCodeAt(j) & 0x3F;
            encodedSlice += encodeDictionary[charFour];
            break;
        }
    }
    return encodedSlice;
};

function decodeMIME(str) {
    return str.replace(/\r\n|\r|\n/g, '');
}

function convertToMIME(str) {
    var length,
        result = '',
        lastPosition = 0,
        i;
    for (i = 0, length = str.length; i < length; ++i) {
        if (i % 76 === 0 && i !== 0) {
            result += str.slice(lastPosition, i) + '\n';
            lastPosition = i;
            if (lastPosition + 76 > length) {
                result += str.slice(lastPosition, length);
            }
        }
    }
    return result;
}

function xorEncoding(str, key) {
  const keyLength = key.length;

  return str.split('')
    .map((char, index) => {
      return String.fromCharCode(str.charCodeAt(index) ^ key.charCodeAt(index % keyLength));
    })
    .join('');
}

module.exports = { decodingBlock, encodingBlock, decodeMIME, convertToMIME, xorEncoding };
