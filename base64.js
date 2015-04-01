/**
* node module -> Base64, created by victorfern91 (a.k.a Victor Fernandes - victorfern91[at]gmail.com)
* Module Version : 1.0.0 (1/04/2015 -> Ahahah, April's Fools!)
* Avaiable Functions : encoding & decoding
* Outputs: Coded string or Decoded string, using Base64
*/
var base64 = function () {};

var encodeDictionary ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

/**
* encode function() - public method
*/
base64.prototype.encode = function (str) {
	var encodedString = '';
	// First step, divid the input bytes streams into blocks of 3 bytes.
	var inputSliced = [];
	for(i = 0, length = str.length; i < length; i = i + 3){
		inputSliced.push(str.slice(i,i+3));
	}
	//encode all 3 byte blocks
	for(i = 0, length = inputSliced.length; i < length; i++){
			if ((inputSliced[i].length % 3) === 0){
			//if block contain 3 bytes
			encodedString += encodingBlock(inputSliced[i]);
		} else { // if block don't have 3 bytes
			switch(inputSliced[i].length){
				case 1:
					inputSliced[i] += '\0\0';
					var encoded = encodingBlock(inputSliced[i]);
					//add '=''=' 
					encoded = setCharAt(encoded,2,'=');
					encoded = setCharAt(encoded,3,'=');
					encodedString += encoded;
				break;
				case 2:
					inputSliced[i] += '\0';
					var encoded = encodingBlock(inputSliced[i]);
					// add = 
					encoded = setCharAt(encoded,3,'=');
					encodedString += encoded;
				break;
			}
		}
	} 
	return encodedString;
};

/**
* decode function() - public method
*/
base64.prototype.decode = function (str) {
	// reverse process
	var inputSliced = [];
	var stringLength = str.length;
	var decodedString = '';
	//slice string into 4 byte slices
	for(i = 0; i < stringLength; i = i + 4){
		inputSliced.push(str.slice(i,i+4));
	}
	//decoding every slice except the last one
	for(i = 0, sliceLength = inputSliced.length; i < sliceLength; i++){
		decodedString += decodingBlock(inputSliced[i]);
	}
	//last slice
	if(str.slice(-1) === '='){
		decodedString = decodedString.slice(0,decodedString.length-1);
	}
	//result
	return decodedString;

};

module.exports = new base64();

//Helpers (Private functions)

/**
* encoding block
* Update: Changed binary masks into Hexadecimal
*/
function encodingBlock(slice){
	var encodedSlice = '';
	for(j = 0, sliceLength = slice.length; j < sliceLength; j++){
		switch(j%3){
			case 0:
				var charOne = (slice.charCodeAt(j)) >> 2;
				encodedSlice += encodeDictionary[charOne];
				break;
			case 1:
				var charTwo = (slice.charCodeAt(j-1) & 0x3) << 4;
				charTwo += (slice.charCodeAt(j) & 0xF0) >> 4 ;
				encodedSlice += encodeDictionary[charTwo];
				var charThree = (slice.charCodeAt(j) & 0xF) << 2;
				charThree += (slice.charCodeAt(j+1) & 0xC0) >> 6;
				encodedSlice += encodeDictionary[charThree];
				break;
			case 2:
				var charFour = slice.charCodeAt(j) & 0x3F;
				encodedSlice += encodeDictionary[charFour];
				break;
		}
	}
	return encodedSlice;
}

/**
* decodingBlock 
* This method receive 4-byte encoded slice and decode to 3 char string. 
* Update: Changed binary masks into Hexadecimal
*/
function decodingBlock(slice){
	var decodeSlice = '';
	for(j = 0, length = slice.length; j < length; j++){
		switch(j%4){
			case 0:
				var charNumberOne = encodeDictionary.indexOf(slice[j]) << 2;
				charNumberOne += (encodeDictionary.indexOf(slice[j+1]) & 0x30) >> 4;
				decodeSlice += String.fromCharCode(charNumberOne);
				break;
			case 1:
				var charNumberTwo = (encodeDictionary.indexOf(slice[j]) & 0xF) << 4;
				charNumberTwo  += (encodeDictionary.indexOf(slice[j+1]) & 0x3C) >> 2;
				decodeSlice += String.fromCharCode(charNumberTwo);
				break;
			case 2:
				var charNumberThree = (encodeDictionary.indexOf(slice[j]) & 0x3) << 6;
				charNumberThree  += (encodeDictionary.indexOf(slice[j+1]) & 0x3F);
				decodeSlice += String.fromCharCode(charNumberThree);
				break;
		}
	}
	return decodeSlice;
}

/**
* setCharAt
*/
function setCharAt(str,index,chr) {
	if(index > str.length-1) return str;
	return str.substr(0,index) + chr + str.substr(index+1);
}