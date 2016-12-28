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
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';


var entityClusterFileModule = angular.module('XYWorkbench.ClusterFile');
entityClusterFileModule.controller('ClusterFileListCtrl',
        function ($log, GetClusterFileDataByPageWS, ClusterFileCountWS, BackendAddr, ISDEBUG) {
            var ClusterFileListCtrl = this;
            ClusterFileListCtrl.BackendAddr = BackendAddr;
            ClusterFileListCtrl.pageSize = 15;
            ClusterFileListCtrl.is_debug = ISDEBUG;
            ClusterFileListCtrl.count = 0;

            $log.log("ClusterFileListCtrl Loaded");

            var LoadFirstPage = function () {
                $log.log('Load first page for ClusterFile');

                ClusterFileListCtrl.curPageItems = GetClusterFileDataByPageWS.list(
                        {pagenum: '1', pagesize: ClusterFileListCtrl.pageSize}, {},
                        function (responseObj) {
                            $log.log('recieve remote response:' + responseObj);
                        });

                ClusterFileCountWS.count({},
                        function (responseObj) {
                            ClusterFileListCtrl.count = responseObj.value;
                            $log.log("count response:" + responseObj);
                        });

            };

            LoadFirstPage();



            ClusterFileListCtrl.pageChanged = function () {
                ClusterFileListCtrl.curPageItems = GetClusterFileDataByPageWS.list(
                        {entity: 'sra', pagenum: ClusterFileListCtrl.currentPage,
                            pagesize: ClusterFileListCtrl.pageSize},
                        {},
                        function (responseObj) {
                            $log.log('page for [' + ClusterFileListCtrl.currentPage + ']');
                            $log.log('recieve remote response:' + responseObj);
                        });
            };//end pageChanged



        });





