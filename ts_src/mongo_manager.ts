'use strict'

/*
* I was rewriting a lot of the same code over and over
* So I decided to write better and put it in one file
* Better maintainability, better testing
* 
* Also gives me a chance to learn typescript
* And lets me properly learn promises which I should know by now
*/

var mongo = require('mongodb');
var mongoClient = mongo.MongoClient;
var objectID = mongo.ObjectID;

class driver {

    static config = require('./config');

    static url = driver.config.getConfig().mongo.url; //config.mongo.url;
    static dbname = driver.config.getConfig().mongo.db; //config.mongo.db;

    //used for testing so that we aren't in the production db
    public static overrideDB(newDB: string): string {
        this.dbname = newDB;
        return this.dbname;
    }

    public static safeObjectID(seed: string) {
        if(driver.isID(seed)){
            return objectID(seed);
        }
        return objectID();
    }

    public static isID(value: string): boolean {
        let hex = /^[0-9A-Fa-f]{24}$/g;
        return hex.test(value);
    }

    public static findByID = (collName: string, id: string) => new Promise((resolve, reject) => {
        try {
            mongoClient.connect(driver.url, { useUnifiedTopology: true }, function (err: any, db: any) {
                if (err) reject(err);
                var dbo = db.db(driver.dbname);
                dbo.collection(collName).findOne({ "_id": driver.safeObjectID(id) }, function (err, results) {
                    if (err) { reject(err); }
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
    public static find = (collName: string, search: any) => new Promise((resolve, reject) => {
        mongoClient.connect(driver.url, { useUnifiedTopology: true }, function (err: any, db: any) {
            if (err) reject(err);
            var dbo = db.db(driver.dbname);
            dbo.collection(collName).find(search).toArray(function (err, results) {
                if (err) reject(err);
                db.close();
                resolve(results);
            });
        });
    });

    public static findSortandLimit = (collName: string, search: JSON, sort: JSON, limit: number) => new Promise((resolve, reject) => {
        mongoClient.connect(driver.url, { useUnifiedTopology: true }, function (err: any, db: any) {
            if (err) reject(err);
            var dbo = db.db(driver.dbname);
            dbo.collection(collName).find(search).sort(sort).limit(limit).toArray(function (err, results) {
                if (err) reject(err);
                db.close();
                resolve(results);
            });
        });
    });

    //examples
    //this.insert(collName, document).then((ret) => { res.sendStatus(ret); })
    //this.insert(collName, document).then((ret) => { return ret; })
    public static insert = (collName: string, document: JSON) => new Promise((resolve, reject) => {
        mongoClient.connect(driver.url, { useUnifiedTopology: true }, function (err: any, db: any) {
            if (err) reject(err);
            var dbo = db.db(driver.dbname);
            dbo.collection(collName).insertOne(document, function (err, results) {
                if (err) reject(err);
                db.close();
                resolve(results);
            });
        });
    });

    //examples
    //this.update(collName, search, document).then((ret) => { res.sendStatus(ret); })
    //this.update(collName, search, document).then((ret) => { return ret; })
    static update = (collName: string, search: JSON, document: JSON) => new Promise((resolve, reject) => {
        mongoClient.connect(driver.url, { useUnifiedTopology: true }, function (err: any, db: any) {
            if (err) reject(err);
            var dbo = db.db(driver.dbname);
            dbo.collection(collName).updateOne(search, document, function (err, results) {
                if (err) reject(err);
                db.close();
                resolve(results);
            });
        });
    });

    static updateByID = (collName: string, id: string, document: JSON) => new Promise((resolve, reject) => {
        try {
            mongoClient.connect(driver.url, { useUnifiedTopology: true }, function (err: any, db: any) {
                if (err) reject(err);
                var dbo = db.db(driver.dbname);
                dbo.collection(collName).updateOne({ "_id": driver.safeObjectID(id) }, { $set: document }, function (err, results) {
                    if (err) reject(err);
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

    static deleteByID = (collName: string, id: string) => new Promise((resolve, reject) => {
        try {
            mongoClient.connect(driver.url, { useUnifiedTopology: true }, function (err: any, db: any) {
                if (err) reject(err);
                var dbo = db.db(driver.dbname);
                dbo.collection(collName).deleteOne({ "_id": driver.safeObjectID(id) }, function (err, results) {
                    if (err) reject(err);
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
}

module.exports = driver;