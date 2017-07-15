const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
mongoose.Promise = require('bluebird');

const userSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String }
})

userSchema.methods.verifyPassword = function(password) {
  return this.password === password;
}

const User = mongoose.model('User', userSchema);

// userSchema.pre('save', function(next){
//   var hash = bcrypt.hashSync(this.password, 8);
//   this.password = hash;
//   next();
// })

module.exports = User;
