var santaModel = require('./santaModel');

module.exports = {
  createRoom: function(req, res) {
    var id = req.params.id;
    santaModel.createRoom(req.body.roomName, id, req.body.roomUsers, () => {
      res.sendStatus(201);
    });
  }
  getRooms: function(req, res) {
    console.log('THIS IS REQ.PARAMS: ', req.params);
    console.log('THIS IS REQ.BODY IN SANTACONTROLLER DB: ', req.body.data);
    var id = req.params.id;
    santaModel.getRooms(req.body.rooms, id, () =>{
      res.sendStatus(200);
    });

  }
}
// /api/santa/USERID
