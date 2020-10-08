var express = require('express');
var router = express.Router();
var ensureLoggedIn = require('connect-ensure-login');
var utils = require('../utils');

var register = require('./register');
var login = require('./login');
var deleteU = require('./delete');
var profile = require('./profile');
var api = require('./api');

router.get('/', function (req, res) {
	res.send(utils.getBetterHTMLTemplate('user/user.html', { title: "Account Management" }));
});

router.use('/register', register);
router.use('/login', login);
router.use('/delete',
	ensureLoggedIn.ensureLoggedIn('/u/login'),
	deleteU);
router.use('/profile',
	ensureLoggedIn.ensureLoggedIn('/u/login'),
	profile);
router.use('/logout', function (req, res) {
	req.logout();
	res.redirect('/u/login');
});
router.use('/api', api);

module.exports = router;
