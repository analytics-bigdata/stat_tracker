const express = require('express');
const mustache = require('mustache-express');
const apirouter = express.Router();
const Stat = require('./models/stat.js');
const app = require('./app.js');
const User = require('./models/user.js')
const Activity = require('./models/activity.js')
const utils = require('./utils.js')


// DISPLAY DATABASE FOR USERS

apirouter.get('/api/userdb', function (req, res) {
  User.find({}).then(function (users) {
    res.json({users});
  })
})

// DISPLAY DATABASE FOR STATS

apirouter.get('/api/statdb', function (req, res) {
  Stat.find({}).then(function (stats) {
    res.json({stats});
  })
})

// DISPLAY DATABASE FOR ACTIVITIES

apirouter.get('/api/activitydb', function (req, res) {
  Activity.find({}).then(function (activities) {
    res.json({activities});
  })
})

// SHOW A LIST OF ALL ACTIVITIES BEING TRACKED AND LINKS TO THEIR INDIVIDUAL PAGES //

apirouter.get('/api/activities', function(req, res) {
  Activity.find({username: req.body.username}), function (activities) {
    console.log(results);
    
  }
})

// CREATE A NEW ACTIVITY TO TRACK //

apirouter.post('/api/activities', function(req, res) {
  console.log(req.body);
  if (req.body.name && req.body.type && req.body.username) {
    var newActivity = new Activity({
     name: req.body.name,
     type: req.body.type,
     username: req.body.username
    });
    newActivity.save(function (err, post) {
      if (err) { return next(err) }
      res.status(201).json(newActivity)
    })
  } else {
    res.send('nope');
  }
})


// SHOW INFORMATION ABOUT ONE ACTIVITY I AM TRACKING AND GIVE ME THE DATA I HAVE RECORDED FOR THAT ACTIVITY //

apirouter.get('/api/activities/:activity', function(req, res) {
  let activity = req.params.activity;
  console.log(req.params.activity);
  Stat.find({activity: activity}).then( function (activity) {
    res.json(activity);
  })
})

// UPDATE ONE ACTICITY I AM TRACKING, CHANGIN ATTRIBUTES SUCH AS NAME OR TYPE. DOES NOT ALLOW FOR CHANGING TRACKED DATA //

apirouter.put('/api/activities/:id', function(req, res) {
  console.log(req.body);
  Activity.findById(req.params.id, function (err, activity) {
      if (err) {
          res.status(500).send(err);
      } else {
          // Update each attribute with any possible attribute that may have been submitted in the body of the request
          // If that attribute isn't in the request body, default back to whatever it was before.
          activity.name = req.body.name || activity.name;
          activity.type = req.body.type || activity.type;
          // Save the updated document back to the database
          activity.save(function (err, todo) {
              if (err) {
                  res.status(500).send(err)
              }
              res.send(activity);
          });
      }
  });
})

// DELETE ONE ACTIVITY I AM TRACKING. THIS SHOULD REMOVE TRACKED DATA FOR THAT ACTIVITY AS WELL. //
apirouter.delete('/api/activities/:id', function(req, res) {
  Activity.findByIdAndRemove(req.params.id, function (err, activity) {
    var response =  {
      message: "Activity successfully deleted",
      id: activity.id
    }
      res.send(response);
  })
})

//ADD TRACKED DATA FOR A DAY. THE DATA SENT WITH THIS SHOULD INCLUDE THE DAY TRACKED. YOU CAN ALSO OVERRIDE THE DATA FOR A DAY ALREADY RECORDED //

apirouter.post('/api/activities/{id}/stats', function(req, res) {

})

//REMOVE TRACKED DATA FOR A DAY //

apirouter.delete('/stats/{id}', function(req, res) {

})

module.exports = apirouter;
