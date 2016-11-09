'use strict';


var entitySearchExperimentModule = angular.module('XYWorkbench.SearchExperiment');
entitySearchExperimentModule.controller('SelectionList4ExperimentChooser',
        function ($scope, $uibModalInstance, $log,
                SelectionWS, //<--GetSelectionsByFilterForExperimentWS
                SelectionCountWS, //<--GetSelectionsCountByFilterForExperimentWS
                SelectionChoseList, SelectionLeftList,
                ExperimentWildcard,
                ISDEBUG) {
            var ModalInstanceCtrl = this;
            $scope.is_debug = ISDEBUG;
            $scope.SelectionChoseList = SelectionChoseList;
            $scope.selectionList = null;
            $scope.selectionCount = 0;                        
            $scope.pageSize = 10;
            $scope.currentPage = 1;
            
            $scope.idselected = null;

            $scope.selectrow = function (tarid) {
                $scope.idselected = tarid;
                $log.log('selectrow:' + tarid);
            }

            $scope.selectionList = SelectionWS.getselection(
                    {}, //SearchExperimentCtrl.filterParams,
                    {
                        "wildcard": ExperimentWildcard,
                        "pagenum": 1,
                        "pagesize": $scope.pageSize
                    },
                    function (responseObj) {
                        $log.log('SelectionList4ExperimentChooser: onSearch receive selection for experiment filter');
                    }
            );//end selectionList

            
            SelectionCountWS.count({},
                {
                    "wildcard": ExperimentWildcard
                },
                function (responseObj) {
                    $scope.selectionCount = responseObj.value;
                    $log.log('receive response for selectionCount:' + responseObj);
                }
            );//end selection


            $scope.pageChanged = function(){
                $scope.selectionList = SelectionWS.getselection(
                    {}, //SearchExperimentCtrl.filterParams,
                    {
                        "wildcard": ExperimentWildcard,
                        "pagenum": $scope.currentPage,
                        "pagesize": $scope.pageSize
                    },
                    function (responseObj) {
                        $log.log('SelectionList4ExperimentChooser: onSearch receive selection for experiment filter');
                    }
                );//end selectionList
            };//end pageChanged
            
            $scope.checkSelection=function(item,checked,name){
                $log.log('checkSelection');
                $log.log("id:"+item.selectionname+" value:"+checked+ " name:"+name);
                if(checked){
                    $log.log(item+' is set to be true');
                    if(!(item.selectionname in SelectionLeftList)){
                        $log.log(item.selectionname+'is NOT in SelectionLeftList');
                        SelectionLeftList[item.selectionname] = item;//{selectionname:item.ta,experimentSelection:name};
                    }else{
                        $log.log(item.selectionname+'is in SelectionLeftList');
                    }
                }
                
            };//end check

            $scope.ok = function () {
                //$uibModalInstance.close($scope.selected.item);
                $uibModalInstance.close($scope.SelectionChoseList);
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        });


