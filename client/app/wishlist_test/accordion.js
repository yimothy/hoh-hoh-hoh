angular.module('description', ['ui.bootstrap'])

.controller('descriptionController', function($scope, $http, $log) {
  
  $scope.groups = [
    {
      title: 'Dynamic Group Header - 1',
      content: 'Dynamic Group Body - 1',
      open: false
    }
  ];

  $scope.addNew = function() {
    $scope.groups.push({
      title: 'ipod',
      content: 'Dynamically added new one',
      open: false
    });
  };
});

