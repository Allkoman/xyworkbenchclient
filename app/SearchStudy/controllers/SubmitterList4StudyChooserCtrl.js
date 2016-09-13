/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

var entitySearchStudyModule = angular.module('XYWorkbench.SearchStudy');
entitySearchStudyModule.controller('SubmitterList4StudyChooser',
        function ($scope, $uibModalInstance, $log,
                SubmitterWS, //<--GetSubmittersByFilterForStudyWS
                SubmitterCountWS, //<--GetSubmittersCountByFilterForStudyWS
                SubmitterChoseList, SubmitterLeftList,
                StudyWildcard,
                ISDEBUG) {
            var ModalInstanceCtrl = this;
            $scope.is_debug = ISDEBUG;
            $scope.SubmitterChoseList = SubmitterChoseList;
            $scope.submitterList = null;
            $scope.submitterCount = 0;                        
            $scope.pageSize = 10;
            $scope.currentPage = 1;
            
            $scope.idselected = null;

            $scope.selectrow = function (tarid) {
                $scope.idselected = tarid;
                $log.log('selectrow:' + tarid);
            }

            $scope.submitterList = SubmitterWS.getsubmitter(
                    {}, //SearchStudyCtrl.filterParams,
                    {
                        "wildcard": StudyWildcard,
                        "pagenum": 1,
                        "pagesize": $scope.pageSize
                    },
                    function (responseObj) {
                        $log.log('SubmitterList4StudyChooser: onSearch receive submitter for study filter');
                    }
            );//end submitterList

            
            SubmitterCountWS.count({},
                {
                    "wildcard": StudyWildcard
                },
                function (responseObj) {
                    $scope.submitterCount = responseObj.value;
                    $log.log('receive response for submitterCount:' + responseObj);
                }
            );//end submitter


            $scope.pageChanged = function(){
                $scope.submitterList = SubmitterWS.getsubmitter(
                    {}, //SearchStudyCtrl.filterParams,
                    {
                        "wildcard": StudyWildcard,
                        "pagenum": $scope.currentPage,
                        "pagesize": $scope.pageSize
                    },
                    function (responseObj) {
                        $log.log('SubmitterList4StudyChooser: onSearch receive submitter for study filter');
                    }
                );//end submitterList
            };//end pageChanged
            
            $scope.checkSubmitter=function(item,checked,name){
                $log.log('checkSubmitter');
                $log.log("id:"+item.submittername+" value:"+checked+ " name:"+name);
                if(checked){
                    $log.log(item+' is set to be true');
                    if(!(item.submittername in SubmitterLeftList)){
                        $log.log(item.submittername+'is NOT in SubmitterLeftList');
                        SubmitterLeftList[item.submittername] = item;//{submittername:item.ta,studySubmitter:name};
                    }else{
                        $log.log(item.submittername+'is in SubmitterLeftList');
                    }
                }
                
            };//end check

            $scope.ok = function () {
                //$uibModalInstance.close($scope.selected.item);
                $uibModalInstance.close($scope.SubmitterChoseList);
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        });


