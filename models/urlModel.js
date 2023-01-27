const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
  },
  wordCount:{
    type:Number
  },
  imageCount:{
    type:Number
  }
});

module.exports = new mongoose.model("Todo", TodoSchema);