//get node module
var b64 = require('base64');

var encoded = b64.encode('This is Sparta! And is Encoded?');
console.log('Message encoded in base64 :', encoded);
console.log('Message in base64 decoded : '+b64.decode(encoded)+'.');
