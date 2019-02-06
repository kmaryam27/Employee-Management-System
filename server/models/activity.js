const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/**
 * @description I commented validator of username and password only to be easy for check
 */
const ActivitySchema = new Schema({
  act: {
    type: String
  },
  isView: {
    type: Boolean,
    default: false
  }
});


const Activity = mongoose.model('Activity', ActivitySchema);
module.exports = Activity;
