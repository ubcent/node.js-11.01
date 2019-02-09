const mongoose = require('mongoose');

const { Schema } = mongoose;

const blogSchema = new Schema({
  authorId: {
    type: Schema.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Blog', blogSchema);
