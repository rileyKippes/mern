'use strict'

var express = require('express');
var router = express.Router();
var utils = require('../utils');

router.get('/',function (req,res) {
	res.send(utils.getBetterHTMLTemplate('aboutSite.html',{title:"About this site"}));
});

module.exports = router;
