'use strict';

var workflowIndexModule = angular.module('workflowapp.WorkflowIndex');
workflowIndexModule.controller('WFComponentListCtrl', 
function($scope,WFComponentWS,$log,ISDEBUG){
    var WFComponentListCtrl = this;
    var is_debug = ISDEBUG;
    $scope.status = {};
    $scope.status.open = false;
    
    $scope.idselected = null;
    $scope.selectrow = function(tarid,in_num){
        $scope.idselected = tarid;
        $scope.idselected.index = in_num;
        $log.log('selectrow:'+in_num);
    }
    
    WFComponentListCtrl.delComponent = function(tar_id,tar_index){
        WFComponentWS.delme({id:tar_id},function(response){
            $log.log("del success"+response);
            WFComponentListCtrl.allWFComponents.splice(tar_index,1);
            $scope.idselected=null;
            $scope.apply();
        });
    };//end delComponent func
    
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