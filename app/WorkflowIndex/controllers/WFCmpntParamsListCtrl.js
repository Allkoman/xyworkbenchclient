'use strict';

var workflowIndexModule = angular.module('workflowapp.WorkflowIndex');
workflowIndexModule.controller('WFCmpntParamsListCtrl', 
function($scope,$routeParams,
    WFCmpntParamWS,WFComponentWS,
    $log,ISDEBUG){
    var WFCmpntParamsListCtrl = this;
    var is_debug = ISDEBUG;
    $scope.status = {};
    $scope.status.open = false;
    
    $scope.idselected = null;
    $scope.selectrow = function(tarid,in_num){
        $scope.idselected = tarid;
        $scope.idselected.index = in_num;
        $log.log('selectrow:'+in_num);
    }
    
    WFCmpntParamsListCtrl.delComponent = function(tar_id,tar_index){
        WFCmpntParamWS.delme({id:tar_id},function(response){
            $log.log("del success"+response);
            WFCmpntParamsListCtrl.allWFCmpntParams.splice(tar_index,1);
            $scope.idselected=null;
            $scope.apply();
        });
    };//end delComponent func
    
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
    
    LoadFirstPage();
});