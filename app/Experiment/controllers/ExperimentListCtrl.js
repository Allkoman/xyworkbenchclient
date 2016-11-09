
'use strict';


var entityExperimentModule = angular.module('XYWorkbench.Experiment');
entityExperimentModule.controller('ExperimentListCtrl',
        function ($log, GetExperimentDataByPageWS, ExperimentCountWS, BackendAddr, ISDEBUG, Experiments) {
            var ExperimentListCtrl = this;
            ExperimentListCtrl.BackendAddr = BackendAddr;
            ExperimentListCtrl.pageSize = 15;
            ExperimentListCtrl.is_debug = ISDEBUG;
            ExperimentListCtrl.count = 0;

            $log.log("ExperimentListCtrl Loaded");

            var LoadFirstPage = function () {
                $log.log('Load first page for Experiment');

                ExperimentListCtrl.curPageItems = GetExperimentDataByPageWS.list(
                        {pagenum: '1', pagesize: ExperimentListCtrl.pageSize}, {},
                        function (responseObj) {
                            $log.log('recieve remote response:' + responseObj);
                        });

                ExperimentCountWS.count({},
                        function (responseObj) {
                            ExperimentListCtrl.count = responseObj.value;
                            $log.log("count response:" + responseObj);
                        });

            };

            LoadFirstPage();



            ExperimentListCtrl.pageChanged = function () {
                ExperimentListCtrl.curPageItems = GetExperimentDataByPageWS.list(
                        {entity: 'sra', pagenum: ExperimentListCtrl.currentPage,
                            pagesize: ExperimentListCtrl.pageSize},
                        {},
                        function (responseObj) {
                            $log.log('page for [' + ExperimentListCtrl.currentPage + ']');
                            $log.log('recieve remote response:' + responseObj);
                        });
            };//end pageChanged

            ExperimentListCtrl.delExperiment = function (tar_experimentId, tar_index) {
                $log.log('Del id:' + tar_experimentId + ' index:' + tar_index);
                Experiments.delete({id: tar_experimentId}, function () {
                    $log.log('After Del');
                    ExperimentListCtrl.curPageItems.splice(tar_index, 1);
                });
            };
      
        });



