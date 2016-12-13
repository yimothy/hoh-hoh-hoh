angular.module('hoh.room', [])

.controller('RoomController', function($scope, $routeParams, RoomFactory, Auth) {
  $scope.data = {};
  $scope.data.roomData = {};

  Auth.getSessionData();
  let userID = Auth.user.id;
  let id = $routeParams.id;

  $scope.getReceiver = function(array) {
    for(let i = 0; i < array.length; i++) {
      console.log('CHECK THIS ONE: ', array[i]);
      if(array[i].user_id === userID) {
        return array[i];
      }
    }
  }

  $scope.getUsersInRoom = function(roomID) {
    Auth.getSessionData();
    let userID = Auth.user.id;
    let id = $routeParams.id;
    RoomFactory.getUsersInRoom(userID, id)
    .then(function(users) {
      $scope.data.roomData.users = users.data;
      console.log('THESE ARE USERS IN THE FRONT END: ', $scope.data.roomData.users);
      return $scope.getReceiver(users.data);
    })
    .then(function(receiverData) {
      console.log('THIS IS THE RECEIVERDATA: ', receiverData);
      $scope.data.receiverID = receiverData.receiver_id;
      $scope.data.receiverName = receiverData.receiverName;

    })

    // .then(function() {
    // })
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
