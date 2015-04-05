/**
* node module -> Base64, created by victorfern91 (a.k.a Victor Fernandes - victorfern91[at]gmail.com)
* Module Version : 0.2.0
* Avaiable Functions : encoding & decoding
* Outputs: Coded string or Decoded string, using Base64
*/

var base64 = function () {};

var encodeDictionary ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
// for file function
var fs = require('fs');

/**
* encode function() - public method
*/
base64.prototype.encode = function (str){
	var encodedString = '';
	// First step, divid the input bytes streams into blocks of 3 bytes.
	var inputSliced = [];
	for(i = 0, length = str.length; i < length; i = i + 3){
		inputSliced.push(str.slice(i,i+3));
	}
	//encode all 3 byte blocks
	for(i = 0, length = inputSliced.length; i < length; i++){
		encodedString += encodingSystem(inputSliced[i]);
	} 
	return encodedString;
};

/**
* encodeFile function() - public method
* Only tested with the PNG Files  
*/
base64.prototype.encodeFile = function (file){
	var inputData = fs.readFileSync(file);
	var fileToStr = '';
	for(i = 0; i < inputData.length; i++){
		fileToStr += String.fromCharCode(inputData[i]);
	}
	var inputSliced = [];
	for(i = 0, length = fileToStr.length; i < length; i = i + 3){
		inputSliced.push(fileToStr.slice(i,i+3));
	}
	var encodedString='';
	for(i = 0, length = inputSliced.length; i < length; i++){
		encodedString += encodingSystem(inputSliced[i]);
	} 
	return encodedString;
};

/**
* decode function() - public method
*/
base64.prototype.decode = function (str){
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

/**
* decodeFile function() - public method
* Only tested with the PNG Files  
*/
base64.prototype.decodeToFile = function (str, filePath){
	// reverse process
	var data = this.decode(str);
	fs.writeFileSync(filePath,data,'binary');
};

module.exports = new base64();

//Functions Helpers (Private functions)

/**
* encodingSystem - private function
*/
function encodingSystem(slice){
	var sliceLength = slice.length;
	var encoded = '';
	//if this slice/block have 3 byetes
	if(sliceLength === 3){
		return encodingBlock(slice);
	} else { // if slice/block doesn't have 3 bytes
		switch(sliceLength){
			case 1:
				slice += '\0\0';
				encoded = encodingBlock(slice);
				//add '=''=' 
				encoded = setCharAt(encoded,2,'=');
				encoded = setCharAt(encoded,3,'=');
				break;
			case 2:
				slice += '\0';
				encoded = encodingBlock(slice);
				// add = 
				encoded = setCharAt(encoded,3,'=');
				break;
		}
	}
	return encoded;
}

/**
* encoding block - private function
* Update: Changed binary masks into Hexadecimal
*/
function encodingBlock(slice){
	var encodedSlice = '';
	for(j = 0, sliceLength = slice.length; j < sliceLength; j++){
		switch(j){
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
* decodingBlock - private function
* This method receive 4-byte encoded slice and decode to 3 char string. 
* Update: Changed binary masks into Hexadecimal
*/
function decodingBlock(slice){
	var decodeSlice = '';
	for(j = 0, length = slice.length; j < length; j++){
		switch(j){
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
* setCharAt - private function
*/
function setCharAt(str,index,chr) {
	if(index > str.length-1) return str;
	return str.substr(0,index) + chr + str.substr(index+1);
}