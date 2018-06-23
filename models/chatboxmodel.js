var mongoose = require('mongoose')

var Schema = mongoose.Schema

var chatboxmodel = new Schema({
  messager: {
    type: String,
  },
  messagee: {
    type: String,
  },
  messages: {
    type: Array
  }
})

var Chatbox = mongoose.model('Chatbox', chatboxmodel)

module.exports = Chatbox