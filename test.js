//get node module
var b64 = require('base64-min');

var rawMessage = 'base64-min npm module';
console.log('Original Message :', rawMessage);
var encoded = b64.encode(rawMessage);
console.log('Message encoded in base64 :', encoded);
console.log('Message decoded in plain-text : '+b64.decode(encoded));