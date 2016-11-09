'use strict';


var entitySearchExperimentModule = angular.module('XYWorkbench.SearchExperiment');
entitySearchExperimentModule.controller('StrategyList4ExperimentChooser',
        function ($scope, $uibModalInstance, $log,
                StrategyWS, //<--GetStrategysByFilterForExperimentWS
                StrategyCountWS, //<--GetStrategysCountByFilterForExperimentWS
                StrategyChoseList, StrategyLeftList,
                ExperimentWildcard,
                ISDEBUG) {
            var ModalInstanceCtrl = this;
            $scope.is_debug = ISDEBUG;
            $scope.StrategyChoseList = StrategyChoseList;
            $scope.strategyList = null;
            $scope.strategyCount = 0;                        
            $scope.pageSize = 10;
            $scope.currentPage = 1;
            
            $scope.idselected = null;

            $scope.selectrow = function (tarid) {
                $scope.idselected = tarid;
                $log.log('selectrow:' + tarid);
            }

            $scope.strategyList = StrategyWS.getstrategy(
                    {}, //SearchExperimentCtrl.filterParams,
                    {
                        "wildcard": ExperimentWildcard,
                        "pagenum": 1,
                        "pagesize": $scope.pageSize
                    },
                    function (responseObj) {
                        $log.log('StrategyList4ExperimentChooser: onSearch receive strategy for experiment filter');
                    }
            );//end strategyList

            
            StrategyCountWS.count({},
                {
                    "wildcard": ExperimentWildcard
                },
                function (responseObj) {
                    $scope.strategyCount = responseObj.value;
                    $log.log('receive response for strategyCount:' + responseObj);
                }
            );//end strategy


            $scope.pageChanged = function(){
                $scope.strategyList = StrategyWS.getstrategy(
                    {}, //SearchExperimentCtrl.filterParams,
                    {
                        "wildcard": ExperimentWildcard,
                        "pagenum": $scope.currentPage,
                        "pagesize": $scope.pageSize
                    },
                    function (responseObj) {
                        $log.log('StrategyList4ExperimentChooser: onSearch receive strategy for experiment filter');
                    }
                );//end strategyList
            };//end pageChanged
            
            $scope.checkStrategy=function(item,checked,name){
                $log.log('checkStrategy');
                $log.log("id:"+item.strategyname+" value:"+checked+ " name:"+name);
                if(checked){
                    $log.log(item+' is set to be true');
                    if(!(item.strategyname in StrategyLeftList)){
                        $log.log(item.strategyname+'is NOT in StrategyLeftList');
                        StrategyLeftList[item.strategyname] = item;//{strategyname:item.ta,experimentStrategy:name};
                    }else{
                        $log.log(item.strategyname+'is in StrategyLeftList');
                    }
                }
                
            };//end check

            $scope.ok = function () {
                //$uibModalInstance.close($scope.selected.item);
                $uibModalInstance.close($scope.StrategyChoseList);
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        });



