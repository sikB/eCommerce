var express = require('express');
var router = express.Router();
var mongoUrl = 'mongodb://localhost:27017/coffee';
var mongoose = require('mongoose');
var Account = require('../model/accounts');
mongoose.connect(mongoUrl);

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Cigar' });
});

router.get('/register', function(req, res,next){
	res.render('register', {failure: req.query.failure});
})

router.post('/registerProcessed', function(req, res,next){
	if(req.body.password != req.body.password2){
		res.redirect('/register?failure=password')
	}else{
		var newAccount = new Account({
			username: req.body.username,
			password: req.body.password,
			emailAddress: req.body.emailAddress
		});
		newAccount.save();
		res.json(req.body);
		// res.render('register', {});
	}
})

module.exports = router;
