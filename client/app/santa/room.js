angular.module('hoh.room', [])

.controller('RoomController', function($scope, $routeParams, RoomFactory, Auth, Wishlist,Item) {
  $scope.data = {};
  $scope.data.roomData = {};

  Auth.getSessionData();
  let userID = Auth.user.id;
  let id = $routeParams.id;

  $scope.getReceiver = function(array) {
    for(let i = 0; i < array.length; i++) {
      // console.log('CHECK THIS ONE: ', array[i]);
      if(array[i].user_id === userID) {
        return array[i];
      }
    }
  }

  $scope.getUsersInRoom = function() {
    Auth.getSessionData();
    let userID = Auth.user.id;
    let id = $routeParams.id;
    RoomFactory.getUsersInRoom(userID, id)
    .then(function(users) {
      $scope.data.roomData.users = users.data;
      // console.log('THESE ARE USERS IN THE FRONT END: ', $scope.data.roomData.users);
      return $scope.getReceiver(users.data);
    })
    .then(function(receiverData) {
      // console.log('THIS IS THE RECEIVERDATA: ', receiverData);
      $scope.data.receiverID = receiverData.receiver_id;
      $scope.data.receiverName = receiverData.receiverName;
      return $scope.data.receiverID;
    })
    .then(function(receiverID) {
      console.log('this is thE RECEIVER ID: ', receiverID);
      return Wishlist.getUserLists(receiverID)
    })
    .then(function(wishlist) {
      $scope.data.wishlist = wishlist[0];
            console.log('this is thE WISHLIST: ', wishlist[0]);
      return Item.getAllItems(wishlist[0].id);
    })
    .then(function(items) {
      console.log('THESE ARE THE ITEMS: ', items);
      $scope.data.wishlist.items = items;
    })
  }

  $scope.getUsersInRoom();

})
.factory('RoomFactory', function($http) {
  var getWishList = function(userID) {
    return $http.get('/api/wishlist/' + userID);
  }

  var getUsersInRoom = function(userID, roomID) {
    return $http.get('/api/santa/' + userID + '/' + roomID);
  }

  var saveSantas = function(roomID, santas) {
    return $http.post('/api/savesanta/' + roomID, santas);
  }

  return {
    getUsersInRoom: getUsersInRoom,
    saveSantas: saveSantas,
    getWishList: getWishList
  }
})
