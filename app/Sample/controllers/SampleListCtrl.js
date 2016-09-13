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


var entitySampleModule = angular.module('XYWorkbench.Sample');
entitySampleModule.controller('SampleListCtrl',
        function ($log, GetSampleDataByPageWS, SampleCountWS, BackendAddr, ISDEBUG, Samples) {
            var SampleListCtrl = this;
            SampleListCtrl.BackendAddr = BackendAddr;
            SampleListCtrl.pageSize = 15;
            SampleListCtrl.is_debug = ISDEBUG;
            SampleListCtrl.count = 0;

            $log.log("SampleListCtrl Loaded");

            var LoadFirstPage = function () {
                $log.log('Load first page for Sample');

                SampleListCtrl.curPageItems = GetSampleDataByPageWS.list(
                        {pagenum: '1', pagesize: SampleListCtrl.pageSize}, {},
                        function (responseObj) {
                            $log.log('recieve remote response:' + responseObj);
                        });

                SampleCountWS.count({},
                        function (responseObj) {
                            SampleListCtrl.count = responseObj.value;
                            $log.log("count response:" + responseObj);
                        });

            };

            LoadFirstPage();



            SampleListCtrl.pageChanged = function () {
                SampleListCtrl.curPageItems = GetSampleDataByPageWS.list(
                        {entity: 'sra', pagenum: SampleListCtrl.currentPage,
                            pagesize: SampleListCtrl.pageSize},
                        {},
                        function (responseObj) {
                            $log.log('page for [' + SampleListCtrl.currentPage + ']');
                            $log.log('recieve remote response:' + responseObj);
                        });
            };//end pageChanged

            SampleListCtrl.delSample = function (tar_sampleId, tar_index) {
                $log.log('Del id:' + tar_sampleId + ' index:' + tar_index);
                Samples.delete({id: tar_sampleId}, function () {
                    $log.log('After Del');
                    SampleListCtrl.curPageItems.splice(tar_index, 1);
                });
            };

        });



