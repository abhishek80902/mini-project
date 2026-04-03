const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: String,
  username: String,
  text: String,
  image: String,
  likes: [String],
  comments: [
    {
      userId: String,
      username: String,
      text: String,
      createdAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);