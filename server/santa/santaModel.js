const db = require('../database/config_deploy');

var addUsersToRoom = function(userID, roomID, receiverID) {
  var queryStr = 'INSERT INTO users_rooms (user_id, room_id, receiver_id) VALUES (?)';
  var insertUserData = [userID, roomID, receiverID];

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

var saveSanta = function(roomID, santaID, receiverID, callback) {
  var queryStr = 'UPDATE users_rooms SET receiver_id = ? WHERE user_id= ? AND room_id = ?';
  var params = [receiverID, santaID, roomID];
  db.query(queryStr, [params], function(err, results) {
    if(err) {
      console.log('Error in saving santa');
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

        otherUsersNames.forEach(function(user) {
          console.log('THIS IS THE USER IN THE ADDUSERS TO ROOM: ', user);
            if(Number.isInteger(user.santa_id)) {
              findUserID(user.receiverName, function(userID) {
                console.log('THIS IS THE USERID IN FIRST: ', userID);
                addUsersToRoom(user.santa_id, roomId, userID[0].id)

              })
            }
            else if(Number.isInteger(user.receiverName)) {
              let receiverID = user.receiverName;
              console.log('this is the receiverid IN THE SECOND: ', receiverID);
              findUserID(user.santa_id, function(userID) {
                addUsersToRoom(userID[0].id, roomId, receiverID);
              })
            }
            else{
              findUserID(user.santa_id, function(userResults) {
                console.log('THIS IS THE USERRESULTS IN CREATE ROOM: ', userResults);
                let santaID = userResults[0].id;
                findUserID(user.receiverName, function(receiverResults) {
                  let receiverID = receiverResults[0].id;
                  addUsersToRoom(santaID, roomId, receiverID);
                })
              })
            }
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

  getUsersInRoom: function(userID, roomID, callback) {
    var queryStr = 'SELECT user_id, receiver_id FROM users_rooms WHERE room_id = ?';
    // var queryStr2 = 'SELECT receiver_id FROM user_rooms WHERE room_id = ? AND user_id = ?';
    var userNames = [];
    // var params = [roomID, userID];
    // db.query(queryStr2, params, (err, results)=> {
    //   if(err){
    //     console.log('Error in getting the receiver');
    //   }
    //   else{
    //     userNames.push(results);
    //   }
    // })

    db.query(queryStr, roomID, (err, results) => {
      if(err) {
        console.log('Error in query when getting usernames from room');
      }
      else {
        let asyncIdx = 0;

        console.log('THESE ARE THE USER RESULTS: ', results);
        for(let i = 0; i < results.length; i++) {
          let userID = results[i];
          findUserName(userID.user_id, function(username) {
            userNames.push({user_id: username[0].id, username: username[0].username, receiver_id: userID.receiver_id});
            asyncIdx++;
            if(asyncIdx === results.length) {
              console.log('THESE ARE THE USERDATA IN THE BACK: ', userNames);
              callback(userNames);
            }
          })
        }
      }
    })
  },

  saveSantas: function(roomID, santas, callback) {
    let asyncIdx = 0;
    for(let i = 0; i < santas.length; i++) {
      let santaData = santas[i];
      saveSanta(roomID, santaData.santa_id, santaData.receiver_id, function (result) {
        console.log('santaData.receiverName has received his secret santa');
      })
    }

  }

  // var saveSanta = function(roomID, santaID, receiverID, callback) {
  //   var queryStr = 'UPDATE users_rooms SET receiver_id = ? WHERE user_id= ? AND room_id = ?';
  //   var params = [receiverID, santaID, roomID];
  //   db.query(queryStr, [params], function(err, results) {
  //     if(err) {
  //       console.log('Error in saving santa');
  //     }
  //     else{
  //       callback(results);
  //     }
  //   })
  // }


}
