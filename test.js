var assert = require('chai').assert; //for base 
var config = require('./ts_built/config');

assert.isTrue(config.loadConfig(), "Checks to see if config.json is there"); //must be done before anything else

/* config.ts */
function testConfig() {
    console.log("Beginning Config Tests");
    assert.isDefined(config.getConfig());
    assert.isObject(config.getConfig());
    assert.isDefined(config.getConfig().mongo);
    assert.isString(config.getConfig().mongo.db);
    assert.isString(config.getConfig().mongo.url);
    console.log("Config tests completed");
}

/* utils.ts */
function testUtils() {
    console.log("Beginning Utils Tests. Should result in a data object is invalid error");
    var utils = require('./ts_built/utils');
    assert.isString(utils.generateColor(), "Generating Color");
    assert.isString(utils.getCustomHTMLHead({ title: "test" }), "Custom Head Test");
    assert.isString(utils.getCustomHTMLHead({}), "Custom Head Test without a title"); //should result in an error message
    assert.isString(utils.getBetterHTMLTemplate("index.html", { title: "test" }), "Better HTML Test");
    assert.isString(utils.loadScript("test.js", "test-container", { title: "test" }), "Load script test");
    console.log("Utils tests completed");
}

/* mongo_manager.ts */
async function testMongo() {
    console.log("Beginning Mongo Tests");
    var db = require('./ts_built/mongo_manager');

    assert.isTrue(db.isID('000e9808856628263f7e3cfd'));
    assert.isFalse(db.isID('a'));
    assert.isFalse(db.isID('000e9808856628263f7e3cfdadsvav'));
    assert.isFalse(db.isID('@#@$@$@000e9808856628263f7e3cfdadsvav'));
    assert.isFalse(db.isID('$#@e9808856628263f7e3cfd'));

    assert.strictEqual('test', db.overrideDB('test'));
    var id = db.safeObjectID();
    var value = Date.now();

    //test insert
    await db.insert('test', { _id: id, key: value });
    await db.findByID('test', id).then((ret) => {
        assert.strictEqual(ret.key, value, "Happy, Value gotten should equal value put in");
        assert.notStrictEqual(ret.key, "not a utc value", "Unhappy, Value gotten should equal value put in");
    });

    //test update
    var value2 = 25;
    await db.updateByID('test', id, { key: value2 });
    await db.findByID('test', id).then((ret) => {
        assert.strictEqual(ret.key, value2, "Happy, Value gotten should equal value put in");
        assert.notStrictEqual(ret.key, "not a utc value", "Unhappy, Value gotten should equal value put in");
    });


    //cleanup
    await db.deleteByID('test', id);
    await db.findByID('test', id).then((ret) => {
        assert.notExists(ret);
    });



    console.log("Mongo tests completed");
}

testConfig();
testUtils();
testMongo();
