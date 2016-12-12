var santaModel = require('./santaModel');

module.exports = {
  createRoom: function(req, res) {
    var id = req.params.id;
    santaModel.createRoom(req.body.roomName, id, req.body.roomUsers, () => {
      res.sendStatus(201);
    });
  },
  getRooms: function(req, res) {
    var id = req.params.id;
    console.log('THIS IS THE USER ID IN GETROOMS: ', id);
    santaModel.getRooms(id, (results) => {
      res.json(results);
    });
  }
}
// /api/santa/USERID
