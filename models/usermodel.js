var mongoose = require('mongoose')

var Schema = mongoose.Schema
//users: id, set name, filters array, friends array, friends only chat boolean
var usermodel = new Schema({
  userId: {
    type: String,
  },
  name: {
    type: String,
  },
  filters: {
    type: Array,
  },
  friends: {
    type: Array,
  },
  password: {
      type: String,
  }
 // friendsOnly: {
 //   type: Boolean,
 // }
})

var User = mongoose.model('User', usermodel)

module.exports = User
