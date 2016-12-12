angular.module('hoh.room', [])

.controller('RoomController', function($scope, $routeParams, RoomFactory, Auth) {
  $scope.data = {};
  $scope.data.roomData = {};
  Auth.getSessionData();
  let userID = Auth.user.id;
  let id = $routeParams.id;

  $scope.getUsersInRoom = function(roomID) {
    Auth.getSessionData();
    let userID = Auth.user.id;
    let id = $routeParams.id;
    RoomFactory.getUsersInRoom(userID, id)
    .then(function(users) {
      console.log('THESE ARE USERS IN THE FRONT END: ', users.data);
      $scope.data.roomData.users = users.data;
            console.log('THESE ARE USERS IN THE FRONT END AFTER REDIRECT: ', users.data);
    })
  }
  $scope.getUsersInRoom(userID, id);
})
.factory('RoomFactory', function($http) {
  var getUsersInRoom = function(userID, roomID) {
    return $http.get('/api/santa/' + userID + '/' + roomID);
  }
  return {
    getUsersInRoom: getUsersInRoom
  }
})
