client.controller('NavbarCtrl', function($scope, $auth, Account) {
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
    $scope.getProfile = function() {
      Account.getProfile()
        .success(function(data) {
          $scope.email = data[0].email;
          //$scope.name = data[0].displayname;
        })
        .error(function(error) {
          $alert({
            content: error.message,
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 10
          });
        });
    };
  });