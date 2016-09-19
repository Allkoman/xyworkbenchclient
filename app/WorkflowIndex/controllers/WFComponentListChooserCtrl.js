'use strict';

var workflowIndexModule = angular.module('workflowapp.WorkflowIndex');
workflowIndexModule.controller('WFComponentListChooserCtrl', 
function($scope,WFComponentWS,WFCmpntParamWS,$log,ISDEBUG,
    $uibModalInstance,
    MapValue2Txt,VTYPEMAPTABLE,DIRMAPTABLE,PTYPEMAPTABLE){
        
    var WFComponentListCtrl = this;
    $scope.wftlc = WFComponentListCtrl;
    var is_debug = ISDEBUG;
    $scope.status = {};
    $scope.status.open = false;
    
    $scope.idselected = null;
    $scope.selectrow = function(tarid,in_num){
        $scope.idselected = tarid;
        $scope.idselected.index = in_num;
        $log.log('selectrow:'+in_num);
    }
    
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
    
    $scope.showParameters = function(){
        $log.log("tar cmpnt id:"+$scope.idselected.idwfcomponent);
        WFComponentListCtrl.paramswrt = WFCmpntParamWS.query(
                {action:'bycmpnt',id:$scope.idselected.idwfcomponent},
        function(response){
            $log.log("Response:"+response);
            $log.log("WFComponentListChooserCtrl:(Succ)"+response);//JSON.parse(
        },function(error){
            $log.log("WFComponentListChooserCtrl:(Error)"+error);
        });
    };//end showParameters
    
    $scope.chooseCmpnt = function(){
        $uibModalInstance.close($scope.idselected);
    };//ned chooseCmpnt
    /*
    WFComponentListCtrl.delComponent = function(tar_id,tar_index){
        WFComponentWS.delme({id:tar_id},function(response){
            $log.log("del success"+response);
            WFComponentListCtrl.allWFComponents.splice(tar_index,1);
            $scope.idselected=null;
            $scope.apply();
        });
    };//end delComponent func
    */
   
    var LoadFirstPage = function(){
        $log.log("WFTemplateList:Load First Page")
        WFComponentListCtrl.allWFComponents = WFComponentWS.query(function(response){
            $log.log("Response:"+response);
            $log.log("WFComponentListCtrl:(Succ)"+response);//JSON.parse(
        },function(error){
            $log.log("WFComponentListCtrl:(Error)"+error);
        });
    };
    
    LoadFirstPage();
});