# base64
This is my first node.js module.
This modules can be used to encoding & decoding strings using base64.

## Why using this module?
This module contains private and public methods, it's minimalist, and focused in the best javascript performance.

## How to use?
To load module functionalities, you must use the require.js properties integrated in node.js.

e.g.: 
```javascript
var base64 = require('base64');
```
### Available functions and their descriptions
| Module Functions | Description | Usage| Completed |
| ---------------- | ----------- | ---- | ---------- |
| **encode(string)**  | Encoding function - **Input:** Plain Text String (RAW format); **Output:** Encoded String | base64.encode('tutorial')  | 100 % | 
| **decode(string)**  | Decoding function - **Input:** Base64 Encoded String; **Output:** Plain Text and Decoded String | base64.decode('dHV0b3JpYWw=') | 100 % |
| printHello(string) | This is only for testing purposes  | base64.printHello('Victor') | deleted |

#### Run example
At cmd, type:
```
$ node tutorial.js
```
