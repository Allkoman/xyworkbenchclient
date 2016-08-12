'use strict';

var workflowIndexModule = angular.module('workflowapp.WorkflowIndex');
workflowIndexModule.controller('WFTemplateListCtrl', 
function(WFTemplateWS,$log,ISDEBUG){
    var WFTemplateListCtrl = this;
    var is_debug = ISDEBUG;
    
    var LoadFirstPage = function(){
        $log.log("WFTemplateList:Load First Page")
        WFTemplateListCtrl.allWFtemplates = WFTemplateWS.query(function(response){
            $log.log("WFTemplateListCtrl:(Succ)"+JSON.parse(response));
        },function(error){
            $log.log("WFTemplateListCtrl:(Error)"+JSON.parse(error));
        });
    };
    
    LoadFirstPage();
});