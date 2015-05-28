'use strict';
//Use Below query for getting data from udhd dump
//Select * from CI_Authorization

//Then save in excel as csv file
//Then again open the csv in notepad and save again as csv file with UTF-8 encoding

//Drop udhddata1 first by http://localhost:8080/views/dropView/breach
//Data Upload Run this on ms dos command prompt and not on mongo console
//mongoimport --db MyData --collection breach --type csv --headerline --file e:/breach.csv
client.controller('UserAuthCtrl', function ($scope, $http, myutil) {
    
    $scope.assignedToFilter = '';
    myutil.reportFiltered = '';
    myutil.reportCached = '';
    myutil.report = '';
    myutil.count = 0;
    myutil.pageEnd = myutil.pageSize;
    myutil.pageStart = 0;
    
     myutil.getUserAuth().then(function(data){
        $scope.report = data.report;
        $scope.count = data.count;
        $scope.pageStart = data.pageStart;
        $scope.pageEnd = data.pageEnd;
        
    });
    $scope.searchByEmail = function(){
      search($scope, myutil);
      // $scope.isProcessing = true;
      // $scope.isNewFilter = 1;
      // $scope.count = myutil.reportCached.length;
      // $scope.pageStart = 0;
      // $scope.pageEnd = myutil.pageSize;
      // var data;
      // if(myutil.reportFiltered.length == 0){
      //   data = myutil.reportCached;
      // }else{
      //       data = myutil.reportFiltered;
      // }
      // data =  myutil.reportCached.filter(function(row){
      //     if(row['Authorise_Agent_LoginID'].match($scope.email))
      //       return true;
      // });
      // if(data.length < myutil.pageSize)
      //   $scope.pageEnd = data.length;
      // $scope.reportFiltered = data;
      // myutil.reportFiltered = data;
      // $scope.count = data.length;  
      // $scope.report = data.slice(0,myutil.pageSize);
      // $scope.isProcessing = false;
    };
    $scope.searchByName = function(){
      $scope.isProcessing = true;
      $scope.isNewFilter = 1;
      $scope.count = myutil.reportCached.length;
      $scope.pageStart = 0;
      $scope.pageEnd = myutil.pageSize;
      var data;
      if(myutil.reportFiltered.length == 0){
        data = myutil.reportCached;
      }else{
            data = myutil.reportFiltered;
      }
      var searchVal;
      searchVal = new RegExp($scope.name, 'i');
      data =  myutil.reportCached.filter(function(row){
          if(row['Authorise_Agent_Name'].match(searchVal))
            return true;
        });
      if(data.length < myutil.pageSize)
        $scope.pageEnd = data.length;
      $scope.reportFiltered = data;
      myutil.reportFiltered = data;
      $scope.count = data.length;  
      $scope.report = data.slice(0,myutil.pageSize);
      $scope.isProcessing = false;
    };
    $scope.searchByURL = function(){
      search($scope, myutil);
      // $scope.isProcessing = true;
      // $scope.isNewFilter = 1;
      // $scope.count = myutil.reportCached.length;
      // $scope.pageStart = 0;
      // $scope.pageEnd = myutil.pageSize;
      // var data;
      
      // var searchVal = new RegExp($scope.url, 'i');
      // data =  myutil.reportCached.filter(function(row){
      //   if(row['Authorise_Main_URL']){
      //     if(('www.'+row['Authorise_Main_URL']).match(searchVal))
      //         return true;
      //   }
      // });
      
      // if(data){
      //   if(data.length < myutil.pageSize)
      //     $scope.pageEnd = data.length;
      // }
      // $scope.reportFiltered = data;
      // $scope.count = data.length;  
      // $scope.report = data.slice(0,myutil.pageSize);
      // $scope.isProcessing = false;
    };
    $scope.getUserAuth = function(){
        $scope.isProcessing = true;
        myutil.getUserAuth().then(function(data){
            $scope.report = data.report;
            $scope.count = data.count;
            $scope.pageStart = data.pageStart;
            $scope.pageEnd = data.pageEnd;
            
        });
        $scope.isProcessing = false;
    };
    $scope.getdataByColumn = function(column,columnVal){
        $scope.isProcessing = true;
        myutil.getdataByColumn(column, columnVal);
        setValues($scope, myutil);
    };
    $scope.clearFilter = function(column,columnVal){
        $scope.isProcessing = true;
        myutil.clearFilter();
        clearMatchValues($scope, myutil);
        $scope.pageStart = 0;
        $scope.pageEnd = myutil.pageSize;
        var data = myutil.reportCached;
        $scope.count = myutil.reportCached.length;
        $scope.report = data.slice(0,myutil.pageSize);
        if($scope.pageEnd > $scope.count)
         $scope.pageEnd = $scope.count;
        $scope.isProcessing = false;
    };
    $scope.next = function(){
        $scope.isProcessing = true;
        myutil.next();
        setValues($scope, myutil);
    };
    $scope.previous = function(){
        $scope.isProcessing = true;
        myutil.previous();
        setValues($scope, myutil);
    };
    $scope.sortData = function(colnum){
        $scope.isProcessing = true;
        myutil.sortColumn(colnum);
        setValues($scope, myutil);
    }
});

var search = function($scope, myutil){

    $scope.isProcessing = true;
    $scope.isNewFilter = 1;
    $scope.count = myutil.reportCached.length;
    $scope.pageStart = 0;
    $scope.pageEnd = myutil.pageSize;
    var data;
    var searchVal;
    if(typeof($scope.email) != 'undefined' && $scope.email != ""){
        searchVal = new RegExp($scope.email, 'i');
        data =  myutil.reportCached.filter(function(row){
            if(row['Authorise_Agent_LoginID'].match(searchVal))
              return true;
          });
        myutil.reportFiltered = data;
    }else{
        myutil.reportFiltered = myutil.reportCached;
    }

    if(typeof($scope.url) != 'undefined' && $scope.url != ""){
      searchVal = new RegExp($scope.url, 'i');
      data =  myutil.reportFiltered.filter(function(row){
        if(row['Authorise_Main_URL']){
          if(('www.'+row['Authorise_Main_URL']).match(searchVal))
              return true;
        }
      });
    }

    if(typeof(data) != 'undefined'){
      if(data.length < myutil.pageSize){
          $scope.pageEnd = data.length;
      }
      $scope.reportFiltered = data;
      myutil.reportFiltered = data;
      $scope.count = data.length;  
      $scope.report = data.slice(0,myutil.pageSize);
    }

    $scope.isProcessing = false;
};

var setValues = function($scope, myutil){
    $scope.report = myutil.report;
    $scope.count = myutil.count;
    $scope.pageStart = myutil.pageStart;
    $scope.pageEnd = myutil.pageEnd;
    $scope.isProcessing = false;
};




