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
    console.log('THIS IS THE ADMIN ID IN CREATE ROOM: ', adminID);
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
        var asyncIdx = 0;
        // results = JSON.stringify(results);
        for(var i = 0; i < results.length; i++) {
          var roomID = results[i];
          findRoomName(roomID.room_id, function(name) {
            var defaultName = name[0].name || 'Unnamed Room';
            roomNames.push({room_id: results[asyncIdx].room_id, room_name: defaultName});
            console.log('THIS IS THE ROOM ID IN EACH ITEM IN ARRAY: ', name[0].name, 'AND INDEX: ', i);
            asyncIdx++;
            if(asyncIdx === results.length-1) {
              console.log('THIS IS THE ROOMNAMES ARRAY: ', roomNames);
              callback(roomNames);
            }
          })
        }

        // // callback(results);
        // results.forEach(function(roomID, index) {
        //   findRoomName(roomID, function(name) {
        //     // console.log('THESE ARE THE ROOM NAMES IN BACK END: ', name);
        //     console.log('roomID from ####', index, roomID, name);
        //     roomNames.push(name);
        //     console.log('THIS IS THE ROOM NAME: ', name);
        //     if(index === (results.length - 1)) {
        //       callback(roomNames);
        //     }
        //   })
        // })

      }
    })
  }
}
