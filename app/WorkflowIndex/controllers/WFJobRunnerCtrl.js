'use strict';

var workflowIndexModule = angular.module('workflowapp.WorkflowIndex');
workflowIndexModule.controller('WFJobRunnerCtrl', 
function(WFTemplateWS,$log,ISDEBUG,$scope,JobAdmin){
    var WFJobRunnerCtrl = this;
    var is_debug = ISDEBUG;
    
    $scope.status = {};
    $scope.status.open = false;
    
    $scope.cmdstr="";
    
    $scope.idselected = null;
    $scope.selectrow = function(tarid,in_num){
        $scope.idselected = tarid;
        $scope.idselected.index = in_num;
        $log.log('selectrow:'+in_num);
    }
    
    WFJobRunnerCtrl.delTemplate = function(tar_id,tar_index){
        WFTemplateWS.delme({id:tar_id},function(response){
            $log.log("del success"+response);
            WFJobRunnerCtrl.allWFtemplates.splice(tar_index,1);
            $scope.idselected=null;
            //$scope.apply();
        });
    };//end delComponent func
    
    var LoadFirstPage = function(){
        $log.log("WFJobRunner:Load First Page")
        WFJobRunnerCtrl.allWFtemplates = WFTemplateWS.query(function(response){
            $log.log("Response:"+response);
            $log.log("WFJobRunnerCtrl:(Succ)"+response);//+JSON.parse(response));
        },function(error){
            $log.log("WFJobRunnerCtrl:(Error)"+error);//+JSON.parse(error));
        });
    };
    
    $scope.tarObj={
        userid:"tester",
        program:"ls",
        command:"monitor"
    };
    $scope.allreceived = {};
    //LoadFirstPage();
    $scope.SendCmd = function(){
        $scope.tarObj.program = $scope.cmdstr;
        $log.log("SendCmd");
        JobAdmin.get($scope.tarObj);
        $scope.allreceived = JobAdmin.collection;
    }//end SendCmd
});