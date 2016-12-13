const db = require('../database/config_deploy');

module.exports = {
  users: {
    addOne(params, callback) {
      //save query string in separate var to pass into database query, question marks denote params being passed in
      const queryStr = 'INSERT INTO users (username, password) VALUES (?, ?)';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/userModel.js addOne : ', err);
        } else {
          callback(results);
        }
      });
    },

    getPassword(params, callback) {
      //save query string in separate var to pass into database query, question marks denote params being passed in
      const queryStr = 'SELECT id, password FROM users WHERE username = ?';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/userModel.js getPassword : ', err);
        } else {
          callback(results);
        }
      });
    },

    getUser(params, callback) {
      const queryStr = 'SELECT id, username, fullname FROM users WHERE id = ?';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/userModel.js getUser : ', err);
        } else {
          callback(results);
        }
      });
    },
  },

  followers: {
    addOne(params, callback) {
      const queryStr = 'INSERT INTO follows (user_id, following_id) VALUES (?, ?)';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log(`Error in userModel.addOne - params: ${params} - error: ${err}`);
        } else {
          callback(results);
        }
      });
    },

    getFollowing(params, callback) {
      const queryStr = 'SELECT following_id FROM follows WHERE user_id = ?';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log(`Error in userModel.getFollowing - params: ${params} - error: ${err}`);
        } else {
          callback(results);
        }
      });
    },

    getFollowingUsers(params, callback) {
      const queryStr = 'SELECT users.id, users.username FROM users INNER JOIN follows ON follows.following_id=users.id WHERE follows.user_id = ?';

      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log(`Error in userModel.getFollowingUsers - params: ${params} - error: ${err}`);
        } else {
          callback(results);
        }
      });
    }
  },
};
