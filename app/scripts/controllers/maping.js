'use strict';
//Below import for transition sheet
//mongoimport --db MyData --collection maping --type csv --headerline --file e:/book1.csv

client.controller('MapingCtrl', function ($scope, myutil) {
    
    clearMatchValues($scope, myutil);
    myutil.reportFiltered = '';
    myutil.reportCached = '';
    myutil.report = '';
    myutil.count = 0;
    myutil.pageEnd = myutil.pageSize;
    myutil.pageStart = 0;
    $scope.assignedToFilter = '';
    myutil.getMaping().then(function(data){
        $scope.report = data.report;
        $scope.count = data.count;
        $scope.pageStart = data.pageStart;
        $scope.pageEnd = data.pageEnd;
        
    });
    
    $scope.searchName = function(){
        $scope.isProcessing = true;
        myutil.getdataByMatching('MapingCtrl', $scope.name);
        setValues($scope, myutil);
    }
    $scope.refreshData = function(){
        clearMatchValues($scope, myutil);
        myutil.getMaping().then(function(data){
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


