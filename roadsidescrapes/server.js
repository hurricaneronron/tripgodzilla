var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var moment = require('moment')
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
var mongoose = require('mongoose')
var db = require('./models')
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoRoadside";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

//const options = {
//    autoIndex: false, // Don't build indexes
//    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
//    reconnectInterval: 500, // Reconnect every 500ms
//    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
//    bufferMaxEntries: 0
//};
//mongoose.connect('mongodb://localhost:27017/newscrapes', options).then(
//    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
//    err => { /** handle initial connection error */ }
//  );
var cheerio= require('cheerio')
var request = require('request')
var array = []
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api_json" }))
app.use(express.static("public"));
var stateAbbr = "nc"
var state = "North Carolina"
function callRequest () {
request(`https://www.roadsideamerica.com/location/${stateAbbr}/all`, function(e,r,html){
  if(e) throw e
  var $ = cheerio.load(html)
  var name = ""
  var geoArray = []
  var locationArray = []
  var address = ""
  var description = ""
  var title = ""
  var link = ""
  var idBlock = []
  var constructionlinks =[]
var constructiontitles =[]
    var constructionaddresses =[]
    var constructiondescs = []
  $('a').each(function (i, element){
    if ($(element).attr("href")) {
        name = $(element).attr('href')
        if ((name[1] == "t" && name[2] == "i" && name[3] == "p") && (name[5] !== "l")) {
            geoArray.push(name)
        }
    }
  })
  for(i=0; i<geoArray.length; i++) {
      let tester= geoArray[i]
        request('https://www.roadsideamerica.com/' + tester, function(e,r,html){
            if(e) throw e
            link = ("https://www.roadsideamerica.com/" + tester)
            constructionlinks.push(link)
            var $ = cheerio.load(html)
            var idBlock = []
            var title = $('h1').html()
            constructiontitles.push($(title).text())
            var endnumber = tester.substring(4)
            console.log(tester)
            var maplink = $(`a[href="/map${endnumber}"]`);
            var address = $(maplink).text()
            constructionaddresses.push(address)
            var desc = $("div.group").not("div.afwrap").not("div.tipdetail").not("div.nearby").not("div.ad").not("div.mysights").not("div.mobile").not("div.statesights").not("div.sotw").not("div.countrysights").not("div.rapromo").not("div.hotelbook").not("div.rates");
            var description = $(desc).text()
            constructiondescs.push(description.trim())
            if(constructionlinks.length == geoArray.length){
                console.log("addresses", constructionaddresses.length)
                console.log("titles", constructiontitles.length)
                console.log("links", constructionlinks.length)
                pushtoDatabase(constructionaddresses, constructiontitles, constructionlinks, constructiondescs)
            } 
        })
    }
})

} callRequest()

function pushtoDatabase(addresses, titles, links, descriptions) {
    for(i=0; i<titles.length; i++) {
    db.roadside.create({
        state: state,
        name: titles[i],
        address: addresses[i],
        description: descriptions[i],
        link: links[i]     
    }).catch(function (e) {
        throw (e)
    })
    }
}