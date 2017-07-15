const express = require('express');
const mustacheExpress = require('mustache-express');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const bcrypt = require('bcryptjs');
const session = require('express-session');
const router = require('./routes.js');
const apirouter = require('./api_routes.js');
const Stat = require('./models/stat.js');
const User = require('./models/user.js');
const Activity = require('./models/activity.js');

const app = express();

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

// Replace "test" with your database name.
mongoose.connect('mongodb://localhost:27017/stat_tracker_db');

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use('/', router);
app.use('/', apirouter);


passport.use(new BasicStrategy(
  function(username, password, done) {
    User.findOne({username: username}, function(err, user){
      console.log(user);
      if(user && user.verifyPassword(password)){
      // if(user && bcrypt.compareSync(password, user.password)){
        return done(null, user);
      }
      return done(null, false);
    });
  }
));

// passport.use(new BasicStrategy(
//   function(userid, password, done) {
//     User.findOne({ username: userid }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) { return done(null, false); }
//       if (!user.verifyPassword(password)) { return done(null, false); }
//       return done(null, user);
//     });
//   }
// ));
//
// app.get('/private',
//   passport.authenticate('basic', { session: false }),
//   function(req, res) {
//     res.json(req.user);
//   });


app.use(passport.authenticate('basic', {session: false}));

app.get('/api/auth', function(req, res) {
    // passport.authenticate('basic', {session: false});
    res.send('You have been authenticated, ' + req.user.username);
});

// let stat = new Stat({activity: 'walking', value: 2});
//
// stat.save().then(function() {
//   console.log("a new stat has been added to the db!")
// }).catch(function() {
//   console.log("Womp, womp")
// })


app.listen(2000, function () {
    console.log('Express running on http://localhost:2000/.')
});

module.exports = app;
