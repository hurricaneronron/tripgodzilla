var Router = require('express').Router()
var db = require('../models')

Router.get('/users', function (req, res) {
  db.User.find({})
    .then(r => {
      res.json(r)
    })
    .catch(e => {
      console.log(e)
    })
})

Router.get('/users/:id', function (req, res) {
  // req.params.id
  db.User.find( {userId: req.params.id })
    .then(r => {
      res.json(r)
    })
    .catch(e => {
      console.log(e)
    })
})

Router.post('/users', function (req, res) {
  // req.body
  db.User.create({
    userId: req.body.userId,
    name: req.body.name,
    filters: req.body.filters,
    friends: req.body.friends,
    password: req.body.password
 //   friendsOnly: req.body.friends
  })
    .then(r => {
      res.json(r)
    })
    .catch(e => {
      console.log(e)
    })
})

Router.get('/chatboxes', function (req, res) {
  db.Chatbox.find({})
    .then(r => {
      res.json(r)
    })
    .catch(e => {
      console.log(e)
    })
})

Router.get('/chatboxes/:id', function (req, res) {
  // req.params.id
  db.Chatbox.find({
    "$or": [{
        messager: req.params.id
    }, {
        messagee: req.params.id}]
    })
    .then(r => {
      res.json(r)
    })
    .catch(e => {
      console.log(e)
    })
})

Router.get('/chatboxes/indivbox/:id', function (req, res) {
  // req.params.id
  db.Chatbox.find({_id: req.params.id})
    .then(r => {
      res.json(r)
    })
    .catch(e => {
      console.log(e)
    })
})

Router.put('/chatboxes/indivbox/:id', function (req, res) {
  // req.params.id
  db.Chatbox.update({_id: req.params.id}, {$set:{messages: req.body.messages}})
    .then(r => {
      res.json(r)
    })
    .catch(e => {
      console.log(e)
    })
})

Router.post('/chatboxes', function (req, res) {
  // req.body
  db.Chatbox.create({
    messager: req.body.messager,
    messagee: req.body.messagee
  })
    .then(r => {
      res.json(r)
    })
    .catch(e => {
      console.log(e)
    })
})
// Router.put('/users:id', function (req, res) {
//   // req.params.id
// })

// Router.delete('/users', function (req, res) {

// })
// Router.delete('/users:id', function (req, res) {
//   // req.params.id
// })

module.exports = Router
