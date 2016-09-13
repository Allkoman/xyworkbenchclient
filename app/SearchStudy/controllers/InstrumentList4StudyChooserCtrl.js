/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

var entitySearchStudyModule = angular.module('XYWorkbench.SearchStudy');
entitySearchStudyModule.controller('InstrumentList4StudyChooser',
        function ($scope, $uibModalInstance, $log,
                InstrumentWS, //<--GetInstrumentsByFilterForStudyWS
                InstrumentCountWS, //<--GetInstrumentsCountByFilterForStudyWS
                InstrumentChoseList, InstrumentLeftList,
                StudyWildcard,
                ISDEBUG) {
            var ModalInstanceCtrl = this;
            $scope.is_debug = ISDEBUG;
            $scope.InstrumentChoseList = InstrumentChoseList;
            $scope.instrumentList = null;
            $scope.instrumentCount = 0;                        
            $scope.pageSize = 10;
            $scope.currentPage = 1;
            
            $scope.idselected = null;

            $scope.selectrow = function (tarid) {
                $scope.idselected = tarid;
                $log.log('selectrow:' + tarid);
            }

            $scope.instrumentList = InstrumentWS.getinstrument(
                    {}, //SearchStudyCtrl.filterParams,
                    {
                        "wildcard": StudyWildcard,
                        "pagenum": 1,
                        "pagesize": $scope.pageSize
                    },
                    function (responseObj) {
                        $log.log('InstrumentList4StudyChooser: onSearch receive instrument for study filter');
                    }
            );//end instrumentList

            
            InstrumentCountWS.count({},
                {
                    "wildcard": StudyWildcard
                },
                function (responseObj) {
                    $scope.instrumentCount = responseObj.value;
                    $log.log('receive response for instrumentCount:' + responseObj);
                }
            );//end instrument


            $scope.pageChanged = function(){
                $scope.instrumentList = InstrumentWS.getinstrument(
                    {}, //SearchStudyCtrl.filterParams,
                    {
                        "wildcard": StudyWildcard,
                        "pagenum": $scope.currentPage,
                        "pagesize": $scope.pageSize
                    },
                    function (responseObj) {
                        $log.log('InstrumentList4StudyChooser: onSearch receive instrument for study filter');
                    }
                );//end instrumentList
            };//end pageChanged
            
            $scope.checkInstrument=function(item,checked,name){
                $log.log('checkInstrument');
                $log.log("id:"+item.instrumentname+" value:"+checked+ " name:"+name);
                if(checked){
                    $log.log(item+' is set to be true');
                    if(!(item.instrumentname in InstrumentLeftList)){
                        $log.log(item.instrumentname+'is NOT in InstrumentLeftList');
                        InstrumentLeftList[item.instrumentname] = item;//{instrumentname:item.ta,studyInstrument:name};
                    }else{
                        $log.log(item.instrumentname+'is in InstrumentLeftList');
                    }
                }
                
            };//end check

            $scope.ok = function () {
                //$uibModalInstance.close($scope.selected.item);
                $uibModalInstance.close($scope.InstrumentChoseList);
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        });


