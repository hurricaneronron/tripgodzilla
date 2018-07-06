const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hauntedSchema = new Schema({
  id: {type: Number},
  title: {type: String},
  location: {type: String}

});

const Haunted = mongoose.model("Haunted", hauntedSchema);

module.exports = Haunted;