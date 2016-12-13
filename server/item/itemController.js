const itemModel = require('./itemModel');

module.exports = {
  items: {
    get({ body: { id } }, res) {
      //request in object format, plucked out userId from req.body, passing down as params
      //send back item results in json format
      const params = id;
      console.log("PARAMS", params)
      itemModel.items.getAll(params, (results) => {
        res.json(results);
      });
    },

    post({ body: { name, id } }, res) {
      //request in object format, plucked out itemname and userId from req.body, passing down as params
      const params = [name, id];
      itemModel.items.addOne(params, () => {
        res.sendStatus(201);
      });
    },

    postProductId({ body: { name, product_id, wishlist_id } }, res) {
      //request in object format, plucked out itemname and userId from req.body, passing down as params
      const params = [product_id, name, wishlist_id];
      console.log("product_id", product_id);
      console.log("name", name);
      console.log("wishlist_id", wishlist_id)
      console.log("params from within postProductId", params);
      itemModel.items.addProduct(params, (result) => {
        // res.sendStatus(201);
        console.log("SUccess")
        res.json(result);
      });
    },

    rename({ body: { name, item } }, res) {
      //request in object format, plucked out itemname and userId from req.body, passing down as params
      const params = [name, item];
      itemModel.items.renameItem(params, () => {
        res.sendStatus(201);
      });
    },

    delete({ body: { itemId } }, res) {
      //request in object format, plucked out itemId from req.body object, passing down as params
      const params = itemId;
      itemModel.items.deleteItem(params, () => {
        res.sendStatus(201);
      });
    },
  },
};
