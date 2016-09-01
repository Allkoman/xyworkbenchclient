'use strict';

var workflowIndexModule = angular.module('workflowapp.WorkflowIndex');
workflowIndexModule.controller('WFComponentCreateCtrl',
   function($location,$log,WFComponentWS){
       //,getJWTuseridByStore){
       var WFComponentCreateCtrl = this;
       /*var getUserIdFromStore = function (store_tar){
           
       };
       */
       WFComponentCreateCtrl.WFComponent={};
       //WFComponentCreateCtrl.WFComponent.opusersIdopusers = {};
       //WFComponentCreateCtrl.WFComponent.opusersIdopusers.idopusers = getJWTuseridByStore();       

       $log.log('WFComponentCreateCtrl');
       
       WFComponentCreateCtrl.createWFComponent=function(){
           WFComponentWS.create(WFComponentCreateCtrl.WFComponent,function(){
              $log.log('Success after ComponentCreate');
              $location.path('/WFComponentList');    
           },function(err){
               $log.log('err:'+err);
           });          
       };
   });

