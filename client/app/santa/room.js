angular.module('hoh.room', [])

.controller('RoomController', function($scope, $routeParams, RoomFactory, Auth) {
  $scope.data = {};
  $scope.data.roomData = {};
  $scope.data.receiver = [];

  Auth.getSessionData();
  let userID = Auth.user.id;
  let id = $routeParams.id;

  // $scope.createSantas = function(userIdArray) {
  //   let copy = Array.prototype.slice.call(userIdArray);
  //
  //   // Setting the receiver to the last index item to resolve an undesired permutation
  //   for ( var i = 0, receiver = copy[copy.length-1]; i < userIdArray.length; i++ ) {
  //       while ( receiver === userIdArray[i] || !receiver )
  //           // Grab a random member from the userIdArray
  //           receiver = copy[ Math.floor((Math.random() * copy.length)) ];
  //       copy.splice( copy.indexOf(receiver), 1 );
  //       $scope.data.santas.push(
  //         {'santa_id': userIdArray[i].user_id,
  //         'receiver_id': receiver.user_id,
  //         'receiverName': receiver.username});
  //       receiver = null;
  //   }
  // }

  $scope.getUsersInRoom = function(roomID) {
    Auth.getSessionData();
    let userID = Auth.user.id;
    let id = $routeParams.id;
    RoomFactory.getUsersInRoom(userID, id)
    .then(function(users) {
      console.log('THESE ARE USERS IN THE FRONT END: ', users.data);
      $scope.data.roomData.users = users.data;
    })
    // .then(function() {
    //   $scope.createSantas($scope.data.roomData.users);
    //   console.log('THIS IS SANTAS DATA IN FRONT: ', $scope.data.santas);
    //   RoomFactory.saveSantas(id, $scope.data.santas);
    // })


  }

  $scope.getUsersInRoom(userID, id);

})
.factory('RoomFactory', function($http) {
  var getUsersInRoom = function(userID, roomID) {
    return $http.get('/api/santa/' + userID + '/' + roomID);
  }

  var saveSantas = function(roomID, santas) {
    return $http.post('/api/savesanta/' + roomID, santas);
  }

  return {
    getUsersInRoom: getUsersInRoom,
    saveSantas: saveSantas
  }
})
