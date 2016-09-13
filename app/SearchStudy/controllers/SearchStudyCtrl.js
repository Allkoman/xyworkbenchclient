/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

var entitySearchStudyModule = angular.module('XYWorkbench.SearchStudy');
entitySearchStudyModule.controller('SearchStudyCtrl',
        function ($log, GetHRDADataByPageWS, HRDACountWS, BackendAddr,
                GetHRDADataByFilterWS, HRDACountByFilterWS,
                GetTaxonsByFilterForStudyWS,
                GetTaxonsCountByFilterForStudyWS,
                GetTypeByFilterForStudyWS,
                GetTypeCountByFilterForStudyWS,
                GetSubmitterByFilterForStudyWS,
                GetSubmitterCountByFilterForStudyWS,
                GetInstrumentByFilterForStudyWS,
                GetInstrumentCountByFilterForStudyWS,
                $uibModal, Studies, GETScientificByacc, $scope,GETSubmissionByacc,
                ISDEBUG) {
            var SearchStudyCtrl = this;
            SearchStudyCtrl.BackendAddr = BackendAddr;
            SearchStudyCtrl.pageSize = 5;
            SearchStudyCtrl.is_debug = ISDEBUG;
            SearchStudyCtrl.searchInputStr = "";
            SearchStudyCtrl.searchInputObj = {};
            SearchStudyCtrl.taxonsCount = 0;
            SearchStudyCtrl.taxonsChose = []; //[{taxonid:20}];
            SearchStudyCtrl.isOrgOpen = false;
            SearchStudyCtrl.taxonLeftList = {};
            SearchStudyCtrl.taxonChoseIds = [];
            SearchStudyCtrl.typeCount = 0;
            SearchStudyCtrl.typeChose = []; //[{typeid:20}];
            SearchStudyCtrl.isTyOpen = false;
            SearchStudyCtrl.typeLeftList = {};
            SearchStudyCtrl.typeChoseIds = [];
            SearchStudyCtrl.submitterCount = 0;
            SearchStudyCtrl.submitterChose = []; //[{typeid:20}];
            SearchStudyCtrl.isSbOpen = false;
            SearchStudyCtrl.submitterLeftList = {};
            SearchStudyCtrl.submitterChoseIds = [];
            SearchStudyCtrl.instrumentCount = 0;
            SearchStudyCtrl.instrumentChose = []; //[{typeid:20}];
            SearchStudyCtrl.isInOpen = false;
            SearchStudyCtrl.instrumentLeftList = {};
            SearchStudyCtrl.instrumentChoseIds = [];
            SearchStudyCtrl.current = 1;
            SearchStudyCtrl.taxonLoadList = {};
            SearchStudyCtrl.OrganismList = [];
            SearchStudyCtrl.OrganismShow = {};
            SearchStudyCtrl.Organism;
            SearchStudyCtrl.Submitter;



            SearchStudyCtrl.filterParams = {
                "wildcard": SearchStudyCtrl.searchInputStr,
                "pagenum": SearchStudyCtrl.current,
                "pagesize": SearchStudyCtrl.pageSize,
                "taxonlist": [],
                "typelist": [],
                "submitterlist": [],
                "instrumentlist": [],
                "accessionlist": []
            }; //define filterparams 
            var strtrim = function (str_in) {
                return str_in.replace(/(^\s*)|(\s*$)/g, "");
            };
            $log.log('into');
            var SearchStudyCtrl = this;
            $log.log("SearchStudyCtrl Loaded");
            var LoadFirstPage = function () {
                $log.log('Load first page for study');
                SearchStudyCtrl.curPageItems = GetHRDADataByPageWS.list(
                        {entity: 'study', pagenum: '1', pagesize: SearchStudyCtrl.pageSize}, {},
                        function (responseObj) {
                            $log.log('recieve remote response:' + responseObj);
//get Organism and Submitter from service
                            SearchStudyCtrl.OrganismList = [];
                            SearchStudyCtrl.taxonLoadList = {};
                            if (responseObj != null && responseObj.length != null) {
                                for (var i = 0; i < responseObj.length; i++) {
                                    SearchStudyCtrl.taxonLoadList = responseObj[i];
                                    var json = SearchStudyCtrl.taxonLoadList;
                                    var obj = angular.fromJson(json);
                                    SearchStudyCtrl.OrganismList[i] = obj.studyAccession;
                                    $log.log('Loadfirstpage organism');
                                }
                            }//get studyAccession by json
                            SearchStudyCtrl.Organism = [];
                            var filteraccession = {};
                            for (var j = 0; j < SearchStudyCtrl.OrganismList.length; j++) {
                                var filteraccession = {accessionlist: SearchStudyCtrl.OrganismList[j]};
                                SearchStudyCtrl.Organism[j] = GETScientificByacc.list({},
                                        filteraccession, function (responseObj) {
                                            $log.log('recieve remote response:' + responseObj);
                                        });
                            }//get taxonnamejson by studyAccession
                            SearchStudyCtrl.Submitter = [];
                            var filterstudy = {};
                            for (var j = 0; j < SearchStudyCtrl.OrganismList.length; j++) {
                                var filterstudy = {accessionlist: SearchStudyCtrl.OrganismList[j]};
                                SearchStudyCtrl.Submitter[j] = GETSubmissionByacc.list({},
                                        filterstudy, function (responseObj) {
                                            $log.log('recieve remote response:' + responseObj);
                                        });
                            }//get taxonnamejson by studyAccession
                            $scope.GetTaxonname = function (accession) {
                            
                                return SearchStudyCtrl.Organism[accession];
                            }//show taxon name on web                          
                             $scope.GetSubmittername = function (accession) {
                            
                                return SearchStudyCtrl.Submitter[accession];
                            }//show submitter name on web
//get Organism and Submitter from service
                        }
                );



                HRDACountWS.count(
                        {entity: 'study'}, {},
                        function (responseObj) {
                            SearchStudyCtrl.count = responseObj.value;
                            $log.log("count response:" + responseObj);
                        });
                SearchStudyCtrl.taxonsList = GetTaxonsByFilterForStudyWS.gettaxons(
                        {}, //SearchStudyCtrl.filterParams,
                        {
                            "wildcard": "",
                            "pagenum": 1,
                            "pagesize": 5
                        },
                        function (responseObj) {
                            $log.log('onSearch receive taxons for study filter');
                            SearchStudyCtrl.taxonLeftList = {};
                            if (responseObj != null && responseObj.length != null) {
                                for (var i = 0; i < responseObj.length; i++) {
                                    SearchStudyCtrl.taxonLeftList[responseObj[i].taxonid] = responseObj[i];
                                }
                            }
                        }); //get taxons data from table taxon

                SearchStudyCtrl.typeList = GetTypeByFilterForStudyWS.gettype(
                        {}, //SearchStudyCtrl.filterParams,
                        {
                            "wildcard": "",
                            "pagenum": 1,
                            "pagesize": 5
                        },
                        function (responseObj) {
                            $log.log('onSearch receive type for study filter');
                            SearchStudyCtrl.typeLeftList = {};
                            if (responseObj != null && responseObj.length != null) {
                                for (var i = 0; i < responseObj.length; i++) {
                                    SearchStudyCtrl.typeLeftList[responseObj[i].typename] = responseObj[i];
                                }
                            }
                        }); //get type data from table taxon

                SearchStudyCtrl.submitterList = GetSubmitterByFilterForStudyWS.getsubmitter(
                        {}, //SearchStudyCtrl.filterParams,
                        {
                            "wildcard": "",
                            "pagenum": 1,
                            "pagesize": 5
                        },
                        function (responseObj) {
                            $log.log('onSearch receive submitter for study filter');
                            SearchStudyCtrl.submitterLeftList = {};
                            if (responseObj != null && responseObj.length != null) {
                                for (var i = 0; i < responseObj.length; i++) {
                                    SearchStudyCtrl.submitterLeftList[responseObj[i].submittername] = responseObj[i];
                                }
                            }
                        }); //get submitter data from table taxon

                SearchStudyCtrl.instrumentList = GetInstrumentByFilterForStudyWS.getinstrument(
                        {}, //SearchStudyCtrl.filterParams,
                        {
                            "wildcard": "",
                            "pagenum": 1,
                            "pagesize": 5
                        },
                        function (responseObj) {
                            $log.log('onSearch receive instrument for study filter');
                            SearchStudyCtrl.instrumentLeftList = {};
                            if (responseObj != null && responseObj.length != null) {
                                for (var i = 0; i < responseObj.length; i++) {
                                    SearchStudyCtrl.instrumentLeftList[responseObj[i].instrumentname] = responseObj[i];
                                }
                            }
                        }); //get instrument data from table taxon

                GetTaxonsCountByFilterForStudyWS.count({},
                        {
                            "wildcard": "",
                            "pagenum": 1,
                            "pagesize": 5
                        },
                        function (responseObj) {
                            SearchStudyCtrl.taxonsCount = responseObj.value;
                            $log.log('receive response for taxonsCount:' + responseObj);
                        });
                GetTypeCountByFilterForStudyWS.count({},
                        {
                            "wildcard": "",
                            "pagenum": 1,
                            "pagesize": 5
                        },
                        function (responseObj) {
                            SearchStudyCtrl.typeCount = responseObj.value;
                            $log.log('receive response for typeCount:' + responseObj);
                        });
                GetSubmitterCountByFilterForStudyWS.count({},
                        {
                            "wildcard": "",
                            "pagenum": 1,
                            "pagesize": 5
                        },
                        function (responseObj) {
                            SearchStudyCtrl.submitterCount = responseObj.value;
                            $log.log('receive response for submitterCount:' + responseObj);
                        });
                GetInstrumentCountByFilterForStudyWS.count({},
                        {
                            "wildcard": "",
                            "pagenum": 1,
                            "pagesize": 5
                        },
                        function (responseObj) {
                            SearchStudyCtrl.instrumentCount = responseObj.value;
                            $log.log('receive response for instrumentCount:' + responseObj);
                        });
            };
            LoadFirstPage();
            SearchStudyCtrl.onSearch = function (searchVal) {
                $log.log('onSearch:' + searchVal);
                SearchStudyCtrl.searchInputObj = searchVal;
                SearchStudyCtrl.filterParams.taxonlist = [];
                SearchStudyCtrl.taxonChoseIds = [];
                SearchStudyCtrl.taxonsChose = [];
                SearchStudyCtrl.filterParams.typelist = [];
                SearchStudyCtrl.typeChoseIds = [];
                SearchStudyCtrl.typeChose = [];
                SearchStudyCtrl.filterParams.submitterlist = [];
                SearchStudyCtrl.submitterChoseIds = [];
                SearchStudyCtrl.submitterChose = [];
                SearchStudyCtrl.filterParams.instrumentlist = [];
                SearchStudyCtrl.instrumentChoseIds = [];
                SearchStudyCtrl.instrumentChose = [];
                if (searchVal) {
                    $log.log('onSearch:' + searchVal.originalObject.wordscol);
                    var searchStr = strtrim(searchVal.originalObject.wordscol);
                    SearchStudyCtrl.searchInputStr = searchStr;
                    $log.log('val:' + searchVal.originalObject.sacwords);
                    $log.log('after trim:' + searchStr);
                    if (searchStr === "") {
                        LoadFirstPage();
                    } else {
                        SearchStudyCtrl.filterParams.wildcard = searchStr;
                        SearchStudyCtrl.curPageItems = GetHRDADataByFilterWS.list(
                                {entity: 'study'}, SearchStudyCtrl.filterParams,
                                function (responseObj) {
                                    $log.log('onSearch recieve remote response on items:' + responseObj);
                                });
                        SearchStudyCtrl.taxonsList = GetTaxonsByFilterForStudyWS.gettaxons(
                                {}, //SearchStudyCtrl.filterParams,
                                {
                                    "wildcard": SearchStudyCtrl.searchInputStr,
                                    "pagenum": 1,
                                    "pagesize": 5
                                },
                                function (responseObj) {
                                    $log.log('onSearch receive taxons for study filter');
                                    SearchStudyCtrl.taxonLeftList = {};
                                    if (responseObj != null && responseObj.length != null) {
                                        for (var i = 0; i < responseObj.length; i++) {
                                            SearchStudyCtrl.taxonLeftList[responseObj[i].taxonid] = responseObj[i];
                                        }
                                    }
                                });
                        SearchStudyCtrl.typeList = GetTypeByFilterForStudyWS.gettype(
                                {}, //SearchStudyCtrl.filterParams,
                                {
                                    "wildcard": SearchStudyCtrl.searchInputStr,
                                    "pagenum": 1,
                                    "pagesize": 5
                                },
                                function (responseObj) {
                                    $log.log('onSearch receive type for study filter');
                                    SearchStudyCtrl.typeLeftList = {};
                                    if (responseObj != null && responseObj.length != null) {
                                        for (var i = 0; i < responseObj.length; i++) {
                                            SearchStudyCtrl.typeLeftList[responseObj[i].typeid] = responseObj[i];
                                        }
                                    }
                                });
                        SearchStudyCtrl.submitterList = GetSubmitterByFilterForStudyWS.getsubmitter(
                                {}, //SearchStudyCtrl.filterParams,
                                {
                                    "wildcard": SearchStudyCtrl.searchInputStr,
                                    "pagenum": 1,
                                    "pagesize": 5
                                },
                                function (responseObj) {
                                    $log.log('onSearch receive submitter for study filter');
                                    SearchStudyCtrl.submitterLeftList = {};
                                    if (responseObj != null && responseObj.length != null) {
                                        for (var i = 0; i < responseObj.length; i++) {
                                            SearchStudyCtrl.submitterLeftList[responseObj[i].submitterid] = responseObj[i];
                                        }
                                    }
                                });
                        SearchStudyCtrl.instrumentList = GetInstrumentByFilterForStudyWS.getinstrument(
                                {}, //SearchStudyCtrl.filterParams,
                                {
                                    "wildcard": SearchStudyCtrl.searchInputStr,
                                    "pagenum": 1,
                                    "pagesize": 5
                                },
                                function (responseObj) {
                                    $log.log('onSearch receive instrument for study filter');
                                    SearchStudyCtrl.instrumentLeftList = {};
                                    if (responseObj != null && responseObj.length != null) {
                                        for (var i = 0; i < responseObj.length; i++) {
                                            SearchStudyCtrl.instrumentLeftList[responseObj[i].instrumentid] = responseObj[i];
                                        }
                                    }
                                });
                        SearchStudyCtrl.taxonsCount = 0;
                        GetTaxonsCountByFilterForStudyWS.count({},
                                {
                                    "wildcard": SearchStudyCtrl.searchInputStr
                                },
                                function (responseObj) {
                                    SearchStudyCtrl.taxonsCount = responseObj.value;
                                    $log.log('receive response for taxonsCount:' + responseObj);
                                });
                        SearchStudyCtrl.typeCount = 0;
                        GetTypeCountByFilterForStudyWS.count({},
                                {
                                    "wildcard": SearchStudyCtrl.searchInputStr
                                },
                                function (responseObj) {
                                    SearchStudyCtrl.typeCount = responseObj.value;
                                    $log.log('receive response for typeCount:' + responseObj);
                                });
                        SearchStudyCtrl.submitterCount = 0;
                        GetSubmitterCountByFilterForStudyWS.count({},
                                {
                                    "wildcard": SearchStudyCtrl.searchInputStr
                                },
                                function (responseObj) {
                                    SearchStudyCtrl.submitterCount = responseObj.value;
                                    $log.log('receive response for submitterCount:' + responseObj);
                                });
                        SearchStudyCtrl.instrumentCount = 0;
                        GetInstrumentCountByFilterForStudyWS.count({},
                                {
                                    "wildcard": SearchStudyCtrl.searchInputStr
                                },
                                function (responseObj) {
                                    SearchStudyCtrl.instrumentCount = responseObj.value;
                                    $log.log('receive response for instrumentCount:' + responseObj);
                                });
                        HRDACountByFilterWS.count({entity: 'study'}, SearchStudyCtrl.filterParams,
                                function (responseObj) {
                                    SearchStudyCtrl.count = responseObj.value;
                                    $log.log('onSearch receive remote resposne on count:' + responseObj);
                                }
                        );
                    }//end else searchStr === ""
                }//end if searchVal
            }; //end onSearch

            SearchStudyCtrl.pageChanged = function () {

                $log.log(SearchStudyCtrl.OrganismList);
                SearchStudyCtrl.filterParams.pagenum = SearchStudyCtrl.currentPage;
                SearchStudyCtrl.curPageItems = GetHRDADataByFilterWS.list(
                        {entity: 'study'}, SearchStudyCtrl.filterParams,
                        function (responseObj) {
                            $log.log('onSearch recieve remote response on items:' + responseObj);
//get Organism and Submitter from service
                            SearchStudyCtrl.OrganismList = [];
                            SearchStudyCtrl.taxonLoadList = {};
                            if (responseObj != null && responseObj.length != null) {
                                for (var i = 0; i < responseObj.length; i++) {
                                    SearchStudyCtrl.taxonLoadList = responseObj[i];
                                    var json = SearchStudyCtrl.taxonLoadList;
                                    var obj = angular.fromJson(json);
                                    SearchStudyCtrl.OrganismList[i] = obj.studyAccession;
                                    $log.log('PageChange organism');
                                }
                            }//get studyAccession by json
                            SearchStudyCtrl.Organism = [];
                            var filteraccession = {};
                            for (var j = 0; j < SearchStudyCtrl.OrganismList.length; j++) {
                                var filteraccession = {accessionlist: SearchStudyCtrl.OrganismList[j]};
                                SearchStudyCtrl.Organism[j] = GETScientificByacc.list({},
                                        filteraccession, function (responseObj) {
                                            $log.log('recieve remote response:' + responseObj);
                                        });
                            }//get taxonnamejson by studyAccession
                            SearchStudyCtrl.Submitter = [];
                            var filterstudy = {};
                            for (var j = 0; j < SearchStudyCtrl.OrganismList.length; j++) {
                                var filterstudy = {accessionlist: SearchStudyCtrl.OrganismList[j]};
                                SearchStudyCtrl.Submitter[j] = GETSubmissionByacc.list({},
                                        filterstudy, function (responseObj) {
                                            $log.log('recieve remote response:' + responseObj);
                                        });
                            }//get taxonnamejson by studyAccession
                            $scope.GetTaxonname = function (accession) {
                            
                                return SearchStudyCtrl.Organism[accession];
                            }//show taxon name on web                          
                             $scope.GetSubmittername = function (accession) {
                            
                                return SearchStudyCtrl.Submitter[accession];
                            }//show submitter name on web
//get Organism and Submitter from service
                        }
                );
                HRDACountByFilterWS.count({entity: 'study'}, {})

            }; //end pageChanged

            SearchStudyCtrl.onFilter = function () {
                //Generate the list for taxons
                $log.log("onFilter");
                var taxonIDList = [];
                for (var i = 0; i < SearchStudyCtrl.taxonsChose.length; i++) {
                    taxonIDList.push(SearchStudyCtrl.taxonsChose[i].taxonid);
                }
                SearchStudyCtrl.taxonChoseIds = taxonIDList;
                SearchStudyCtrl.filterParams.taxonlist = SearchStudyCtrl.taxonChoseIds;
                var typeIDList = [];
                for (var i = 0; i < SearchStudyCtrl.typeChose.length; i++) {
                    typeIDList.push(SearchStudyCtrl.typeChose[i].typename);
                }
                SearchStudyCtrl.typeChoseIds = typeIDList;
                SearchStudyCtrl.filterParams.typelist = SearchStudyCtrl.typeChoseIds;
                var submitterIDList = [];
                for (var i = 0; i < SearchStudyCtrl.submitterChose.length; i++) {
                    submitterIDList.push(SearchStudyCtrl.submitterChose[i].submittername);
                }
                SearchStudyCtrl.submitterChoseIds = submitterIDList;
                SearchStudyCtrl.filterParams.submitterlist = SearchStudyCtrl.submitterChoseIds;
                var instrumentIDList = [];
                for (var i = 0; i < SearchStudyCtrl.instrumentChose.length; i++) {
                    instrumentIDList.push(SearchStudyCtrl.instrumentChose[i].instrumentname);
                }
                SearchStudyCtrl.instrumentChoseIds = instrumentIDList;
                SearchStudyCtrl.filterParams.instrumentlist = SearchStudyCtrl.instrumentChoseIds;
                SearchStudyCtrl.filterParams.pagenum = SearchStudyCtrl.current;
                SearchStudyCtrl.curPageItems = GetHRDADataByFilterWS.list(
                        {entity: 'study'}, SearchStudyCtrl.filterParams,
                        function (responseObj) {
                            $log.log('onSearch recieve remote response on items:' + responseObj);
//get Organism and Submitter from service
                            SearchStudyCtrl.OrganismList = [];
                            SearchStudyCtrl.taxonLoadList = {};
                            if (responseObj != null && responseObj.length != null) {
                                for (var i = 0; i < responseObj.length; i++) {
                                    SearchStudyCtrl.taxonLoadList = responseObj[i];
                                    var json = SearchStudyCtrl.taxonLoadList;
                                    var obj = angular.fromJson(json);
                                    SearchStudyCtrl.OrganismList[i] = obj.studyAccession;
                                    $log.log('Onfilter organism');
                                }
                            }//get studyAccession by json
                            SearchStudyCtrl.Organism = [];
                            var filteraccession = {};
                            for (var j = 0; j < SearchStudyCtrl.OrganismList.length; j++) {
                                var filteraccession = {accessionlist: SearchStudyCtrl.OrganismList[j]};
                                SearchStudyCtrl.Organism[j] = GETScientificByacc.list({},
                                        filteraccession, function (responseObj) {
                                            $log.log('recieve remote response:' + responseObj);
                                        });
                            }//get taxonnamejson by studyAccession
                            SearchStudyCtrl.Submitter = [];
                            var filterstudy = {};
                            for (var j = 0; j < SearchStudyCtrl.OrganismList.length; j++) {
                                var filterstudy = {accessionlist: SearchStudyCtrl.OrganismList[j]};
                                SearchStudyCtrl.Submitter[j] = GETSubmissionByacc.list({},
                                        filterstudy, function (responseObj) {
                                            $log.log('recieve remote response:' + responseObj);
                                        });
                            }//get taxonnamejson by studyAccession
                            $scope.GetTaxonname = function (accession) {
                            
                                return SearchStudyCtrl.Organism[accession];
                            }//show taxon name on web                          
                             $scope.GetSubmittername = function (accession) {
                            
                                return SearchStudyCtrl.Submitter[accession];
                            }//show submitter name on web
//get Organism and Submitter from service
                        }
                );
                HRDACountByFilterWS.count({entity: 'study'}, SearchStudyCtrl.filterParams,
                        function (responseObj) {
                            SearchStudyCtrl.count = responseObj.value;
                            $log.log('onSearch receive remote resposne on count:' + responseObj);
                        }
                );
            }; //end onFilter




            SearchStudyCtrl.openTaxonChooser = function () {
                var taxonChooserInst = $uibModal.open({
                    animation: true,
                    templateUrl: 'SearchStudy/tmpl/TaxonList4StudyChooser.html',
                    controller: 'TaxonList4StudyChooser',
                    size: 'lg',
                    resolve: {
                        TaxonWS: function () {
                            return GetTaxonsByFilterForStudyWS;
                        },
                        TaxonCountWS: function () {
                            return GetTaxonsCountByFilterForStudyWS;
                        },
                        TaxonChoseList: function () {
                            return SearchStudyCtrl.taxonsChose;
                        },
                        TaxonLeftList: function () {
                            return SearchStudyCtrl.taxonLeftList
                        },
                        StudyWildcard: function () {
                            return SearchStudyCtrl.searchInputStr;
                        }
                    }//end resolve
                }); //end taxonChooserInst def

                taxonChooserInst.result.then(function (resultTaxonList) {
                    SearchStudyCtrl.taxonsChose = resultTaxonList;
                }); //end taxonChooserInst reslt then
            }; //end openTaxonChooser



            SearchStudyCtrl.openTypeChooser = function () {
                var typeChooserInst = $uibModal.open({
                    animation: true,
                    templateUrl: 'SearchStudy/tmpl/TypeList4StudyChooser.html',
                    controller: 'TypeList4StudyChooser',
                    size: 'lg',
                    resolve: {
                        TypeWS: function () {
                            return GetTypeByFilterForStudyWS;
                        },
                        TypeCountWS: function () {
                            return GetTypeCountByFilterForStudyWS;
                        },
                        TypeChoseList: function () {
                            return SearchStudyCtrl.typeChose;
                        },
                        TypeLeftList: function () {
                            return SearchStudyCtrl.typeLeftList
                        },
                        StudyWildcard: function () {
                            return SearchStudyCtrl.searchInputStr;
                        }
                    }//end resolve
                }); //end typeChooserInst def

                typeChooserInst.result.then(function (resultTypeList) {
                    SearchStudyCtrl.typesChose = resultTypeList;
                }); //end typeChooserInst reslt then
            }; //end openTypeChooser


            SearchStudyCtrl.openSubmitterChooser = function () {
                var submitterChooserInst = $uibModal.open({
                    animation: true,
                    templateUrl: 'SearchStudy/tmpl/SubmitterList4StudyChooser.html',
                    controller: 'SubmitterList4StudyChooser',
                    size: 'lg',
                    resolve: {
                        SubmitterWS: function () {
                            return GetSubmitterByFilterForStudyWS;
                        },
                        SubmitterCountWS: function () {
                            return GetSubmitterCountByFilterForStudyWS;
                        },
                        SubmitterChoseList: function () {
                            return SearchStudyCtrl.submitterChose;
                        },
                        SubmitterLeftList: function () {
                            return SearchStudyCtrl.submitterLeftList
                        },
                        StudyWildcard: function () {
                            return SearchStudyCtrl.searchInputStr;
                        }
                    }//end resolve
                }); //end submitterChooserInst def

                submitterChooserInst.result.then(function (resultSubmitterList) {
                    SearchStudyCtrl.submittersChose = resultSubmitterList;
                }); //end submitterChooserInst reslt then
            }; //end openSubmitterChooser

            SearchStudyCtrl.openInstrumentChooser = function () {
                var instrumentChooserInst = $uibModal.open({
                    animation: true,
                    templateUrl: 'SearchStudy/tmpl/InstrumentList4StudyChooser.html',
                    controller: 'InstrumentList4StudyChooser',
                    size: 'lg',
                    resolve: {
                        InstrumentWS: function () {
                            return GetInstrumentByFilterForStudyWS;
                        },
                        InstrumentCountWS: function () {
                            return GetInstrumentCountByFilterForStudyWS;
                        },
                        InstrumentChoseList: function () {
                            return SearchStudyCtrl.instrumentChose;
                        },
                        InstrumentLeftList: function () {
                            return SearchStudyCtrl.instrumentLeftList
                        },
                        StudyWildcard: function () {
                            return SearchStudyCtrl.searchInputStr;
                        }
                    }//end resolve
                }); //end instrumentChooserInst def

                instrumentChooserInst.result.then(function (resultInstrumentList) {
                    SearchStudyCtrl.instrumentsChose = resultInstrumentList;
                }); //end instrumentChooserInst reslt then
            }; //end openInstrumentChooser


        }
);

