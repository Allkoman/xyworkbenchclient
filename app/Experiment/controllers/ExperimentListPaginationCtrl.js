/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';


var entityExperimentModule = angular.module('XYWorkbench.Experiment');
entityExperimentModule.controller('ExperimentListPaginationCtrl',
        function ($log, GetExperimentDataByPageWS, ExperimentCountWS, BackendAddr, ISDEBUG) {
            var ExperimentListPaginationCtrl = this;
            ExperimentListPaginationCtrl.BackendAddr = BackendAddr;
            ExperimentListPaginationCtrl.pageSize = 10;
            ExperimentListPaginationCtrl.is_debug = ISDEBUG;
            ExperimentListPaginationCtrl.count = 0;

            $log.log("ExperimentListPaginationCtrl Loaded");

            var LoadFirstPage = function () {
                $log.log('Load first page for Experiment');

                ExperimentListPaginationCtrl.curPageItems = GetExperimentDataByPageWS.list(
                        {pagenum: '1', pagesize: ExperimentListPaginationCtrl.pageSize}, {},
                        function (responseObj) {
                            $log.log('recieve remote response:' + responseObj);
                        });

                ExperimentCountWS.count({},
                        function (responseObj) {
                            ExperimentListPaginationCtrl.count = responseObj.value;
                            $log.log("count response:" + responseObj);
                        });

            };

            LoadFirstPage();



            ExperimentListPaginationCtrl.pageChanged = function () {
                ExperimentListPaginationCtrl.curPageItems = GetExperimentDataByPageWS.list(
                        {entity: 'experiment', pagenum: ExperimentListPaginationCtrl.currentPage,
                            pagesize: ExperimentListPaginationCtrl.pageSize},
                        {},
                        function (responseObj) {
                            $log.log('page for [' + ExperimentListPaginationCtrl.currentPage + ']');
                            $log.log('recieve remote response:' + responseObj);
                        });
            };//end pageChanged

        });




