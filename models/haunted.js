const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hauntedSchema = new Schema({
  id: {type: Number},
  city: {type: String},
  description: {type: String},
  location: {type: String},
  state: {type: String},
  state_abbrev: {type: String},
  longitude: {type: Number},
  latitude: {type: Number},
  city_longitude: {type: Number},
  city_latitude: {type: Number},
  link: {type: String},
  src: {type: String}

});

const Haunted = mongoose.model("Haunted", hauntedSchema);

module.exports = Haunted;


