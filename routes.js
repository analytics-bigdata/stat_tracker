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
    res.redirect('/home');
  })
})

router.get('/home', function(req, res) {
  res.render('home');
})
//
// router.post('/home', function(req, res) {
//   var activity = req.body.activity;
//   var value = req.body.value;
//   var metric = req.body.metric;
//   var newStat = utils.newStat(req, activity, value, metric);
//   newStat.save().then(function(stat) {
//     console.log("activity added!")
//   })
// })


router.get('/api/activities', function(req, res) {
  Stat.find({username: req.session.username}), function (results) {
    console.log(results);
  }

})

// Create a new activity for me to track
router.post('/api/activities/', function(req, res) {
  // console.log(req.body);
  if (req.body.activity && req.body.value && req.body.metric) {
    var newStat = new Stat({
     activity: req.body.activity,
     value: req.body.value,
     metric: req.body.metric
    });
    newStat.save(function (err, post) {
      if (err) { return next(err) }
      res.status(201).json(newStat)
    })
  } else {
    res.send('nope');
  }
})

//Show information about one activity I am tracking, and give me the data I have recorded for that activity.
router.get('/api/activities/{id}', function(req, res) {

})

//Update one activity I am tracking, changing attributes such as name or type. Does not allow for changing tracked data.
router.put('/api/activities/{id}', function(req, res) {

})

//Delete one activity I am tracking. This should remove tracked data for that activity as well.
router.delete('/api/activities/{id}', function(req, res) {

})

//Add tracked data for a day. The data sent with this should include the day tracked. You can also override the data for a day already recorded.

router.post('/api/activities/{id}/stats', function(req, res) {

})

//Remove tracked data for a day.
router.delete('/stats/{id}', function(req, res) {

})

module.exports = router;
