'use strict';

var workflowIndexModule = angular.module('workflowapp.WorkflowIndex');
workflowIndexModule.controller('WFCmpntParamUpdateCtrl',
   function($location,$log,$scope,
   WFCmpntParamWS,
   DIRECTIONOPTIONS,VALUETYPEOPTIONS,PARAMTYPEOPTIONS,
   $uibModalInstance,
   BelongToCmpnt,TargetCmpntParam){
       //,getJWTuseridByStore){
       var WFCmpntParamUpdateCtrl = this;
       /*var getUserIdFromStore = function (store_tar){
           
       };
       */
      
       $scope.wftcc = WFCmpntParamUpdateCtrl;
       
       WFCmpntParamUpdateCtrl.WFCmpntParam=WFCmpntParamWS.get({id:TargetCmpntParam.idwfcmpntparams},function(){
            WFCmpntParamUpdateCtrl.WFCmpntParam.valtype   = WFCmpntParamUpdateCtrl.WFCmpntParam.valtype.toString();
            WFCmpntParamUpdateCtrl.WFCmpntParam.paramtype = WFCmpntParamUpdateCtrl.WFCmpntParam.paramtype.toString();
            WFCmpntParamUpdateCtrl.WFCmpntParam.direction = WFCmpntParamUpdateCtrl.WFCmpntParam.direction.toString();
       });

       
       //WFCmpntParamUpdateCtrl.WFCmpntParam.belongtocmpnt = BelongToCmpnt;
       WFCmpntParamUpdateCtrl.DirOptions   = DIRECTIONOPTIONS;
       WFCmpntParamUpdateCtrl.VTypeOptions = VALUETYPEOPTIONS;
       WFCmpntParamUpdateCtrl.ParamTypeOptions = PARAMTYPEOPTIONS;
       
       
       
       //WFComponentUpdateCtrl.WFComponent.opusersIdopusers = {};
       //WFComponentUpdateCtrl.WFComponent.opusersIdopusers.idopusers = getJWTuseridByStore();       

       $log.log('WFCmpntParamUpdateCtrl');
       
       WFCmpntParamUpdateCtrl.updateWFCmpntParam=function(){
           WFCmpntParamUpdateCtrl.WFCmpntParam.$update({id:WFCmpntParamUpdateCtrl.WFCmpntParam.idwfcmpntparams},function(){
              $log.log('Success after Component Parameter Update');
              //$location.path('/WFComponentList');    
              $uibModalInstance.close('succ for update cmpnt param(id:'+WFCmpntParamUpdateCtrl.WFCmpntParam.idwfcmpntparams +')');
           },function(err){
               $log.log('err:'+err);
               $uibModalInstance.dismiss();
           });          
       };
       
       WFCmpntParamUpdateCtrl.cancel = function(){
             $uibModalInstance.dismiss();
       };
   });

