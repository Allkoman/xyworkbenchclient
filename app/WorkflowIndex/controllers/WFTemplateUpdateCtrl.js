'use strict';

var workflowIndexModule = angular.module('workflowapp.WorkflowIndex');
workflowIndexModule.controller('WFTemplateUpdateCtrl',
   function($location,$log,WFTemplateWS,$routeParams){//,getJWTuseridByStore){
       var WFTemplateUpdateCtrl = this;
       /*var getUserIdFromStore = function (store_tar){
           
       };*/
       
       WFTemplateUpdateCtrl.WFTemplate=WFTemplateWS.get({id:$routeParams.idwftemplate});
       //WFTemplateUpdateCtrl.WFTemplate.opusersIdopusers = {};
       //WFTemplateUpdateCtrl.WFTemplate.opusersIdopusers.idopusers = getJWTuseridByStore();       

       $log.log('WFTemplateUpdateCtrl');
       
       WFTemplateUpdateCtrl.createWFTemplate=function(){
           WFTemplateUpdateCtrl.WFTemplate.$update({id:WFTemplateUpdateCtrl.WFTemplate.idwftemplates},function(){
              $log.log('Success after Update Template');
              $location.path('/WFTemplateList');    
           },function(err){
               $log.log('err:'+err);
           });          
       };
   });

