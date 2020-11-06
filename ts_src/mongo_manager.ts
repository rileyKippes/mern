'use strict'

/*
* I was rewriting a lot of the same code over and over
* So I decided to write better and put it in one file
* Better maintainability, better testing
* 
* Also gives me a chance to learn typescript
* And lets me properly learn promises which I should know by now
*/

var mongo = require('mongodb').MongoClient;
var utils = require('../routes/utils');
const config = utils.getConfig();
const url = config.mongo.url;
const dbname = config.mongo.db;

class driver {

    //examples
    //this.find(collName, search).then((ret) => { res.status(200).json(ret); })
    //this.find(collName, search).then((ret) => { return ret; })
    public static find = (collName: string, search: any) => new Promise((resolve, reject) => {
        mongo.connect(url, { useUnifiedTopology: true }, function (err: any, db: any) {
            if (err) reject(err);
            var dbo = db.db(dbname);
            dbo.collection(collName).find(search).toArray(function (err, results) {
                if (err) reject(err);
                db.close();
                resolve(results);
            });
        });
    });

    public static findSortandLimit = (collName: string, search: JSON, sort: JSON, limit: number) => new Promise((resolve, reject) => {
        mongo.connect(url, { useUnifiedTopology: true }, function (err: any, db: any) {
            if (err) reject(err);
            var dbo = db.db(dbname);
            dbo.collection(collName).find(search).toArray(function (err, results) {
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
        mongo.connect(url, { useUnifiedTopology: true }, function (err: any, db: any) {
            if (err) reject(err);
            var dbo = db.db(dbname);
            dbo.collection(collName).insertOne(document, function (err,results) {
                if (err) reject(err);
                utils.debug("Inserted One");
                db.close();
                resolve(results);
            });
        });
    });

    //examples
    //this.update(collName, search, document).then((ret) => { res.sendStatus(ret); })
    //this.update(collName, search, document).then((ret) => { return ret; })
    static update = (collName: string, search: JSON, document: JSON) => new Promise((resolve, reject) => {
        mongo.connect(url, { useUnifiedTopology: true }, function (err: any, db: any) {
            if (err) reject(err);
            var dbo = db.db(dbname);
            dbo.collection(collName).updateOne(search, document, function (err,results) {
                if (err) reject(err);
                utils.debug("Updated One");
                db.close();
                resolve(results);
            });
        });
    });

    static delete(rcollName: string, id: object) {
        //todo
    }
}

module.exports = driver;