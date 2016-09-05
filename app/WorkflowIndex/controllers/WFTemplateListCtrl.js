'use strict';

var workflowIndexModule = angular.module('workflowapp.WorkflowIndex');
workflowIndexModule.controller('WFTemplateListCtrl', 
function(WFTemplateWS,$log,ISDEBUG,$scope){
    var WFTemplateListCtrl = this;
    var is_debug = ISDEBUG;
    
    $scope.status = {};
    $scope.status.open = false;
    
    $scope.idselected = null;
    $scope.selectrow = function(tarid,in_num){
        $scope.idselected = tarid;
        $scope.idselected.index = in_num;
        $log.log('selectrow:'+in_num);
    }
    
    WFTemplateListCtrl.delTemplate = function(tar_id,tar_index){
        WFTemplateWS.delme({id:tar_id},function(response){
            $log.log("del success"+response);
            WFTemplateListCtrl.allWFtemplates.splice(tar_index,1);
            $scope.idselected=null;
            //$scope.apply();
        });
    };//end delComponent func
    
    var LoadFirstPage = function(){
        $log.log("WFTemplateList:Load First Page")
        WFTemplateListCtrl.allWFtemplates = WFTemplateWS.query(function(response){
            $log.log("Response:"+response);
            $log.log("WFTemplateListCtrl:(Succ)"+response);//+JSON.parse(response));
        },function(error){
            $log.log("WFTemplateListCtrl:(Error)"+error);//+JSON.parse(error));
        });
    };
    
    LoadFirstPage();
});