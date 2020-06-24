//test stuff

var assert = require('chai').assert;
var utils = require('./routes/utils');

assert.typeOf(utils.getHTMLHead(),'string','Utils should provide a string head');
assert.typeOf(utils.getBetterHTMLTemplate('index.html'),'string','Utils should provide a string');
assert.typeOf(utils.getPrettyTime(),'string','Utils should provide the time as a string');

console.log("All tests completed!");
