
'use strict';


//angular.module('client')
client.controller('DataCtrl', function ($scope, $http, $templateCache) {
    
    //Page load function calls
    getData($scope,$http);
 
    //Event funcation calls
    $scope.refreshData = function(){
    	getData($scope,$http);
    };
    $scope.getDataById = function(){
    	getDataById($scope,$http);
    };
    $scope.addData = function(){
    	addData($scope,$http,$templateCache);
    };
    
    $scope.updateData = function(){
      updateData($scope,$http,$templateCache);
    };
    $scope.deleteData = function(){
      deleteData($scope,$http,$templateCache);
      //getData($scope,$http);
    };
    //Variables
    $scope.dataId = '';
    $scope.dataObject = [{column: 'Name',Value: ''},
        			   {column: 'Year',Value: ''},
        			   {column: 'Country',Value: ''},
        			   {column: 'Region',Value: ''},
        			   {column: 'Description',Value: ''}];
 
 });

  //Function definitions
  var getData = function($scope,$http){
    var urlBase = 'http://localhost:8080/data/get';
    $http.get(urlBase).success(function(data) {
    $scope.data = data;
	});

  };

  var getDataById = function($scope,$http){
      var urlBase = 'http://localhost:8080/data/get/' + $scope.dataId;
      $http.get(urlBase).success(function(data) {
      $scope.dataSingleRow = data;
  	});
    var testdata = $scope.dataObject;
    $scope.dataObject[0].Value = $scope.dataSingleRow.name;
    $scope.dataObject[1].Value = $scope.dataSingleRow.year;
    $scope.dataObject[2].Value = $scope.dataSingleRow.country;
    $scope.dataObject[3].Value = $scope.dataSingleRow.region;
    $scope.dataObject[4].Value = $scope.dataSingleRow.description;
  };

  
  var addData = function($scope, $http, $templateCache){
    //var urlBase = 'http://localhost:8080/data/addTextData';
    var urlBase = 'http://localhost:8080/data/add';
    var formData = [{
      'name' : $scope.dataObject[0].Value,
      'year' : $scope.dataObject[1].Value,
      'country' : $scope.dataObject[2].Value,
      'region' : $scope.dataObject[3].Value,
      'description' : $scope.dataObject[4].Value
    }];
    //var formData = [{ 'newdatacol' : 'newdatacolval'}];
    //var jdata = JSON.parse(formData);
    //var jdata = 'mydata=' + JSON.stringify(formData);
  	$http({ // Accessing the Angular $http Service to send data via REST Communication to Node Server.
            method: 'POST',
            url: urlBase,
            //data:  jdata ,
            //headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data:  formData ,
            headers: {'Content-Type' : 'application/json'},
            cache: $templateCache
        }).
        success(function(response) {
                console.log("success"); // Getting Success Response in Callback
                $scope.codeStatus = response.data;
                console.log($scope.codeStatus);
                $scope.data = '';
                getData($scope,$http);

        }).
        error(function(response) {
                console.log("error"); // Getting Error Response in Callback
                $scope.codeStatus = response || "Request failed";
                console.log($scope.codeStatus);
        });

  };

  var updateData = function($scope, $http, $templateCache){
    var urlBase = 'http://localhost:8080/data/update/' + $scope.dataId;
    var formData = {
      'name' : $scope.dataObject[0].Value,
      'year' : $scope.dataObject[1].Value,
      'country' : $scope.dataObject[2].Value,
      'region' : $scope.dataObject[3].Value,
      'description' : $scope.dataObject[4].Value
    };
    $http({ // Accessing the Angular $http Service to send data via REST Communication to Node Server.
            method: 'PUT',
            url: urlBase,
            data:  formData ,
            headers: {'Content-Type' : 'application/json'},
            cache: $templateCache
        }).
        success(function(response) {
                console.log("update success"); // Getting Success Response in Callback
                $scope.codeStatus = response.data;
                console.log($scope.codeStatus);
                $scope.data = '';
                $scope.dataId = '';
                getData($scope,$http);

        }).
        error(function(response) {
                console.log("error"); // Getting Error Response in Callback
                $scope.codeStatus = response || "Request failed";
                console.log($scope.codeStatus);
        });

  };

  var deleteData = function($scope, $http, $templateCache){
    var urlBase = 'http://localhost:8080/data/delete/' + $scope.dataId;
    var formData = [{
      'name' : $scope.dataObject[0].Value,
      'year' : $scope.dataObject[1].Value,
      'country' : $scope.dataObject[2].Value,
      'region' : $scope.dataObject[3].Value,
      'description' : $scope.dataObject[4].Value
    }];
    $http({ // Accessing the Angular $http Service to send data via REST Communication to Node Server.
            method: 'DELETE',
            url: urlBase,
            data:  formData ,
            headers: {'Content-Type' : 'application/json'},
            cache: $templateCache
        }).
        success(function(response) {
                console.log("update success"); // Getting Success Response in Callback
                $scope.codeStatus = response.data;
                console.log($scope.codeStatus);
                $scope.data = '';
                $scope.dataId = '';
                getData($scope,$http);

        }).
        error(function(response) {
                console.log("error"); // Getting Error Response in Callback
                $scope.codeStatus = response || "Request failed";
                console.log($scope.codeStatus);
        });

  };