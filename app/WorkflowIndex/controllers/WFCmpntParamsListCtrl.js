'use strict';

var workflowIndexModule = angular.module('workflowapp.WorkflowIndex');
workflowIndexModule.controller('WFCmpntParamsListCtrl', 
function($scope,$routeParams,
    WFCmpntParamWS,WFComponentWS,
    $log,$uibModal,ISDEBUG,
    MapValue2Txt,VTYPEMAPTABLE,DIRMAPTABLE,PTYPEMAPTABLE){
        
    var WFCmpntParamsListCtrl = this;
    var is_debug = ISDEBUG;
    $scope.status = {};
    $scope.status.open = false;
    
    $scope.mapVType = function(value_in){
        $log.log('mapVType:'+value_in);
        return MapValue2Txt.getTxt(VTYPEMAPTABLE,value_in);
    };
    
    $scope.mapDir = function(value_in){
        $log.log('mapDir:'+value_in);
        return MapValue2Txt.getTxt(DIRMAPTABLE,value_in);
    };
    
    $scope.mapPType = function(value_in){
        $log.log('mapPType:'+value_in);
        return MapValue2Txt.getTxt(PTYPEMAPTABLE,value_in);
    };
    
    $scope.idselected = null;
    $scope.selectrow = function(tarid,in_num){
        $scope.idselected = tarid;
        $scope.idselected.index = in_num;
        $log.log('selectrow:'+in_num);
    }    
    
    WFCmpntParamsListCtrl.TarWFComponent = {};
    
    
    var LoadFirstPage = function(){
        $log.log("WFCmpntParamsList:Load First Page");
        $log.log("WFComponent:"+$routeParams.belongidwfcmpnt);
        
        WFCmpntParamsListCtrl.TarWFComponent=WFComponentWS.get({id:$routeParams.belongidwfcmpnt});
        
        WFCmpntParamsListCtrl.allWFCmpntParams = WFCmpntParamWS.query(
                {action:'bycmpnt',id:$routeParams.belongidwfcmpnt},
        function(response){
            $log.log("Response:"+response);
            $log.log("WFCmpntParamsListCtrl:(Succ)"+response);//JSON.parse(
        },function(error){
            $log.log("WFCmpntParamsListCtrl:(Error)"+error);
        });
    };
    
    WFCmpntParamsListCtrl.updateCmpntParam = function(tar_id){
        var updModalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'WorkflowIndex/tmpl/WFCmpntParamUpdate.html',
            controller: 'WFCmpntParamUpdateCtrl',
            size:'lg',
            resolve: {
                BelongToCmpnt: function () {
                    return WFCmpntParamsListCtrl.TarWFComponent;
                },
                TargetCmpntParam: function(){
                    return $scope.idselected;
                }
            }
        });
        
        updModalInstance.result.then(function (success){
            $log.log('Update Modal Succ');
            $log.log('response:'+success);
            LoadFirstPage();
        },function(){
            $log.log('Update Modal Dismissed at '+new Date());
        });
    };
    
    WFCmpntParamsListCtrl.addCmpntParam = function(){
        var addModalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'WorkflowIndex/tmpl/WFCmpntParamCreate.html',
            controller: 'WFCmpntParamCreateCtrl',
            //keyboard:false,
            //backdrop: 'static',
            size: 'lg',
            resolve: {
              BelongToCmpnt: function () {
                return WFCmpntParamsListCtrl.TarWFComponent;
              }//,
              //myUserWS: function()
              //{
              //    return UserWS;
              //}
            }
        });
        
        addModalInstance.result.then(function (selectedItem) {
            $log.log('After insert new cmpntparams');
            LoadFirstPage();           

        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }
    
    WFCmpntParamsListCtrl.delCmpntParam = function(tar_id,tar_index){
        WFCmpntParamWS.delme({id:tar_id},function(response){
            $log.log("del success"+response);
            WFCmpntParamsListCtrl.allWFCmpntParams.splice(tar_index,1);
            $scope.idselected=null;
            //$scope.$apply();
        });
    };//end delComponent func
    
    
    LoadFirstPage();
});