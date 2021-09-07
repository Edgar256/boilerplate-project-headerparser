// server.js
// where your node app starts
var os = require('os');

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const API_PORT = 3000

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// custom API endpoint... 
app.get("/api/whoami", function (req, res) {
  var interfaces = os.networkInterfaces();
  var addresses = [];
  for (var k in interfaces) {
      for (var k2 in interfaces[k]) {
          var address = interfaces[k][k2];
          if (address.family === 'IPv4' && !address.internal) {
              addresses.push(address.address);
          }
      }
  }
  var ip = addresses[0]
  var language = req.headers["accept-language"]
  var software = req.headers['user-agent']
  res.json({"ipaddress":ip, "language": language, "software": software});
});

// listen for requests :)
var listener = app.listen(API_PORT, function () {
  console.log('Your app is listening on port ' + API_PORT);
});
