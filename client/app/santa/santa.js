angular.module('hoh.santa', [])

.controller('SantaController', function($scope, $location, SantaFactory, Auth) {
  Auth.getSessionData();
  $scope.data = {};
  $scope.data.createRoom = {};
  $scope.data.createRoom.roomUsers = [];

  $scope.data.userData = {};
  $scope.data.userData.rooms = [];

  $scope.data.roomData = {};
  $scope.data.roomData.users = [];

  $scope.addUserToRoom = function(user) {
    $scope.data.createRoom.roomUsers.push(user);
  }

  $scope.createRoom = function() {
    Auth.getSessionData();
    //Something like SantaFactory.createRoom($scope.data)
    //Change to get actual user id
    let userID = Auth.user.id;
        console.log('THIS IS THE USER ID IN CREATE ROOMS ANGULAR: ', userID);
    SantaFactory.createRoom(userID, $scope.data.createRoom)
    .then(function() {
    //Reset createRoom object
      $scope.getRooms();
      $scope.data.createRoom.roomUsers = [];
      $scope.data.createRoom.roomName = '';
    })
  }

  $scope.getRooms = function() {
    Auth.getSessionData();
    let userID = Auth.user.id;
        console.log('THIS IS THE USER ID IN GETROOMS ANGULAR: ', userID);
    SantaFactory.getRooms(userID, $scope.data.userData.rooms)
    .then(function(roomNames) {
      $scope.data.userData.rooms = roomNames.data;
    })
  }
  $scope.getRooms();

  $scope.goToRoom = function(roomID) {
    $location.path('/santa/' + roomID);
  }

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
  var getUsersInRoom = function(userID, roomID) {
    return $http.get('/api/santa/' + userID + '/' + roomID);
  }
//Gets the user's receiver

  return {
    createRoom: createRoom,
    getRooms: getRooms,
    getUsersInRoom
  }
})
