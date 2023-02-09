const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
  title: {
    type: String,
    require: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  photo: {
    type: String,
    trim: true,
    require: true,
  },
});

const Photo = mongoose.model("Photo", PhotoSchema);

module.exports = Photo;
