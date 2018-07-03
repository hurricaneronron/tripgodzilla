const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const nationalSchema = new Schema({
  "Ref#": {type: Number},
  Prefix: {type: String},
  "Historic Name": {type: String},
  "Other Name(s)": {type: String},
  "Multiple Name": {type: String},
  "Listing Date": {type: Date},
  "NHL Date": {type: Date},
  "Federal Agency": {type: String},
  "National Park": {type: String},
  County: {type: String},
  State: {type: String},
  Address: {type: String},
  Restricted: {type: Boolean},
  "Significant Person": {type: String},
  Architect: {type: String},
  "Request Type": {type: String},
  Status: {type: String},
  "Secondary Code": {type: String}

});

const National = mongoose.model("National", nationalSchema);

module.exports = National;