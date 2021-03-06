/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

var entitySearchStudyModule = angular.module('XYWorkbench.SearchStudy');
entitySearchStudyModule.controller('TaxonList4StudyChooser',
        function ($scope, $uibModalInstance, $log,
                TaxonWS, //<--GetTaxonsByFilterForStudyWS
                TaxonCountWS, //<--GetTaxonsCountByFilterForStudyWS
                TaxonChoseList, TaxonLeftList,
                StudyWildcard,
                ISDEBUG) {
            var ModalInstanceCtrl = this;
            $scope.is_debug = ISDEBUG;
            $scope.TaxonChoseList = TaxonChoseList;
            $scope.taxonsList = null;
            $scope.taxonsCount = 0;                        
            $scope.pageSize = 10;
            $scope.currentPage = 1;
            
            $scope.idselected = null;

            $scope.selectrow = function (tarid) {
                $scope.idselected = tarid;
                $log.log('selectrow:' + tarid);
            }

            $scope.taxonsList = TaxonWS.gettaxons(
                    {}, //SearchStudyCtrl.filterParams,
                    {
                        "wildcard": StudyWildcard,
                        "pagenum": 1,
                        "pagesize": $scope.pageSize
                    },
                    function (responseObj) {
                        $log.log('TaxonList4StudyChooser: onSearch receive taxons for study filter');
                    }
            );//end taxonsList

            
            TaxonCountWS.count({},
                {
                    "wildcard": StudyWildcard
                },
                function (responseObj) {
                    $scope.taxonsCount = responseObj.value;
                    $log.log('receive response for taxonsCount:' + responseObj);
                }
            );//end taxon


            $scope.pageChanged = function(){
                $scope.taxonsList = TaxonWS.gettaxons(
                    {}, //SearchStudyCtrl.filterParams,
                    {
                        "wildcard": StudyWildcard,
                        "pagenum": $scope.currentPage,
                        "pagesize": $scope.pageSize
                    },
                    function (responseObj) {
                        $log.log('TaxonList4StudyChooser: onSearch receive taxons for study filter');
                    }
                );//end taxonsList
            };//end pageChanged
            
            $scope.checkTaxon=function(item,checked,name){
                $log.log('checkTaxon');
                $log.log("id:"+item.taxonid+" value:"+checked+ " name:"+name);
                if(checked){
                    $log.log(item+' is set to be true');
                    if(!(item.taxonid in TaxonLeftList)){
                        $log.log(item.taxonid+'is NOT in TaxonLeftList');
                        TaxonLeftList[item.taxonid] = item;//{taxonid:item.ta,taxonname:name};
                    }else{
                        $log.log(item.taxonid+'     is in TaxonLeftList');
                    }
                }
                
            };//end check

            $scope.ok = function () {
                //$uibModalInstance.close($scope.selected.item);
                $uibModalInstance.close($scope.TaxonChoseList);
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        });


