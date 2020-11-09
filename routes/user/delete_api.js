var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var mongo = mongodb.MongoClient;
var bcrypt = require('bcrypt');
var utils = require('../../ts_built/utils');

const config = require('../../ts_built/config').getConfig();
var url = config.mongo.url;
var dbName = config.mongo.db;
var collName = 'users';

var saltRounds = 10;

router.post('/', function (req, res) {
    //cache it
    var usr = req.body.username;
    var pwd = req.body.password;
    var cfm = req.body.confirm;

    console.log(usr + '|' + pwd + '|' + cfm)

    //checks
    if (usr == undefined || pwd == undefined || cfm == undefined) {
        console.log("undefined variables")
        return res.redirect('/u/delete?err=unfilled_form');
    }
    else if (usr !== req.user.username) {
        console.log("bad username");
        return res.redirect('/u/delete?err=bad_username_or_password');
    }
    else if (cfm !== "Delete") {
        console.log("bad delete");
        return res.redirect('/u/delete?err=bad_confirm');
    }
    else {

        //testing the password is more complex, since we hashed it
        bcrypt.compare(pwd, req.user.password).then((result) => {
            if (!result) {
                console.log("bad password");
                return res.redirect('/u/delete?err=bad_username_or_password');
            };

            console.log("Compare Worked");
            console.log(req.body);
            console.log(req.user);
            console.log("Starting deletion");

            var id = new mongodb.ObjectID(req.user._id);
            req.logout();
            var client = new mongo(url, { useUnifiedTopology: true });
            client.connect().then(() => {
                return client.db(dbName);
            }).then((db) => {
                const collection = db.collection(collName);
                collection.deleteOne({ "_id": id });
                console.log("Account Deleted");

                return res.redirect('/u/login?delete_success');
            }).catch((err) => {
                console.error(err);
                return res.redirect('/u/delete?err=unknown_error');
            });
        }).catch((err) => {
            console.error(err);
            return res.redirect('/u/delete?err=unknown_error');
        });


    }
});


module.exports = router;