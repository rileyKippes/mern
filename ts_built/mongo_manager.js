'use strict';
/*
* I was rewriting a lot of the same code over and over
* So I decided to write better and put it in one file
* Better maintainability, better testing
*
* Also gives me a chance to learn typescript
* And lets me properly learn promises which I should know by now
*/
var mongo = require('mongodb').MongoClient;
class driver {
    static delete(rcollName, id) {
        //todo
    }
}
driver.config = require('./config');
driver.url = driver.config.getConfig().mongo.url; //config.mongo.url;
driver.dbname = driver.config.getConfig().mongo.db; //config.mongo.db;
//examples
//this.find(collName, search).then((ret) => { res.status(200).json(ret); })
//this.find(collName, search).then((ret) => { return ret; })
driver.find = (collName, search) => new Promise((resolve, reject) => {
    mongo.connect(driver.url, { useUnifiedTopology: true }, function (err, db) {
        if (err)
            reject(err);
        var dbo = db.db(driver.dbname);
        dbo.collection(collName).find(search).toArray(function (err, results) {
            if (err)
                reject(err);
            db.close();
            resolve(results);
        });
    });
});
driver.findSortandLimit = (collName, search, sort, limit) => new Promise((resolve, reject) => {
    mongo.connect(driver.url, { useUnifiedTopology: true }, function (err, db) {
        if (err)
            reject(err);
        var dbo = db.db(driver.dbname);
        dbo.collection(collName).find(search).sort(sort).limit(limit).toArray(function (err, results) {
            if (err)
                reject(err);
            db.close();
            resolve(results);
        });
    });
});
//examples
//this.insert(collName, document).then((ret) => { res.sendStatus(ret); })
//this.insert(collName, document).then((ret) => { return ret; })
driver.insert = (collName, document) => new Promise((resolve, reject) => {
    mongo.connect(driver.url, { useUnifiedTopology: true }, function (err, db) {
        if (err)
            reject(err);
        var dbo = db.db(driver.dbname);
        dbo.collection(collName).insertOne(document, function (err, results) {
            if (err)
                reject(err);
            db.close();
            resolve(results);
        });
    });
});
//examples
//this.update(collName, search, document).then((ret) => { res.sendStatus(ret); })
//this.update(collName, search, document).then((ret) => { return ret; })
driver.update = (collName, search, document) => new Promise((resolve, reject) => {
    mongo.connect(driver.url, { useUnifiedTopology: true }, function (err, db) {
        if (err)
            reject(err);
        var dbo = db.db(driver.dbname);
        dbo.collection(collName).updateOne(search, document, function (err, results) {
            if (err)
                reject(err);
            db.close();
            resolve(results);
        });
    });
});
module.exports = driver;
