'use strict';
//Use Below query for getting data from udhd dump
//select * from dbo.GPS_Alerts

//Then save in excel as csv file
//Then again open the csv in notepad and save again as csv file with UTF-8 encoding

//Drop udhddata1 first by http://localhost:8080/views/dropView/breach
//Data Upload Run this on ms dos command prompt and not on mongo console
//mongoimport --db MyData --collection breach --type csv --headerline --file e:/book1.csv
client.controller('BreachCtrl', function ($scope, myutil) {
    
    myutil.reportFiltered = '';
    myutil.reportCached = '';
    myutil.report = '';
    myutil.count = 0;
    myutil.pageStart = 0;
    myutil.pageEnd = myutil.pageSize;;
    //Below call using factory method
    myutil.getBreach().then(function(data){
        $scope.report = data.report;
        $scope.count = data.count;
        $scope.pageStart = data.pageStart;
        $scope.pageEnd = data.pageEnd;
    });
    
    $scope.getBreach = function(){
        //this function not in use currently
        // $scope.isProcessing = true;
        // $scope.pageStart = 0;
        // $scope.pageEnd = $scope.pageSize;
        // util.getBreach($scope,$http,$templateCache);
        // $scope.isProcessing = false;
    };

    $scope.getdataByColumn = function(column,columnVal){
        $scope.isProcessing = true;
        //util.getdataByColumn($scope,$http,column, columnVal);
        myutil.getdataByColumn(column, columnVal);
        $scope.report = myutil.report;
        $scope.count = myutil.count;
        $scope.pageStart = myutil.pageStart;
        $scope.pageEnd = myutil.pageEnd;
        $scope.isProcessing = false;
    };
    $scope.clearFilter = function(column,columnVal){
        // $scope.isProcessing = true;
        // $scope.isNewFilter = 0;
        // $scope.count = $scope.reportCached.length;
        // $scope.pageStart = 0;
        // $scope.pageEnd = $scope.pageSize;
        // var data = $scope.reportCached;
        // $scope.report = data.slice(0,$scope.pageSize);
        // if($scope.pageEnd > $scope.count)
        //  $scope.pageEnd = $scope.count;
        // $scope.isProcessing = false;

        $scope.isProcessing = true;
        myutil.isNewFilter = 0;
        $scope.count = myutil.reportCached.length;
        $scope.pageStart = 0;
        $scope.pageEnd = myutil.pageSize;
        var data = myutil.reportCached;
        $scope.report = data.slice(0,myutil.pageSize);
        if($scope.pageEnd > $scope.count)
         $scope.pageEnd = $scope.count;
        $scope.isProcessing = false;
    };
    $scope.next = function(){
        // $scope.isProcessing = true;
        // util.next($scope);
        // $scope.isProcessing = false;

        $scope.isProcessing = true;
        myutil.next();
        $scope.report = myutil.report;
        $scope.count = myutil.count;
        $scope.pageStart = myutil.pageStart;
        $scope.pageEnd = myutil.pageEnd;
        $scope.isProcessing = false;
    };

    $scope.previous = function(){
        $scope.isProcessing = true;
        myutil.previous();
        $scope.report =  myutil.report;
        $scope.count = myutil.count;
        $scope.pageStart = myutil.pageStart;
        $scope.pageEnd = myutil.pageEnd;
        $scope.isProcessing = false;
    };
    $scope.sortData = function(colnum){
        $scope.isProcessing = true;
        myutil.sortColumn(colnum);
        $scope.report = myutil.report;
        $scope.count = myutil.count;
        $scope.pageStart = myutil.pageStart;
        $scope.pageEnd = myutil.pageEnd;
        $scope.isProcessing = false;
    }
});




