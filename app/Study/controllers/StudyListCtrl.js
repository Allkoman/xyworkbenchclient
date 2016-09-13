
'use strict';


var entityStudyModule = angular.module('XYWorkbench.Study');
entityStudyModule.controller('StudyListCtrl',
        function ($log, GetHRDADataByPageWS, HRDACountWS, BackendAddr, ISDEBUG, Studies) {
            var StudyListCtrl = this;
            StudyListCtrl.BackendAddr = BackendAddr;
            StudyListCtrl.pageSize = 15;
            StudyListCtrl.is_debug = ISDEBUG;
            StudyListCtrl.count = 0;

            $log.log("StudyListCtrl Loaded");

            var LoadFirstPage = function () {
                $log.log('Load first page for Study');

                StudyListCtrl.curPageItems = GetHRDADataByPageWS.list(
                        {entity: 'study',pagenum: '1', pagesize: StudyListCtrl.pageSize}, {},
                        function (responseObj) {
                            $log.log('recieve remote response:' + responseObj);
                        });

                HRDACountWS.count(
                        {entity: 'study'},{},
                        function (responseObj) {
                            StudyListCtrl.count = responseObj.value;
                            $log.log("count response:" + responseObj);
                        });

            };

            LoadFirstPage();

            StudyListCtrl.pageChanged = function () {
                StudyListCtrl.curPageItems = GetHRDADataByPageWS.list(
                        {entity: 'study', pagenum: StudyListCtrl.currentPage,
                            pagesize: StudyListCtrl.pageSize},
                        {},
                        function (responseObj) {
                            $log.log('page for [' + StudyListCtrl.currentPage + ']');
                            $log.log('recieve remote response:' + responseObj);
                        });
            };//end pageChanged

            StudyListCtrl.delStudy = function (tar_studyId, tar_index) {
                $log.log('Del id:' + tar_studyId + ' index:' + tar_index);
                Studies.delete({id: tar_studyId}, function () {
                    $log.log('After Del');
                    StudyListCtrl.curPageItems.splice(tar_index, 1);
                });
            };

        });



