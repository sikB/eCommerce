var express = require('express');
var router = express.Router();
var mongoUrl = 'mongodb://localhost:27017/coffee';
var mongoose = require('mongoose');
var Account = require('../model/accounts');
var bcrypt = require('bcrypt-nodejs');


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
			password: bcrypt.hashSynch(req.body.password),
			emailAddress: req.body.emailAddress
		});
		newAccount.save();
		req.session.username = req.body.username;
		res.redirect('order');
	}
})

router.get('/order', function(req,res,next){
	res.render('order', {username: req.session.username});
});

module.exports = router;
