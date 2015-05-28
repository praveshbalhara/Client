'use strict';
client.controller('HomeCtrl', function ($scope, $auth, $alert, Account) {
//$scope.getProfile = function() {
    if (!$auth.isAuthenticated()) {
        return;
    }
      Account.getProfile()
        .success(function(data) {
          $scope.email = data[0].email;
          $scope.name = data[0].displayname;
        })
        .error(function(error) {
          $alert({
            content: error.message,
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        });
    //};
});