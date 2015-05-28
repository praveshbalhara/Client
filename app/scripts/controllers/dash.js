'use strict';
//Use Below query for getting data from udhd dump
// select CONVERT(VARCHAR(10),[Created Date],103) as 'Created Date',
// CONVERT(VARCHAR(10),[Created Date],112) as 'DateSort',
// * from dbo.GPS_Data_Dump
// order by DateSort desc

//Then save in excel as csv file
//Then again open the csv in notepad and save again as csv file with UTF-8 encoding

//Drop udhddata1 first by http://localhost:8080/views/dropView/udhddata1
//Data Upload Run this on ms dos command prompt and not on mongo console
//mongoimport --db MyData --collection udhddata --type csv --headerline --file e:/book1.csv
//Below import for transition sheet
//mongoimport --db MyData --collection maping --type csv --headerline --file e:/book1.csv

client.controller('DashCtrl', function ($scope, myutil) {
    
    clearMatchValues($scope, myutil);
    myutil.reportFiltered = '';
    myutil.reportCached = '';
    myutil.report = '';
    myutil.count = 0;
    myutil.pageEnd = myutil.pageSize;
    myutil.pageStart = 0;
    $scope.assignedToFilter = '';
    myutil.getAllRequest(0,0).then(function(data){
        $scope.report = data.report;
        $scope.count = data.count;
        $scope.pageStart = data.pageStart;
        $scope.pageEnd = data.pageEnd;
        
    });
    
    $scope.searchName = function(){
        $scope.isProcessing = true;
        myutil.getdataByMatching('Assigned To', $scope.name);
        setValues($scope, myutil);
    }
    $scope.refreshData = function(){
        clearMatchValues($scope, myutil);
        myutil.getAllRequest(1,0).then(function(data){
            $scope.report = data.report;
            $scope.count = data.count;
            $scope.pageStart = data.pageStart;
            $scope.pageEnd = data.pageEnd;
        });
    };
    $scope.getdataByAssignedTo = function(column,columnVal){
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
    $scope.getNewWip = function(){
        $scope.isProcessing = true;
        clearMatchValues($scope, myutil);
        myutil.getNewWip();
        setValues($scope, myutil);
    };
    $scope.getPending = function(){
        $scope.isProcessing = true;
        clearMatchValues($scope, myutil);
        myutil.getPending();
        setValues($scope, myutil);
    };
    $scope.refreshCachedData = function(){
        $scope.isProcessing = true;
        clearMatchValues($scope, myutil);
        $scope.reportFiltered = '';
        $scope.pageStart = 0;
        $scope.pageEnd = myutil.reportCached.length;
        $scope.report = myutil.reportCached;
        $scope.count = myutil.reportCached.length;
        $scope.isProcessing = false;
    };
    $scope.getUnassigned = function(){
        $scope.isProcessing = true;
        clearMatchValues($scope, myutil);
        myutil.getdataByColumn('Assigned To', 'Unassigned');
        setValues($scope, myutil);
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
        // $scope.report = myutil.report;
        // $scope.count = myutil.count;
        // $scope.pageStart = myutil.pageStart;
        // $scope.pageEnd = myutil.pageEnd;
        // $scope.isProcessing = false;
    };
    $scope.selectAction = function(){
        var aaa = $scope.assignedToFilter['Assigned To'];
        myutil.getdataByColumn('Assigned To', aaa);
        setValues($scope, myutil);
    };
});

var setValues = function($scope, myutil){
    $scope.report = myutil.report;
    $scope.count = myutil.count;
    $scope.pageStart = myutil.pageStart;
    $scope.pageEnd = myutil.pageEnd;
    $scope.isProcessing = false;
};
var clearMatchValues = function($scope, myutil){
    myutil.reportMatched == '';
    $scope.name = '';
};


// client.controller('DashCtrl', function ($scope, $http, $templateCache) {
    
//     var util = Utility.utils;
//     util.init($scope);
//     util.getAllRequest($scope,$http,$templateCache);
//     $scope.refreshData = function(){
//         $scope.isProcessing = true;
//         $scope.pageStart = 0;
//         $scope.pageEnd = $scope.pageSize;
//         util.getAllRequest($scope,$http,$templateCache);
//         $scope.isProcessing = false;
//     };
//     $scope.getdataByAssignedTo = function(column,columnVal){
//         $scope.isProcessing = true;
//         util.getdataByColumn($scope,$http,column, columnVal);
//         $scope.isProcessing = false;
//     };
//     $scope.clearFilter = function(column,columnVal){
//         $scope.isProcessing = true;
//         $scope.isNewFilter = 0;
//         $scope.count = $scope.reportCached.length;
//         $scope.pageStart = 0;
//         $scope.pageEnd = $scope.pageSize;
//         var data = $scope.reportCached;
//         $scope.report = data.slice(0,$scope.pageSize);
//         $scope.isProcessing = false;
//     };
//     $scope.getNewWip = function(){
//         $scope.isProcessing = true;
//         util.getNewWip($scope);
//         $scope.isProcessing = false;
//     };
//     $scope.getPending = function(){
//         $scope.isProcessing = true;
//         util.getPending($scope);
//         $scope.isProcessing = false;
//     };
//     $scope.refreshCachedData = function(){
//         $scope.isProcessing = true;
//         $scope.reportFiltered = '';
//         $scope.pageStart = 0;
//         $scope.pageEnd = $scope.reportCached.length;
//         $scope.report = $scope.reportCached;
//         $scope.count = $scope.reportCached.length;
//         $scope.isProcessing = false;
//     };
//     $scope.next = function(){
//         $scope.isProcessing = true;
//         util.next($scope);
//         $scope.isProcessing = false;
//     };

//     $scope.previous = function(){
//         $scope.isProcessing = true;
//         util.previous($scope);
//         $scope.isProcessing = false;
//     };
//     $scope.sortData = function(colnum){
//         $scope.isProcessing = true;
//         util.sortColumn($scope,colnum);
//         $scope.isProcessing = false;
//     }
// });




