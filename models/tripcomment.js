var mongoose = require('mongoose')

var Schema = mongoose.Schema

var tripcomment = new Schema({
    userid: {
        type: String
    },
    admin: {
        type: String
    },
    tripid: {
        type: String
    },
    comment: {
        type: String
    },
    timestamp: {
        type: String
    }
})

var TripComment = mongoose.model('TripComment', tripcomment)

module.exports = TripComment