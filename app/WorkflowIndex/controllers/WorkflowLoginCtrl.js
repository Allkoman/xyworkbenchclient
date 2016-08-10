'use strict';

var workflowIndexModule = angular.module('workflowapp.WorkflowIndex');
workflowIndexModule.controller('WorkflowLoginCtrl', 
    function ($scope, $uibModalInstance, $log, 
              OpuserAuthen,//UserName,
              store,jwtHelper,$rootScope,$window) {
      var ModalInstanceCtrl = this;
      $scope.idselected = null;
      $scope.toJsonTxt = "";
      $scope.selectrow = function(tarid){
          $scope.idselected = tarid;
          $log.log('selectrow:'+tarid);
      }
      
      $scope.ok = function () {
        //$uibModalInstance.close($scope.selected.item);
        OpuserAuthen.login($scope.user,function(response){
            var expToken = response.value;
            store.set('jwt_opuser', expToken);
            var tokenPayload = jwtHelper.decodeToken(expToken);
            $rootScope.$broadcast('event:auth-opuserLoginConfirmed', 'Event Param:'+tokenPayload.username);
            $uibModalInstance.close(tokenPayload.username);//$scope.idselected);    
        },
        function(error){
            //$uibModalInstance.close(UserName+'_FAIL '+error.data);//$scope.idselected);    
            $log.log('Login fail:'+error);
            $scope.toJsonTxt = {};
            $scope.toJsonTxt.msg='Opuser Login Fail';
            
        });
        
      };

});