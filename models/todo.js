const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
    // required: true,
  },
  count:{
    type:Number
  }
});

module.exports = new mongoose.model("Todo", TodoSchema);