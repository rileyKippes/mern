var assert = require('chai').assert; //for base 
var utils = require('./ts_built/utils');
var config = require('./ts_built/config');

assert.isTrue(config.loadConfig());
assert.isDefined(config.getConfig());
assert.isObject(config.getConfig());
assert.isDefined(config.getConfig().mongo);

assert.isString(utils.generateColor());
assert.isString(utils.getCustomHTMLHead({title:"test"}));
assert.isString(utils.getBetterHTMLTemplate("index.html",{title:"test"}));

console.log("All tests completed!");