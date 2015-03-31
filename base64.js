var base64 = function () {};

/**
* First Function to test node_module concept
*/
base64.prototype.printHello = function (name) {
	return 'Hello! My name is ' + name + '!';
};

module.exports = new base64();