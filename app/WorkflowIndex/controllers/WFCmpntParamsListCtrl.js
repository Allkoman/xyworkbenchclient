'use strict';

var workflowIndexModule = angular.module('workflowapp.WorkflowIndex');
workflowIndexModule.controller('WFCmpntParamsListCtrl', 
function($scope,$routeParams,
    WFCmpntParamWS,WFComponentWS,
    $log,$uibModal,ISDEBUG){
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
    
    WFCmpntParamsListCtrl.TarWFComponent = {};
    
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