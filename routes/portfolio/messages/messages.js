'use strict'
{
var express = require('express');
var router = express.Router();
var utils = require('../../utils');

var message_api = require('./messages_api');

router.get('/',function (req,res) {
	res.send(utils.getBetterHTMLTemplate('portfolio/messages.html',{title:"Direct Messages"}));
});

router.use('/api',message_api);
}

module.exports = router;
