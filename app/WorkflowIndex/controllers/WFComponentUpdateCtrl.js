'use strict';

var workflowIndexModule = angular.module('workflowapp.WorkflowIndex');
workflowIndexModule.controller('WFComponentUpdateCtrl',
   function($location,$log,$routeParams,WFComponentWS){
       //,getJWTuseridByStore){
       var WFComponentUpdateCtrl = this;
       /*var getUserIdFromStore = function (store_tar){
           
       };
       */
       WFComponentUpdateCtrl.WFComponent=WFComponentWS.get({id:$routeParams.idwfcomponent});
       //WFComponentUpdateCtrl.WFComponent.opusersIdopusers = {};
       //WFComponentUpdateCtrl.WFComponent.opusersIdopusers.idopusers = getJWTuseridByStore();       

       $log.log('WFComponentUpdateCtrl');
       
       WFComponentUpdateCtrl.updateWFComponent=function(){
           WFComponentUpdateCtrl.WFComponent.$update({id:WFComponentUpdateCtrl.WFComponent.idwfcomponent},
           function(){
              $log.log('Success after Updating Component');
              $location.path('/WFComponentList');    
           },function(err){
               $log.log('err:'+err);
           });          
       };
   });

