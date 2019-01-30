const db = require('../models')
const PassportLocalStrategy = require('passport-local').Strategy;

/**
 * @description Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim(),
    name: req.body.name.trim(),
    access: req.body.access.trim(),
    avatar: req.body.avatar.trim()
  };
  const newUser = new db.User(userData);
  newUser.save((err) => {
    if (err) { return done(err); }
    return done(null);
  });
});
