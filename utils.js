const Stat = require('./models/stat.js');
const User = require('./models/user.js');
var exports = module.exports = {};

exports.authenticate = function (req, email, password, fn){
    var authenticatedUser = User.users.findOne({ where: {
      email: email,
      password: password}}).then(user => {
        if (user) {
          fn(user);
        } else {
          return false;
          }
    })
    return authenticatedUser;
}
