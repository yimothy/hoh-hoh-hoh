angular.module('hoh.user', [])
.controller('FollowsController', function($scope, Follows, Wishlist, $location) {
  $scope.following = [];

  $scope.redirectUser = (id) => {
    $location.path('/users/' + id);
  };

  $scope.redirectList = (id) => {
    $location.path('/lists/' + id);
  };

  $scope.getFollowing = () => {
    Follows.getAllFollowsUsers()
    .then((users) => {
      $scope.following = users;
      users.forEach((user) => {
        Wishlist.getUserLists(user.id)
        .then((wishlists) => {
          user.lists = wishlists;
        });
      });
    });
  };

  $scope.getFollowing();
})
.controller('ProfileController', function($scope, $location, Wishlist, User, $routeParams) {
  $scope.userData = {};

  User.getUser($routeParams.id)
  .then((user) => {
    $scope.userData = user;
    return Wishlist.getUserLists(user.id);
  })
  .then((lists) => $scope.userData.lists = lists);

  $scope.redirectList = (id) => {
    $location.path('/lists/' + id);
  };
});
