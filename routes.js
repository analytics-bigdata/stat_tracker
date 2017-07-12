const express = require('express');
const router = express.Router();
const Stat = require('./models/stat.js');
const app = require('./app.js');

// Show a list of all activities I am tracking, and links to their individual pages

router.get('/api/activities', function(req, res) {
  // Stat.find({username: req.session.username}), function (results) {
  //
  // }

})

// Create a new activity for me to tracking
router.post('/api/activities', function(req, res) {

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
