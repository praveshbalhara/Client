//use $q to resolve the callbacks/closure so that the return value promise is kept
//http://plnkr.co/edit/3Eoq0zmv5NnOpHvyccaS?p=preview
//ui-table, ng grid, smart table and gzip to reduce data size
client.factory('myutil',  function($http, $q){
	var deferred;
	var myutil =
 	//return 
 	{
		reportFiltered : '',
		count : 0,
		pageStart : 0,
		pageSize : 50,
		pageEnd : 50,
		isNewFilter : 0,
		sortcolnumName : '',
		reportCached :'',
		report : '',
		reportFiltered : '',
		reportMatched : '',
		urlBase : 'http://dlupbalha12515:8080/data/reports/',
		//urlBase : 'http://dlujsethi00714:8080/data/reports/',

		reset : function(){
			myutil.count = 0;
			myutil.pageStart = 0;
			myutil.pageSize = 100;
			myutil.pageEnd = 100;
			myutil.isNewFilter = 0;
			myutil.sortcolnumName = '';
			myutil.reportCached = '';
			myutil.report = '';
			myutil.reportFiltered = '';
		},
		getAllRequest : function(isAll, isSEO){
			deferred = $q.defer();
			var returnobject = {report:'', count:'',pageStart : '', pageEnd : '', reportCached : ''}
			var url;
			if(isSEO == 0){
				if(isAll == 0){
					url =  myutil.urlBase + 'getOpenRequest';
				}else{
					url =  myutil.urlBase + 'getAllRequest';
				}
			}else if(isSEO == 'all'){
				if(isAll == 0){
					url =  myutil.urlBase + 'getOpen';
				}else{
					url =  myutil.urlBase + 'getAll';
				}
			}else{
				if(isAll == 0){
					url =  myutil.urlBase + 'getOpenSEORequest';
				}else{
					url =  myutil.urlBase + 'getAllSEORequest';
				}
			}
	        $http.get(url).success(function(data) {
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
	          	try{
		            if(key == 'Brand')
		              return value.replace('\'','"');
		            else
		              return value;
		         }catch(e){
		         	return '';
		         }
	          }); 
	          myutil.reportCached = parseddata;

	          //Filter New and WIP start here
	          if(isAll == 0){
	          parseddata =  parseddata.filter(function(row){
		          	//if(row['Request Status'] != 'Completed' && row['Request Status'] != 'Closed' && row['Request Status'] != 'Cancelled' && row['Request Status'] != 'Pending')
		          	if(row['Request Status'] != 'Pending')
		            return true;
		          });
	          	  myutil.reportFiltered = parseddata;
		          returnobject.count = parseddata.length;
		          myutil.count = parseddata.length;
		          myutil.isNewFilter = 1;
		      }else{
		      	myutil.reportFiltered = '';
		      	returnobject.count = myutil.reportCached.length;
		      	myutil.count = myutil.reportCached.length;
		      	myutil.isNewFilter = 0;
		      }
	          //Filter New and WIP ends here
	          myutil.report = parseddata.slice(0,myutil.pageSize);
	          returnobject.report = parseddata.slice(0,myutil.pageSize);
	          returnobject.reportCached = myutil.reportCached;
	          //myutil.count = myutil.reportCached.length;
	          //parseddata = parseddata.slice(0,myutil.pageSize);
	          myutil.pageStart = 0;
	          returnobject.pageStart = 0;
	          if(myutil.pageEnd > myutil.count){
		         myutil.pageEnd = myutil.count;
		         returnobject.pageEnd = myutil.count;
		     }else{
		     	myutil.pageEnd = myutil.pageSize;
		     	returnobject.pageEnd = myutil.pageSize;
		     }
		     //To resolve the callback before the promise of
	          //returning the value to the calling function
	          deferred.resolve(returnobject);
	        }).error(function(){
          		deferred.reject();
       		});
       		//Return the promise and not the value
       		//promise to resolve the callback value
       		return deferred.promise;
	    },
	    getUnique : function(data){
	        var list = '';
	        angular.foreach(data, function(index,element){
	            if(element['Assigned To'] != list){
	                list = element['Assigned To'];
	            }
	            
	        });
	        return list;
		},
		getBreach : function(){
			deferred = $q.defer();
			var returnobject = {report:'', count:'',pageStart : '', pageEnd : '', reportCached : ''}
	        var url =  myutil.urlBase + 'getBreach';
	        var parseddata;
	        $http.get(url).success(function(data) {
	        	data.sort(function(a,b){
		            var sortStatus = 0;
		            if (a['Assigned To'] > b['Assigned To']) {
		                sortStatus = 1;
		            } else if (a['Assigned To'] < b['Assigned To']) {
		                    sortStatus = -1;
		            }
		            return sortStatus;
				});
				parseddata = JSON.stringify(data);
		        parseddata = JSON.parse(parseddata, function(key, value) {
		          if(key == 'Brand')
		            return value.replace('\'','"');
		          else
		            return value;
		        }); 
		        myutil.reportFiltered = '';
		        myutil.reportCached = parseddata;
		        returnobject.reportCached = parseddata;
		        myutil.report = parseddata.slice(0,myutil.pageSize);
		        returnobject.report = parseddata.slice(0,myutil.pageSize);
		        myutil.count = myutil.reportCached.length;
		        returnobject.count = myutil.reportCached.length;
		        if(myutil.pageEnd > myutil.count){
			        myutil.pageEnd = myutil.count;
			        returnobject.pageEnd = myutil.count;
		     	}else{
					myutil.pageEnd = myutil.pageSize;
			        returnobject.pageEnd = myutil.pageSize;
		     	}
	        	//parseddata = parseddata.slice(0,myutil.pageSize);

	        	deferred.resolve(returnobject);
	        }).error(function(){
          		deferred.reject();
       		});
       		return deferred.promise;
	  	},
	  	getUserAuth : function(){
	  		deferred = $q.defer();
			var returnobject = {report:'', count:'',pageStart : '', pageEnd : '', reportCached : ''}
			var url;
			url =  myutil.urlBase + 'getUserAuth';
			$http.get(url).success(function(data) {
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
	          myutil.reportCached = parseddata;
	          returnobject.count = myutil.reportCached.length;
		      myutil.count = myutil.reportCached.length;
	          myutil.reportCached = parseddata;
			  myutil.report = parseddata.slice(0,myutil.pageSize);
	          returnobject.report = parseddata.slice(0,myutil.pageSize);
	          returnobject.reportCached = myutil.reportCached;
	          myutil.pageStart = 0;
	          returnobject.pageStart = 0;
	          if(myutil.pageEnd > myutil.count){
		         myutil.pageEnd = myutil.count;
		         returnobject.pageEnd = myutil.count;
		     }else{
		     	myutil.pageEnd = myutil.pageSize;
		     	returnobject.pageEnd = myutil.pageSize;
		     }
		     
		      //To resolve the callback before the promise of
	          //returning the value to the calling function
	          deferred.resolve(returnobject);
	        }).error(function(){
          		deferred.reject();
       		});
       		//Return the promise and not the value
       		//promise to resolve the callback value
       		return deferred.promise;
	    },
	  	getdataByColumn : function(column,columnVal){
	      var tempData;
	      if(column == 'Assigned To'){
	          if(myutil.isNewFilter == 0){
	              tempData =  myutil.reportCached.filter(function(row){
	              if(row[column] == columnVal)
	                return true;
	            });
	          }else if( myutil.isNewFilter == 1 &&  columnVal == 'Unassigned'){
	          		tempData =  myutil.report.filter(function(row){
		              	if(row[column] == columnVal)
		                	return true;
	            	});
	          }else{
	            tempData =  myutil.reportFiltered.filter(function(row){
	              if(row[column] == columnVal)
	                return true;
	            });
	          }
	      }else{
	          myutil.isNewFilter == 1;
	          if(myutil.reportFiltered.length == 0){
	          tempData =  myutil.reportCached.filter(function(row){
	            if(row[column] == columnVal)
	              return true;
	          });  
	        }else{
	            tempData =  myutil.reportFiltered.filter(function(row){
	            if(row[column] == columnVal)
	              return true;
	          });  
	        }  
	      }
	      myutil.reportFiltered = tempData;
	      if(tempData.length < myutil.pageSize){
	        myutil.pageStart = 0;
	        myutil.pageEnd = tempData.length;
	        myutil.report = tempData;
	        myutil.count = myutil.reportFiltered.length;  
	      }else{
	        myutil.pageStart = 0;
	        myutil.pageEnd = myutil.pageSize;
	        myutil.report = tempData.slice(myutil.pageStart, myutil.pageEnd);
	        myutil.count = myutil.reportFiltered.length; 
	      }
	    },
	    getdataByMatching : function(column,columnVal){
	      var tempData;
	      var searchVal = new RegExp(columnVal, 'i');
	      if(column == 'MapingCtrl'){
	      		if(myutil.reportFiltered.length == 0){
					tempData =  myutil.reportCached.filter(function(row){
						return myutil.matchMapingData(row, searchVal);
					});
	          }else{
	          		tempData =  myutil.reportFiltered.filter(function(row){
	          			return myutil.matchMapingData(row, searchVal);
					});
	          }
	      }else if(column == 'Requester'){
	      		if(myutil.reportFiltered.length == 0){
					tempData =  myutil.reportCached.filter(function(row){
						return myutil.matchrowDataByRequester(row, searchVal);
					});
	          }else{
	          		tempData =  myutil.reportFiltered.filter(function(row){
	          			return myutil.matchrowDataByRequester(row, searchVal);
					});
	          }
	      }else{
	          if(myutil.reportFiltered.length == 0){
					tempData =  myutil.reportCached.filter(function(row){
						return myutil.matchrowData(row, searchVal);
					});
	          }else{
	          		tempData =  myutil.reportFiltered.filter(function(row){
	          			return myutil.matchrowData(row, searchVal);
					});
	          }
          }
          myutil.reportMatched = tempData;
	      if(tempData.length < myutil.pageSize){
	        myutil.pageStart = 0;
	        myutil.pageEnd = tempData.length;
	        myutil.report = tempData;
	        myutil.count = tempData.length;  
	      }else{
	        myutil.pageStart = 0;
	        myutil.pageEnd = myutil.pageSize;
	        myutil.report = tempData.slice(myutil.pageStart, myutil.pageEnd);
	        myutil.count = tempData.length; 
	      }
	    },
	    next : function(){
	        var pageData;
	        if(myutil.reportMatched != ''){
	            pageData = myutil.reportMatched;
	            if(myutil.pageEnd < pageData.length){
	                myutil.pageStart = myutil.pageStart + myutil.pageSize;
	                myutil.pageEnd = myutil.pageEnd + myutil.pageSize;
	                if(myutil.pageEnd > pageData.length){
	                    myutil.pageEnd = pageData.length;
	                }
	                myutil.count = pageData.length;  
	                myutil.report = pageData.slice(myutil.pageStart ,myutil.pageEnd);
	            }
	            
	        }else if(myutil.reportFiltered == ''){
	            pageData = myutil.reportCached;
	            if(myutil.pageEnd < pageData.length){
	                myutil.pageStart = myutil.pageStart + myutil.pageSize;
	                myutil.pageEnd = myutil.pageEnd + myutil.pageSize;
	                if(myutil.pageEnd > pageData.length){
	                    myutil.pageEnd = pageData.length;
	                }
	                myutil.count = pageData.length;  
	                myutil.report = pageData.slice(myutil.pageStart ,myutil.pageEnd);
	            }
	            
	        }else{
	            pageData = myutil.reportFiltered;
	            if(myutil.pageEnd < pageData.length){
	                if(pageData.length < myutil.pageSize){
	                    myutil.pageStart = 0;
	                    myutil.pageEnd = pageData.length;
	                    
	                  }else{
	                    myutil.pageStart =  myutil.pageStart + myutil.pageSize;
	                    
	                    if(myutil.pageSize > pageData.length - myutil.pageStart){
	                        myutil.pageEnd =  pageData.length;
	                    }else{
	                        
	                        myutil.pageEnd =  myutil.pageEnd + myutil.pageSize;
	                    }
	                  }
	                myutil.count = pageData.length;  
	                myutil.report = pageData.slice(myutil.pageStart ,myutil.pageEnd);
	            }
	        }
		},
		previous : function(){
	    	if(myutil.reportMatched != ''){
	            if(myutil.pageStart >= myutil.pageSize){
		            if(myutil.reportMatched.length - myutil.pageStart < myutil.pageSize){
		            	myutil.pageEnd = myutil.reportMatched.length - (myutil.reportMatched.length - myutil.pageStart);
		            }else{
		            	myutil.pageEnd = myutil.pageEnd - myutil.pageSize;
	            	}
	            	myutil.pageStart = myutil.pageStart - myutil.pageSize;
		            var pageData = myutil.reportMatched;
		            myutil.report = pageData.slice(myutil.pageStart ,myutil.pageEnd);
		        }
	            
	        }else if(myutil.reportFiltered == ''){
	    		if(myutil.pageStart >= myutil.pageSize){
		            if(myutil.reportCached.length - myutil.pageStart < myutil.pageSize){
		            	myutil.pageEnd = myutil.reportCached.length - (myutil.reportCached.length - myutil.pageStart);
		            }else{
		            	myutil.pageEnd = myutil.pageEnd - myutil.pageSize;
	            	}
	            	myutil.pageStart = myutil.pageStart - myutil.pageSize;
		            var pageData = myutil.reportCached;
		            myutil.report = pageData.slice(myutil.pageStart ,myutil.pageEnd);
		        }
	    	}
	    	else{
	    		if(myutil.pageStart >= myutil.pageSize){
		            if(myutil.reportFiltered.length - myutil.pageStart < myutil.pageSize){
		            	myutil.pageEnd = myutil.reportFiltered.length - (myutil.reportFiltered.length - myutil.pageStart);
		            }else{
		            	myutil.pageEnd = myutil.pageEnd - myutil.pageSize;
	            	}
	            	myutil.pageStart = myutil.pageStart - myutil.pageSize;
		            var pageData = myutil.reportFiltered;
		            myutil.report = pageData.slice(myutil.pageStart ,myutil.pageEnd);
		        }		        
		    }
	    },
		sortColumn : function(colnum){
	      var data;
	      
	      if(myutil.sortcolnumName == colnum[0]){
	        myutil.sortcolnumName = '';
	        if(myutil.reportFiltered == ''){
	            data = myutil.reportCached;
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
	            data = myutil.reportFiltered;
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
	        myutil.sortcolnumName = colnum[0];
	        if(myutil.reportFiltered == ''){
	            data = myutil.reportCached;
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
	            data = myutil.reportFiltered;
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
	      myutil.report = data.slice(0,myutil.pageSize);
	    },
	    getNewWip : function(){
	      myutil.isProcessing = true;
	      myutil.isNewFilter = 1;
	      myutil.count = myutil.reportCached.length;
	      myutil.pageStart = 0;
	      myutil.pageEnd = myutil.pageSize;
	      var data = myutil.reportCached;
	      data =  myutil.reportCached.filter(function(row){
	          if(row['Request Status'] != 'Completed' && row['Request Status'] != 'Closed' && row['Request Status'] != 'Cancelled' && row['Request Status'] != 'Pending' && row["Fulfilment Ticket Status"] != 'Closed')
	            return true;
	        });
	      if(data.length < myutil.pageSize)
	        myutil.pageEnd = data.length;
	      myutil.reportFiltered = data;
	      myutil.count = data.length;  
	      myutil.report = data.slice(0,myutil.pageSize);
	      myutil.isProcessing = false;
	    },
	    getUnassigned : function(){
	      myutil.isProcessing = true;
	      myutil.isNewFilter = 1;
	      myutil.count = myutil.reportCached.length;
	      myutil.pageStart = 0;
	      myutil.pageEnd = myutil.pageSize;
	      var data = myutil.reportCached;
	      data =  myutil.reportCached.filter(function(row){
	          if((row['Assigned To'] = 'Unassigned') &&
	          	row['Request Status'] != 'Completed' && row['Request Status'] != 'Closed' && row['Request Status'] != 'Cancelled' && row['Request Status'] != 'Pending' && row["Fulfilment Ticket Status"] != 'Closed')
	            return true;
	        });
	      if(data.length < myutil.pageSize)
	        myutil.pageEnd = data.length;
	      myutil.reportFiltered = data;
	      myutil.count = data.length;  
	      myutil.report = data.slice(0,myutil.pageSize);
	      myutil.isProcessing = false;
	    },
	    getPending : function(){
	      myutil.isProcessing = true;
	      myutil.isNewFilter = 1;
	      myutil.count = myutil.reportCached.length;
	      myutil.pageStart = 0;
	      myutil.pageEnd = myutil.pageSize;
	      var data = myutil.reportCached;
	      data =  myutil.reportCached.filter(function(row){
	          if(row['Request Status'] == 'Pending')
	            return true;
	        });
	      if(data.length < myutil.pageSize)
	        myutil.pageEnd = data.length;
	      myutil.reportFiltered = data;
	      myutil.count = data.length;  
	      myutil.report = data.slice(0,myutil.pageSize);
	      myutil.isProcessing = false;
	    },
		clearFilter : function(){
	    	myutil.reportFiltered = '';
			myutil.count = 0;
			myutil.pageStart = 0;
			myutil.pageSize = 50;
			myutil.pageEnd = 50;
			myutil.isNewFilter = 0;
	    },
	    matchrowData : function(row, searchVal){
	    	try{
		    	if(row['Request Number']){
					if(row['Request Number'].match(searchVal))
					return true;
				}
				if(row['Fulfilment Ticket']){
				  if(row['Fulfilment Ticket'].match(searchVal))
				    return true;
				}
				if(row['Request Status']){
				  if(row['Request Status'].match(searchVal))
				    return true;
				}
				if(row['Fulfilment Ticket Status']){
				  if(row['Fulfilment Ticket Status'].match(searchVal))
				    return true;
				}
				if(row['Assigned To']){
				  if(row['Assigned To'].match(searchVal))
				    return true;
				}
				if(row['Priority']){
				  if(row['Priority'].match(searchVal))
				    return true;
				}
				if(row['Brand']){
				  if(row['Brand'].match(searchVal))
				    return true;
				}
				if(row['Created Date']){
				  if(row['Created Date'].match(searchVal))
				    return true;
				}
				if(row['Last Modified Date']){
				  if(row['Last Modified Date'].match(searchVal))
				    return true;
				}
				if(row['Region']){
				  if(row['Region'].match(searchVal))
				    return true;
				}
				if(row['Website URL']){
				  if(row['Website URL'].match(searchVal))
				    return true;
				}
				if(row['Triaged Type']){
				  if(row['Triaged Type'].match(searchVal))
				    return true;
				}
				if(row['Subject/Summary']){
				  if(row['Subject/Summary'].match(searchVal))
				    return true;
				}
				if(row['Description/Notes']){
				  if(row['Description/Notes'].match(searchVal))
				    return true;
				}

			}catch(e){
		        return false;
		    }
			
	    },
	    matchrowDataByRequester : function(row, searchVal){
	    	try{
		    	
				if(row['Requested By']){
				  if(row['Requested By'].match(searchVal))
				    return true;
				}
				if(row['Requester Email']){
				  if(row['Requester Email'].match(searchVal))
				    return true;
				}
				
			}catch(e){
		        return false;
		    }
			
	    },
	    matchMapingData : function(row, searchVal){
	    	if(row['Site URL']){
				if(row['Site URL'].match(searchVal))
				return true;
			}
			if(row['Brand']){
			  if(row['Brand'].match(searchVal))
			    return true;
			}
			if(row['Primary Owner']){
			  if(row['Primary Owner'].match(searchVal))
			    return true;
			}
			if(row['Secondry Owner']){
			  if(row['Secondry Owner'].match(searchVal))
			    return true;
			}
			if(row['URL Type']){
			  if(row['URL Type'].match(searchVal))
			    return true;
			}
			if(row['Site Status']){
			  if(row['Site Status'].match(searchVal))
			    return true;
			}
			if(row['Platform']){
			  if(row['Platform'].match(searchVal))
			    return true;
			}
			if(row['Country']){
			  if(row['Country'].match(searchVal))
			    return true;
			}
			
			return false;
	    },
	    getMaping : function(){
			deferred = $q.defer();
			var returnobject = {report:'', count:'',pageStart : '', pageEnd : '', reportCached : ''}
			var url;
			url =  myutil.urlBase + 'getMaping';
			
	        $http.get(url).success(function(data) {
	          data.sort(function(a,b){
	              var sortStatus = 0;
	              if (a['Primary Owner'] < b['Primary Owner']) {
	                  sortStatus = -1;
	              } else if (a['Primary Owner'] > b['Primary Owner']) {
	                      sortStatus = 1;
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
	          myutil.reportCached = parseddata;

	          myutil.reportFiltered = '';
		      returnobject.count = myutil.reportCached.length;
		      myutil.count = myutil.reportCached.length;
		      myutil.isNewFilter = 0;
		      
	          myutil.report = parseddata.slice(0,myutil.pageSize);
	          returnobject.report = parseddata.slice(0,myutil.pageSize);
	          returnobject.reportCached = myutil.reportCached;
	          //myutil.count = myutil.reportCached.length;
	          //parseddata = parseddata.slice(0,myutil.pageSize);
	          myutil.pageStart = 0;
	          returnobject.pageStart = 0;
	          if(myutil.pageEnd > myutil.count){
		         myutil.pageEnd = myutil.count;
		         returnobject.pageEnd = myutil.count;
		     }else{
		     	myutil.pageEnd = myutil.pageSize;
		     	returnobject.pageEnd = myutil.pageSize;
		     }
		     //To resolve the callback before the promise of
	          //returning the value to the calling function
	          deferred.resolve(returnobject);
	        }).error(function(){
          		deferred.reject();
       		});
       		//Return the promise and not the value
       		//promise to resolve the callback value
       		return deferred.promise;
	    },
	};
	return myutil;
});