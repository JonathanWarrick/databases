// var mysql = require('mysql');
var mysql = require('mysql');
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
exports.dbConnection = mysql.createConnection({
  user: "root",
  password: "",
  database: "chat"
});

/* Now you can make queries to the Mysql database using the
 * exports.dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/

exports.findAllMessages = function(cb){
  console.log('findAllMessages called');
  exports.dbConnection.query('SELECT * FROM messages;', function(err, messages) {
    var results = [];

    if (err) {
      throw err;
    }

    messages.forEach(function(message) {
      var chatObject = {
        message: message.message,
        userid: message.id,
        roomname: message.roomname
      };
      results.push(chatObject);
    });

    cb(err, results);
  });
};

exports.findUser = function(username, cb){
  console.log('findUser called');
  exports.dbConnection.query('SELECT * FROM users WHERE username = "' +
                              username +
                              '";', function(err, user) {
    if (err) {
      throw err;
    }

    cb(err, user);
  });
};

exports.saveUser = function(username, cb){
  console.log('saveUser called');
  exports.dbConnection.query('INSERT INTO users (username) values ("' +
                             username +
                             '");', function(results) {
    cb(results);
  });
};

exports.saveMessage = function(message, userid, roomname, cb){
  // exports.dbConnection.query('INSERT INTO messages (username, message, room) value (' +
  //                     userid + ', ' + message + ', ' + roomname + ');', cb);
  // exports.dbConnection.connect();

  console.log('saveMessage called');

  exports.dbConnection.query('INSERT INTO messages ' +
                             '(username, message, room) ' +
                             'value ("' +
                             userid +
                             '", "' +
                             message +
                             '", "' +
                             roomname +
                             '");', function() {
    console.log('success');
    cb();
  });
};

// exports.dbConnection.end();


// CREATE TABLE messages (
//   /* Describe your table here.*/
//   username VARCHAR(50),
//   message VARCHAR(500),
//   room VARCHAR(50),
//   createdAt TIMESTAMP(6)
// );

// CREATE TABLE users (
//   username VARCHAR(50)
// );

// "{"message":"test update","userid":"testUser","roomname":"lobby"}"
