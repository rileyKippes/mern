var assert = require('chai').assert; //for base 

/* config.ts */
console.log("Beginning Config Tests");
var config = require('./ts_built/config');
assert.isTrue(config.loadConfig(), "Checks to see if config.json is there");
assert.isDefined(config.getConfig());
assert.isObject(config.getConfig());
assert.isDefined(config.getConfig().mongo);
assert.isString(config.getConfig().mongo.db);
assert.isString(config.getConfig().mongo.url);
console.log("Config tests completed");

/* utils.ts */
console.log("Beginning Utils Tests");
var utils = require('./ts_built/utils');
assert.isString(utils.generateColor(), "Generating Color");
assert.isString(utils.getCustomHTMLHead({ title: "test" }), "Custom Head Test");
assert.isString(utils.getCustomHTMLHead({}), "Custom Head Test without a title"); //should result in an error message
assert.isString(utils.getBetterHTMLTemplate("index.html", { title: "test" }), "Better HTML Test");
assert.isString(utils.loadScript("test.js", "test-container", { title: "test" }), "Load script test");
console.log("Utils tests completed");

/* mongo_manager.ts */
async function testMongo() {
    console.log("Beginning Mongo Tests");
    var db = require('./ts_built/mongo_manager');
    assert.strictEqual('test', db.overrideDB('test'));
    var id = db.ObjectID().ObjectID();
    var value = Date.now();
    await db.insert('test', { _id: id, key: value });
    await db.findByID('test', id).then((ret) => {
        assert.strictEqual(ret.key, value, "Happy, Value gotten should equal value put in");
        assert.notStrictEqual(ret.key, "not a utc value", "Unhappy, Value gotten should equal value put in")
    });
    //cleanup
    await db.deleteByID('test', id).then((ret) => { console.log("Cleaned up" + JSON.stringify(ret.result)); });
    console.log("Mongo tests completed");
}

testMongo();


console.log("All tests completed");