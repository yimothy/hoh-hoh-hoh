const db = require('../database/config_deploy');

module.exports = {
  items: {
    getAll(params, callback) {
      //save query string in separate var to pass into database query, question marks denote params being passed in
      const queryStr = 'SELECT product_id, name, id FROM items WHERE wishlist_id = ?';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/item/itemModels.js getAll : ', err);
        } else {
          console.log("results", results)
          callback(results);
        }
      });
    },

    addOne(params, callback) {
      //save query string in separate var to pass into database query, question marks denote params being passed in
      const queryStr = 'INSERT INTO items (name, wishlist_id) VALUES (?, ?)';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/item/itemModels.js addOne : ', err);
        } else {
          callback(results);
        }
      });
    },

    addProduct(params, callback) {
      var paramsString = JSON.stringify(params[0]);
      console.log("params", params);
      //save query string in separate var to pass into database query, question marks denote params being passed in
      // const queryStr = 'UPDATE items set product_id=? where name=?';
      const queryStr = 'INSERT INTO items (name, product_id, wishlist_id) VALUES (?, ?, ?)';
      db.query(queryStr, [params[0].name, params[0].itemId, params[2]], (err, results) => {
        if (err) {
          console.log('Error in server/item/itemModels.js addProduct : ', err);
        } else {
          callback(results);
        }
      });
    },

    renameItem(params, callback) {
      //save query string in separate var to pass into database query, question marks denote params being passed in, can be multiple
      const queryStr = 'UPDATE items SET name=? WHERE id=?';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/item/itemModels.js renameList : ', err);
        } else {
          callback(results);
        }
      });
    },

    deleteItem(params, callback) {
      //save query string in separate var to pass into database query, question marks denote params being passed in
      const queryStr = 'DELETE FROM items WHERE id = ?';
      db.query(queryStr, params, (err, results) => {
        if (err) {
          console.log('Error in server/item/wishlistModel.js deleteOne : ', err);
        } else {
          callback(results);
        }
      });
    },
  },
};
