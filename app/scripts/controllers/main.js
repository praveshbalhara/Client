'use strict';

/**
 * @ngdoc function
 * @name client.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the client
 */
//angular.module('client')
  client.controller('MainCtrl', function ($scope) {
    $scope.todos = ['Item1','Item2','Item3'];
    $scope.fieldMessage = 'Eneter Text here';
    $scope.addTodo = function(){
    	$scope.fieldMessage = 'Eneter Text here';
    	if($scope.todo !== ''){
    		$scope.todos.push($scope.todo);	
    	}
    	else{
    		$scope.fieldMessage = 'Already empty text field added';
    	}
    	$scope.todo='';
    };
    $scope.removeTodo = function(index){
    	$scope.todos.splice(index,1);
    };
  });
