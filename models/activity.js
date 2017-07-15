const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const activitySchema = new mongoose.Schema({
  name: { type: String},
  type: { type: String },
  username: { type: String}
})

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
