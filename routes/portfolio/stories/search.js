'use strict'

var express = require('express');
var router = express.Router();
var utils = require('../../../ts_built/utils');

var ensureLoggedIn = require('connect-ensure-login');

var newStory = require('./newStory');

router.post('/', function (req, res) {
    res.status(200).json({
        0:{
            _id: 0,
            title: "TestTitle1",
            description: "This is a test description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            author: "John Doe",
            uploaded: "2000-12-31",
            tags: ["Tags", "Test", "Nonsense"],
            numPages: 1,
            textID: "<ObjectID> Link to the first"
        },
        1:{
            _id: 1,
            title: "TestTitle2",
            description: "This is another test. Who was Max Headroom?",
            author: "Max Headroom",
            uploaded: "2000-12-31",
            tags: ["tags", "Test", "Nonsense", "Max"],
            numPages: 1,
            textID: "<ObjectID> Link to the second"
        },
        2:{
            _id: 2,
            title: "TestTitle3",
            description: "This is yet another test, and a reference to the main character of Neuromancer",
            author: "Case",
            uploaded: "2000-10-15",
            tags: ["tags", "Test", "Nonsense", "Case", "Cyberpunk"],
            numPages: 1,
            textID: "<ObjectID> Link to the third"
        },
        3:{
            _id: 3,
            title: "TestTitle4",
            description: "Amazing test ahead! Dixie Flatline is another character from Neuromancer. ",
            author: "Dixie Flatline",
            uploaded: "1970-12-31",
            tags: ["tags", "Test", "Nonsense", "Flatline"],
            numPages: 3,
            textID: "<ObjectID> Link to the forth"
        }});
});

module.exports = router;