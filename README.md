# base64 (npm base64-min)

This modules can be used to encoding & decoding messages (strings) and files using base64.

I'm trying to add new features based in other packages to get an AIO npm module.
Actually **base64-min** can encode and decode: **strings**, **files** and **strings with XOR encryptation**.

<a href="https://nodei.co/npm/base64-min/"><img src="https://nodei.co/npm/base64-min.png?downloads=true&downloadRank=true&stars=true"></a>

## Why use this module?
This module contains private and public methods, it's minimalist, and focused in the best javascript performance.


### Install base64-min module
At cmd, type:
```
$ npm install base64-min
```
or to install this package globally, use:

```
$ npm install -g base64-min 
```

### After install run unit tests

```
$ cd ./node_modules/base64-min/
$ npm install
$ npm test 
```
<img src="http://i.imgur.com/U7rayiT.png"/>

### And run tutorial
```
$ cd ./node_modules/base64-min/
$ node tutorial.js
```

## How to use?
To load module functionalities, you must use the require.js properties integrated in node.js.

Example: 
```javascript
var base64 = require('base64-min');
```
### DOCS

##### encode (str)
This method is used to encode a plain-text string to a encoded string in base64.
- **Arguments :**
- ```str``` - The string you want to encode.
- ```type``` - Encoding Type (This argument is optional) | Available types: 'MIME'.
- **Result :**  Encoded string in base64.
- **Example :**
```javascript
base64.encode('base64-min npm module'); // result = YmFzZTY0LW1pbiBucG0gbW9kdWxl
base64.encode('base64-min npm module', 'MIME'); // result = YmFzZTY0LW1pbiBucG0gbW9kdWxl
                                                 // encoded string in base64, using MIME constraints
```
##### decode (str)
This method is used to decode a the base64 message to a plain-text string.
- **Arguments :**
- ```str``` - The message (in base64) you want to decode.
- **Result :**  Our message decoded in plain-text.
- **Example :**
```javascript
base64.encode('YmFzZTY0LW1pbiBucG0gbW9kdWxl'); // result = base64-min npm module
```
##### encodeFile(file)
This method is used to encode files into base64 string.
- **Arguments :**
- ```file``` - The file path of the you want to encode.
- **Result :**  Encoded File into a string in base64.
- **Example :**
```javascript
base64.encodeFile('original.png');
```
##### decodeToFile(str,filepath)
This method is used to decode messages and save the result in one file (Tested and functional with PNG Files).
- **Arguments :**
- ```str``` - The message (in base64) you want to decode.
- ```file``` - The file path of the you want to save.
- **Result :**  Decoded File
- **Example :**
```javascript
base64.encodeToFile('ZGF0YQ==', 'result.png') ;
```
##### encodeWithKey(str,key)
This method is used to encode messages and encrypt messages using a key (XOR Encryption - Fast and "Secure").
- **Arguments :**
- ```str``` - The message in plain-text.
- ```key``` - The key you want to encrypt your message.
- **Result :**  Encoded encrypted message in base64.
- **Example :**
```javascript
base64.encodeWithKey('base64-min npm module', 'victorfern91'); // result = FAgQEVlGSwgbABlfBgRDGQAWEwkX
                                                               //(in plain text is YFK_C	)
```
##### decodeWithKey(str,key)
- **Arguments :**
- ```str``` - The message in base64.
- ```key``` - The key used to encrypt this message.
- **Result :**  Deciphered message in plain-text.
- **Example :**
```javascript
//Decoding with wrong key
base64.decodeWithKey('FAgQEVlGSwgbABlfBgRDGQAWEwkX', 'npm module'); // result = zx}14)/}wew/k$.vdcly
//Decoding with correct key
base64.decodeWithKey('FAgQEVlGSwgbABlfBgRDGQAWEwkX', 'victorfern91'); // result = base64-min npm module
```

### Changelog
**v0.5.1 && v0.5.2**
-  Updated README.md file.

**v0.5.0**
- Feature: **encode** and **decode** functions compatible with MIME constraints.
- **Note:** Actually this is only compatible with strings.
- Added new unit tests.

**v0.4.1**
- Updated README.md file.

**v0.4.0**
- Added Unit Tests (To run tests use command ```npm test``` after module install).
- Bug fix in decode process.

**v0.3.0 :**
- Added more two new functions: **encodeWithKey** and **decodeWithKey** (XOR Encryption - Fast and "Secure").

**v0.2.2 :**
- Minor changes, to improve JavaScript performance.
- Important! **decodeSaveFile** function name changed to **decodeToFile**.

**v0.2.1 :**
- Bug fix in encodingSystem function.

**v0.2.0 :**
- Encode process more modular (added one more private function). 
- Added more two new functions: **encodeFile** and **decodeSaveFile** (only tested with PNG Files).

## Future updates:
- Add compatibility with MIME, and other standards (RFC ****, etc). 
