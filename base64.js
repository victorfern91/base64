/*jslint node:true, plusplus: true, bitwise: true, vars: true*/
/*global describe, it*/
'use strict';

var encodeDictionary = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
    fs = require('fs');

//Functions Helpers (Private functions)

function setCharAt(str, index, chr) {
    return (index > str.length - 1) ? str : str.substr(0, index) + chr + str.substr(index + 1);
}

/**
 * encoding block - private function
 * Update: Changed binary masks into Hexadecimal
 */
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
}

function encodingSystem(slice) {
    var sliceLength = slice.length,
        encoded = '';

    //if this slice/block have 3 bytes
    if (sliceLength === 3) {
        encoded = encodingBlock(slice);
    } else { // if slice/block doesn't have 3 bytes
        switch (sliceLength) {
        case 1:
            slice += '\u0000\u0000';
            encoded = encodingBlock(slice);
            //add '=''='
            encoded = setCharAt(encoded, 2, '=');
            encoded = setCharAt(encoded, 3, '=');
            break;
        case 2:
            slice += '\u0000';
            encoded = encodingBlock(slice);
            // add =
            encoded = setCharAt(encoded, 3, '=');
            break;
        }
    }
    return encoded;
}

/**
 * decodingBlock - private function
 * This method receive 4-byte encoded slice and decode to 3 char string.
 * Update: Changed binary masks into Hexadecimal
 */
function decodingBlock(slice) {
    var decodeSlice = '',
        j,
        length,
        charNumberOne,
        charNumberTwo,
        charNumberThree;

    for (j = 0, length = slice.length; j < length; j++) {
        switch (j) {
        case 0:
            charNumberOne = encodeDictionary.indexOf(slice[j]) << 2;
            charNumberOne += (encodeDictionary.indexOf(slice[j + 1]) & 0x30) >> 4;
            decodeSlice += String.fromCharCode(charNumberOne);
            break;
        case 1:
            charNumberTwo = (encodeDictionary.indexOf(slice[j]) & 0xF) << 4;
            charNumberTwo += (encodeDictionary.indexOf(slice[j + 1]) & 0x3C) >> 2;
            decodeSlice += String.fromCharCode(charNumberTwo);
            break;
        case 2:
            charNumberThree = (encodeDictionary.indexOf(slice[j]) & 0x3) << 6;
            charNumberThree += (encodeDictionary.indexOf(slice[j + 1]) & 0x3F);
            decodeSlice += String.fromCharCode(charNumberThree);
            break;
        }
    }
    return decodeSlice;
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

function decodeMIME(str) {
    str = str.replace(/\r\n|\r|\n/g, '');
    return str;
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
            encodedString = convertToMIME(encodedString);
            break;
        default:
            break;
        }
        // return encoded string
        return encodedString;
    },

    encodeWithKey: function (str, key) {
        var strLength = str.length,
            keyLength = key.length,
            keyMsg = '',
            i;

        for (i = 0; i < strLength; ++i) {
            keyMsg += String.fromCharCode(str.charCodeAt(i) ^ key.charCodeAt(i % keyLength));
        }

        return this.encode(keyMsg);
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
        if (str.match(/\n/) !== null) {
            str = decodeMIME(str);
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
            decodedString += decodingBlock(inputSliced[i]);
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
