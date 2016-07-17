/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';


var entitySearchModule = angular.module('XYWorkbench.Search');
entitySearchModule.controller('SearchStudyCtrl',
        function ($log, GetHRDADataByPageWS, HRDACountWS,BackendAddr,
                GetHRDADataByFilterWS,HRDACountByFilterWS,
                ISDEBUG) {
            var SearchStudyCtrl = this;
            SearchStudyCtrl.BackendAddr = BackendAddr;
            SearchStudyCtrl.pageSize = 20;
            SearchStudyCtrl.is_debug = ISDEBUG;
            SearchStudyCtrl.count = 0;
            SearchStudyCtrl.searchInputStr = "";
            
            var strtrim = function (str_in) {
                return str_in.replace(/(^\s*)|(\s*$)/g, "");
            };

            SearchStudyCtrl.filterParams = {
                    "wildcard":         SearchStudyCtrl.searchInputStr,
                    "pagenum":          1,
                    "pagesize":         SearchStudyCtrl.pageSize                    
                };


            $log.log("SearchStudyCtrl Loaded");

            var LoadFirstPage = function () {
                $log.log('Load first page for study');

                SearchStudyCtrl.curPageItems = GetHRDADataByPageWS.list(
                        {entity: 'study', pagenum: '1', pagesize: SearchStudyCtrl.pageSize}, {},
                        function (responseObj) {
                            $log.log('recieve remote response:' + responseObj);
                        });


                HRDACountWS.count({entity: "study"}, {},
                        function (responseObj) {
                            SearchStudyCtrl.count = responseObj.value;
                            $log.log("count response:" + responseObj);
                        });

            };

            LoadFirstPage();
            
            SearchStudyCtrl.onSearch = function(searchVal){
                $log.log('onSearch:' + searchVal);
                if (searchVal){

                    var searchStr = strtrim(searchVal.originalObject.wordscol);
                    SearchStudyCtrl.searchInputStr = searchStr;
                    $log.log('val:' + searchVal.originalObject.sacwords);
                    $log.log('after trim:' + searchStr);
                    if (searchStr === ""){
                        LoadFirstPage();
                    } else{
                        SearchStudyCtrl.filterParams.wildcard = searchStr;
                        SearchStudyCtrl.curPageItems = GetHRDADataByFilterWS.list(
                            {entity:'study'},SearchStudyCtrl.filterParams,
                            function (responseObj) {
                                $log.log('onSearch recieve remote response on items:' + responseObj);
                            });
                            
                        HRDACountByFilterWS.count({entity:'study'},SearchStudyCtrl.filterParams,
                            function(responseObj){
                                SearchStudyCtrl.count = responseObj.value;
                                $log.log('onSearch receive remote resposne on count:' + responseObj);
                            }
                            );

                    }//end else searchStr === ""
                }//end if searchVal
            };//end onSearch

            SearchStudyCtrl.pageChanged = function () {
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
                 $log.log("onPageChanged for page[" + SearchStudyCtrl.currentPage + "]");
                 
                 SearchStudyCtrl.filterParamObj.pagenum = SearchRsltListCtrl.currentPage;// = filterParams;
                 SearchStudyCtrl.curPageItems = SearchByParamsWS.search(
                 SearchRsltListCtrl.filterParamObj,
                 function (response) {
                 $log.log("onPageChanged: receive response from server for page[" +
                 SearchRsltListCtrl.currentPage + "]");
                 });
                 */
                SearchStudyCtrl.curPageItems = GetHRDADataByPageWS.list(
                        {entity: 'study', pagenum: SearchStudyCtrl.currentPage, 
                         pagesize: SearchStudyCtrl.pageSize},
                        {},
                        function (responseObj) {
                            $log.log('page for ['+SearchStudyCtrl.currentPage+']');
                            $log.log('recieve remote response:' + responseObj);

                        });
                        
                HRDACountByFilterWS.count()
            };
        }
);

