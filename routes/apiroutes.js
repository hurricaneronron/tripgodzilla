var Router = require('express').Router()
var db = require('../models')
const path = require("path");

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

//get user info by stored userid
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
//alter friends array of user found by userid - includes deletes
Router.put('/users/friends/:userid', function (req, res) {
  // req.params.id
  db.User.update({userId: req.params.userid}, {$set:{friends: req.body.friends}})
    .then(r => {
      res.json(r)
    })
    .catch(e => {
      console.log(e)
    })
})
//alter filters array of user from by userid - includes deletes
Router.put('/users/filters/:userid', function (req, res) {
  // req.params.id
  db.User.update({userId: req.params.userid}, {$set:{filters: req.body.filters}})
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

//update chatbox's content, found by its id
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

//update/remove chatbox's messager or messagee, found by its id
Router.put('/chatboxes/removebox/:id', function (req, res) {
  // req.params.id
  db.Chatbox.update({_id: req.params.id}, {$set:{messager: req.body.messager, messagee: ""}})
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

//pinboards gets, posts, puts below
Router.post('/pinboards', function (req, res) {
  // req.body
  db.Pinboard.create({
    name: req.body.name,
    admin: req.body.admin,
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

//for adding content to or deleting content from a board found by id
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
//or deleting someone from the user Array
Router.put('/pinboards/indiv/userupdate/:id', function (req, res) {
  // req.params.id
  db.Pinboard.update({_id: req.params.id}, {$set:{userArray: req.body.userArray}})
    .then(r => {
      res.json(r)
    })
    .catch(e => {
      console.log(e)
    })
})

//handle friend requests below

//post a new friend request, unaccepted
Router.post('/friendrequests', function (req, res) {
  // req.body
  db.friendRequest.create({
    requester: req.body.requester,
    requestee: req.body.requestee,
    accepted: req.body.accepted
  })
    .then(r => {
      res.json(r)
    })
    .catch(e => {
      console.log(e)
    })
})

//get unaccepted friend requests by userid 
Router.get('/friendrequests/:userid', function (req, res) {
  // req.params.id
  db.friendRequest.find( {$and: [{requestee: req.params.userid}, {accepted: false}]})
    .then(r => {
      res.json(r)
    })
    .catch(e => {
      console.log(e)
    })
})
//get unaccepted friend requests by userid and friendid TO OTHER PERSON NOT TO THIS USER
Router.get('/friendrequests/pending/:userid/:friendid', function (req, res) {
  // req.params.id
  db.friendRequest.find( {$and: [{requester: req.params.userid}, {requestee: req.params.friendid}, {accepted: false}]})
    .then(r => {
      res.json(r)
    })
    .catch(e => {
      console.log(e)
    })
})
//update friend request to 'true' using individual id of request - no longer shows up in pending requests
Router.put('/friendrequests/:id', function (req, res) {
  // req.params.id
  db.friendRequest.update( {_id: req.params.id}, {$set:{accepted: true}})
    .then(r => {
      res.json(r)
    })
    .catch(e => {
      console.log(e)
    })
})
//to delete a friend request by id
Router.delete('/friendrequests/delete/:id', function (req, res) {
  //console.log(objectid)
  db.friendRequest.remove({_id: req.params.id})
  .then(r => {
    res.json(r)
  })
  .catch(e => {
    console.log(e)
  })
})

//trip comments handled below
Router.post('/tripcomments', function (req, res) {
  // req.body
  db.TripComment.create({
    userid: req.body.userid,
    admin: req.body.admin,
    tripid: req.body.tripid,
    comment: req.body.comment,
    timestamp: req.body.timestamp
  })
    .then(r => {
      res.json(r)
    })
    .catch(e => {
      console.log(e)
    })
})
//gets trip comments by a tripid
Router.get('/tripcomments/:tripid', function (req, res) {
  db.TripComment.find({tripid: req.params.tripid})
    .then(r => {
      res.json(r)
    })
    .catch(e => {
      console.log(e)
    })
})
//to delete a trip comment by id
Router.delete('/tripcomments/delete/:id', function (req, res) {
  //console.log(objectid)
  db.TripComment.remove({_id: req.params.id})
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

Router.get('/haunted', function (req, res) {
  const bounds = JSON.parse(req.query.bounds)
  const south = bounds.south
  const west = bounds.west
  const north = bounds.north
  const east = bounds.east
  db.Haunted.find({})
    .where('longitude').gte(west).lte(east)
    .where('latitude').gte(south).lte(north)
    .then(r => {
      res.json(r)
    })
    .catch(e => {
      console.log(e)
    })
})

Router.post('/haunted', function (req, res) {
  db.Haunted.create({
    id: req.body.id,
    title: req.body.title,
    location: req.body.location
  })
    .then(r => {
      res.json(r)
    })
    .catch(e => {
      console.log(e)
    })
})

// Router.get('/national', function (req, res) {
//   const bounds = JSON.parse(req.query.bounds)
//   const south = bounds.south
//   const west = bounds.west
//   const north = bounds.north
//   const east = bounds.east
//   db.National.find({})
//     .where('Lng').gte(west).lte(east)
//     .where('Lat').gte(south).lte(north)
//     .then(r => {
//       res.json(r)
//     })
//     .catch(e => {
//       console.log(e)
//     })
// })

// Router.post('/national', function (req, res) {
//   db.National.create({
//     id: req.body.id,
//     title: req.body.title,
//     location: req.body.location
//   })
//     .then(r => {
//       res.json(r)
//     })
//     .catch(e => {
//       console.log(e)
//     })
// })

Router.get('/historical', function (req, res) {
  const bounds = JSON.parse(req.query.bounds)
  const south = parseFloat(bounds.south)
  const west = parseFloat(bounds.west)
  const north = parseFloat(bounds.north)
  const east = parseFloat(bounds.east)
  db.Historical.find({
  })
    .where('latitude').gte(south).lte(north)
    .where('longitude').gte(west).lte(east)
    .exec()
    .then(r => {
      res.json(r)
    })
    .catch(e => {
      console.log(e)
    })
})

Router.post('/historical', function (req, res) {
  db.Historical.create({
    id: req.body.id,
    title: req.body.title,
    location: req.body.location
  })
    .then(r => {
      res.json(r)
    })
    .catch(e => {
      console.log(e)
    })
})

// Router.put('/historical/:id', function (req, res) {
//   console.log(req.params.id)
//   console.log(req.body)
//   const newLocation = {
//     lat: req.body.lat,
//     lng: req.body.lng
//   }
//   // req.params.id
//   db.Roadside.update( {_id: req.params.id}, {$set:{latitude: req.body.lat} })
//     .then(r => {
//       res.json(r)
//     })
//     .catch(e => {
//       console.log(e)
//     })
// })

Router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
})

module.exports = Router
