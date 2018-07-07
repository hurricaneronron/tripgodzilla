var mongoose = require('mongoose')

var Schema = mongoose.Schema

var roadside= new Schema({
    state: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
})

var roadside = mongoose.model('roadside', roadside)
module.exports = roadside