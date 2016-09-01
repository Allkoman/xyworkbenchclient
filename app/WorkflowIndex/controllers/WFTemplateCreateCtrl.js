'use strict';

var workflowIndexModule = angular.module('workflowapp.WorkflowIndex');
workflowIndexModule.controller('WFTemplateCreateCtrl',
   function($location,$log,WFTemplateWS){//,getJWTuseridByStore){
       var WFTemplateCreateCtrl = this;
       /*var getUserIdFromStore = function (store_tar){
           
       };*/
       
       WFTemplateCreateCtrl.WFTemplate={};
       WFTemplateCreateCtrl.WFTemplate.opusersIdopusers = {};
       WFTemplateCreateCtrl.WFTemplate.opusersIdopusers.idopusers = getJWTuseridByStore();       

       $log.log('WFTemplateCreateCtrl');
       
       WFTemplateCreateCtrl.createWFTemplate=function(){
           WFTemplateWS.create(WFTemplateCreateCtrl.WFTemplate,function(){
              $log.log('Success after Productcreate');
              $location.path('/WFTemplateList');    
           },function(err){
               $log.log('err:'+err);
           });          
       };
   });

