'use strict';

var workflowIndexModule = angular.module('workflowapp.WorkflowIndex');
workflowIndexModule.controller('WFCmpntParamCreateCtrl',
   function($location,$log,$scope,
   WFCmpntParamWS,
   DIRECTIONOPTIONS,VALUETYPEOPTIONS,PARAMTYPEOPTIONS,
   $uibModalInstance,
   BelongToCmpnt){
       //,getJWTuseridByStore){
       var WFCmpntParamCreateCtrl = this;
       /*var getUserIdFromStore = function (store_tar){
           
       };
       */
      
       $scope.wftcc = WFCmpntParamCreateCtrl;
       
       WFCmpntParamCreateCtrl.WFCmpntParam={};

       WFCmpntParamCreateCtrl.WFCmpntParam.belongtocmpnt = BelongToCmpnt;
       WFCmpntParamCreateCtrl.DirOptions   = DIRECTIONOPTIONS;
       WFCmpntParamCreateCtrl.VTypeOptions = VALUETYPEOPTIONS;
       WFCmpntParamCreateCtrl.ParamTypeOptions = PARAMTYPEOPTIONS;
       
       WFCmpntParamCreateCtrl.WFCmpntParam.valtype = "0";
       WFCmpntParamCreateCtrl.WFCmpntParam.paramtype = "0";
       WFCmpntParamCreateCtrl.WFCmpntParam.direction = "0";
       
       //WFComponentCreateCtrl.WFComponent.opusersIdopusers = {};
       //WFComponentCreateCtrl.WFComponent.opusersIdopusers.idopusers = getJWTuseridByStore();       

       $log.log('WFCmpntParamCreateCtrl');
       
       WFCmpntParamCreateCtrl.createWFCmpntParam=function(){
           WFCmpntParamWS.create(WFCmpntParamCreateCtrl.WFCmpntParam,function(){
              $log.log('Success after Component Parameter Create');
              //$location.path('/WFComponentList');    
              $uibModalInstance.close();
           },function(err){
               $log.log('err:'+err);
               $uibModalInstance.dismiss();
           });          
       };
       
       WFCmpntParamCreateCtrl.cancel = function(){
             $uibModalInstance.dismiss();
       };
   });

