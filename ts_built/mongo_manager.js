'use strict';
/*
* I was rewriting a lot of the same code over and over
* So I decided to write better and put it in one file
* Better maintainability, better testing
*
* Also gives me a chance to learn typescript
*/
var mongo = require('mongodb');
var mongoClient = mongo.MongoClient;
var objectID = mongo.ObjectID;
class driver {
    //used for testing so that we aren't in the production db
    static overrideDB(newDB) {
        this.dbname = newDB;
        return this.dbname;
    }
    //can be dangerous in that it won't always use the seed string
    //but it's better than crashing
    static safeObjectID(seed) {
        if (driver.isID(seed)) {
            return objectID(seed);
        }
        return objectID();
    }
    static isID(value) {
        //starts at the begining, 
        //looks for 24 hex characters, 
        // and expects to reach the end
        //If anything fails, it returns false
        let hex = /^[0-9A-Fa-f]{24}$/g;
        return hex.test(value);
    }
}
driver.config = require('./config');
driver.url = driver.config.getConfig().mongo.url; //config.mongo.url;
driver.dbname = driver.config.getConfig().mongo.db; //config.mongo.db;
driver.findByID = (collName, id) => new Promise((resolve, reject) => {
    try {
        mongoClient.connect(driver.url, { useUnifiedTopology: true }, function (err, db) {
            if (err)
                reject(err);
            var dbo = db.db(driver.dbname);
            dbo.collection(collName).findOne({ "_id": driver.safeObjectID(id) }, function (err, results) {
                if (err) {
                    reject(err);
                }
                db.close();
                resolve(results);
            });
        });
    }
    catch (err) {
        console.log(err);
        reject(err);
    }
});
//examples
//this.find(collName, search).then((ret) => { res.status(200).json(ret); })
//this.find(collName, search).then((ret) => { return ret; })
driver.find = (collName, search) => new Promise((resolve, reject) => {
    mongoClient.connect(driver.url, { useUnifiedTopology: true }, function (err, db) {
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
    mongoClient.connect(driver.url, { useUnifiedTopology: true }, function (err, db) {
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
    mongoClient.connect(driver.url, { useUnifiedTopology: true }, function (err, db) {
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
    mongoClient.connect(driver.url, { useUnifiedTopology: true }, function (err, db) {
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
driver.updateByID = (collName, id, document) => new Promise((resolve, reject) => {
    try {
        mongoClient.connect(driver.url, { useUnifiedTopology: true }, function (err, db) {
            if (err)
                reject(err);
            var dbo = db.db(driver.dbname);
            dbo.collection(collName).updateOne({ "_id": driver.safeObjectID(id) }, { $set: document }, function (err, results) {
                if (err)
                    reject(err);
                db.close();
                resolve(results);
            });
        });
    }
    catch (err) {
        console.log(err);
        reject(err);
    }
});
driver.deleteByID = (collName, id) => new Promise((resolve, reject) => {
    try {
        mongoClient.connect(driver.url, { useUnifiedTopology: true }, function (err, db) {
            if (err)
                reject(err);
            var dbo = db.db(driver.dbname);
            dbo.collection(collName).deleteOne({ "_id": driver.safeObjectID(id) }, function (err, results) {
                if (err)
                    reject(err);
                db.close();
                resolve(results);
            });
        });
    }
    catch (err) {
        console.log(err);
        reject(err);
    }
});
module.exports = driver;
