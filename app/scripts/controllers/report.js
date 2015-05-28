'use strict';

//angular.module('client')
  client.controller('ReportCtrl', function ($scope, $http, $templateCache, XLSXReaderService) {
    var utils = Utility.utils;
    $scope.showPreview = false;
    $scope.showJSONPreview = true;
    $scope.json_string = "";

    // var testinit = Utility.utils;
    // var val = testinit.init('safdsfsd');

    $scope.fileChanged = function(files) {
        $scope.isProcessing = true;
        $scope.sheets = [];
        $scope.excelFile = files[0];
        XLSXReaderService.readFile($scope.excelFile, $scope.showPreview, $scope.showJSONPreview).then(function(xlsxData) {
            $scope.sheets = xlsxData.sheets;
            $scope.isProcessing = false;
        });
    }

    $scope.updateJSONString = function() {
        $scope.json_string = JSON.stringify($scope.sheets[$scope.selectedSheetName], null, 2);
    }

    $scope.showPreviewChanged = function() {
        if ($scope.showPreview) {
            $scope.showJSONPreview = false;
            $scope.isProcessing = true;
            XLSXReaderService.readFile($scope.excelFile, $scope.showPreview, $scope.showJSONPreview).then(function(xlsxData) {
                $scope.sheets = xlsxData.sheets;
                $scope.isProcessing = false;
            });
        }
    }

    $scope.submitData = function(){

      var util = Utility.utils;
      var val = util.postData($scope,$http,$templateCache);

    }


  });

client.factory("XLSXReaderService", ['$q', '$rootScope','XLSXReader' ,
    function($q, $rootScope, XLSXReader) {
        var service = function(data) {
            angular.extend(this, data);
        }

        service.readFile = function(file, readCells, toJSON) {
            var deferred = $q.defer();

            XLSXReader(file, readCells, toJSON, function(data) {
                $rootScope.$apply(function() {
                    deferred.resolve(data);
                });
            });

            return deferred.promise;
        }


        return service;
    }
]);


