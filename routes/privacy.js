'use strict'

var express = require('express');
var router = express.Router();
var utils = require('../ts_built/utils');

router.get('/',function (req,res) {
	res.send(utils.getBetterHTMLTemplate('privacy.html',{title:"Our Privacy Policies"}));
});

module.exports = router;