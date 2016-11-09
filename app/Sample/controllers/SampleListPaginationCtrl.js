/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';


var entitySampleModule = angular.module('XYWorkbench.Sample');
entitySampleModule.controller('SampleListPaginationCtrl',
        function ($log, GetSampleDataByPageWS, SampleCountWS, BackendAddr, ISDEBUG) {
            var SampleListPaginationCtrl = this;
            SampleListPaginationCtrl.BackendAddr = BackendAddr;
            SampleListPaginationCtrl.pageSize = 10;
            SampleListPaginationCtrl.is_debug = ISDEBUG;
            SampleListPaginationCtrl.count = 0;

            $log.log("SampleListPaginationCtrl Loaded");

            var LoadFirstPage = function () {
                $log.log('Load first page for Sample');

                SampleListPaginationCtrl.curPageItems = GetSampleDataByPageWS.list(
                        {pagenum: '1', pagesize: SampleListPaginationCtrl.pageSize}, {},
                        function (responseObj) {
                            $log.log('recieve remote response:' + responseObj);
                        });

                SampleCountWS.count({},
                        function (responseObj) {
                            SampleListPaginationCtrl.count = responseObj.value;
                            $log.log("count response:" + responseObj);
                        });

            };

            LoadFirstPage();



            SampleListPaginationCtrl.pageChanged = function () {
                SampleListPaginationCtrl.curPageItems = GetSampleDataByPageWS.list(
                        {entity: 'sample', pagenum: SampleListPaginationCtrl.currentPage,
                            pagesize: SampleListPaginationCtrl.pageSize},
                        {},
                        function (responseObj) {
                            $log.log('page for [' + SampleListPaginationCtrl.currentPage + ']');
                            $log.log('recieve remote response:' + responseObj);
                        });
            };//end pageChanged

        });