client.factory('XLSXReader', function XLSXReaderFactory(){
    // Check if dependecies are available.
    if (typeof XLSX === 'undefined') {
        console.log('xlsx.js is required. Get it from https://github.com/SheetJS/js-xlsx');
    }
    if (typeof _ === 'undefined') {
        console.log('Lodash.js is required. Get it from http://lodash.com/');
    }
    // Baseline setup
    // --------------
    // Establish the root object, `window` in the browser, or `exports` on the server.
    var root = this;
    // Save the previous value of the `XLSXReader` variable.
    var previousXLSXReader = root.XLSXReader;
    // Create a safe reference to the XLSXReader object for use below.
    var XLSXReader = function(file, readCells, toJSON, handler) {
        var obj = {};
        //debugger;
        XLSXReader.utils.intializeFromFile(obj, file, readCells, toJSON, handler);
        return obj;
    }
    // Export the XLSXReader object for **Node.js**, with
    // backwards-compatibility for the old `require()` API. If we're in
    // the browser, add `XLSXReader` as a global object via a string identifier,
    // for Closure Compiler 'advanced' mode.
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = XLSXReader;
        }
        exports.XLSXReader = XLSXReader;
    } else {
        root.XLSXReader = XLSXReader;
    }
    // Current version.
    XLSXReader.VERSION = '0.0.1';
    XLSXReader.utils = {
        intializeFromFile: function(obj, file, readCells, toJSON, handler) {
            var reader = new FileReader();

            reader.onload = function(e) {
                var data = e.target.result;
                var workbook = XLSX.read(data, {
                    type: 'binary'
                });

                obj.sheets = XLSXReader.utils.parseWorkbook(workbook, readCells, toJSON);
                handler(obj);
            }

            reader.readAsBinaryString(file);
        },
        parseWorkbook: function(workbook, readCells, toJSON) {
            if (toJSON === true) {
                return XLSXReader.utils.to_json(workbook);
            }

            var sheets = {};

            _.forEachRight(workbook.SheetNames, function(sheetName) {
                var sheet = workbook.Sheets[sheetName];
                sheets[sheetName] = XLSXReader.utils.parseSheet(sheet, readCells);
            });

            return sheets;
        },
        parseSheet: function(sheet, readCells) {
            var range = XLSX.utils.decode_range(sheet['!ref']);
            var sheetData = [];

            if (readCells === true) {
                _.forEachRight(_.range(range.s.r, range.e.r + 1), function(row) {
                    var rowData = [];
                    _.forEachRight(_.range(range.s.c, range.e.c + 1), function(column) {
                        var cellIndex = XLSX.utils.encode_cell({
                            'c': column,
                            'r': row
                        });
                        var cell = sheet[cellIndex];
                        rowData[column] = cell ? cell.v : undefined;
                    });
                    sheetData[row] = rowData;
                });
            }

            return {
                'data': sheetData,
                'name': sheet.name,
                'col_size': range.e.c + 1,
                'row_size': range.e.r + 1
            }
        },
        to_json: function(workbook) {
            var result = {};
            workbook.SheetNames.forEach(function(sheetName) {
                var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                if (roa.length > 0) {
                    result[sheetName] = roa;
                }
            });
            return result;
        }
  };
  return XLSXReader;
});







	// .directive('fileModel', ['$parse',
 //          function ($parse) {
 //              return {
 //                  restrict: 'A',
 //                  link: function (scope, element, attrs) {
 //                      var model = $parse(attrs.fileModel);
 //                      var modelSetter = model.assign;
 //                      debugger;
 //                      element.bind('change', function () {
 //                          scope.$apply(function () {
 //                              modelSetter(scope, element[0].files[0]);
 //                          });
 //                      });
 //                  }
 //              };
 //          }
 //    ]);
  //   .directive('fuFileBrowser', function () {
  //     return {
  //         restrict: 'EA',
  //         require: 'ngModel',
  //         replace: true,
  //         template: '<div><div><input type="file" style="cursor:pointer"/></div></div>',
  //         link: function (scope, element, attrs, ngModel) {
  //             var container = element.children();
  //             var bindFileControlChange = function () {
  //                 var fileControl = container.children();
  //                 fileControl.prop('multiple', attrs.fuMultiple !== undefined);
  //                 fileControl.change(function (evt) {
  //                     scope.$apply(function () {
  //                         ngModel.$setViewValue(evt.target.files);

  //                         //Code for reading file content
  //                         $scope.file = (evt.srcElement || evt.target).files[0];
                          
  //                     });
  //                     if (attrs.fuResetable === undefined) {
  //                         return;
  //                     }
  //                     container.html(container.html()); // Reset must be done on div level
  //                     bindFileControlChange(); // Rebind after reset
  //                 });
  //             };
  //             bindFileControlChange();
  //         }
  //     };
  // });


//ReadMe
//Excel read code repo using agular classes.
//http://psjinx.com/programming/2014/01/04/parsing-excel-workbooks-using-javascript/
//https://gist.github.com/psjinx/8252417
//Excel read lib
//http://codetheory.in/parse-read-excel-files-xls-xlsx-javascript/
//Got the fileupload directive code from below link
//http://stackoverflow.com/questions/28081814/upload-excel-files-angularjs-and-get-soa-apis-issues
//http://jsfiddle.net/alexsuch/6aG4x/
//http://www.codeproject.com/Articles/812956/Custom-AngularJS-Directives-for-File-Browsing-and
//http://www.codeproject.com/Articles/607873/Extending-HTML-with-AngularJS-Directives
// AngularJS	.NET	Comment
// module	Assembly	Application building block
// controller	ViewModel	Contains the application logic and exposes it to views
// scope	DataContext	Provides data that can be bound to view elements
// filter	ValueConverter	Modifies data before it reaches the view
// directive	Component	Re-usable UI element
// factory, service	Utility classes	Provide services to other module elements
//example
// var myApp = angular.module("myApp", []);
// myApp.controller("myCtrl", function($scope) {
//   $scope.msg = "hello world";
// });

// myApp.filter("myUpperFilter", function() {
//   return function(input) {
//     return input.toUpperCase();
//   }
// });

// myApp.directive("myDctv", function() {
//   return function(scope, element, attrs) {
//     element.bind("mouseenter", function() {
//       element.css("background", "yellow");
//     });
//     element.bind("mouseleave", function() {
//       element.css("background", "none");
//     });
//   }
// });