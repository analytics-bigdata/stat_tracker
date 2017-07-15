const express = require('express');
const mustache = require('mustache-express');
const router = express.Router();
const Stat = require('./models/stat.js');
const app = require('./app.js');
const User = require('./models/user.js')
const utils = require('./utils.js')


router.get('/api/userlist', function (req, res) {
  User.find({}).then(function (users) {
    res.json({users});
  })
})

router.get('/api/statlist', function (req, res) {
  Stat.find({}).then(function (stats) {
    res.json({stats});
  })
})

// Show a list of all activities I am tracking, and links to their individual pages


router.get('/', function(req, res) {
 res.render('index');
})

router.get('/index', function(req, res) {
    req.session.destroy();
    res.render('index');
})

router.post('/index', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var newAccount = utils.createAccount(req, username,  password);
  newAccount.save().then(function(user) {
    req.session.user = user;
    console.log(user);
    res.redirect('/home');
  })
})

router.get('/home', function(req, res) {
  res.render('home');
})

router.post('/home', function(req, res) {
  var activity = req.body.activity;
  var value = req.body.value;
  var metric = req.body.metric;
  var newStat = utils.newStat(req, activity, value, metric);
  newStat.save().then(function(stat) {
    console.log("activity added!")
  })
})





module.exports = router;
