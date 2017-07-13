
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const statSchema = new mongoose.Schema({
  createdAt: { type: Date },
  activity: { type: String },
  value: { type: Number },
  metric: { type: String}
})

const Stat = mongoose.model('Stat', statSchema);

module.exports = Stat;
