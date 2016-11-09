/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';


var entitySubmissionModule = angular.module('XYWorkbench.Submission');
entitySubmissionModule.controller('SubmissionListPaginationCtrl',
        function ($log, GetSubDataByPageWS, SubCountWS, BackendAddr, ISDEBUG) {
            var SubmissionListPaginationCtrl = this;
            SubmissionListPaginationCtrl.BackendAddr = BackendAddr;
            SubmissionListPaginationCtrl.pageSize = 10;
            SubmissionListPaginationCtrl.is_debug = ISDEBUG;
            SubmissionListPaginationCtrl.count = 0;

            $log.log("SubmissionListPaginationCtrl Loaded");

            var LoadFirstPage = function () {
                $log.log('Load first page for Submission');

                SubmissionListPaginationCtrl.curPageItems = GetSubDataByPageWS.list(
                        {pagenum: '1', pagesize: SubmissionListPaginationCtrl.pageSize}, {},
                        function (responseObj) {
                            $log.log('recieve remote response:' + responseObj);
                        });

                SubCountWS.count({},
                        function (responseObj) {
                            SubmissionListPaginationCtrl.count = responseObj.value;
                            $log.log("count response:" + responseObj);
                        });

            };

            LoadFirstPage();



            SubmissionListPaginationCtrl.pageChanged = function () {
                SubmissionListPaginationCtrl.curPageItems = GetSubDataByPageWS.list(
                        {entity: 'submission', pagenum: SubmissionListPaginationCtrl.currentPage,
                            pagesize: SubmissionListPaginationCtrl.pageSize},
                        {},
                        function (responseObj) {
                            $log.log('page for [' + SubmissionListPaginationCtrl.currentPage + ']');
                            $log.log('recieve remote response:' + responseObj);
                        });
            };//end pageChanged

        });



