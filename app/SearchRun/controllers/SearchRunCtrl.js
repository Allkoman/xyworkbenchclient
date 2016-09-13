/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';


var entitySearchRunModule = angular.module('XYWorkbench.SearchRun');
entitySearchRunModule.controller('SearchRunCtrl',
        function ($log, GetRunDataByPageWS, RunCountWS, BackendAddr,
                GetRunDataByFilterWS, RunCountByFilterWS,
                GetTaxonsByFilterForRunWS,
                GetTaxonsCountByFilterForRunWS,
                GetSubmitterByFilterForRunWS,
                GetSubmitterCountByFilterForRunWS,
                GetInstrumentByFilterForRunWS,
                GetInstrumentCountByFilterForRunWS,
                $uibModal, Runs, $scope, GETRunOrganismByacc, GETStudiesByacc, GETRunAliasByacc,
                ISDEBUG) {
            var SearchRunCtrl = this;
            SearchRunCtrl.BackendAddr = BackendAddr;
            SearchRunCtrl.pageSize = 5;
            SearchRunCtrl.is_debug = ISDEBUG;
            SearchRunCtrl.searchInputStr = "";
            SearchRunCtrl.searchInputObj = {};
            SearchRunCtrl.taxonsCount = 0;
            SearchRunCtrl.taxonsChose = [];//[{taxonid:20}];
            SearchRunCtrl.isOrgOpen = false;
            SearchRunCtrl.taxonLeftList = {};
            SearchRunCtrl.taxonChoseIds = [];
            SearchRunCtrl.submitterCount = 0;
            SearchRunCtrl.submitterChose = [];//[{submitterid:20}];
            SearchRunCtrl.isSbOpen = false;
            SearchRunCtrl.submitterLeftList = {};
            SearchRunCtrl.submitterChoseIds = [];

            SearchRunCtrl.instrumentCount = 0;
            SearchRunCtrl.instrumentChose = [];//[{instrumentid:20}];
            SearchRunCtrl.isInOpen = false;
            SearchRunCtrl.instrumentLeftList = {};
            SearchRunCtrl.instrumentChoseIds = [];
            SearchRunCtrl.current = 1;
            SearchRunCtrl.taxonLoadList = {};
            SearchRunCtrl.OrganismList = [];
            SearchRunCtrl.OrganismShow = {};
            SearchRunCtrl.Organism;
            SearchRunCtrl.Stuides;
            SearchRunCtrl.Alias;

            var strtrim = function (str_in) {
                return str_in.replace(/(^\s*)|(\s*$)/g, "");
            };


            $log.log('Loaded SearchRunCtrl');

            SearchRunCtrl.delRun = function (tar_runId, tar_index) {
                $log.log('Del id:' + tar_runId + ' index:' + tar_index);
                Runs.delete({id: tar_runId}, function () {
                    $log.log('After Del');
                    SearchRunCtrl.curPageItems.splice(tar_index, 1);
                });
            };
            SearchRunCtrl.filterParams = {
                "wildcard": SearchRunCtrl.searchInputStr,
                "pagenum": SearchRunCtrl.current,
                "pagesize": SearchRunCtrl.pageSize,
                "taxonlist": [],
                "submitterlist": [],
                "instrumentlist": [],
                "accessionlist": []
            };

            $log.log('into');
            var SearchRunCtrl = this;
            $log.log("SearchRunCtrl Loaded");
            var LoadFirstPage = function () {
                $log.log('Load first page for run');

                SearchRunCtrl.curPageItems = GetRunDataByPageWS.list(
                        {pagenum: '1', pagesize: SearchRunCtrl.pageSize}, {},
                        function (responseObj) {
                            $log.log('recieve remote response:' + responseObj);
                            //get Organism and Studies from service
                            SearchRunCtrl.OrganismList = [];
                            SearchRunCtrl.taxonLoadList = {};
                            if (responseObj != null && responseObj.length != null) {
                                for (var i = 0; i < responseObj.length; i++) {
                                    SearchRunCtrl.taxonLoadList = responseObj[i];
                                    var json = SearchRunCtrl.taxonLoadList;
                                    var obj = angular.fromJson(json);
                                    SearchRunCtrl.OrganismList[i] = obj.runAccession;
                                    $log.log('Loadfirstpage organism');
                                }
                            }//get runAccession by json
                            SearchRunCtrl.Organism = [];
                            var filteraccession = {};
                            for (var j = 0; j < SearchRunCtrl.OrganismList.length; j++) {
                                var filteraccession = {accessionlist: SearchRunCtrl.OrganismList[j]};
                                SearchRunCtrl.Organism[j] = GETRunOrganismByacc.list({},
                                        filteraccession, function (responseObj) {
                                            $log.log('recieve remote response:' + responseObj);
                                        });
                            }//get taxonnamejson by runAccession
                            SearchRunCtrl.Studies = [];
                            var filterun = {};
                            for (var j = 0; j < SearchRunCtrl.OrganismList.length; j++) {
                                var filterun = {accessionlist: SearchRunCtrl.OrganismList[j]};
                                SearchRunCtrl.Studies[j] = GETStudiesByacc.list({},
                                        filterun, function (responseObj) {
                                            $log.log('recieve remote response:' + responseObj);
                                        });
                            }//get studiesjson by runAccession
                            SearchRunCtrl.Alias = [];
                            var filteralias = {};
                            for (var j = 0; j < SearchRunCtrl.OrganismList.length; j++) {
                                var filteralias = {accessionlist: SearchRunCtrl.OrganismList[j]};
                                SearchRunCtrl.Alias[j] = GETRunAliasByacc.list({},
                                        filteralias, function (responseObj) {
                                            $log.log('recieve remote response:' + responseObj);
                                        });
                            }//get Aliasjson by runAccession
                            $scope.GetTaxonname = function (accession) {                          
                                return SearchRunCtrl.Organism[accession];
                            }//show taxon name on web                          
                            $scope.GetStudies = function (accession) {                            
                                return SearchRunCtrl.Studies[accession];
                            }//show Studies name on web
                            $scope.GetAlias = function (accession) {                                                            
                                return SearchRunCtrl.Alias[accession];
                            }//show Studies name on web
//get Organism and Studies from service
                        });
                RunCountWS.count(
                        {},
                        function (responseObj) {
                            SearchRunCtrl.count = responseObj.value;
                            $log.log("count response:" + responseObj);
                        });

                SearchRunCtrl.taxonsList = GetTaxonsByFilterForRunWS.gettaxons(
                        {}, //SearchRunCtrl.filterParams,
                        {
                            "wildcard": "",
                            "pagenum": 1,
                            "pagesize": 5
                        },
                        function (responseObj) {
                            $log.log('onSearch receive taxons for run filter');
                            SearchRunCtrl.taxonLeftList = {};
                            if (responseObj != null && responseObj.length != null) {
                                for (var i = 0; i < responseObj.length; i++) {
                                    SearchRunCtrl.taxonLeftList[responseObj[i].taxonid] = responseObj[i];
                                }
                            }
                        });
                SearchRunCtrl.submitterList = GetSubmitterByFilterForRunWS.getsubmitter(
                        {}, //SearchRunCtrl.filterParams,
                        {
                            "wildcard": "",
                            "pagenum": 1,
                            "pagesize": 5
                        },
                        function (responseObj) {
                            $log.log('onSearch receive submitter for experiment filter');
                            SearchRunCtrl.submitterLeftList = {};
                            if (responseObj != null && responseObj.length != null) {
                                for (var i = 0; i < responseObj.length; i++) {
                                    SearchRunCtrl.submitterLeftList[responseObj[i].submittername] = responseObj[i];
                                }
                            }
                        });

                SearchRunCtrl.instrumentList = GetInstrumentByFilterForRunWS.getinstrument(
                        {}, //SearchRunCtrl.filterParams,
                        {
                            "wildcard": "",
                            "pagenum": 1,
                            "pagesize": 5
                        },
                        function (responseObj) {
                            $log.log('onSearch receive instrument for experiment filter');
                            SearchRunCtrl.instrumentLeftList = {};
                            if (responseObj != null && responseObj.length != null) {
                                for (var i = 0; i < responseObj.length; i++) {
                                    SearchRunCtrl.instrumentLeftList[responseObj[i].instrumentname] = responseObj[i];
                                }
                            }
                        });

                GetTaxonsCountByFilterForRunWS.count({},
                        {
                            "wildcard": "",
                            "pagenum": 1,
                            "pagesize": 5
                        },
                        function (responseObj) {
                            SearchRunCtrl.taxonsCount = responseObj.value;
                            $log.log('receive response for taxonsCount:' + responseObj);
                        });

                GetSubmitterCountByFilterForRunWS.count({},
                        {
                            "wildcard": "",
                            "pagenum": 1,
                            "pagesize": 5
                        },
                        function (responseObj) {
                            SearchRunCtrl.submitterCount = responseObj.value;
                            $log.log('receive response for submitterCount:' + responseObj);
                        });

                GetInstrumentCountByFilterForRunWS.count({},
                        {
                            "wildcard": "",
                            "pagenum": 1,
                            "pagesize": 5
                        },
                        function (responseObj) {
                            SearchRunCtrl.instrumentCount = responseObj.value;
                            $log.log('receive response for instrumentCount:' + responseObj);
                        });




            };

            LoadFirstPage();

            SearchRunCtrl.onSearch = function (searchVal) {
                $log.log('onSearch:' + searchVal);
                SearchRunCtrl.searchInputObj = searchVal;

                SearchRunCtrl.filterParams.taxonlist = [];
                SearchRunCtrl.taxonChoseIds = [];
                SearchRunCtrl.taxonsChose = [];
                SearchRunCtrl.filterParams.submitterlist = [];
                SearchRunCtrl.submitterChoseIds = [];
                SearchRunCtrl.submitterChose = [];

                SearchRunCtrl.filterParams.instrumentlist = [];
                SearchRunCtrl.instrumentChoseIds = [];
                SearchRunCtrl.instrumentChose = [];
                if (searchVal) {
                    $log.log('onSearch:' + searchVal.originalObject.wordscol);
                    var searchStr = strtrim(searchVal.originalObject.wordscol);
                    SearchRunCtrl.searchInputStr = searchStr;
                    $log.log('val:' + searchVal.originalObject.sacwords);
                    $log.log('after trim:' + searchStr);
                    if (searchStr === "") {
                        LoadFirstPage();
                    } else {
                        SearchRunCtrl.filterParams.wildcard = searchStr;
                        SearchRunCtrl.curPageItems = GetRunDataByFilterWS.list(
                                SearchRunCtrl.filterParams,
                                function (responseObj) {
                                    $log.log('onSearch recieve remote response on items:' + responseObj);
                                });

                        SearchRunCtrl.taxonsList = GetTaxonsByFilterForRunWS.gettaxons(
                                {}, //SearchRunCtrl.filterParams,
                                {
                                    "wildcard": SearchRunCtrl.searchInputStr,
                                    "pagenum": 1,
                                    "pagesize": 5
                                },
                                function (responseObj) {
                                    $log.log('onSearch receive taxons for run filter');
                                    SearchRunCtrl.taxonLeftList = {};
                                    if (responseObj != null && responseObj.length != null) {
                                        for (var i = 0; i < responseObj.length; i++) {
                                            SearchRunCtrl.taxonLeftList[responseObj[i].taxonid] = responseObj[i];
                                        }
                                    }
                                });
                        SearchRunCtrl.submitterList = GetSubmitterByFilterForRunWS.getsubmitter(
                                {}, //SearchRunCtrl.filterParams,
                                {
                                    "wildcard": SearchRunCtrl.searchInputStr,
                                    "pagenum": 1,
                                    "pagesize": 5
                                },
                                function (responseObj) {
                                    $log.log('onSearch receive submitter for submitter filter');
                                    SearchRunCtrl.submitterLeftList = {};
                                    if (responseObj != null && responseObj.length != null) {
                                        for (var i = 0; i < responseObj.length; i++) {
                                            SearchRunCtrl.submitterLeftList[responseObj[i].submittername] = responseObj[i];
                                        }
                                    }
                                });

                        SearchRunCtrl.instrumentList = GetInstrumentByFilterForRunWS.getinstrument(
                                {}, //SearchRunCtrl.filterParams,
                                {
                                    "wildcard": SearchRunCtrl.searchInputStr,
                                    "pagenum": 1,
                                    "pagesize": 5
                                },
                                function (responseObj) {
                                    $log.log('onSearch receive instrument for instrument filter');
                                    SearchRunCtrl.instrumentLeftList = {};
                                    if (responseObj != null && responseObj.length != null) {
                                        for (var i = 0; i < responseObj.length; i++) {
                                            SearchRunCtrl.instrumentLeftList[responseObj[i].instrumentname] = responseObj[i];
                                        }
                                    }
                                });

                        SearchRunCtrl.taxonsCount = 0;
                        GetTaxonsCountByFilterForRunWS.count({},
                                {
                                    "wildcard": SearchRunCtrl.searchInputStr
                                },
                                function (responseObj) {
                                    SearchRunCtrl.taxonsCount = responseObj.value;
                                    $log.log('receive response for taxonsCount:' + responseObj);
                                });

                        SearchRunCtrl.submitterCount = 0;
                        GetSubmitterCountByFilterForRunWS.count({},
                                {
                                    "wildcard": SearchRunCtrl.searchInputStr
                                },
                                function (responseObj) {
                                    SearchRunCtrl.submitterCount = responseObj.value;
                                    $log.log('receive response for submitterCount:' + responseObj);
                                });

                        SearchRunCtrl.instrumentCount = 0;
                        GetInstrumentCountByFilterForRunWS.count({},
                                {
                                    "wildcard": SearchRunCtrl.searchInputStr
                                },
                                function (responseObj) {
                                    SearchRunCtrl.instrumentCount = responseObj.value;
                                    $log.log('receive response for instrumentCount:' + responseObj);
                                });

                        RunCountByFilterWS.count(SearchRunCtrl.filterParams,
                                function (responseObj) {
                                    SearchRunCtrl.count = responseObj.value;
                                    $log.log('onSearch receive remote resposne on count:' + responseObj);
                                }
                        );

                    }//end else searchStr === ""
                }//end if searchVal
            };//end onSearch

            SearchRunCtrl.pageChanged = function () {
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
                 $log.log("onPageChanged for page[" + SearchRunCtrl.currentPage + "]");
                 
                 SearchRunCtrl.filterParamObj.pagenum = SearchRsltListCtrl.currentPage;// = filterParams;
                 SearchRunCtrl.curPageItems = SearchByParamsWS.search(
                 SearchRsltListCtrl.filterParamObj,
                 function (response) {
                 $log.log("onPageChanged: receive response from server for page[" +
                 SearchRsltListCtrl.currentPage + "]");
                 });
                 */
                SearchRunCtrl.filterParams.pagenum = SearchRunCtrl.currentPage;
                SearchRunCtrl.curPageItems = GetRunDataByFilterWS.list(
                        SearchRunCtrl.filterParams,
                        function (responseObj) {
                            $log.log('onSearch recieve remote response on items:' + responseObj);
                            //get Organism and Studies from service
                            SearchRunCtrl.OrganismList = [];
                            SearchRunCtrl.taxonLoadList = {};
                            if (responseObj != null && responseObj.length != null) {
                                for (var i = 0; i < responseObj.length; i++) {
                                    SearchRunCtrl.taxonLoadList = responseObj[i];
                                    var json = SearchRunCtrl.taxonLoadList;
                                    var obj = angular.fromJson(json);
                                    SearchRunCtrl.OrganismList[i] = obj.runAccession;
                                    $log.log('Loadfirstpage organism');
                                }
                            }//get runAccession by json
                            SearchRunCtrl.Organism = [];
                            var filteraccession = {};
                            for (var j = 0; j < SearchRunCtrl.OrganismList.length; j++) {
                                var filteraccession = {accessionlist: SearchRunCtrl.OrganismList[j]};
                                SearchRunCtrl.Organism[j] = GETRunOrganismByacc.list({},
                                        filteraccession, function (responseObj) {
                                            $log.log('recieve remote response:' + responseObj);
                                        });
                            }//get taxonnamejson by runAccession
                            SearchRunCtrl.Studies = [];
                            var filterun = {};
                            for (var j = 0; j < SearchRunCtrl.OrganismList.length; j++) {
                                var filterun = {accessionlist: SearchRunCtrl.OrganismList[j]};
                                SearchRunCtrl.Studies[j] = GETStudiesByacc.list({},
                                        filterun, function (responseObj) {
                                            $log.log('recieve remote response:' + responseObj);
                                        });
                            }//get studiesjson by runAccession
                            SearchRunCtrl.Alias = [];
                            var filteralias = {};
                            for (var j = 0; j < SearchRunCtrl.OrganismList.length; j++) {
                                var filteralias = {accessionlist: SearchRunCtrl.OrganismList[j]};
                                SearchRunCtrl.Alias[j] = GETRunAliasByacc.list({},
                                        filteralias, function (responseObj) {
                                            $log.log('recieve remote response:' + responseObj);
                                        });
                            }//get Aliasjson by runAccession
                            $scope.GetTaxonname = function (accession) {
                            
                                return SearchRunCtrl.Organism[accession];
                            }//show taxon name on web                          
                            $scope.GetStudies = function (accession) {
                            
                                return SearchRunCtrl.Studies[accession];
                            }//show Studies name on web
                            $scope.GetAlias = function (accession) {
                            
                            
                                return SearchRunCtrl.Alias[accession];
                            }//show Studies name on web
//get Organism and Studies from service
                        }
                );

                RunCountByFilterWS.count()
            };//end pageChanged

            SearchRunCtrl.openTaxonChooser = function () {
                var taxonChooserInst = $uibModal.open({
                    animation: true,
                    templateUrl: 'SearchStudy/tmpl/TaxonList4StudyChooser.html',
                    controller: 'TaxonList4StudyChooser',
                    size: 'lg',
                    resolve: {
                        TaxonWS: function () {
                            return GetTaxonsByFilterForRunWS;
                        },
                        TaxonCountWS: function () {
                            return GetTaxonsCountByFilterForRunWS;
                        },
                        TaxonChoseList: function () {
                            return SearchRunCtrl.taxonsChose;
                        },
                        TaxonLeftList: function () {
                            return SearchRunCtrl.taxonLeftList
                        },
                        StudyWildcard: function () {
                            return SearchRunCtrl.searchInputStr;
                        }
                    }//end resolve
                });//end taxonChooserInst def

                taxonChooserInst.result.then(function (resultTaxonList) {
                    SearchRunCtrl.taxonsChose = resultTaxonList;
                });//end taxonChooserInst reslt then
            };//end openTaxonChooser
            SearchRunCtrl.openSubmitterChooser = function () {
                var submitterChooserInst = $uibModal.open({
                    animation: true,
                    templateUrl: 'SearchStudy/tmpl/SubmitterList4StudyChooser.html',
                    controller: 'SubmitterList4StudyChooser',
                    size: 'lg',
                    resolve: {
                        SubmitterWS: function () {
                            return GetSubmitterByFilterForRunWS;
                        },
                        SubmitterCountWS: function () {
                            return GetSubmitterCountByFilterForRunWS;
                        },
                        SubmitterChoseList: function () {
                            return SearchRunCtrl.submitterChose;
                        },
                        SubmitterLeftList: function () {
                            return SearchRunCtrl.submitterLeftList
                        },
                        StudyWildcard: function () {
                            return SearchRunCtrl.searchInputStr;
                        }
                    }//end resolve
                });//end submitterChooserInst def

                submitterChooserInst.result.then(function (resultSubmitterList) {
                    SearchRunCtrl.submitterChose = resultSubmitterList;
                });//end submitterChooserInst reslt then
            };//end openSubmitterChooser

            SearchRunCtrl.openInstrumentChooser = function () {
                var instrumentChooserInst = $uibModal.open({
                    animation: true,
                    templateUrl: 'SearchStudy/tmpl/InstrumentList4StudyChooser.html',
                    controller: 'InstrumentList4StudyChooser',
                    size: 'lg',
                    resolve: {
                        InstrumentWS: function () {
                            return GetInstrumentByFilterForRunWS;
                        },
                        InstrumentCountWS: function () {
                            return GetInstrumentCountByFilterForRunWS;
                        },
                        InstrumentChoseList: function () {
                            return SearchRunCtrl.instrumentChose;
                        },
                        InstrumentLeftList: function () {
                            return SearchRunCtrl.instrumentLeftList
                        },
                        StudyWildcard: function () {
                            return SearchRunCtrl.searchInputStr;
                        }
                    }//end resolve
                });//end instrumentChooserInst def

                instrumentChooserInst.result.then(function (resultInstrumentList) {
                    SearchRunCtrl.instrumentChose = resultInstrumentList;
                });//end instrumentChooserInst reslt then
            };//end openInstrumentChooser

            SearchRunCtrl.onFilter = function () {
                //Generate the list for taxons
                $log.log("onFilter");
                var taxonIDList = [];
                for (var i = 0; i < SearchRunCtrl.taxonsChose.length; i++) {
                    taxonIDList.push(SearchRunCtrl.taxonsChose[i].taxonid);
                }
                SearchRunCtrl.taxonChoseIds = taxonIDList;
                SearchRunCtrl.filterParams.taxonlist = SearchRunCtrl.taxonChoseIds;

                var submitterIDList = [];
                for (var i = 0; i < SearchRunCtrl.submitterChose.length; i++) {
                    submitterIDList.push(SearchRunCtrl.submitterChose[i].submittername);
                }
                SearchRunCtrl.submitterChoseIds = submitterIDList;
                SearchRunCtrl.filterParams.submitterlist = SearchRunCtrl.submitterChoseIds;

                var instrumentIDList = [];
                for (var i = 0; i < SearchRunCtrl.instrumentChose.length; i++) {
                    instrumentIDList.push(SearchRunCtrl.instrumentChose[i].instrumentname);
                }
                SearchRunCtrl.instrumentChoseIds = instrumentIDList;
                SearchRunCtrl.filterParams.instrumentlist = SearchRunCtrl.instrumentChoseIds;

                SearchRunCtrl.filterParams.pagenum = SearchRunCtrl.current;
                SearchRunCtrl.curPageItems = GetRunDataByFilterWS.list(
                        SearchRunCtrl.filterParams,
                        function (responseObj) {
                            $log.log('onSearch recieve remote response on items:' + responseObj);
                            //get Organism and Studies from service
                            SearchRunCtrl.OrganismList = [];
                            SearchRunCtrl.taxonLoadList = {};
                            if (responseObj != null && responseObj.length != null) {
                                for (var i = 0; i < responseObj.length; i++) {
                                    SearchRunCtrl.taxonLoadList = responseObj[i];
                                    var json = SearchRunCtrl.taxonLoadList;
                                    var obj = angular.fromJson(json);
                                    SearchRunCtrl.OrganismList[i] = obj.runAccession;
                                    $log.log('Loadfirstpage organism');
                                }
                            }//get runAccession by json
                            SearchRunCtrl.Organism = [];
                            var filteraccession = {};
                            for (var j = 0; j < SearchRunCtrl.OrganismList.length; j++) {
                                var filteraccession = {accessionlist: SearchRunCtrl.OrganismList[j]};
                                SearchRunCtrl.Organism[j] = GETRunOrganismByacc.list({},
                                        filteraccession, function (responseObj) {
                                            $log.log('recieve remote response:' + responseObj);
                                        });
                            }//get taxonnamejson by runAccession
                            SearchRunCtrl.Studies = [];
                            var filterun = {};
                            for (var j = 0; j < SearchRunCtrl.OrganismList.length; j++) {
                                var filterun = {accessionlist: SearchRunCtrl.OrganismList[j]};
                                SearchRunCtrl.Studies[j] = GETStudiesByacc.list({},
                                        filterun, function (responseObj) {
                                            $log.log('recieve remote response:' + responseObj);
                                        });
                            }//get studiesjson by runAccession
                            SearchRunCtrl.Alias = [];
                            var filteralias = {};
                            for (var j = 0; j < SearchRunCtrl.OrganismList.length; j++) {
                                var filteralias = {accessionlist: SearchRunCtrl.OrganismList[j]};
                                SearchRunCtrl.Alias[j] = GETRunAliasByacc.list({},
                                        filteralias, function (responseObj) {
                                            $log.log('recieve remote response:' + responseObj);
                                        });
                            }//get Aliasjson by runAccession
                            $scope.GetTaxonname = function (accession) {
                            
                                return SearchRunCtrl.Organism[accession];
                            }//show taxon name on web                          
                            $scope.GetStudies = function (accession) {
                            
                                return SearchRunCtrl.Studies[accession];
                            }//show Studies name on web
                            $scope.GetAlias = function (accession) {
                             
                                return SearchRunCtrl.Alias[accession];
                            }//show Studies name on web
//get Organism and Studies from service
                        }
                );

                RunCountByFilterWS.count(SearchRunCtrl.filterParams,
                        function (responseObj) {
                            SearchRunCtrl.count = responseObj.value;
                            $log.log('onSearch receive remote resposne on count:' + responseObj);
                        }
                );
            };//end onFilter
        }
);

