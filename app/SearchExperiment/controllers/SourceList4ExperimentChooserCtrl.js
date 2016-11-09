'use strict';


var entitySearchExperimentModule = angular.module('XYWorkbench.SearchExperiment');
entitySearchExperimentModule.controller('SourceList4ExperimentChooser',
        function ($scope, $uibModalInstance, $log,
                SourceWS, //<--GetSourcesByFilterForExperimentWS
                SourceCountWS, //<--GetSourcesCountByFilterForExperimentWS
                SourceChoseList, SourceLeftList,
                ExperimentWildcard,
                ISDEBUG) {
            var ModalInstanceCtrl = this;
            $scope.is_debug = ISDEBUG;
            $scope.SourceChoseList = SourceChoseList;
            $scope.sourceList = null;
            $scope.sourceCount = 0;                        
            $scope.pageSize = 10;
            $scope.currentPage = 1;
            
            $scope.idselected = null;

            $scope.selectrow = function (tarid) {
                $scope.idselected = tarid;
                $log.log('selectrow:' + tarid);
            }

            $scope.sourceList = SourceWS.getsource(
                    {}, //SearchExperimentCtrl.filterParams,
                    {
                        "wildcard": ExperimentWildcard,
                        "pagenum": 1,
                        "pagesize": $scope.pageSize
                    },
                    function (responseObj) {
                        $log.log('SourceList4ExperimentChooser: onSearch receive source for experiment filter');
                    }
            );//end sourceList

            
            SourceCountWS.count({},
                {
                    "wildcard": ExperimentWildcard
                },
                function (responseObj) {
                    $scope.sourceCount = responseObj.value;
                    $log.log('receive response for sourceCount:' + responseObj);
                }
            );//end source


            $scope.pageChanged = function(){
                $scope.sourceList = SourceWS.getsource(
                    {}, //SearchExperimentCtrl.filterParams,
                    {
                        "wildcard": ExperimentWildcard,
                        "pagenum": $scope.currentPage,
                        "pagesize": $scope.pageSize
                    },
                    function (responseObj) {
                        $log.log('SourceList4ExperimentChooser: onSearch receive source for experiment filter');
                    }
                );//end sourceList
            };//end pageChanged
            
            $scope.checkSource=function(item,checked,name){
                $log.log('checkSource');
                $log.log("id:"+item.sourcename+" value:"+checked+ " name:"+name);
                if(checked){
                    $log.log(item+' is set to be true');
                    if(!(item.sourcename in SourceLeftList)){
                        $log.log(item.sourcename+'is NOT in SourceLeftList');
                        SourceLeftList[item.sourcename] = item;//{sourcename:item.ta,experimentSource:name};
                    }else{
                        $log.log(item.sourcename+'is in SourceLeftList');
                    }
                }
                
            };//end check

            $scope.ok = function () {
                //$uibModalInstance.close($scope.selected.item);
                $uibModalInstance.close($scope.SourceChoseList);
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        });



