/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';


var entityStudyModule = angular.module('XYWorkbench.Study');
entityStudyModule.controller('StudyListPaginationCtrl',
        function ($log, GetHRDADataByPageWS, HRDACountWS, BackendAddr, ISDEBUG) {
            var StudyListPaginationCtrl = this;
            StudyListPaginationCtrl.BackendAddr = BackendAddr;
            StudyListPaginationCtrl.pageSize = 10;
            StudyListPaginationCtrl.is_debug = ISDEBUG;
            StudyListPaginationCtrl.count = 0;

            $log.log("StudyListPaginationCtrl Loaded");

            var LoadFirstPage = function () {
                $log.log('Load first page for Study');

                StudyListPaginationCtrl.curPageItems = GetHRDADataByPageWS.list(
                        {entity:'study',pagenum: '1', pagesize: StudyListPaginationCtrl.pageSize}, {},
                        function (responseObj) {
                            $log.log('recieve remote response:' + responseObj);
                        });

                HRDACountWS.count( {entity: 'study'},{},
                        function (responseObj) {
                            StudyListPaginationCtrl.count = responseObj.value;
                            $log.log("count response:" + responseObj);
                        });

            };

            LoadFirstPage();



            StudyListPaginationCtrl.pageChanged = function () {
                StudyListPaginationCtrl.curPageItems = GetHRDADataByPageWS.list(
                        {entity: 'study', pagenum: StudyListPaginationCtrl.currentPage,
                            pagesize: StudyListPaginationCtrl.pageSize},
                        {},
                        function (responseObj) {
                            $log.log('page for [' + StudyListPaginationCtrl.currentPage + ']');
                            $log.log('recieve remote response:' + responseObj);
                        });
            };//end pageChanged

        });




