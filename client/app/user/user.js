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
.controller('ProfileController', function($scope, $location, Wishlist, User, Follows, Auth, $routeParams) {
  $scope.userData = {};

  User.getUser($routeParams.id)
  .then((user) => {
    if (Auth.user.id === user.id) {
      $location.path('/');
    }
    $scope.userData = user;
    return Wishlist.getUserLists(user.id);
  })
  .then((lists) => $scope.userData.lists = lists);

  Follows.getAllFollowsUsers()
  .then((following) => {
    following.forEach((follow) => {
      if (follow.id === $scope.userData.id) {
        $scope.userData.following = true;
      }
    });
  });

  $scope.redirectList = (id) => {
    $location.path('/lists/' + id);
  };

  $scope.followUser = (id) => {
    Follows.followUser(id)
    .then($scope.userData.following = true);
  };
});
