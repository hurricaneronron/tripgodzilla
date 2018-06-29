var mongoose = require('mongoose')

var Schema = mongoose.Schema

var pinboardmodel = new Schema({
    name: {
        type: String
    },
    admin: {
        type: String
    },
    description: {
        type: String
    },
    userArray: {
        type: Array
    },
    contentArray: {
        type: Array
    }
})

var Pinboard = mongoose.model('Pinboard', pinboardmodel)

module.exports = Pinboard