const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/**
 * @description I commented validator of username and password only to be easy for check
 */
const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: "about this title..."
  },
  imageAddress:{
    type: String,
    default: "http://www.jennybeaumont.com/wp-content/uploads/2015/03/placeholder.gif"
  },
  context:{
    type: String,
    required: true
  }
});


const Post = mongoose.model('News', PostSchema);
module.exports = Post;
