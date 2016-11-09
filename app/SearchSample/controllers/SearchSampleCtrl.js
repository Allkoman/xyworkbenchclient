/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';


var entitySearchSampleModule = angular.module('XYWorkbench.SearchSample');
entitySearchSampleModule.controller('SearchSampleCtrl',
        function ($log, GetSampleDataByPageWS, SampleCountWS, BackendAddr,
                GetSampleDataByFilterWS, SampleCountByFilterWS,
                GetTaxonsByFilterForSampleWS,
                GetTaxonsCountByFilterForSampleWS,
                GetTypeByFilterForSampleWS,
                GetTypeCountByFilterForSampleWS,
                GetSubmitterByFilterForSampleWS,
                GetSubmitterCountByFilterForSampleWS,
                GetInstrumentByFilterForSampleWS,
                GetInstrumentCountByFilterForSampleWS,
                $uibModal, Samples, $scope, GETSampleOrganismByacc, GETSampleSubmissionByacc, GETSampleTitleByacc, GETSampleStuidiesByacc,
                ISDEBUG) {
            var SearchSampleCtrl = this;
            SearchSampleCtrl.BackendAddr = BackendAddr;
            SearchSampleCtrl.pageSize = 5;
            SearchSampleCtrl.is_debug = ISDEBUG;
            SearchSampleCtrl.searchInputStr = "";
            SearchSampleCtrl.searchInputObj = {};

            SearchSampleCtrl.taxonsCount = 0;
            SearchSampleCtrl.taxonsChose = [];//[{taxonid:20}];
            SearchSampleCtrl.isOrgOpen = false;
            SearchSampleCtrl.taxonLeftList = {};
            SearchSampleCtrl.taxonChoseIds = [];
            SearchSampleCtrl.typeCount = 0;
            SearchSampleCtrl.typeChose = [];//[{typeid:20}];
            SearchSampleCtrl.isTyOpen = false;
            SearchSampleCtrl.typeLeftList = {};
            SearchSampleCtrl.typeChoseIds = [];

            SearchSampleCtrl.submitterCount = 0;
            SearchSampleCtrl.submitterChose = [];//[{submitterid:20}];
            SearchSampleCtrl.isSbOpen = false;
            SearchSampleCtrl.submitterLeftList = {};
            SearchSampleCtrl.submitterChoseIds = [];

            SearchSampleCtrl.instrumentCount = 0;
            SearchSampleCtrl.instrumentChose = [];//[{instrumentid:20}];
            SearchSampleCtrl.isInOpen = false;
            SearchSampleCtrl.instrumentLeftList = {};
            SearchSampleCtrl.instrumentChoseIds = [];
            SearchSampleCtrl.current = 1;
            SearchSampleCtrl.taxonLoadList = {};
            SearchSampleCtrl.OrganismList = [];
            SearchSampleCtrl.OrganismShow = {};
            SearchSampleCtrl.Organism;
            SearchSampleCtrl.Submitter;
            SearchSampleCtrl.Title;
            SearchSampleCtrl.Studiesaccession;

            var strtrim = function (str_in) {
                return str_in.replace(/(^\s*)|(\s*$)/g, "");
            };


            $log.log('Loaded SearchSampleCtrl');

            SearchSampleCtrl.delSample = function (tar_sampleId, tar_index) {
                $log.log('Del id:' + tar_sampleId + ' index:' + tar_index);
                Samples.delete({id: tar_sampleId}, function () {
                    $log.log('After Del');
                    SearchSampleCtrl.curPageItems.splice(tar_index, 1);
                });
            };
            SearchSampleCtrl.filterParams = {
                "wildcard": SearchSampleCtrl.searchInputStr,
                "pagenum": SearchSampleCtrl.current,
                "pagesize": SearchSampleCtrl.pageSize,
                "taxonlist": [],
                "typelist": [],
                "submitterlist": [],
                "instrumentlist": [],
                "accessionlist": []
            };

            $log.log('into');
            var SearchSampleCtrl = this;
            $log.log("SearchSampleCtrl Loaded");
            var LoadFirstPage = function () {
                $log.log('Load first page for sample');

                SearchSampleCtrl.curPageItems = GetSampleDataByPageWS.list(
                        {pagenum: '1', pagesize: SearchSampleCtrl.pageSize}, {},
                        function (responseObj) {
                            $log.log('recieve remote response:' + responseObj);
                            //get Organism and Submitter from service
                            SearchSampleCtrl.OrganismList = [];
                            SearchSampleCtrl.taxonLoadList = {};
                            if (responseObj != null && responseObj.length != null) {
                                for (var i = 0; i < responseObj.length; i++) {
                                    SearchSampleCtrl.taxonLoadList = responseObj[i];
                                    var json = SearchSampleCtrl.taxonLoadList;
                                    var obj = angular.fromJson(json);
                                    SearchSampleCtrl.OrganismList[i] = obj.sampleAccession;
                                    $log.log('Loadfirstpage organism');
                                }
                            }//get sampleAccession by json
                            SearchSampleCtrl.Organism = [];
                            var filteraccession = {};
                            for (var j = 0; j < SearchSampleCtrl.OrganismList.length; j++) {
                                var filteraccession = {accessionlist: SearchSampleCtrl.OrganismList[j]};
                                SearchSampleCtrl.Organism[j] = GETSampleOrganismByacc.list({},
                                        filteraccession, function (responseObj) {
                                            $log.log('recieve remote response:' + responseObj);
                                        });
                            }//get taxonnamejson by sampleAccession
                            SearchSampleCtrl.Submitter = [];
                            var filtersample = {};
                            for (var j = 0; j < SearchSampleCtrl.OrganismList.length; j++) {
                                var filtersample = {accessionlist: SearchSampleCtrl.OrganismList[j]};
                                SearchSampleCtrl.Submitter[j] = GETSampleSubmissionByacc.list({},
                                        filtersample, function (responseObj) {
                                            $log.log('recieve remote response:' + responseObj);
                                        });
                            }//get submitternamejson by sampleAccession 
                            SearchSampleCtrl.Title = [];
                            var filtertitle = {};
                            for (var j = 0; j < SearchSampleCtrl.OrganismList.length; j++) {
                                var filtertitle = {accessionlist: SearchSampleCtrl.OrganismList[j]};
                                SearchSampleCtrl.Title[j] = GETSampleTitleByacc.list({},
                                        filtertitle, function (responseObj) {
                                            $log.log('recieve remote response:' + responseObj);
                                        });
                            }//get titlenamejson by sampleAccession 
                            SearchSampleCtrl.Studiesaccession = [];
                            var filterstudies = {};
                            for (var j = 0; j < SearchSampleCtrl.OrganismList.length; j++) {
                                var filterstudies = {accessionlist: SearchSampleCtrl.OrganismList[j]};
                                SearchSampleCtrl.Studiesaccession[j] = GETSampleStuidiesByacc.list({},
                                        filterstudies, function (responseObj) {
                                            $log.log('recieve remote response:' + responseObj);
                                        });
                            }//get studiesjson by sampleAccession 
                            $scope.GetTaxonname = function (accession) {
                            
                                return SearchSampleCtrl.Organism[accession];
                            }//show taxon name on web                          
                            $scope.GetSubmittername = function (accession) {
                            
                                return SearchSampleCtrl.Submitter[accession];
                            }//show submitter name on web  
                            $scope.GetTitle = function (accession) {
                            
                                return SearchSampleCtrl.Title[accession];
                            }//show title  on web 
                            $scope.GetStudies = function (accession) {
                            
                                return SearchSampleCtrl.Studiesaccession[accession];
                            }//show title  on web
//get Organism and Submitter from service
                        });
                SampleCountWS.count(
                        {},
                        function (responseObj) {
                            SearchSampleCtrl.count = responseObj.value;
                            $log.log("count response:" + responseObj);
                        });

                SearchSampleCtrl.taxonsList = GetTaxonsByFilterForSampleWS.gettaxons(
                        {}, //SearchSampleCtrl.filterParams,
                        {
                            "wildcard": "",
                            "pagenum": 1,
                            "pagesize": 5
                        },
                        function (responseObj) {
                            $log.log('onSearch receive taxons for sample filter');
                            SearchSampleCtrl.taxonLeftList = {};
                            if (responseObj != null && responseObj.length != null) {
                                for (var i = 0; i < responseObj.length; i++) {
                                    SearchSampleCtrl.taxonLeftList[responseObj[i].taxonid] = responseObj[i];
                                }
                            }
                        });
                SearchSampleCtrl.typeList = GetTypeByFilterForSampleWS.gettype(
                        {}, //SearchSampleCtrl.filterParams,
                        {
                            "wildcard": "",
                            "pagenum": 1,
                            "pagesize": 5
                        },
                        function (responseObj) {
                            $log.log('onSearch receive type for study filter');
                            SearchSampleCtrl.typeLeftList = {};
                            if (responseObj != null && responseObj.length != null) {
                                for (var i = 0; i < responseObj.length; i++) {
                                    SearchSampleCtrl.typeLeftList[responseObj[i].typename] = responseObj[i];
                                }
                            }
                        });

                SearchSampleCtrl.submitterList = GetSubmitterByFilterForSampleWS.getsubmitter(
                        {}, //SearchSampleCtrl.filterParams,
                        {
                            "wildcard": "",
                            "pagenum": 1,
                            "pagesize": 5
                        },
                        function (responseObj) {
                            $log.log('onSearch receive submitter for experiment filter');
                            SearchSampleCtrl.submitterLeftList = {};
                            if (responseObj != null && responseObj.length != null) {
                                for (var i = 0; i < responseObj.length; i++) {
                                    SearchSampleCtrl.submitterLeftList[responseObj[i].submitterid] = responseObj[i];
                                }
                            }
                        });

                SearchSampleCtrl.instrumentList = GetInstrumentByFilterForSampleWS.getinstrument(
                        {}, //SearchSampleCtrl.filterParams,
                        {
                            "wildcard": "",
                            "pagenum": 1,
                            "pagesize": 5
                        },
                        function (responseObj) {
                            $log.log('onSearch receive instrument for experiment filter');
                            SearchSampleCtrl.instrumentLeftList = {};
                            if (responseObj != null && responseObj.length != null) {
                                for (var i = 0; i < responseObj.length; i++) {
                                    SearchSampleCtrl.instrumentLeftList[responseObj[i].instrumentid] = responseObj[i];
                                }
                            }
                        });


                GetTaxonsCountByFilterForSampleWS.count({},
                        {
                            "wildcard": "",
                            "pagenum": 1,
                            "pagesize": 5
                        },
                        function (responseObj) {
                            SearchSampleCtrl.taxonsCount = responseObj.value;
                            $log.log('receive response for taxonsCount:' + responseObj);
                        });

                GetTypeCountByFilterForSampleWS.count({},
                        {
                            "wildcard": "",
                            "pagenum": 1,
                            "pagesize": 5
                        },
                        function (responseObj) {
                            SearchSampleCtrl.typeCount = responseObj.value;
                            $log.log('receive response for typeCount:' + responseObj);
                        });


                GetSubmitterCountByFilterForSampleWS.count({},
                        {
                            "wildcard": "",
                            "pagenum": 1,
                            "pagesize": 5
                        },
                        function (responseObj) {
                            SearchSampleCtrl.submitterCount = responseObj.value;
                            $log.log('receive response for submitterCount:' + responseObj);
                        });

                GetInstrumentCountByFilterForSampleWS.count({},
                        {
                            "wildcard": "",
                            "pagenum": 1,
                            "pagesize": 5
                        },
                        function (responseObj) {
                            SearchSampleCtrl.instrumentCount = responseObj.value;
                            $log.log('receive response for instrumentCount:' + responseObj);
                        });




            };

            LoadFirstPage();

            SearchSampleCtrl.onSearch = function (searchVal) {
                $log.log('onSearch:' + searchVal);
                SearchSampleCtrl.searchInputObj = searchVal;

                SearchSampleCtrl.filterParams.taxonlist = [];
                SearchSampleCtrl.taxonChoseIds = [];
                SearchSampleCtrl.taxonsChose = [];

                SearchSampleCtrl.filterParams.typelist = [];
                SearchSampleCtrl.typeChoseIds = [];
                SearchSampleCtrl.typeChose = [];

                SearchSampleCtrl.filterParams.submitterlist = [];
                SearchSampleCtrl.submitterChoseIds = [];
                SearchSampleCtrl.submitterChose = [];

                SearchSampleCtrl.filterParams.instrumentlist = [];
                SearchSampleCtrl.instrumentChoseIds = [];
                SearchSampleCtrl.instrumentChose = [];
                if (searchVal) {
                    $log.log('onSearch:' + searchVal.originalObject.wordscol);
                    var searchStr = strtrim(searchVal.originalObject.wordscol);
                    SearchSampleCtrl.searchInputStr = searchStr;
                    $log.log('val:' + searchVal.originalObject.sacwords);
                    $log.log('after trim:' + searchStr);
                    if (searchStr === "") {
                        LoadFirstPage();
                    } else {
                        SearchSampleCtrl.filterParams.wildcard = searchStr;
                        SearchSampleCtrl.curPageItems = GetSampleDataByFilterWS.list(
                                SearchSampleCtrl.filterParams,
                                function (responseObj) {
                                    $log.log('onSearch recieve remote response on items:' + responseObj);
                                });

                        SearchSampleCtrl.taxonsList = GetTaxonsByFilterForSampleWS.gettaxons(
                                {}, //SearchSampleCtrl.filterParams,
                                {
                                    "wildcard": SearchSampleCtrl.searchInputStr,
                                    "pagenum": 1,
                                    "pagesize": 5
                                },
                                function (responseObj) {
                                    $log.log('onSearch receive taxons for sample filter');
                                    SearchSampleCtrl.taxonLeftList = {};
                                    if (responseObj != null && responseObj.length != null) {
                                        for (var i = 0; i < responseObj.length; i++) {
                                            SearchSampleCtrl.taxonLeftList[responseObj[i].taxonid] = responseObj[i];
                                        }
                                    }
                                });

                        SearchSampleCtrl.typeList = GetTypeByFilterForSampleWS.gettype(
                                {}, //SearchSampleCtrl.filterParams,
                                {
                                    "wildcard": SearchSampleCtrl.searchInputStr,
                                    "pagenum": 1,
                                    "pagesize": 5
                                },
                                function (responseObj) {
                                    $log.log('onSearch receive type for study filter');
                                    SearchSampleCtrl.typeLeftList = {};
                                    if (responseObj != null && responseObj.length != null) {
                                        for (var i = 0; i < responseObj.length; i++) {
                                            SearchSampleCtrl.typeLeftList[responseObj[i].typename] = responseObj[i];
                                        }
                                    }
                                });

                        SearchSampleCtrl.submitterList = GetSubmitterByFilterForSampleWS.getsubmitter(
                                {}, //SearchSampleCtrl.filterParams,
                                {
                                    "wildcard": SearchSampleCtrl.searchInputStr,
                                    "pagenum": 1,
                                    "pagesize": 5
                                },
                                function (responseObj) {
                                    $log.log('onSearch receive submitter for study filter');
                                    SearchSampleCtrl.submitterLeftList = {};
                                    if (responseObj != null && responseObj.length != null) {
                                        for (var i = 0; i < responseObj.length; i++) {
                                            SearchSampleCtrl.submitterLeftList[responseObj[i].submittername] = responseObj[i];
                                        }
                                    }
                                });

                        SearchSampleCtrl.instrumentList = GetInstrumentByFilterForSampleWS.getinstrument(
                                {}, //SearchSampleCtrl.filterParams,
                                {
                                    "wildcard": SearchSampleCtrl.searchInputStr,
                                    "pagenum": 1,
                                    "pagesize": 5
                                },
                                function (responseObj) {
                                    $log.log('onSearch receive instrument for study filter');
                                    SearchSampleCtrl.instrumentLeftList = {};
                                    if (responseObj != null && responseObj.length != null) {
                                        for (var i = 0; i < responseObj.length; i++) {
                                            SearchSampleCtrl.instrumentLeftList[responseObj[i].instrumentname] = responseObj[i];
                                        }
                                    }
                                });


                        SearchSampleCtrl.taxonsCount = 0;
                        GetTaxonsCountByFilterForSampleWS.count({},
                                {
                                    "wildcard": SearchSampleCtrl.searchInputStr
                                },
                                function (responseObj) {
                                    SearchSampleCtrl.taxonsCount = responseObj.value;
                                    $log.log('receive response for taxonsCount:' + responseObj);
                                });

                        SearchSampleCtrl.typeCount = 0;
                        GetTypeCountByFilterForSampleWS.count({},
                                {
                                    "wildcard": SearchSampleCtrl.searchInputStr
                                },
                                function (responseObj) {
                                    SearchSampleCtrl.typeCount = responseObj.value;
                                    $log.log('receive response for typeCount:' + responseObj);
                                });

                        SearchSampleCtrl.submitterCount = 0;
                        GetSubmitterCountByFilterForSampleWS.count({},
                                {
                                    "wildcard": SearchSampleCtrl.searchInputStr
                                },
                                function (responseObj) {
                                    SearchSampleCtrl.submitterCount = responseObj.value;
                                    $log.log('receive response for submitterCount:' + responseObj);
                                });

                        SearchSampleCtrl.instrumentCount = 0;
                        GetInstrumentCountByFilterForSampleWS.count({},
                                {
                                    "wildcard": SearchSampleCtrl.searchInputStr
                                },
                                function (responseObj) {
                                    SearchSampleCtrl.instrumentCount = responseObj.value;
                                    $log.log('receive response for instrumentCount:' + responseObj);
                                });

                        SampleCountByFilterWS.count(SearchSampleCtrl.filterParams,
                                function (responseObj) {
                                    SearchSampleCtrl.count = responseObj.value;
                                    $log.log('onSearch receive remote resposne on count:' + responseObj);
                                }
                        );

                    }//end else searchStr === ""
                }//end if searchVal
            };//end onSearch

            SearchSampleCtrl.pageChanged = function () {
                SearchSampleCtrl.filterParams.pagenum = SearchSampleCtrl.currentPage;
                SearchSampleCtrl.curPageItems = GetSampleDataByFilterWS.list(
                        SearchSampleCtrl.filterParams,
                        function (responseObj) {
                            $log.log('onSearch recieve remote response on items:' + responseObj);
                            //get Organism and Submitter from service
                            SearchSampleCtrl.OrganismList = [];
                            SearchSampleCtrl.taxonLoadList = {};
                            if (responseObj != null && responseObj.length != null) {
                                for (var i = 0; i < responseObj.length; i++) {
                                    SearchSampleCtrl.taxonLoadList = responseObj[i];
                                    var json = SearchSampleCtrl.taxonLoadList;
                                    var obj = angular.fromJson(json);
                                    SearchSampleCtrl.OrganismList[i] = obj.sampleAccession;
                                    $log.log('Loadfirstpage organism');
                                }
                            }//get sampleAccession by json
                            SearchSampleCtrl.Organism = [];
                            var filteraccession = {};
                            for (var j = 0; j < SearchSampleCtrl.OrganismList.length; j++) {
                                var filteraccession = {accessionlist: SearchSampleCtrl.OrganismList[j]};
                                SearchSampleCtrl.Organism[j] = GETSampleOrganismByacc.list({},
                                        filteraccession, function (responseObj) {
                                            $log.log('recieve remote response:' + responseObj);
                                        });
                            }//get taxonnamejson by sampleAccession
                            SearchSampleCtrl.Submitter = [];
                            var filtersample = {};
                            for (var j = 0; j < SearchSampleCtrl.OrganismList.length; j++) {
                                var filtersample = {accessionlist: SearchSampleCtrl.OrganismList[j]};
                                SearchSampleCtrl.Submitter[j] = GETSampleSubmissionByacc.list({},
                                        filtersample, function (responseObj) {
                                            $log.log('recieve remote response:' + responseObj);
                                        });
                            }//get submitternamejson by sampleAccession 
                            SearchSampleCtrl.Title = [];
                            var filtertitle = {};
                            for (var j = 0; j < SearchSampleCtrl.OrganismList.length; j++) {
                                var filtertitle = {accessionlist: SearchSampleCtrl.OrganismList[j]};
                                SearchSampleCtrl.Title[j] = GETSampleTitleByacc.list({},
                                        filtertitle, function (responseObj) {
                                            $log.log('recieve remote response:' + responseObj);
                                        });
                            }//get titlenamejson by sampleAccession 
                            SearchSampleCtrl.Studiesaccession = [];
                            var filterstudies = {};
                            for (var j = 0; j < SearchSampleCtrl.OrganismList.length; j++) {
                                var filterstudies = {accessionlist: SearchSampleCtrl.OrganismList[j]};
                                SearchSampleCtrl.Studiesaccession[j] = GETSampleStuidiesByacc.list({},
                                        filterstudies, function (responseObj) {
                                            $log.log('recieve remote response:' + responseObj);
                                        });
                            }//get studiesjson by sampleAccession 
                            $scope.GetTaxonname = function (accession) {
                            
                                return SearchSampleCtrl.Organism[accession];
                            }//show taxon name on web                          
                            $scope.GetSubmittername = function (accession) {
                            
                                return SearchSampleCtrl.Submitter[accession];
                            }//show submitter name on web  
                            $scope.GetTitle = function (accession) {
                            
                                return SearchSampleCtrl.Title[accession];
                            }//show title  on web 
                            $scope.GetStudies = function (accession) {
                            
                                return SearchSampleCtrl.Studiesaccession[accession];
                            }//show title  on web
//get Organism and Submitter from service
                        }
                );

                SampleCountByFilterWS.count()

            };//end pageChanged

            SearchSampleCtrl.openTaxonChooser = function () {
                var taxonChooserInst = $uibModal.open({
                    animation: true,
                    templateUrl: 'SearchStudy/tmpl/TaxonList4StudyChooser.html',
                    controller: 'TaxonList4StudyChooser',
                    size: 'lg',
                    resolve: {
                        TaxonWS: function () {
                            return GetTaxonsByFilterForSampleWS;
                        },
                        TaxonCountWS: function () {
                            return GetTaxonsCountByFilterForSampleWS;
                        },
                        TaxonChoseList: function () {
                            return SearchSampleCtrl.taxonsChose;
                        },
                        TaxonLeftList: function () {
                            return SearchSampleCtrl.taxonLeftList
                        },
                        StudyWildcard: function () {
                            return SearchSampleCtrl.searchInputStr;
                        }
                    }//end resolve
                });//end taxonChooserInst def

                taxonChooserInst.result.then(function (resultTaxonList) {
                    SearchSampleCtrl.taxonsChose = resultTaxonList;
                });//end taxonChooserInst reslt then
            };//end openTaxonChooser


            SearchSampleCtrl.openTypeChooser = function () {
                var typeChooserInst = $uibModal.open({
                    animation: true,
                    templateUrl: 'SearchStudy/tmpl/TypeList4StudyChooser.html',
                    controller: 'TypeList4StudyChooser',
                    size: 'lg',
                    resolve: {
                        TypeWS: function () {
                            return GetTypeByFilterForSampleWS;
                        },
                        TypeCountWS: function () {
                            return GetTypeCountByFilterForSampleWS;
                        },
                        TypeChoseList: function () {
                            return SearchSampleCtrl.typeChose;
                        },
                        TypeLeftList: function () {
                            return SearchSampleCtrl.typeLeftList
                        },
                        StudyWildcard: function () {
                            return SearchSampleCtrl.searchInputStr;
                        }
                    }//end resolve
                });//end typeChooserInst def

                typeChooserInst.result.then(function (resultTypeList) {
                    SearchSampleCtrl.typeChose = resultTypeList;
                });//end typeChooserInst reslt then
            };//end openTypeChooser

            SearchSampleCtrl.openSubmitterChooser = function () {
                var submitterChooserInst = $uibModal.open({
                    animation: true,
                    templateUrl: 'SearchStudy/tmpl/SubmitterList4StudyChooser.html',
                    controller: 'SubmitterList4StudyChooser',
                    size: 'lg',
                    resolve: {
                        SubmitterWS: function () {
                            return GetSubmitterByFilterForSampleWS;
                        },
                        SubmitterCountWS: function () {
                            return GetSubmitterCountByFilterForSampleWS;
                        },
                        SubmitterChoseList: function () {
                            return SearchSampleCtrl.submitterChose;
                        },
                        SubmitterLeftList: function () {
                            return SearchSampleCtrl.submitterLeftList
                        },
                        StudyWildcard: function () {
                            return SearchSampleCtrl.searchInputStr;
                        }
                    }//end resolve
                });//end submitterChooserInst def

                submitterChooserInst.result.then(function (resultSubmitterList) {
                    SearchSampleCtrl.submitterChose = resultSubmitterList;
                });//end submitterChooserInst reslt then
            };//end openSubmitterChooser

            SearchSampleCtrl.openInstrumentChooser = function () {
                var instrumentChooserInst = $uibModal.open({
                    animation: true,
                    templateUrl: 'SearchStudy/tmpl/InstrumentList4StudyChooser.html',
                    controller: 'InstrumentList4StudyChooser',
                    size: 'lg',
                    resolve: {
                        InstrumentWS: function () {
                            return GetInstrumentByFilterForSampleWS;
                        },
                        InstrumentCountWS: function () {
                            return GetInstrumentCountByFilterForSampleWS;
                        },
                        InstrumentChoseList: function () {
                            return SearchSampleCtrl.instrumentChose;
                        },
                        InstrumentLeftList: function () {
                            return SearchSampleCtrl.instrumentLeftList
                        },
                        StudyWildcard: function () {
                            return SearchSampleCtrl.searchInputStr;
                        }
                    }//end resolve
                });//end instrumentChooserInst def

                instrumentChooserInst.result.then(function (resultInstrumentList) {
                    SearchSampleCtrl.instrumentChose = resultInstrumentList;
                });//end instrumentChooserInst reslt then
            };//end openInstrumentChooser



            SearchSampleCtrl.onFilter = function () {
                //Generate the list for taxons
                $log.log("onFilter");
                var taxonIDList = [];
                for (var i = 0; i < SearchSampleCtrl.taxonsChose.length; i++) {
                    taxonIDList.push(SearchSampleCtrl.taxonsChose[i].taxonid);
                }
                SearchSampleCtrl.taxonChoseIds = taxonIDList;
                SearchSampleCtrl.filterParams.taxonlist = SearchSampleCtrl.taxonChoseIds;

                var typeIDList = [];
                for (var i = 0; i < SearchSampleCtrl.typeChose.length; i++) {
                    typeIDList.push(SearchSampleCtrl.typeChose[i].typename);
                }
                SearchSampleCtrl.typeChoseIds = typeIDList;
                SearchSampleCtrl.filterParams.typelist = SearchSampleCtrl.typeChoseIds;

                var submitterIDList = [];
                for (var i = 0; i < SearchSampleCtrl.submitterChose.length; i++) {
                    submitterIDList.push(SearchSampleCtrl.submitterChose[i].submittername);
                }
                SearchSampleCtrl.submitterChoseIds = submitterIDList;
                SearchSampleCtrl.filterParams.submitterlist = SearchSampleCtrl.submitterChoseIds;

                var instrumentIDList = [];
                for (var i = 0; i < SearchSampleCtrl.instrumentChose.length; i++) {
                    instrumentIDList.push(SearchSampleCtrl.instrumentChose[i].instrumentname);
                }
                SearchSampleCtrl.instrumentChoseIds = instrumentIDList;
                SearchSampleCtrl.filterParams.instrumentlist = SearchSampleCtrl.instrumentChoseIds;

                SearchSampleCtrl.filterParams.pagenum = SearchSampleCtrl.current;
                SearchSampleCtrl.curPageItems = GetSampleDataByFilterWS.list(
                        SearchSampleCtrl.filterParams,
                        function (responseObj) {
                            $log.log('onSearch recieve remote response on items:' + responseObj);
                            //get Organism and Submitter from service
                            SearchSampleCtrl.OrganismList = [];
                            SearchSampleCtrl.taxonLoadList = {};
                            if (responseObj != null && responseObj.length != null) {
                                for (var i = 0; i < responseObj.length; i++) {
                                    SearchSampleCtrl.taxonLoadList = responseObj[i];
                                    var json = SearchSampleCtrl.taxonLoadList;
                                    var obj = angular.fromJson(json);
                                    SearchSampleCtrl.OrganismList[i] = obj.sampleAccession;
                                    $log.log('Loadfirstpage organism');
                                }
                            }//get sampleAccession by json
                            SearchSampleCtrl.Organism = [];
                            var filteraccession = {};
                            for (var j = 0; j < SearchSampleCtrl.OrganismList.length; j++) {
                                var filteraccession = {accessionlist: SearchSampleCtrl.OrganismList[j]};
                                SearchSampleCtrl.Organism[j] = GETSampleOrganismByacc.list({},
                                        filteraccession, function (responseObj) {
                                            $log.log('recieve remote response:' + responseObj);
                                        });
                            }//get taxonnamejson by sampleAccession
                            SearchSampleCtrl.Submitter = [];
                            var filtersample = {};
                            for (var j = 0; j < SearchSampleCtrl.OrganismList.length; j++) {
                                var filtersample = {accessionlist: SearchSampleCtrl.OrganismList[j]};
                                SearchSampleCtrl.Submitter[j] = GETSampleSubmissionByacc.list({},
                                        filtersample, function (responseObj) {
                                            $log.log('recieve remote response:' + responseObj);
                                        });
                            }//get submitternamejson by sampleAccession 
                            SearchSampleCtrl.Title = [];
                            var filtertitle = {};
                            for (var j = 0; j < SearchSampleCtrl.OrganismList.length; j++) {
                                var filtertitle = {accessionlist: SearchSampleCtrl.OrganismList[j]};
                                SearchSampleCtrl.Title[j] = GETSampleTitleByacc.list({},
                                        filtertitle, function (responseObj) {
                                            $log.log('recieve remote response:' + responseObj);
                                        });
                            }//get titlenamejson by sampleAccession 
                            SearchSampleCtrl.Studiesaccession = [];
                            var filterstudies = {};
                            for (var j = 0; j < SearchSampleCtrl.OrganismList.length; j++) {
                                var filterstudies = {accessionlist: SearchSampleCtrl.OrganismList[j]};
                                SearchSampleCtrl.Studiesaccession[j] = GETSampleStuidiesByacc.list({},
                                        filterstudies, function (responseObj) {
                                            $log.log('recieve remote response:' + responseObj);
                                        });
                            }//get studiesjson by sampleAccession 
                            $scope.GetTaxonname = function (accession) {
                            
                                return SearchSampleCtrl.Organism[accession];
                            }//show taxon name on web                          
                            $scope.GetSubmittername = function (accession) {
                            
                                return SearchSampleCtrl.Submitter[accession];
                            }//show submitter name on web  
                            $scope.GetTitle = function (accession) {
                            
                                return SearchSampleCtrl.Title[accession];
                            }//show title  on web 
                            $scope.GetStudies = function (accession) {
                            
                                return SearchSampleCtrl.Studiesaccession[accession];
                            }//show title  on web
//get Organism and Submitter from service
                        }
                );

                SampleCountByFilterWS.count(SearchSampleCtrl.filterParams,
                        function (responseObj) {
                            SearchSampleCtrl.count = responseObj.value;
                            $log.log('onSearch receive remote resposne on count:' + responseObj);
                        }
                );
            };//end onFilter
        }
);

