/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

var entitySearchStudyModule = angular.module('XYWorkbench.SearchStudy');
entitySearchStudyModule.controller('TypeList4StudyChooser',
        function ($scope, $uibModalInstance, $log,
                TypeWS, //<--GetTypesByFilterForStudyWS
                TypeCountWS, //<--GetTypesCountByFilterForStudyWS
                TypeChoseList, TypeLeftList,
                StudyWildcard,
                ISDEBUG) {
            var ModalInstanceCtrl = this;
            $scope.is_debug = ISDEBUG;
            $scope.TypeChoseList = TypeChoseList;
            $scope.typeList = null;
            $scope.typeCount = 0;                        
            $scope.pageSize = 10;
            $scope.currentPage = 1;
            
            $scope.idselected = null;

            $scope.selectrow = function (tarid) {
                $scope.idselected = tarid;
                $log.log('selectrow:' + tarid);
            }

            $scope.typeList = TypeWS.gettype(
                    {}, //SearchStudyCtrl.filterParams,
                    {
                        "wildcard": StudyWildcard,
                        "pagenum": 1,
                        "pagesize": $scope.pageSize
                    },
                    function (responseObj) {
                        $log.log('TypeList4StudyChooser: onSearch receive type for study filter');
                    }
            );//end typeList

            
            TypeCountWS.count({},
                {
                    "wildcard": StudyWildcard
                },
                function (responseObj) {
                    $scope.typeCount = responseObj.value;
                    $log.log('receive response for typeCount:' + responseObj);
                }
            );//end type


            $scope.pageChanged = function(){
                $scope.typeList = TypeWS.gettype(
                    {}, //SearchStudyCtrl.filterParams,
                    {
                        "wildcard": StudyWildcard,
                        "pagenum": $scope.currentPage,
                        "pagesize": $scope.pageSize
                    },
                    function (responseObj) {
                        $log.log('TypeList4StudyChooser: onSearch receive type for study filter');
                    }
                );//end typeList
            };//end pageChanged
            
            $scope.checkType=function(item,checked,name){
                $log.log('checkType');
                $log.log("id:"+item.typename+" value:"+checked+ " name:"+name);
                if(checked){
                    $log.log(item+' is set to be true');
                    if(!(item.typename in TypeLeftList)){
                        $log.log(item.typename+'is NOT in TypeLeftList');
                        TypeLeftList[item.typename] = item;//{typename:item.ta,studyType:name};
                    }else{
                        $log.log(item.typename+'is in TypeLeftList');
                    }
                }
                
            };//end check

            $scope.ok = function () {
                //$uibModalInstance.close($scope.selected.item);
                $uibModalInstance.close($scope.TypeChoseList);
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        });


