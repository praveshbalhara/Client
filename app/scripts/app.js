//'use strict';

/**
 * @ngdoc overview
 * @name Client
 * @description
 * # Client
 *
 * Main module of the application.
 */

var client = angular
  .module('client', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ui.router',
    'ngTouch',
    'ui.sortable',
    'ui.grid',
    'ngGrid',
    'ngMessages',
    /*'angular-loading-bar'*/
    'mgcrea.ngStrap',
    'angularShamSpinner',
    'satellizer'
  ]);
client.config(function($stateProvider, $urlRouterProvider, $authProvider) {
    $stateProvider
    .state('home', {
        url: '/',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
    .state('signup', {
        url: '/signup',
        templateUrl: 'authViews/signup.html',
        controller: 'SignupCtrl'
      })
    .state('login', {
        url: '/login',
        templateUrl: 'authViews/login.html',
        controller: 'LoginCtrl'
      })
    .state('logout', {
        url: '/logout',
        template: null,
        controller: 'LogoutCtrl'
      })
    .state('dash', {
        url: '/dash',
        templateUrl: 'views/dash.html',
        controller: 'DashCtrl',
        resolve: {
          authenticated: function($q, $location, $auth) {
            var deferred = $q.defer();

            if (!$auth.isAuthenticated()) {
              $location.path('/login');
            } else {
              deferred.resolve();
            }

            return deferred.promise;
          }
        }
      })
    .state('seo', {
        url: '/seo',
        templateUrl: 'views/SEOdash.html',
        controller: 'SEODashCtrl',
        resolve: {
          authenticated: function($q, $location, $auth) {
            var deferred = $q.defer();

            if (!$auth.isAuthenticated()) {
              $location.path('/login');
            } else {
              deferred.resolve();
            }

            return deferred.promise;
          }
        }
      })
    .state('breach', {
        url: '/breach',
        templateUrl: 'views/breach.html',
        controller: 'BreachCtrl',
        resolve: {
          authenticated: function($q, $location, $auth) {
            var deferred = $q.defer();

            if (!$auth.isAuthenticated()) {
              $location.path('/login');
            } else {
              deferred.resolve();
            }

            return deferred.promise;
          }
        }
      })
    .state('userauth', {
        url: '/userauth',
        templateUrl: 'views/userauth.html',
        controller: 'UserAuthCtrl',
        resolve: {
          authenticated: function($q, $location, $auth) {
            var deferred = $q.defer();

            if (!$auth.isAuthenticated()) {
              $location.path('/login');
            } else {
              deferred.resolve();
            }

            return deferred.promise;
          }
        }
      })
    .state('maping', {
        url: '/maping',
        templateUrl: 'views/maping.html',
        controller: 'MapingCtrl',
        resolve: {
          authenticated: function($q, $location, $auth) {
            var deferred = $q.defer();

            if (!$auth.isAuthenticated()) {
              $location.path('/login');
            } else {
              deferred.resolve();
            }

            return deferred.promise;
          }
        }
      })
    .state('all', {
        url: '/all',
        templateUrl: 'views/all.html',
        controller: 'AllCtrl',
        resolve: {
          authenticated: function($q, $location, $auth) {
            var deferred = $q.defer();

            if (!$auth.isAuthenticated()) {
              $location.path('/login');
            } else {
              deferred.resolve();
            }

            return deferred.promise;
          }
        }
      });
  $urlRouterProvider.otherwise('/');  

  //$authProvider.baseUrl = 'http://dlujsethi00714:8080';
  $authProvider.baseUrl = 'http://dlupbalha12515:8080';
  
  //client.config(function ($routeProvider) {
    // $routeProvider
    //   .when('/login',{
    //     templateUrl : 'authViews/login.html',
    //     controller:'LoginCtrl'
    //   })
    //   .when('/', {
    //     templateUrl: 'views/home.html',
    //     controller: 'DashCtrl'
    //   })
    //   .when('/about', {
    //     templateUrl: 'views/about.html',
    //     controller: 'AboutCtrl'
    //   })
    //   .when('/contactus', {
    //     templateUrl: 'views/contactus.html',
    //     controller: 'ContactusCtrl'
    //   })
    //   .when('/signup', {
    //     templateUrl: 'views/signup.html',
    //     controller: 'SignupCtrl'
    //   })
    //   .when('/data', {
    //     templateUrl: 'views/data.html',
    //     controller: 'DataCtrl'
    //   })
    //   .when('/report', {
    //     templateUrl: 'views/report.html',
    //     controller: 'ReportCtrl'
    //   })
    //   .when('/dash', {
    //     templateUrl: 'views/dash.html',
    //     controller: 'DashCtrl',
    //   })
    //   .when('/seo', {
    //     templateUrl: 'views/SEOdash.html',
    //     controller: 'SEODashCtrl'
    //   })
    //   .when('/breach', {
    //     templateUrl: 'views/breach.html',
    //     controller: 'BreachCtrl'
    //   })
    //   .when('/userauth', {
    //     templateUrl: 'views/userauth.html',
    //     controller: 'UserAuthCtrl'
    //   })
    //   .when('/datagrid', {
    //     templateUrl: 'views/ngGrid.html',
    //     controller: 'NgGridCtrl'
    //   })
    //   .when('/maping', {
    //     templateUrl: 'views/maping.html',
    //     controller: 'MapingCtrl'
    //   })
    //   .when('/all', {
    //     templateUrl: 'views/all.html',
    //     controller: 'AllCtrl'
    //   })
      // .otherwise({
      //   redirectTo: '/'
      // });
  
});


var Utility = Utility || {};
Utility.utils = {
   init : function($scope) {
      $scope.reportFiltered = '';
      $scope.count = 0;
      $scope.pageStart = 0;
      $scope.pageSize = 100;
      $scope.pageEnd = $scope.pageSize;
      $scope.isNewFilter = 0;
      $scope.sortcolnumName = ''
   },

   postData : function($scope, $http, $templateCache){
      //var urlBase = 'http://localhost:8080/data/add';
      var urlBase = 'http://dlupbalha12515:8080/data/gpsreport';
      var formData = $scope.json_string;
      $http({ // Accessing the Angular $http Service to send data via REST Communication to Node Server.
              method: 'POST',
              url: urlBase,
              data:  formData ,
              headers: {'Content-Type' : 'application/json'},
              cache: $templateCache
          }).
          success(function(response) {
                  console.log("success"); // Getting Success Response in Callback
                  $scope.codeStatus = response.data;
                  console.log($scope.codeStatus);
                  return 'Success';

          }).
          error(function(response) {
                  console.log("error"); // Getting Error Response in Callback
                  $scope.codeStatus = response || "Request failed";
                  console.log($scope.codeStatus);
                  return 'Error';
          });
      },

   getAllRequest : function($scope,$http){
        var urlBase = 'http://dlupbalha12515:8080/data/reports/getAllRequest';
        $http.get(urlBase).success(function(data) {
          data.sort(function(a,b){
              var sortStatus = 0;
              if (a['Request Number'] < b['Request Number']) {
                  sortStatus = 1;
              } else if (a['Request Number'] > b['Request Number']) {
                      sortStatus = -1;
              }
              return sortStatus;
          });
          var parseddata = JSON.stringify(data);
          parseddata = JSON.parse(parseddata, function(key, value) {
            if(key == 'Brand')
              return value.replace('\'','"');
            else
              return value;
          }); 
          $scope.reportCached = parseddata;
          $scope.report = parseddata.slice(0,$scope.pageSize);
          $scope.count = $scope.reportCached.length;
        });
    },
    getBreach : function($scope,$http){
        var urlBase = 'http://dlupbalha12515:8080/data/reports/getBreach';
        $http.get(urlBase).success(function(data) {
        data.sort(function(a,b){
            var sortStatus = 0;
            if (a['Assigned To'] > b['Assigned To']) {
                sortStatus = 1;
            } else if (a['Assigned To'] < b['Assigned To']) {
                    sortStatus = -1;
            }
            return sortStatus;
        });
        var parseddata = JSON.stringify(data);
        parseddata = JSON.parse(parseddata, function(key, value) {
          if(key == 'Brand')
            return value.replace('\'','"');
          else
            return value;
        }); 
        $scope.reportCached = parseddata;
        $scope.report = parseddata.slice(0,$scope.pageSize);
        $scope.count = $scope.reportCached.length;
        if($scope.pageEnd > $scope.count)
         $scope.pageEnd = $scope.count;
      });
    },
    getUserAuth : function($scope,$http){
        //var urlBase = 'http://dlupbalha12515:8080/data/reports/getUserAuth';
        var urlBase = 'http://dlujsethi00714:8080/data/reports/getUserAuth';
        $http.get(urlBase).success(function(data) {
        data.sort(function(a,b){
            var sortStatus = 0;
            if (a['Authorise_Request_ID'] > b['Authorise_Request_ID']) {
                sortStatus = 1;
            } else if (a['Authorise_Request_ID'] < b['Authorise_Request_ID']) {
                    sortStatus = -1;
            }
            return sortStatus;
        });
        var parseddata = JSON.stringify(data);
        parseddata = JSON.parse(parseddata, function(key, value) {
          if(key == 'Authorise_Brand')
            return value.replace('\'','"');
          else
            return value;
        }); 
        $scope.reportCached = parseddata;
        $scope.report = parseddata.slice(0,$scope.pageSize);
        $scope.count = $scope.reportCached.length;
        if($scope.pageEnd > $scope.count)
         $scope.pageEnd = $scope.count;
      });
    },
    getdataByColumn : function($scope,$http,column,columnVal){
      var tempData;
      if(column == 'Assigned To' ){
          if($scope.isNewFilter == 0){
              tempData =  $scope.reportCached.filter(function(row){
              if(row[column] == columnVal)
                return true;
            });
          }else{
            tempData =  $scope.reportFiltered.filter(function(row){
              if(row[column] == columnVal)
                return true;
            });
          }
      }else{
          $scope.isNewFilter == 1;
          if($scope.reportFiltered.length == 0){
          tempData =  $scope.reportCached.filter(function(row){
            if(row[column] == columnVal)
              return true;
          });  
        }else{
            tempData =  $scope.reportFiltered.filter(function(row){
            if(row[column] == columnVal)
              return true;
          });  
        }  
      }
      
      
      $scope.reportFiltered = tempData;
      if(tempData.length < $scope.pageSize){
        $scope.pageStart = 0;
        $scope.pageEnd = tempData.length;
        $scope.report = tempData;
        $scope.count = $scope.reportFiltered.length;  
      }else{
        $scope.pageStart = 0;
        $scope.pageEnd = $scope.pageSize;
        $scope.report = tempData.slice($scope.pageStart, $scope.pageEnd);
        $scope.count = $scope.reportFiltered.length; 
      }
      
    },

    next : function($scope){
        var pageData;
        if($scope.reportFiltered == ''){
            pageData = $scope.reportCached;
            if($scope.pageEnd < pageData.length){
                $scope.pageStart = $scope.pageStart + $scope.pageSize;
                $scope.pageEnd = $scope.pageEnd + $scope.pageSize;
                if($scope.pageEnd > pageData.length){
                    $scope.pageEnd = pageData.length;
                }
                $scope.report = pageData.slice($scope.pageStart +1 ,$scope.pageEnd);
            }
            
        }else{
            pageData = $scope.reportFiltered;
            if($scope.pageEnd < pageData.length){
                if(pageData.length < $scope.pageSize){
                    $scope.pageStart = 0;
                    $scope.pageEnd = pageData.length;
                    
                  }else{
                    $scope.pageStart =  $scope.pageStart + $scope.pageSize;
                    
                    if($scope.pageSize > pageData.length - $scope.pageStart){
                        $scope.pageEnd =  pageData.length;
                    }else{

                        $scope.pageEnd =  $scope.pageEnd + $scope.pageSize;
                    }
                  }
                $scope.count = pageData.length;  
                $scope.report = pageData.slice($scope.pageStart +1 ,$scope.pageEnd);
            }
        }

    },

    previous : function($scope){
      if($scope.pageStart >= $scope.pageSize){
            $scope.isProcessing = true;
            $scope.pageStart = $scope.pageStart - $scope.pageSize;
            $scope.pageEnd = $scope.pageEnd - $scope.pageSize;
            var pageData = $scope.reportCached;
            $scope.report = pageData.slice($scope.pageStart +1 ,$scope.pageEnd);
            $scope.isProcessing = false;    
        }
      },

    sortColumn : function($scope, colnum){
      var data;
      
      if($scope.sortcolnumName == colnum[0]){
        $scope.sortcolnumName = '';
        if($scope.reportFiltered == ''){
            data = $scope.reportCached;
            data.sort(function(a,b){
                var sortStatus = 0;
                if (a[colnum] < b[colnum]) {
                    sortStatus = -1;
                } else if (a[colnum] > b[colnum]) {
                        sortStatus = 1;
                }
                return sortStatus;
            });    
        }else{
            data = $scope.reportFiltered;
            data.sort(function(a,b){
                var sortStatus = 0;
                if (a[colnum] < b[colnum]) {
                    sortStatus = -1;
                } else if (a[colnum] > b[colnum]) {
                        sortStatus = 1;
                }
                return sortStatus;
            });
        }
      }else{
        $scope.sortcolnumName = colnum[0];
        if($scope.reportFiltered == ''){
            data = $scope.reportCached;
            data.sort(function(a,b){
                var sortStatus = 0;
                if (a[colnum] < b[colnum]) {
                    sortStatus = 1;
                } else if (a[colnum] > b[colnum]) {
                        sortStatus = -1;
                }
                return sortStatus;
            });    
        }else{
            data = $scope.reportFiltered;
            data.sort(function(a,b){
                var sortStatus = 0;
                if (a[colnum] < b[colnum]) {
                    sortStatus = 1;
                } else if (a[colnum] > b[colnum]) {
                        sortStatus = -1;
                }
                return sortStatus;
            });
        }
      }
      $scope.report = data.slice(0,$scope.pageSize);
    },

    getNewWip : function($scope){
      $scope.isProcessing = true;
      $scope.isNewFilter = 1;
      $scope.count = $scope.reportCached.length;
      $scope.pageStart = 0;
      $scope.pageEnd = $scope.pageSize;
      var data = $scope.reportCached;
      data =  $scope.reportCached.filter(function(row){
          if(row['Request Status'] != 'Completed' && row['Request Status'] != 'Closed' && row['Request Status'] != 'Cancelled' && row['Request Status'] != 'Pending')
            return true;
        });
      if(data.length < $scope.pageSize)
        $scope.pageEnd = data.length;
      $scope.reportFiltered = data;
      $scope.count = data.length;  
      $scope.report = data.slice(0,$scope.pageSize);
      $scope.isProcessing = false;
    },
    getPending : function($scope){
      $scope.isProcessing = true;
      $scope.isNewFilter = 1;
      $scope.count = $scope.reportCached.length;
      $scope.pageStart = 0;
      $scope.pageEnd = $scope.pageSize;
      var data = $scope.reportCached;
      data =  $scope.reportCached.filter(function(row){
          if(row['Request Status'] == 'Pending')
            return true;
        });
      if(data.length < $scope.pageSize)
        $scope.pageEnd = data.length;
      $scope.reportFiltered = data;
      $scope.count = data.length;  
      $scope.report = data.slice(0,$scope.pageSize);
      $scope.isProcessing = false;
    }
};
