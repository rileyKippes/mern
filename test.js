var assert = require('chai').assert;
var utils = require('./routes/utils');

//test config
assert.isObject(utils.loadConfig());
assert.isDefined(utils.getConfig().debug);
assert.isDefined(utils.getConfig().login);

assert.typeOf(utils.getBetterHTMLTemplate('index.html',{title:"test"}),'string','Utils template should provide a string');
assert.typeOf(utils.generateColor(),'string','Utils generate color should provide a string');

console.log("All tests completed!");
