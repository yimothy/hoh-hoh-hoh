const db = require('../database/config_deploy');

var addUsersToRoom = function(userID, roomID) {
  var queryStr = 'INSERT INTO users_rooms (user_id, room_id) VALUES (?)';
  var insertUserData = [userID, roomID];

  db.query(queryStr, [insertUserData], function(err, results) {
    if(err) {
      console.log('Error when inserting user: ', err);
    }
    else{
      console.log('Here are add user query results: ', results);
    }
  })
}

var findUserID = function(userName, callback) {
  var queryStr = 'SELECT id FROM users WHERE username = ?';
  db.query(queryStr, userName, function(err, results) {
    if(err) {
      console.log('Error in finding User ID: ', err);
    }
    else{
      callback(results);
    }
  })
}

var findRoomName = function(roomID, callback) {
  var queryStr = 'SELECT name FROM rooms WHERE id = ?';
  db.query(queryStr, roomID, function(err, results) {
    if(err) {
      console.log('Error in finding room name: ', err);
    }
    else {
      callback(results);
    }
  })
}

module.exports = {
  createRoom: function(roomName, adminID, otherUsersNames, callback) {
    var queryStr = 'INSERT INTO rooms (name, admin_id) VALUES (?)';
    var roomData = [roomName, adminID];
    db.query(queryStr, [roomData], function(err, results) {
      if(err) {
        console.log('Error in secret santa model create room function: ', err);
      }
      else {
        var roomId = results.insertId;
        addUsersToRoom(adminID, roomId);
        otherUsersNames.forEach(function(user) {
          findUserID(user, function(userResults) {
            addUsersToRoom(userResults[0].id, roomId);
          })
        });
        callback(results);
      }
    });
  },

  getRooms: function(userID, callback) {
    var queryStr = 'SELECT room_id FROM users_rooms WHERE user_id = ?';
    var roomNames = [];
    db.query(queryStr, userID, (err, results) => {
      if(err) {
        console.log('Error in query when getting user rooms');
      }
      else{
        console.log('THESE ARE ROOM ID RESULTS: ', JSON.stringify(results), "THIS IS THE ID: ", userID);
        // findRoomName()
        // findRoomName(5, function(name) {
        //   console.log('THIS IS THE NAME: ', name);
        // });
        results.forEach(function(roomID) {
          findRoomName(roomID, function(name) {
            callback(name);
            // console.log('THESE ARE THE ROOM NAMES IN BACK END: ', name);
            // roomNames.push(name);
          })
        })
        // callback(roomNames);
      }
    })
  }
}
