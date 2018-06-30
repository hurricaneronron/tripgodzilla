const express = require("express");
const mongoose = require('mongoose');
const path = require("path");
var bodyparser = require('body-parser');
const PORT = process.env.PORT || 3001;
const app = express();
//socket
var server = require("http").createServer(app);
var io = require("socket.io")(server)

io.on("connection", (socket) => {
  console.log("Socket is connected...")
})
server.listen(3020);
//end socket
mongoose.connect('mongodb://localhost/myusersDB')

app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())
app.use(require('./routes/apiroutes'))

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
