'use strict';

const fs = require('fs');
const codecUtils = require('./utils/codec-utils');

function setCharAt(str, index, chr) {
  return (index > str.length - 1) ? str : str.substr(0, index) + chr + str.substr(index + 1);
}

function encodingSystem(slice) {
  const sliceLength = slice.length;
  let encoded = '';

  // if this slice/block have 3 bytes
  if (sliceLength === 3) {
    encoded = codecUtils.encodingBlock(slice);
  } else if (sliceLength === 1) {
    slice += '\u0000\u0000';
    encoded = codecUtils.encodingBlock(slice);
  // add '=''='
    encoded = setCharAt(encoded, 2, '=');
    encoded = setCharAt(encoded, 3, '=');
  } else {
    slice += '\u0000';
    encoded = codecUtils.encodingBlock(slice);
  // add =
    encoded = setCharAt(encoded, 3, '=');
  }
  return encoded;
}


// public functions

module.exports = {
    encode: function (str, type) {
        var encodedString = '',
            inputSliced = [],
            i,
            length;

        for (i = 0, length = str.length; i < length; i = i + 3) { // First step, divid the input bytes streams into blocks of 3 bytes.
            inputSliced.push(str.slice(i, i + 3));
        }
        //encode all 3 byte blocks
        for (i = 0, length = inputSliced.length; i < length; ++i) {
            encodedString += encodingSystem(inputSliced[i]);
        }

        // encoding type
        switch (type) {
        case 'MIME':
            encodedString = codecUtils.convertToMIME(encodedString);
            break;
        default:
            break;
        }
        // return encoded string
        return encodedString;
    },

    encodeWithKey: function (str, key) {
      return this.encode(codecUtils.xorEncoding(str, key));
    },

    encodeFile: function (file) {
        var inputData = fs.readFileSync(file),
            fileToStr = '',
            i,
            length,
            inputSliced = [],
            encodedString = '';

        for (i = 0; i < inputData.length; ++i) {
            fileToStr += String.fromCharCode(inputData[i]);
        }

        for (i = 0, length = fileToStr.length; i < length; i = i + 3) {
            inputSliced.push(fileToStr.slice(i, i + 3));
        }

        for (i = 0, length = inputSliced.length; i < length; ++i) {
            encodedString += encodingSystem(inputSliced[i]);
        }
        return encodedString;
    },

    decode: function (str) {
        // auto detect MIME type
        if (/\n/.test(str)) {
            str = codecUtils.decodeMIME(str);
        }
        // reverse process
        var inputSliced = [];
        var stringLength = str.length;
        var decodedString = '',
            i,
            sliceLength;

        //slice string into 4 byte slices
        for (i = 0; i < stringLength; i = i + 4) {
            inputSliced.push(str.slice(i, i + 4));
        }
        //decoding every slice except the last one
        for (i = 0, sliceLength = inputSliced.length; i < sliceLength; ++i) {
            decodedString += codecUtils.decodingBlock(inputSliced[i]);
        }
        //last slice
        if (str.slice(-1) === '=') {
            decodedString = decodedString.slice(0, decodedString.length - 1);
        }
        if (str.slice(-2) === '==') {
            decodedString = decodedString.slice(0, decodedString.length - 1);
        }
        //result
        return decodedString;
    },

    decodeWithKey: function (str, key) {
        var b64Decoded = this.decode(str);
        var keyLength = key.length;
        var decodedString = '',
            i,
            length;
        for (i = 0, length = b64Decoded.length; i < length; ++i) {
            decodedString += String.fromCharCode(b64Decoded.charCodeAt(i) ^ key.charCodeAt(i % keyLength));
        }
        return decodedString;
    },

    decodeToFile: function (str, filePath) {
        // reverse process
        var data = this.decode(str);
        fs.writeFileSync(filePath, data, 'binary');
    }
};
