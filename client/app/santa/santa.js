angular.module('hoh.santa', [])

.controller('SantaController', function($scope, SantaFactory, Auth) {
  $scope.data = {};
  $scope.data.createRoom = {};
  $scope.data.createRoom.roomUsers = [];

  $scope.data.userData = {};
  $scope.data.userData.rooms = [];

  $scope.addUserToRoom = function(user) {
    $scope.data.createRoom.roomUsers.push(user);
  }

  $scope.createRoom = function() {
    //Something like SantaFactory.createRoom($scope.data)
    //Change to get actual user id
    let userID = Auth.user.id;
        console.log('THIS IS THE USER ID IN CREATE ROOMS ANGULAR: ', userID);
    SantaFactory.createRoom(userID, $scope.data.createRoom)
    .then(function() {
    //Reset createRoom object
      $scope.data.createRoom.roomUsers = [];
    })
  }

  $scope.getRooms = function() {
    // let userID = Auth.user.id;
    let userID = 1;
        console.log('THIS IS THE USER ID IN GETROOMS ANGULAR: ', userID);
    SantaFactory.getRooms(userID, $scope.data.userData.rooms)
    .then(function(roomNames) {
      console.log('THESE ARE THE ROOM NAMES IN FRONT END: ',roomNames);
      $scope.data.userData.rooms = roomNames.data;
    })
  }
  $scope.getRooms();

  // $scope.getUsersInRoom = function(room_id) {
  // }

})

.factory('SantaFactory', function($http){
//Creates room
//Save in users in created room user's database
  var createRoom = function(userID, roomData) {

    return $http.post('/api/santa/' + userID, roomData)
  }


//Gets all rooms for the user from database
  var getRooms = function(userID, userData) {
    return $http.get('/api/santa/' + userID, userData);
  }
//Gets all users in the room

//Gets the user's receiver


  //return methods in object
  return {
    createRoom: createRoom,
    getRooms: getRooms
  }
})
