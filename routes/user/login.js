var express = require('express');
var router = express.Router();
var passport = require('passport');
var utils = require('../../ts_built/utils');

// ~/u/post
router.get('/',
	function (req, res) {
		res.send(utils.getBetterHTMLTemplate('user/login.html', { title: "Login User" }));
	}
);

router.post('/',
	passport.authenticate('local', { failureRedirect: '/u/login?loginFail' }),
	function (req, res) {
		res.redirect('/u/profile');
	}
);

module.exports = router;
