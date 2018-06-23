var Router = require('express').Router()
var db = require('../models')

// users gets and posts
Router.get('/users', function (req, res) {
  db.User.find({})
    .then(r => {
      res.json(r)
    })
    .catch(e => {
      console.log(e)
    })
})

//get user info by stored user id
Router.get('/users/:userid', function (req, res) {
  // req.params.id
  db.User.find( {userId: req.params.userid })
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
//chatboxes gets, posts, puts
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

//pinboards gets posts puts
Router.get('/pinboards', function (req, res) {
  db.Pinboard.find({})
    .then(r => {
      res.json(r)
    })
    .catch(e => {
      console.log(e)
    })
})

//find pinboards based on the user
Router.get('/pinboards/:userid', function (req, res) {
  // req.params.id
  db.Pinboard.find({  userArray: req.params.userid  })
    .then(r => {
      res.json(r)
    })
    .catch(e => {
      console.log(e)
    })
})

//find pinboard based on its unique id
Router.get('/pinboards/indivboard/:id', function (req, res) {
  // req.params.id
  db.Pinboard.find({_id: req.params.id})
    .then(r => {
      res.json(r)
    })
    .catch(e => {
      console.log(e)
    })
})

//for adding content to a board found by id
Router.put('/pinboards/indiv/newcontent/:id', function (req, res) {
  // req.params.id
  db.Pinboard.update({_id: req.params.id}, {$set:{contentArray: req.body.contentArray}})
    .then(r => {
      res.json(r)
    })
    .catch(e => {
      console.log(e)
    })
})

//for adding a user to a board found by id
Router.put('/pinboards/indiv/newuser/:id', function (req, res) {
  // req.params.id
  db.Pinboard.update({_id: req.params.id}, {$set:{userArray: req.body.userArray}})
    .then(r => {
      res.json(r)
    })
    .catch(e => {
      console.log(e)
    })
})

Router.post('/pinboards', function (req, res) {
  // req.body
  db.Pinboard.create({
    name: req.body.name,
    description: req.body.description,
    userArray: req.body.userArray,
    contentArray: req.body.contentArray
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
