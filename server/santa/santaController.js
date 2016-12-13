var santaModel = require('./santaModel');

module.exports = {
  createRoom: function(req, res) {
    var id = req.params.id;
    console.log('THIS IS THE REQ.BODY IN BACK: ', req.body);
    santaModel.createRoom(req.body.roomName, id, req.body.santas, () => {
      res.sendStatus(201);
    });
  },
  getRooms: function(req, res) {
    var id = req.params.id;
    console.log('THIS IS THE USER ID IN GETROOMS: ', id);
    santaModel.getRooms(id, (results) => {
      res.json(results);
    });
  },
  getUsersInRoom: function(req, res) {
    var id = req.params.id;
    var roomID = req.params.roomID;
    santaModel.getUsersInRoom(id, roomID, (results) => {
      res.json(results);
    });
  },
  saveSantas: function(req, res) {
    var roomID = req.params.roomID;
    var santas = req.body;

    console.log('THIS IS THE ROOMID IN SAVESANTAS BACK:, ', roomID);

    console.log('THIS IS THE SANTAS ARRAY IN CONTROLLER: ', santas);
    santaModel.saveSantas(roomID, santas, function() {
      res.sendStatus(201);
    })

  }
}
// /api/santa/USERID
