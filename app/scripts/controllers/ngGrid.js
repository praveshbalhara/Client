
client.controller('NgGridCtrl', function ($scope, myutil) {
	

	// myutil.getAllRequest(1).then(function(callbackData){
 //        var data =  callbackData.reportCached;
 //        $scope.apiData = data;
 //        $scope.count = callbackData.count;
 //        //$scope.gridOptions = { data: 'myData' };
 //    });
	// $scope.gridOptions = { data: 'apiData',
	// 				   columnDefs: [{field:'Request Number', displayName:'Request Number'}, 
	// 				   				{field:'Request Status', displayName:'Request Status'},
	// 				   				{field:'Requested By', displayName:'Requested By'},
	// 				   				{field:'Agency Name', displayName:'Agency Name'},
	// 				   				//{field:'Fulfilment Ticket', displayName:'Fulfilment Ticket'},
	// 				   				{field:'Ticket Age', displayName:'Ticket Age',cellTemplate: '<div ng-class="{color: row.getProperty(col.field) > 2}"><div class="ngCellText">{{row.getProperty(col.field)}}</div></div>'},
	// 				   				//{field:'Fulfilment Ticket Status', displayName:'Fulfilment Ticket Status'},
	// 				   				{field:'Assigned To', displayName:'Assigned To',enableCellEdit: true},
					   				
	// 				   				{field:'Brand', displayName:'Brand'},
	// 				   				{field:'Created Date', displayName:'Created Date'},
	// 				   				//{field:'Last Modified Date', displayName:'Last Modified Date'},
					   				
	// 				   				{field:'Region', displayName:'Region'},
	// 				   				{field:'Priority', displayName:'Priority'},
	// 				   				{field:'Website URL', displayName:'Website URL'}
	// 				   			   ],
	// 				   showGroupPanel: true,
 //        			   jqueryUIDraggable: true
 //        			   //plugins: [new ngGridFlexibleHeightPlugin()]
	// };


	$scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    }; 
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [100, 500, 4000],
        pageSize: 4000,
        currentPage: 1
    };	
    $scope.setPagingData = function(data, page, pageSize){	
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.myData = pagedData;
        $scope.totalServerItems = data.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        setTimeout(function () {
            var data;
            if (searchText) {
                var ft = searchText.toLowerCase();
                myutil.getAllRequest(1,0).then(function(largeLoad) {		
                    data = largeLoad.reportCached.filter(function(item) {
                        return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                    });
                    $scope.setPagingData(data,page,pageSize);
                });            
            } else {
                myutil.getAllRequest(1,0).then(function(largeLoad) {
                    $scope.setPagingData(largeLoad.reportCached,page,pageSize);
                });
            }
        }, 100);
    };
	
    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
	
    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
	
    $scope.gridOptions = {
        data: 'myData',
        columnDefs: [{field:'Request Number', displayName:'Request Number'}, 
					   				{field:'Request Status', width: '90px', displayName:'Status'},
					   				{field:'Requested By', displayName:'Requested By'},
					   				{field:'Agency Name', displayName:'Agency Name'},
					   				{field:'Assigned To', displayName:'Assigned To',enableCellEdit: true},
					   				//{field:'Fulfilment Ticket', displayName:'Fulfilment Ticket'},
					   				{field:'Ticket Age',width: '40px', displayName:'Age',cellTemplate: '<div ng-class="{color: row.getProperty(col.field) > 2}"><div class="ngCellText">{{row.getProperty(col.field)}}</div></div>'},
					   				//{field:'Fulfilment Ticket Status', displayName:'Fulfilment Ticket Status'},
					   				
					   				
					   				{field:'Brand', width: '80px', displayName:'Brand'},
					   				{field:'Created Date', displayName:'Created Date'},
					   				//{field:'Last Modified Date', displayName:'Last Modified Date'},
					   				
					   				{field:'Region', displayName:'Region'},
					   				{field:'Priority', width: '80px', displayName:'Priority'},
					   				{field:'Website URL', displayName:'Website URL'}
					   			   ],
        enablePaging: true,
		showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions,
        showGroupPanel: true,
        enableColumnResize : true,
        enableColumnReordering : true,
        //jqueryUITheme : true, //Comented as no change seen post this
        showColumnMenu : true,
        showFilter : true
    };

});


function ngGridFlexibleHeightPlugin (opts) {
    var self = this;
    self.grid = null;
    self.scope = null;
    self.init = function (scope, grid, services) {
        self.domUtilityService = services.DomUtilityService;
        self.grid = grid;
        self.scope = scope;
        var recalcHeightForData = function () { setTimeout(innerRecalcForData, 1); };
        var innerRecalcForData = function () {
            var gridId = self.grid.gridId;
            var footerPanelSel = '.' + gridId + ' .ngFooterPanel';
            var extraHeight = self.grid.$topPanel.height() + $(footerPanelSel).height();
            var naturalHeight = self.grid.$canvas.height() + 1;
            if (opts != null) {
                if (opts.minHeight != null && (naturalHeight + extraHeight) < opts.minHeight) {
                    naturalHeight = opts.minHeight - extraHeight - 2;
                }
                if (opts.maxHeight != null && (naturalHeight + extraHeight) > opts.maxHeight) {
                    naturalHeight = opts.maxHeight;
                }
            }

            var newViewportHeight = naturalHeight + 3;
            if (!self.scope.baseViewportHeight || self.scope.baseViewportHeight !== newViewportHeight) {
                self.grid.$viewport.css('height', newViewportHeight + 'px');
                self.grid.$root.css('height', (newViewportHeight + extraHeight) + 'px');
                self.scope.baseViewportHeight = newViewportHeight;
                self.domUtilityService.RebuildGrid(self.scope, self.grid);
            }
        };
        self.scope.catHashKeys = function () {
            var hash = '',
                idx;
            for (idx in self.scope.renderedRows) {
                hash += self.scope.renderedRows[idx].$$hashKey;
            }
            return hash;
        };
        self.scope.$watch('catHashKeys()', innerRecalcForData);
        self.scope.$watch(self.grid.config.data, recalcHeightForData);
    };
}

	