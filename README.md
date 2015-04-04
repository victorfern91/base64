# base64 (npm base64-min)
This is my first npm module.
This modules can be used to encoding & decoding strings using base64.
<center><a href="https://nodei.co/npm/base64-min/"><img src="https://nodei.co/npm/base64-min.png?downloads=true&downloadRank=true&stars=true"></a></center>

## Why use this module?
This module contains private and public methods, it's minimalist, and focused in the best javascript performance.

## How to use?
To load module functionalities, you must use the require.js properties integrated in node.js.

Example: 
```javascript
var base64 = require('base64-min');
```
### Available functions and their description
| Module Functions | Description | Use case | Completed |
| ---------------- | ----------- | ---- | ---------- |
| **encode(string)**  | **Input:** Plain Text String (RAW format);</br> **Output:** Encoded String | base64.encode('tutorial')  | 100 % | 
| **decode(string)**  | **Input:** Base64 Encoded String;</br> **Output:** Plain Text and Decoded String | base64.decode('dHV0b3JpYWw=') | 100 % |
| **encodeFile(string)**  | **Input:** File Path;</br> **Output:** Encoded String | base64.encodeFile('image1.png')  | 100 % | 
| **decodeFileSave(string)**  | **Inputs:** Encoded string, File Path;</br> **Output:** File Decoded | base64.decode('aBCde0+...sdQ==', 'result.png') | 100 % |

#### Install base64-min module
At cmd, type:
```
$ npm install base64-min
```
or to install this package globally, use:

```
$ npm install -g base64-min 
```

##### Run example

```
$ node node_modules/base64-min/test.js
```

### Changelog
**v0.2.1 :**
- bug fix in encodingSystem function.
**v0.2.0 :**
- encode process more modular (added one more private function). 
- added more two new functions: **encodeFile** and **decodeSaveFile** (only tested with PNG Files).

## Future updates:
- <s>encode and decode files</s>;
- add compatibility with MIME, and other standards (RFC ****, etc). 
- Unit Tests
