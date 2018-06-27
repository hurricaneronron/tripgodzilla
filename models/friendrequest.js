var mongoose = require('mongoose')

var Schema = mongoose.Schema

var friendrequestmodel = new Schema({
  requester: {
    type: String,
  },
  requestee: {
    type: String,
  },
  accepted: {
    type: Boolean
  }
})

var friendRequest = mongoose.model('friendRequest', friendrequestmodel)

module.exports = friendRequest