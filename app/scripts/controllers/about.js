'use strict';

/**
 * @ngdoc function
 * @name client.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the client
 */
angular.module('client')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
