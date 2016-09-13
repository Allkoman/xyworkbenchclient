/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';


var entitySearchExperimentModule = angular.module('XYWorkbench.SearchExperiment');
entitySearchExperimentModule.controller('SearchExperimentCtrl',
        function ($log, GetExperimentDataByPageWS, ExperimentCountWS, BackendAddr,
                GetExperimentDataByFilterWS,
                ExperimentCountByFilterWS,
                GetTaxonsByFilterForExperimentWS,
                GetTaxonsCountByFilterForExperimentWS,
                GetTypeByFilterForExperimentWS,
                GetTypeCountByFilterForExperimentWS,
                GetStrategyByFilterForExperimentWS,
                GetStrategyCountByFilterForExperimentWS,
                GetSourceByFilterForExperimentWS,
                GetSourceCountByFilterForExperimentWS,
                GetSelectionByFilterForExperimentWS,
                GetSelectionCountByFilterForExperimentWS,
                GetSubmitterByFilterForExperimentWS,
                GetSubmitterCountByFilterForExperimentWS,
                GetInstrumentByFilterForExperimentWS,
                GetInstrumentCountByFilterForExperimentWS,
                $uibModal, Experiments, $scope, GETOriganismByacc, GETSubmitterByacc,
                ISDEBUG) {
            var SearchExperimentCtrl = this;
            SearchExperimentCtrl.BackendAddr = BackendAddr;
            SearchExperimentCtrl.pageSize = 5;
            SearchExperimentCtrl.is_debug = ISDEBUG;
            SearchExperimentCtrl.searchInputStr = "";
            SearchExperimentCtrl.searchInputObj = {};

            SearchExperimentCtrl.taxonsCount = 0;
            SearchExperimentCtrl.taxonsChose = [];//[{taxonid:20}];
            SearchExperimentCtrl.isOrgOpen = false;
            SearchExperimentCtrl.taxonLeftList = {};
            SearchExperimentCtrl.taxonChoseIds = [];

            SearchExperimentCtrl.typeCount = 0;
            SearchExperimentCtrl.typeChose = [];//[{typeid:20}];
            SearchExperimentCtrl.isTyOpen = false;
            SearchExperimentCtrl.typeLeftList = {};
            SearchExperimentCtrl.typeChoseIds = [];

            SearchExperimentCtrl.strategyCount = 0;
            SearchExperimentCtrl.strategyChose = [];//[{strategyid:20}];
            SearchExperimentCtrl.isStOpen = false;
            SearchExperimentCtrl.strategyLeftList = {};
            SearchExperimentCtrl.strategyChoseIds = [];

            SearchExperimentCtrl.sourceCount = 0;
            SearchExperimentCtrl.sourceChose = [];//[{sourceid:20}];
            SearchExperimentCtrl.isScOpen = false;
            SearchExperimentCtrl.sourceLeftList = {};
            SearchExperimentCtrl.sourceChoseIds = [];

            SearchExperimentCtrl.selectionCount = 0;
            SearchExperimentCtrl.selectionChose = [];//[{selectionid:20}];
            SearchExperimentCtrl.isSeOpen = false;
            SearchExperimentCtrl.selectionLeftList = {};
            SearchExperimentCtrl.selectionChoseIds = [];

            SearchExperimentCtrl.submitterCount = 0;
            SearchExperimentCtrl.submitterChose = [];//[{submitterid:20}];
            SearchExperimentCtrl.isSbOpen = false;
            SearchExperimentCtrl.submitterLeftList = {};
            SearchExperimentCtrl.submitterChoseIds = [];

            SearchExperimentCtrl.instrumentCount = 0;
            SearchExperimentCtrl.instrumentChose = [];//[{instrumentid:20}];
            SearchExperimentCtrl.isInOpen = false;
            SearchExperimentCtrl.instrumentLeftList = {};
            SearchExperimentCtrl.instrumentChoseIds = [];
            SearchExperimentCtrl.current = 1;
            SearchExperimentCtrl.taxonLoadList = {};
            SearchExperimentCtrl.OrganismList = [];
            SearchExperimentCtrl.OrganismShow = {};
            SearchExperimentCtrl.Organism;
            SearchExperimentCtrl.Submitter;


            var strtrim = function (str_in) {
                return str_in.replace(/(^\s*)|(\s*$)/g, "");
            };


            $log.log('Loaded SearchExperimentCtrl');

            SearchExperimentCtrl.delExperiment = function (tar_experimentId, tar_index) {
                $log.log('Del id:' + tar_experimentId + ' index:' + tar_index);
                Experiments.delete({id: tar_experimentId}, function () {
                    $log.log('After Del');
                    SearchExperimentCtrl.curPageItems.splice(tar_index, 1);
                });
            };
            SearchExperimentCtrl.filterParams = {
                "wildcard": SearchExperimentCtrl.searchInputStr,
                "pagenum": SearchExperimentCtrl.current,
                "pagesize": SearchExperimentCtrl.pageSize,
                "taxonlist": [],
                "typelist": [],
                "strategylist": [],
                "sourcelist": [],
                "selectionlist": [],
                "submitterlist": [],
                "instrumentlist": [],
                "accessionlist": []
            };

            $log.log('into');
            var SearchExperimentCtrl = this;
            $log.log("SearchExperimentCtrl Loaded");
            var LoadFirstPage = function () {
                $log.log('Load first page for experiment');

                SearchExperimentCtrl.curPageItems = GetExperimentDataByPageWS.list(
                        {pagenum: '1', pagesize: SearchExperimentCtrl.pageSize}, {},
                        function (responseObj) {
                            $log.log('recieve remote response:' + responseObj);

//get Organism and Submitter from service
                            SearchExperimentCtrl.OrganismList = [];
                            SearchExperimentCtrl.taxonLoadList = {};
                            if (responseObj != null && responseObj.length != null) {
                                for (var i = 0; i < responseObj.length; i++) {
                                    SearchExperimentCtrl.taxonLoadList = responseObj[i];
                                    var json = SearchExperimentCtrl.taxonLoadList;
                                    var obj = angular.fromJson(json);
                                    SearchExperimentCtrl.OrganismList[i] = obj.experimentAccession;
                                    $log.log('Loadfirstpage organism');
                                }
                            }//get experimentAccession by json
                            SearchExperimentCtrl.Organism = [];
                            var filteraccession = {};
                            for (var j = 0; j < SearchExperimentCtrl.OrganismList.length; j++) {
                                var filteraccession = {accessionlist: SearchExperimentCtrl.OrganismList[j]};
                                SearchExperimentCtrl.Organism[j] = GETOriganismByacc.list({},
                                        filteraccession, function (responseObj) {
                                            $log.log('recieve remote response:' + responseObj);
                                        });
                                $log.log(SearchExperimentCtrl.Organism);
                            }//get taxonnamejson by experimentAccession
                            SearchExperimentCtrl.Submitter = [];
                            var filterexperiment = {};
                            for (var j = 0; j < SearchExperimentCtrl.OrganismList.length; j++) {
                                var filterexperiment = {accessionlist: SearchExperimentCtrl.OrganismList[j]};
                                SearchExperimentCtrl.Submitter[j] = GETSubmitterByacc.list({},
                                        filterexperiment, function (responseObj) {
                                            $log.log('recieve remote response:' + responseObj);
                                        });
                            }//get taxonnamejson by experimentAccession
                            $scope.GetTaxonname = function (accession) {
                            
                                return SearchExperimentCtrl.Organism[accession];
                            }//show taxon name on web                          
                            $scope.GetSubmittername = function (accession) {
                            
                                return SearchExperimentCtrl.Submitter[accession];
                            }//show submitter name on web
//get Organism and Submitter from service
                        });
                ExperimentCountWS.count(
                        {},
                        function (responseObj) {
                            SearchExperimentCtrl.count = responseObj.value;
                            $log.log("count response:" + responseObj);
                        });

                SearchExperimentCtrl.taxonsList = GetTaxonsByFilterForExperimentWS.gettaxons(
                        {}, //SearchExperimentCtrl.filterParams,
                        {
                            "wildcard": "",
                            "pagenum": 1,
                            "pagesize": 5
                        },
                        function (responseObj) {
                            $log.log('onSearch receive taxons for experiment filter');
                            SearchExperimentCtrl.taxonLeftList = {};
                            if (responseObj != null && responseObj.length != null) {
                                for (var i = 0; i < responseObj.length; i++) {
                                    SearchExperimentCtrl.taxonLeftList[responseObj[i].taxonid] = responseObj[i];
                                }
                            }
                        });

                SearchExperimentCtrl.typeList = GetTypeByFilterForExperimentWS.gettype(
                        {}, //SearchExperimentCtrl.filterParams,
                        {
                            "wildcard": "",
                            "pagenum": 1,
                            "pagesize": 5
                        },
                        function (responseObj) {
                            $log.log('onSearch receive type for experiment filter');
                            SearchExperimentCtrl.typeLeftList = {};
                            if (responseObj != null && responseObj.length != null) {
                                for (var i = 0; i < responseObj.length; i++) {
                                    SearchExperimentCtrl.typeLeftList[responseObj[i].typename] = responseObj[i];
                                }
                            }
                        });

                SearchExperimentCtrl.strategyList = GetStrategyByFilterForExperimentWS.getstrategy(
                        {}, //SearchExperimentCtrl.filterParams,
                        {
                            "wildcard": "",
                            "pagenum": 1,
                            "pagesize": 5
                        },
                        function (responseObj) {
                            $log.log('onSearch receive strategy for experiment filter');
                            SearchExperimentCtrl.strategyLeftList = {};
                            if (responseObj != null && responseObj.length != null) {
                                for (var i = 0; i < responseObj.length; i++) {
                                    SearchExperimentCtrl.strategyLeftList[responseObj[i].strategyname] = responseObj[i];
                                }
                            }
                        });
                SearchExperimentCtrl.sourceList = GetSourceByFilterForExperimentWS.getsource(
                        {}, //SearchExperimentCtrl.filterParams,
                        {
                            "wildcard": "",
                            "pagenum": 1,
                            "pagesize": 5
                        },
                        function (responseObj) {
                            $log.log('onSearch receive source for experiment filter');
                            SearchExperimentCtrl.sourceLeftList = {};
                            if (responseObj != null && responseObj.length != null) {
                                for (var i = 0; i < responseObj.length; i++) {
                                    SearchExperimentCtrl.sourceLeftList[responseObj[i].sourcename] = responseObj[i];
                                }
                            }
                        });

                SearchExperimentCtrl.selectionList = GetSelectionByFilterForExperimentWS.getselection(
                        {}, //SearchExperimentCtrl.filterParams,
                        {
                            "wildcard": "",
                            "pagenum": 1,
                            "pagesize": 5
                        },
                        function (responseObj) {
                            $log.log('onSearch receive selection for experiment filter');
                            SearchExperimentCtrl.selectionLeftList = {};
                            if (responseObj != null && responseObj.length != null) {
                                for (var i = 0; i < responseObj.length; i++) {
                                    SearchExperimentCtrl.selectionLeftList[responseObj[i].selectionname] = responseObj[i];
                                }
                            }
                        });

                SearchExperimentCtrl.submitterList = GetSubmitterByFilterForExperimentWS.getsubmitter(
                        {}, //SearchExperimentCtrl.filterParams,
                        {
                            "wildcard": "",
                            "pagenum": 1,
                            "pagesize": 5
                        },
                        function (responseObj) {
                            $log.log('onSearch receive submitter for experiment filter');
                            SearchExperimentCtrl.submitterLeftList = {};
                            if (responseObj != null && responseObj.length != null) {
                                for (var i = 0; i < responseObj.length; i++) {
                                    SearchExperimentCtrl.submitterLeftList[responseObj[i].submittername] = responseObj[i];
                                }
                            }
                        });

                SearchExperimentCtrl.instrumentList = GetInstrumentByFilterForExperimentWS.getinstrument(
                        {}, //SearchExperimentCtrl.filterParams,
                        {
                            "wildcard": "",
                            "pagenum": 1,
                            "pagesize": 5
                        },
                        function (responseObj) {
                            $log.log('onSearch receive instrument for experiment filter');
                            SearchExperimentCtrl.instrumentLeftList = {};
                            if (responseObj != null && responseObj.length != null) {
                                for (var i = 0; i < responseObj.length; i++) {
                                    SearchExperimentCtrl.instrumentLeftList[responseObj[i].instrumentname] = responseObj[i];
                                }
                            }
                        });

                GetTaxonsCountByFilterForExperimentWS.count({},
                        {
                            "wildcard": "",
                            "pagenum": 1,
                            "pagesize": 5
                        },
                        function (responseObj) {
                            SearchExperimentCtrl.taxonsCount = responseObj.value;
                            $log.log('receive response for taxonsCount:' + responseObj);
                        });


                GetTypeCountByFilterForExperimentWS.count({},
                        {
                            "wildcard": "",
                            "pagenum": 1,
                            "pagesize": 5
                        },
                        function (responseObj) {
                            SearchExperimentCtrl.typeCount = responseObj.value;
                            $log.log('receive response for typeCount:' + responseObj);
                        });

                GetStrategyCountByFilterForExperimentWS.count({},
                        {
                            "wildcard": "",
                            "pagenum": 1,
                            "pagesize": 5
                        },
                        function (responseObj) {
                            SearchExperimentCtrl.strategyCount = responseObj.value;
                            $log.log('receive response for strategyCount:' + responseObj);
                        });

                GetSourceCountByFilterForExperimentWS.count({},
                        {
                            "wildcard": "",
                            "pagenum": 1,
                            "pagesize": 5
                        },
                        function (responseObj) {
                            SearchExperimentCtrl.sourceCount = responseObj.value;
                            $log.log('receive response for sourceCount:' + responseObj);
                        });

                GetSelectionCountByFilterForExperimentWS.count({},
                        {
                            "wildcard": "",
                            "pagenum": 1,
                            "pagesize": 5
                        },
                        function (responseObj) {
                            SearchExperimentCtrl.selectionCount = responseObj.value;
                            $log.log('receive response for selectionCount:' + responseObj);
                        });

                GetSubmitterCountByFilterForExperimentWS.count({},
                        {
                            "wildcard": "",
                            "pagenum": 1,
                            "pagesize": 5
                        },
                        function (responseObj) {
                            SearchExperimentCtrl.submitterCount = responseObj.value;
                            $log.log('receive response for submitterCount:' + responseObj);
                        });

                GetInstrumentCountByFilterForExperimentWS.count({},
                        {
                            "wildcard": "",
                            "pagenum": 1,
                            "pagesize": 5
                        },
                        function (responseObj) {
                            SearchExperimentCtrl.instrumentCount = responseObj.value;
                            $log.log('receive response for instrumentCount:' + responseObj);
                        });



            };

            LoadFirstPage();

            SearchExperimentCtrl.onSearch = function (searchVal) {
                $log.log('onSearch:' + searchVal);
                SearchExperimentCtrl.searchInputObj = searchVal;

                SearchExperimentCtrl.filterParams.taxonlist = [];
                SearchExperimentCtrl.taxonChoseIds = [];
                SearchExperimentCtrl.taxonsChose = [];

                SearchExperimentCtrl.filterParams.typelist = [];
                SearchExperimentCtrl.typeChoseIds = [];
                SearchExperimentCtrl.typeChose = [];

                SearchExperimentCtrl.filterParams.strategylist = [];
                SearchExperimentCtrl.strategyChoseIds = [];
                SearchExperimentCtrl.strategyChose = [];

                SearchExperimentCtrl.filterParams.sourcelist = [];
                SearchExperimentCtrl.sourceChoseIds = [];
                SearchExperimentCtrl.sourceChose = [];

                SearchExperimentCtrl.filterParams.selectionlist = [];
                SearchExperimentCtrl.selectionChoseIds = [];
                SearchExperimentCtrl.selectionChose = [];

                SearchExperimentCtrl.filterParams.submitterlist = [];
                SearchExperimentCtrl.submitterChoseIds = [];
                SearchExperimentCtrl.submitterChose = [];

                SearchExperimentCtrl.filterParams.instrumentlist = [];
                SearchExperimentCtrl.instrumentChoseIds = [];
                SearchExperimentCtrl.instrumentChose = [];
                if (searchVal) {
                    $log.log('onSearch:' + searchVal.originalObject.wordscol);
                    var searchStr = strtrim(searchVal.originalObject.wordscol);
                    SearchExperimentCtrl.searchInputStr = searchStr;
                    $log.log('val:' + searchVal.originalObject.sacwords);
                    $log.log('after trim:' + searchStr);
                    if (searchStr === "") {
                        LoadFirstPage();
                    } else {
                        SearchExperimentCtrl.filterParams.wildcard = searchStr;
                        SearchExperimentCtrl.curPageItems = GetExperimentDataByFilterWS.list(
                                SearchExperimentCtrl.filterParams,
                                function (responseObj) {
                                    $log.log('onSearch recieve remote response on items:' + responseObj);
                                });

                        SearchExperimentCtrl.taxonsList = GetTaxonsByFilterForExperimentWS.gettaxons(
                                {}, //SearchExperimentCtrl.filterParams,
                                {
                                    "wildcard": SearchExperimentCtrl.searchInputStr,
                                    "pagenum": 1,
                                    "pagesize": 5
                                },
                                function (responseObj) {
                                    $log.log('onSearch receive taxons for experiment filter');
                                    SearchExperimentCtrl.taxonLeftList = {};
                                    if (responseObj != null && responseObj.length != null) {
                                        for (var i = 0; i < responseObj.length; i++) {
                                            SearchExperimentCtrl.taxonLeftList[responseObj[i].taxonid] = responseObj[i];
                                        }
                                    }
                                });


                        SearchExperimentCtrl.typeList = GetTypeByFilterForExperimentWS.gettype(
                                {}, //SearchExperimentCtrl.filterParams,
                                {
                                    "wildcard": SearchExperimentCtrl.searchInputStr,
                                    "pagenum": 1,
                                    "pagesize": 5
                                },
                                function (responseObj) {
                                    $log.log('onSearch receive type for experiment filter');
                                    SearchExperimentCtrl.typeLeftList = {};
                                    if (responseObj != null && responseObj.length != null) {
                                        for (var i = 0; i < responseObj.length; i++) {
                                            SearchExperimentCtrl.typeLeftList[responseObj[i].typeid] = responseObj[i];
                                        }
                                    }
                                });

                        SearchExperimentCtrl.strategyList = GetStrategyByFilterForExperimentWS.getstrategy(
                                {}, //SearchExperimentCtrl.filterParams,
                                {
                                    "wildcard": SearchExperimentCtrl.searchInputStr,
                                    "pagenum": 1,
                                    "pagesize": 5
                                },
                                function (responseObj) {
                                    $log.log('onSearch receive strategy for experiment filter');
                                    SearchExperimentCtrl.strategyLeftList = {};
                                    if (responseObj != null && responseObj.length != null) {
                                        for (var i = 0; i < responseObj.length; i++) {
                                            SearchExperimentCtrl.strategyLeftList[responseObj[i].strategyid] = responseObj[i];
                                        }
                                    }
                                });

                        SearchExperimentCtrl.sourceList = GetSourceByFilterForExperimentWS.getsource(
                                {}, //SearchExperimentCtrl.filterParams,
                                {
                                    "wildcard": SearchExperimentCtrl.searchInputStr,
                                    "pagenum": 1,
                                    "pagesize": 5
                                },
                                function (responseObj) {
                                    $log.log('onSearch receive source for experiment filter');
                                    SearchExperimentCtrl.sourceLeftList = {};
                                    if (responseObj != null && responseObj.length != null) {
                                        for (var i = 0; i < responseObj.length; i++) {
                                            SearchExperimentCtrl.sourceLeftList[responseObj[i].sourceid] = responseObj[i];
                                        }
                                    }
                                });

                        SearchExperimentCtrl.selectionList = GetSelectionByFilterForExperimentWS.getselection(
                                {}, //SearchExperimentCtrl.filterParams,
                                {
                                    "wildcard": SearchExperimentCtrl.searchInputStr,
                                    "pagenum": 1,
                                    "pagesize": 5
                                },
                                function (responseObj) {
                                    $log.log('onSearch receive selection for experiment filter');
                                    SearchExperimentCtrl.selectionLeftList = {};
                                    if (responseObj != null && responseObj.length != null) {
                                        for (var i = 0; i < responseObj.length; i++) {
                                            SearchExperimentCtrl.selectionLeftList[responseObj[i].selectionid] = responseObj[i];
                                        }
                                    }
                                });

                        SearchExperimentCtrl.submitterList = GetSubmitterByFilterForExperimentWS.getsubmitter(
                                {}, //SearchExperimentCtrl.filterParams,
                                {
                                    "wildcard": SearchExperimentCtrl.searchInputStr,
                                    "pagenum": 1,
                                    "pagesize": 5
                                },
                                function (responseObj) {
                                    $log.log('onSearch receive submitter for experiment filter');
                                    SearchExperimentCtrl.submitterLeftList = {};
                                    if (responseObj != null && responseObj.length != null) {
                                        for (var i = 0; i < responseObj.length; i++) {
                                            SearchExperimentCtrl.submitterLeftList[responseObj[i].submitterid] = responseObj[i];
                                        }
                                    }
                                });

                        SearchExperimentCtrl.instrumentList = GetInstrumentByFilterForExperimentWS.getinstrument(
                                {}, //SearchExperimentCtrl.filterParams,
                                {
                                    "wildcard": SearchExperimentCtrl.searchInputStr,
                                    "pagenum": 1,
                                    "pagesize": 5
                                },
                                function (responseObj) {
                                    $log.log('onSearch receive instrument for experiment filter');
                                    SearchExperimentCtrl.instrumentLeftList = {};
                                    if (responseObj != null && responseObj.length != null) {
                                        for (var i = 0; i < responseObj.length; i++) {
                                            SearchExperimentCtrl.instrumentLeftList[responseObj[i].instrumentid] = responseObj[i];
                                        }
                                    }
                                });

                        SearchExperimentCtrl.taxonsCount = 0;
                        GetTaxonsCountByFilterForExperimentWS.count({},
                                {
                                    "wildcard": SearchExperimentCtrl.searchInputStr
                                },
                                function (responseObj) {
                                    SearchExperimentCtrl.taxonsCount = responseObj.value;
                                    $log.log('receive response for taxonsCount:' + responseObj);
                                });

                        SearchExperimentCtrl.typeCount = 0;
                        GetTypeCountByFilterForExperimentWS.count({},
                                {
                                    "wildcard": SearchExperimentCtrl.searchInputStr
                                },
                                function (responseObj) {
                                    SearchExperimentCtrl.typeCount = responseObj.value;
                                    $log.log('receive response for typeCount:' + responseObj);
                                });

                        SearchExperimentCtrl.strategyCount = 0;
                        GetStrategyCountByFilterForExperimentWS.count({},
                                {
                                    "wildcard": SearchExperimentCtrl.searchInputStr
                                },
                                function (responseObj) {
                                    SearchExperimentCtrl.strategyCount = responseObj.value;
                                    $log.log('receive response for strategyCount:' + responseObj);
                                });

                        SearchExperimentCtrl.sourceCount = 0;
                        GetSourceCountByFilterForExperimentWS.count({},
                                {
                                    "wildcard": SearchExperimentCtrl.searchInputStr
                                },
                                function (responseObj) {
                                    SearchExperimentCtrl.sourceCount = responseObj.value;
                                    $log.log('receive response for sourceCount:' + responseObj);
                                });

                        SearchExperimentCtrl.selectionCount = 0;
                        GetSelectionCountByFilterForExperimentWS.count({},
                                {
                                    "wildcard": SearchExperimentCtrl.searchInputStr
                                },
                                function (responseObj) {
                                    SearchExperimentCtrl.selectionCount = responseObj.value;
                                    $log.log('receive response for selectionCount:' + responseObj);
                                });

                        SearchExperimentCtrl.submitterCount = 0;
                        GetSubmitterCountByFilterForExperimentWS.count({},
                                {
                                    "wildcard": SearchExperimentCtrl.searchInputStr
                                },
                                function (responseObj) {
                                    SearchExperimentCtrl.submitterCount = responseObj.value;
                                    $log.log('receive response for submitterCount:' + responseObj);
                                });

                        SearchExperimentCtrl.instrumentCount = 0;
                        GetInstrumentCountByFilterForExperimentWS.count({},
                                {
                                    "wildcard": SearchExperimentCtrl.searchInputStr
                                },
                                function (responseObj) {
                                    SearchExperimentCtrl.instrumentCount = responseObj.value;
                                    $log.log('receive response for instrumentCount:' + responseObj);
                                });

                        ExperimentCountByFilterWS.count(SearchExperimentCtrl.filterParams,
                                function (responseObj) {
                                    SearchExperimentCtrl.count = responseObj.value;
                                    $log.log('onSearch receive remote resposne on count:' + responseObj);
                                }
                        );

                    }//end else searchStr === ""
                }//end if searchVal
            };//end onSearch

            SearchExperimentCtrl.pageChanged = function () {
                /*
                 if(searchStr === ""){
                 SearchRsltListCtrl.curPageItems = ListAnnotationWS.itemsByPage(
                 {pagenum:SearchRsltListCtrl.currentPage,
                 pagesize:SearchRsltListCtrl.pageSize},{},
                 function(response){
                 $log.log('init get page '+ SearchRsltListCtrl.currentPage);
                 }
                 );
                 }else{
                 SearchRsltListCtrl.curPageItems = ListAnnotationByWildcardWS.itemsByPage(
                 {wildcard: searchStr,
                 pagenum:  SearchRsltListCtrl.currentPage,
                 pagesize: SearchRsltListCtrl.pageSize},{},
                 function(response){
                 $log.log('['+searchStr+']get page '+ SearchRsltListCtrl.currentPage);
                 }
                 );
                 }
                 /*
                 $log.log("onPageChanged for page[" + SearchExperimentCtrl.currentPage + "]");
                 
                 SearchExperimentCtrl.filterParamObj.pagenum = SearchRsltListCtrl.currentPage;// = filterParams;
                 SearchExperimentCtrl.curPageItems = SearchByParamsWS.search(
                 SearchRsltListCtrl.filterParamObj,
                 function (response) {
                 $log.log("onPageChanged: receive response from server for page[" +
                 SearchRsltListCtrl.currentPage + "]");
                 });
                 */
                SearchExperimentCtrl.filterParams.pagenum = SearchExperimentCtrl.currentPage;
                SearchExperimentCtrl.curPageItems = GetExperimentDataByFilterWS.list(
                        SearchExperimentCtrl.filterParams,
                        function (responseObj) {
                            $log.log('onSearch recieve remote response on items:' + responseObj);
                            //get Organism and Submitter from service
                            SearchExperimentCtrl.OrganismList = [];
                            SearchExperimentCtrl.taxonLoadList = {};
                            if (responseObj != null && responseObj.length != null) {
                                for (var i = 0; i < responseObj.length; i++) {
                                    SearchExperimentCtrl.taxonLoadList = responseObj[i];
                                    var json = SearchExperimentCtrl.taxonLoadList;
                                    var obj = angular.fromJson(json);
                                    SearchExperimentCtrl.OrganismList[i] = obj.experimentAccession;
                                    $log.log('Loadfirstpage organism');
                                }
                            }//get experimentAccession by json
                            SearchExperimentCtrl.Organism = [];
                            var filteraccession = {};
                            for (var j = 0; j < SearchExperimentCtrl.OrganismList.length; j++) {
                                var filteraccession = {accessionlist: SearchExperimentCtrl.OrganismList[j]};
                                SearchExperimentCtrl.Organism[j] = GETOriganismByacc.list({},
                                        filteraccession, function (responseObj) {
                                            $log.log('recieve remote response:' + responseObj);
                                        });
                                $log.log(SearchExperimentCtrl.Organism);
                            }//get taxonnamejson by experimentAccession
                            SearchExperimentCtrl.Submitter = [];
                            var filterexperiment = {};
                            for (var j = 0; j < SearchExperimentCtrl.OrganismList.length; j++) {
                                var filterexperiment = {accessionlist: SearchExperimentCtrl.OrganismList[j]};
                                SearchExperimentCtrl.Submitter[j] = GETSubmitterByacc.list({},
                                        filterexperiment, function (responseObj) {
                                            $log.log('recieve remote response:' + responseObj);
                                        });
                            }//get taxonnamejson by experimentAccession
                            $scope.GetTaxonname = function (accession) {
                            
                                return SearchExperimentCtrl.Organism[accession];
                            }//show taxon name on web                          
                            $scope.GetSubmittername = function (accession) {
                            
                                return SearchExperimentCtrl.Submitter[accession];
                            }//show submitter name on web
//get Organism and Submitter from service
                        }
                );

                ExperimentCountByFilterWS.count()
            };//end pageChanged

            SearchExperimentCtrl.openTaxonChooser = function () {
                var taxonChooserInst = $uibModal.open({
                    animation: true,
                    templateUrl: 'SearchStudy/tmpl/TaxonList4StudyChooser.html',
                    controller: 'TaxonList4StudyChooser',
                    size: 'lg',
                    resolve: {
                        TaxonWS: function () {
                            return GetTaxonsByFilterForExperimentWS;
                        },
                        TaxonCountWS: function () {
                            return GetTaxonsCountByFilterForExperimentWS;
                        },
                        TaxonChoseList: function () {
                            return SearchExperimentCtrl.taxonsChose;
                        },
                        TaxonLeftList: function () {
                            return SearchExperimentCtrl.taxonLeftList
                        },
                        StudyWildcard: function () {
                            return SearchExperimentCtrl.searchInputStr;
                        }
                    }//end resolve
                });//end taxonChooserInst def

                taxonChooserInst.result.then(function (resultTaxonList) {
                    SearchExperimentCtrl.taxonsChose = resultTaxonList;
                });//end taxonChooserInst reslt then
            };//end openTaxonChooser

            SearchExperimentCtrl.openTypeChooser = function () {
                var typeChooserInst = $uibModal.open({
                    animation: true,
                    templateUrl: 'SearchStudy/tmpl/TypeList4StudyChooser.html',
                    controller: 'TypeList4StudyChooser',
                    size: 'lg',
                    resolve: {
                        TypeWS: function () {
                            return GetTypeByFilterForExperimentWS;
                        },
                        TypeCountWS: function () {
                            return GetTypeCountByFilterForExperimentWS;
                        },
                        TypeChoseList: function () {
                            return SearchExperimentCtrl.typeChose;
                        },
                        TypeLeftList: function () {
                            return SearchExperimentCtrl.typeLeftList
                        },
                        StudyWildcard: function () {
                            return SearchExperimentCtrl.searchInputStr;
                        }
                    }//end resolve
                });//end typeChooserInst def

                typeChooserInst.result.then(function (resultTypeList) {
                    SearchExperimentCtrl.typeChose = resultTypeList;
                });//end typeChooserInst reslt then
            };//end openTypeChooser

            SearchExperimentCtrl.openStrategyChooser = function () {
                var strategyChooserInst = $uibModal.open({
                    animation: true,
                    templateUrl: 'SearchExperiment/tmpl/StrategyList4ExperimentChooser.html',
                    controller: 'StrategyList4ExperimentChooser',
                    size: 'lg',
                    resolve: {
                        StrategyWS: function () {
                            return GetStrategyByFilterForExperimentWS;
                        },
                        StrategyCountWS: function () {
                            return GetStrategyCountByFilterForExperimentWS;
                        },
                        StrategyChoseList: function () {
                            return SearchExperimentCtrl.strategyChose;
                        },
                        StrategyLeftList: function () {
                            return SearchExperimentCtrl.strategyLeftList
                        },
                        ExperimentWildcard: function () {
                            return SearchExperimentCtrl.searchInputStr;
                        }
                    }//end resolve
                });//end strategyChooserInst def

                strategyChooserInst.result.then(function (resultStrategyList) {
                    SearchExperimentCtrl.strategyChose = resultStrategyList;
                });//end strategyChooserInst reslt then
            };//end openStrategyChooser

            SearchExperimentCtrl.openSourceChooser = function () {
                var sourceChooserInst = $uibModal.open({
                    animation: true,
                    templateUrl: 'SearchExperiment/tmpl/SourceList4ExperimentChooser.html',
                    controller: 'SourceList4ExperimentChooser',
                    size: 'lg',
                    resolve: {
                        SourceWS: function () {
                            return GetSourceByFilterForExperimentWS;
                        },
                        SourceCountWS: function () {
                            return GetSourceCountByFilterForExperimentWS;
                        },
                        SourceChoseList: function () {
                            return SearchExperimentCtrl.sourceChose;
                        },
                        SourceLeftList: function () {
                            return SearchExperimentCtrl.sourceLeftList
                        },
                        ExperimentWildcard: function () {
                            return SearchExperimentCtrl.searchInputStr;
                        }
                    }//end resolve
                });//end sourceChooserInst def

                sourceChooserInst.result.then(function (resultSourceList) {
                    SearchExperimentCtrl.sourceChose = resultSourceList;
                });//end sourceChooserInst reslt then
            };//end openSourceChooser

            SearchExperimentCtrl.openSelectionChooser = function () {
                var selectionChooserInst = $uibModal.open({
                    animation: true,
                    templateUrl: 'SearchExperiment/tmpl/SelectionList4ExperimentChooser.html',
                    controller: 'SelectionList4ExperimentChooser',
                    size: 'lg',
                    resolve: {
                        SelectionWS: function () {
                            return GetSelectionByFilterForExperimentWS;
                        },
                        SelectionCountWS: function () {
                            return GetSelectionCountByFilterForExperimentWS;
                        },
                        SelectionChoseList: function () {
                            return SearchExperimentCtrl.selectionChose;
                        },
                        SelectionLeftList: function () {
                            return SearchExperimentCtrl.selectionLeftList
                        },
                        ExperimentWildcard: function () {
                            return SearchExperimentCtrl.searchInputStr;
                        }
                    }//end resolve
                });//end selectionChooserInst def

                selectionChooserInst.result.then(function (resultSelectionList) {
                    SearchExperimentCtrl.selectionChose = resultSelectionList;
                });//end selectionChooserInst reslt then
            };//end openSelectionChooser

            SearchExperimentCtrl.openSubmitterChooser = function () {
                var submitterChooserInst = $uibModal.open({
                    animation: true,
                    templateUrl: 'SearchStudy/tmpl/SubmitterList4StudyChooser.html',
                    controller: 'SubmitterList4StudyChooser',
                    size: 'lg',
                    resolve: {
                        SubmitterWS: function () {
                            return GetSubmitterByFilterForExperimentWS;
                        },
                        SubmitterCountWS: function () {
                            return GetSubmitterCountByFilterForExperimentWS;
                        },
                        SubmitterChoseList: function () {
                            return SearchExperimentCtrl.submitterChose;
                        },
                        SubmitterLeftList: function () {
                            return SearchExperimentCtrl.submitterLeftList
                        },
                        StudyWildcard: function () {
                            return SearchExperimentCtrl.searchInputStr;
                        }
                    }//end resolve
                });//end submitterChooserInst def

                submitterChooserInst.result.then(function (resultSubmitterList) {
                    SearchExperimentCtrl.submitterChose = resultSubmitterList;
                });//end submitterChooserInst reslt then
            };//end openSubmitterChooser

            SearchExperimentCtrl.openInstrumentChooser = function () {
                var instrumentChooserInst = $uibModal.open({
                    animation: true,
                    templateUrl: 'SearchStudy/tmpl/InstrumentList4StudyChooser.html',
                    controller: 'InstrumentList4StudyChooser',
                    size: 'lg',
                    resolve: {
                        InstrumentWS: function () {
                            return GetInstrumentByFilterForExperimentWS;
                        },
                        InstrumentCountWS: function () {
                            return GetInstrumentCountByFilterForExperimentWS;
                        },
                        InstrumentChoseList: function () {
                            return SearchExperimentCtrl.instrumentChose;
                        },
                        InstrumentLeftList: function () {
                            return SearchExperimentCtrl.instrumentLeftList
                        },
                        StudyWildcard: function () {
                            return SearchExperimentCtrl.searchInputStr;
                        }
                    }//end resolve
                });//end instrumentChooserInst def

                instrumentChooserInst.result.then(function (resultInstrumentList) {
                    SearchExperimentCtrl.instrumentChose = resultInstrumentList;
                });//end instrumentChooserInst reslt then
            };//end openInstrumentChooser

            SearchExperimentCtrl.onFilter = function () {
                //Generate the list for taxons
                $log.log("onFilter");
                var taxonIDList = [];
                for (var i = 0; i < SearchExperimentCtrl.taxonsChose.length; i++) {
                    taxonIDList.push(SearchExperimentCtrl.taxonsChose[i].taxonid);
                }
                SearchExperimentCtrl.taxonChoseIds = taxonIDList;
                SearchExperimentCtrl.filterParams.taxonlist = SearchExperimentCtrl.taxonChoseIds;

                var typeIDList = [];
                for (var i = 0; i < SearchExperimentCtrl.typeChose.length; i++) {
                    typeIDList.push(SearchExperimentCtrl.typeChose[i].typename);
                }
                SearchExperimentCtrl.typeChoseIds = typeIDList;
                SearchExperimentCtrl.filterParams.typelist = SearchExperimentCtrl.typeChoseIds;

                var strategyIDList = [];
                for (var i = 0; i < SearchExperimentCtrl.strategyChose.length; i++) {
                    strategyIDList.push(SearchExperimentCtrl.strategyChose[i].strategyname);
                }
                SearchExperimentCtrl.strategyChoseIds = strategyIDList;
                SearchExperimentCtrl.filterParams.strategylist = SearchExperimentCtrl.strategyChoseIds;

                var sourceIDList = [];
                for (var i = 0; i < SearchExperimentCtrl.sourceChose.length; i++) {
                    sourceIDList.push(SearchExperimentCtrl.sourceChose[i].sourcename);
                }
                SearchExperimentCtrl.sourceChoseIds = sourceIDList;
                SearchExperimentCtrl.filterParams.sourcelist = SearchExperimentCtrl.sourceChoseIds;

                var selectionIDList = [];
                for (var i = 0; i < SearchExperimentCtrl.selectionChose.length; i++) {
                    selectionIDList.push(SearchExperimentCtrl.selectionChose[i].selectionname);
                }
                SearchExperimentCtrl.selectionChoseIds = selectionIDList;
                SearchExperimentCtrl.filterParams.selectionlist = SearchExperimentCtrl.selectionChoseIds;

                var submitterIDList = [];
                for (var i = 0; i < SearchExperimentCtrl.submitterChose.length; i++) {
                    submitterIDList.push(SearchExperimentCtrl.submitterChose[i].submittername);
                }
                SearchExperimentCtrl.submitterChoseIds = submitterIDList;
                SearchExperimentCtrl.filterParams.submitterlist = SearchExperimentCtrl.submitterChoseIds;

                var instrumentIDList = [];
                for (var i = 0; i < SearchExperimentCtrl.instrumentChose.length; i++) {
                    instrumentIDList.push(SearchExperimentCtrl.instrumentChose[i].instrumentname);
                }
                SearchExperimentCtrl.instrumentChoseIds = instrumentIDList;
                SearchExperimentCtrl.filterParams.instrumentlist = SearchExperimentCtrl.instrumentChoseIds;


                SearchExperimentCtrl.filterParams.pagenum = SearchExperimentCtrl.current;

                SearchExperimentCtrl.curPageItems = GetExperimentDataByFilterWS.list(
                        SearchExperimentCtrl.filterParams,
                        function (responseObj) {
                            $log.log('onSearch recieve remote response on items:' + responseObj);
                            //get Organism and Submitter from service
                            SearchExperimentCtrl.OrganismList = [];
                            SearchExperimentCtrl.taxonLoadList = {};
                            if (responseObj != null && responseObj.length != null) {
                                for (var i = 0; i < responseObj.length; i++) {
                                    SearchExperimentCtrl.taxonLoadList = responseObj[i];
                                    var json = SearchExperimentCtrl.taxonLoadList;
                                    var obj = angular.fromJson(json);
                                    SearchExperimentCtrl.OrganismList[i] = obj.experimentAccession;
                                    $log.log('Loadfirstpage organism');
                                }
                            }//get experimentAccession by json
                            SearchExperimentCtrl.Organism = [];
                            var filteraccession = {};
                            for (var j = 0; j < SearchExperimentCtrl.OrganismList.length; j++) {
                                var filteraccession = {accessionlist: SearchExperimentCtrl.OrganismList[j]};
                                SearchExperimentCtrl.Organism[j] = GETOriganismByacc.list({},
                                        filteraccession, function (responseObj) {
                                            $log.log('recieve remote response:' + responseObj);
                                        });
                                $log.log(SearchExperimentCtrl.Organism);
                            }//get taxonnamejson by experimentAccession
                            SearchExperimentCtrl.Submitter = [];
                            var filterexperiment = {};
                            for (var j = 0; j < SearchExperimentCtrl.OrganismList.length; j++) {
                                var filterexperiment = {accessionlist: SearchExperimentCtrl.OrganismList[j]};
                                SearchExperimentCtrl.Submitter[j] = GETSubmitterByacc.list({},
                                        filterexperiment, function (responseObj) {
                                            $log.log('recieve remote response:' + responseObj);
                                        });
                            }//get taxonnamejson by experimentAccession
                            $scope.GetTaxonname = function (accession) {
                            
                                return SearchExperimentCtrl.Organism[accession];
                            }//show taxon name on web                          
                            $scope.GetSubmittername = function (accession) {
                            
                                return SearchExperimentCtrl.Submitter[accession];
                            }//show submitter name on web
//get Organism and Submitter from service
                        }
                );


                ExperimentCountByFilterWS.count(SearchExperimentCtrl.filterParams,
                        function (responseObj) {
                            SearchExperimentCtrl.count = responseObj.value;
                            $log.log('onSearch receive remote resposne on count:' + responseObj);
                        }
                );
            }
            ; //end onFilter
        }
);



