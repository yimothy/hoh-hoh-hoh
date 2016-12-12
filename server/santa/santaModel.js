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
  var queryStr = 'SELECT id, name FROM rooms WHERE id = ?';
  db.query(queryStr, roomID, function(err, results) {
    if(err) {
      console.log('Error in finding room name: ', err);
    }
    else {
      callback(results);
    }
  })
}

var findUserName = function(userID, callback) {
  var queryStr = 'SELECT id, username FROM users WHERE id = ?';
  db.query(queryStr, userID, function(err, results) {
    if(err) {
      console.log('Error in finding username in room');
    }
    else{
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
        let asyncIdx = 0;
        // results = JSON.stringify(results);
        for(var i = 0; i < results.length; i++) {
          let roomID = results[i];
          findRoomName(roomID.room_id, function(name) {
            let defaultName = name[0].name || 'Unnamed Room';
            // roomNames.push({room_id: results[asyncIdx].room_id, room_name: defaultName});
            roomNames.push({room_id: name[0].id, room_name: defaultName});
            asyncIdx++;
            if(asyncIdx === results.length) {
              callback(roomNames);
            }
          })
        }
      }
    })
  },

  getUsersInRoom: function(roomID, callback) {
    var queryStr = 'SELECT user_id FROM users_rooms WHERE room_id = ?';
    var userNames = [];
    db.query(queryStr, roomID, (err, results) => {
      if(err) {
        console.log('Error in query when getting usernames from room');
      }
      else {
        let asyncIdx = 0;
        console.log('THESE ARE THE USERNAME RESULTS IN THE ROOM: ', results);
        for(let i = 0; i < results.length; i++) {
          let userID = results[i];
          findUserName(userID.user_id, function(username) {
            userNames.push({user_id: username[0].id, username: username[0].username});
            asyncIdx++;
            if(asyncIdx === results.length) {
              callback(userNames);
            }
          })
        }
      }
    })


  }


}
