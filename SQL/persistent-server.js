
/* You already know how to create an http server from the previous
 * assignment; you can re-use most of that code here. */

var http = require("http");
var url = require('url');

var handlers = require('./request-handler');
var serverHelpers = require('./server-helpers');
var db = require ('./db.js');

var port = 3000;
var ip = "127.0.0.1";

var router = function(req, res) {

  var path = url.parse(req.url).pathname;
  var method = req.method;

  console.log("%s -- %s", method, path);

  if (path === '/classes/messages') {
    if (method === 'POST') {
      handlers.postMessage(req, res);
    } else if (method === 'GET') {
      handlers.getMessages(req, res);
    } else if (method === 'OPTIONS') {
      handlers.sendOptionsResponse(req, res);
    }
  } else {
    serverHelpers.sendResponse(res, '', 404);
  }
};

var server = http.createServer(router);

console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

db.dbConnection.connect();

// fake findAllMessages function
db.dbConnection.query('SELECT * FROM messages;', function(err, results) {
  if(err) throw err;
  // console.log('rows are:', results);
  // console.log('results are typeof ', typeof results);
  // console.log('results are array ', Array.isArray(results));
});

// fake findUser function
var username = "jonathan";
db.dbConnection.query('SELECT * FROM users WHERE username = "' + username + '";', function(err, username) {
  console.log(username);
});

// fake saveUser function
var username = "newUser";
db.dbConnection.query('INSERT INTO users (username) values ("' +
                      username +
                      '");', function(results) {
  console.log(results);
});

// fake saveMessage function
var newMessage = {username: "Jonathan Warrick",
               message: "I'm testing this!",
               roomname: "Lobby"};

db.dbConnection.query('INSERT INTO messages ' +
                      '(username, message, room) ' +
                      'value ("' +
                      newMessage.username +
                      '", "' +
                      newMessage.message +
                      '", "' +
                      newMessage.roomname +
                      '");', function() {
  console.log('success');
});
