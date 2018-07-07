const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historicalSchema = new Schema({
  id: {type: Number},
  Address: {type: String},
  City: {type: String},
  County: {type: String},
  State: {type: String},
  Architect: {type: String},
  Name: {type: String},
  National_Park: {type: String},
  Significant_Person: {type: String},
  latitude: {type: Number},
  longitude: {type: Number}
  

});

const Historical = mongoose.model("Historical", historicalSchema);

module.exports = Historical;

