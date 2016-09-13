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


var entityRunModule = angular.module('XYWorkbench.Run');
entityRunModule.controller('RunListCtrl',
        function ($log, GetRunDataByPageWS, RunCountWS, BackendAddr, ISDEBUG, Runs) {
            var RunListCtrl = this;
            RunListCtrl.BackendAddr = BackendAddr;
            RunListCtrl.pageSize = 15;
            RunListCtrl.is_debug = ISDEBUG;
            RunListCtrl.count = 0;

            $log.log("RunListCtrl Loaded");

            var LoadFirstPage = function () {
                $log.log('Load first page for Run');

                RunListCtrl.curPageItems = GetRunDataByPageWS.list(
                        {pagenum: '1', pagesize: RunListCtrl.pageSize}, {},
                        function (responseObj) {
                            $log.log('recieve remote response:' + responseObj);
                        });

                RunCountWS.count({},
                        function (responseObj) {
                            RunListCtrl.count = responseObj.value;
                            $log.log("count response:" + responseObj);
                        });

            };

            LoadFirstPage();



            RunListCtrl.pageChanged = function () {
                RunListCtrl.curPageItems = GetRunDataByPageWS.list(
                        {entity: 'sra', pagenum: RunListCtrl.currentPage,
                            pagesize: RunListCtrl.pageSize},
                        {},
                        function (responseObj) {
                            $log.log('page for [' + RunListCtrl.currentPage + ']');
                            $log.log('recieve remote response:' + responseObj);
                        });
            };//end pageChanged

            RunListCtrl.delRun = function (tar_runId, tar_index) {
                $log.log('Del id:' + tar_runId + ' index:' + tar_index);
                Runs.delete({id: tar_runId}, function () {
                    $log.log('After Del');
                    RunListCtrl.curPageItems.splice(tar_index, 1);
                });
            };

        });



