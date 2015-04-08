//get node module
var b64 = require('./base64');

var rawMessage = 'base64-min npm module';
console.log('Original Message :', rawMessage);
var encoded = b64.encode(rawMessage);
console.log('Message encoded in base64 :', encoded);
console.log('Message decoded in plain-text : '+b64.decode(encoded));

console.log('== Encrypted base64 ==');
console.log('Original Message :', rawMessage);
var encoded = b64.encodeWithKey(rawMessage, 'victorfern91');
console.log('encoded with key: ', encoded);
console.log('decoded with correct key: ', b64.decodeWithKey(encoded, 'victorfern91'));
console.log('decoded with incorrect key: ', b64.decodeWithKey(encoded, 'npm module'));