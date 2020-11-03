'use strict'

var mongo = require('mongodb').MongoClient;
var utils = require('./utils');
const config = utils.getConfig();
var url = config.mongo.url;
const dbname = config.mongo.db;

class db {

    static find(res, collName, search) {
        var client = new mongo(url, { useUnifiedTopology: true });
        client.connect().then(() => {
            return client.db(dbname);
        }).then((db) => {
            const collection = db.collection(collName);
            collection.find(search).toArray().then((docs) => {
                res.status(200).json(docs);
            }).catch((err) => {
                console.error(err);
                res.sendStatus(500);
            });
        }).catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
    }

    static findSortandLimit(res, collName, search, sort, limit) {

        var client = new mongo(url, { useUnifiedTopology: true });
        client.connect().then(() => {
            return client.db(dbname);
        }).then((db) => {
            const collection = db.collection(collName);
            collection.find(search).sort(sort).limit(limit).toArray().then((docs) => {
                res.status(200).json(docs);
            }).catch((err) => {
                console.error(err);
                res.sendStatus(500);
            });
        }).catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
    }

    static insert(res, collName, document) {
        var client = new mongo(url, { useUnifiedTopology: true });
        client.connect().then(() => {
            return client.db(dbname);
        }).then((db) => {
            // Insert a comment.
            const collection = db.collection(collName);
            collection.insertOne(document).catch((err) => {
                console.error(err);
                res.sendStatus(500);
            });
        }).then(() => {
            res.sendStatus(200);
        }).catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
    }

    static update(res, collName, search, document) {
        var client = new mongo(url, { useUnifiedTopology: true });
        client.connect().then(() => {
            return client.db(dbName);
        }).then((db) => {
            const collection = db.collection(collName);
            var newColor = utils.generateColor();
            // Insert a comment.
            collection.updateOne(
                search, document).catch((err) => {
                    console.error(err);
                    res.sendStatus(500);
                });
        }).catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
    }

    static upsert(res, collName, search, document) {
        var client = new mongo(url, { useUnifiedTopology: true });
        client.connect().then(() => {
            return client.db(dbName);
        }).then((db) => {
            const collection = db.collection(collName);
            var newColor = utils.generateColor();
            // Insert a comment.
            collection.upsert(
                search, document).catch((err) => {
                    console.error(err);
                    res.sendStatus(500);
                });
        }).catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
    }

    static delete(res, collName, search) {

    }
}

module.exports = db;