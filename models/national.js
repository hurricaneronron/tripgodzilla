const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const nationalSchema = new Schema({
  id: {type: Number},
  title: {type: String},
  location: {type: String}

});

const National = mongoose.model("National", nationalSchema);

module.exports = National;