const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const bcrypt = require('bcryptjs');

const router = require('./routes.js')
const Stat = require('./models/stat.js');
const User = require('./models/user.js');

const app = express();

// Replace "test" with your database name.
mongoose.connect('mongodb://localhost:27017/stat_tracker_db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use('/', router);


passport.use(new BasicStrategy(
  function(username, passport, done) {
    User.findOne({username: username}), function(err, user){
      if(user && bcrypt.compareSync(password, user.password)){
        return done(null, user);
      }
      return done(null, false);
      }
    }
  ));


app.use(passport.authenticate('basic', {session: false}));

app.get('/api/auth', function(req, res) {
    res.send('You have been authenticated, ' + req.user.username);
});

let stat = new Stat({activity: 'walking', value: 2});

stat.save().then(function() {
  console.log("a new stat has been added to the db!")
}).catch(function() {
  console.log("Womp, womp")
})


app.listen(2000, function () {
    console.log('Express running on http://localhost:2000/.')
});

module.exports = app;
