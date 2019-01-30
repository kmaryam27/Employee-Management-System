const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * @description define the User model schema
 */

var Schema = mongoose.Schema;
const UserSchema = new Schema({
  email: {
    type: String,
    index: { unique: true }
  },
  password: String,
  name: String,
  avatar: {
    type: String,
    default: ""
  },
  access: {
    type: Number,
    default: 2
  },

  search: [
    {
      type: Schema.Types.ObjectId,
      ref: "Search"
    }
  ],

  activity: [
    {
      type: Schema.Types.ObjectId,
      ref: "Activity"
    }
  ],

  post: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post"
    }
  ]

});


/**
 * @description Compare the passed password with the value in the database. A model method.
 *
 * @param {string} password
 * @returns {object} callback
 */
UserSchema.methods.comparePassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password, callback);
};


/**
 * @description The pre-save hook method.
 * @description line 38: proceed further only if the password is modified or the user is new
 * @description line 44: replace a password string with hash value
 */
UserSchema.pre('save', function saveHook(next) {
  const user = this;

  if (!user.isModified('password')) return next();

  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) { return next(saltError); }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) { return next(hashError); }

      user.password = hash;

      return next();
    });
  });
});


module.exports = mongoose.model('User', UserSchema);
