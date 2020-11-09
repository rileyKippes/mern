'use strict'
{
var express = require('express');
var router = express.Router();
var utils = require('../../../ts_built/utils');

var chat_api = require('./chat_api');

router.get('/',function (req,res) {
	res.send(utils.getBetterHTMLTemplate('portfolio/chat.html',{title:"Chat box"}));
});

router.use('/api',chat_api);
}

module.exports = router;
