const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roadsideSchema = new Schema({
  id: {type: Number},
  title: {type: String},
  location: {type: String},
  latitude: {type: Number},
  longitude: {type: Number}

});

const Roadside = mongoose.model("Roadside", roadsideSchema);

module.exports = Roadside;