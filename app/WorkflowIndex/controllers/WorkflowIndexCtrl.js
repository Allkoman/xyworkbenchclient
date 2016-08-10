/* 
 * To change this license header, choose License Headers in User Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';

var WorkflowIndexModule = angular.module('workflowapp.WorkflowIndex');
/*
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/hrdaindex', {
    templateUrl: 'HRDAIndex/hrda_index.html',
    controller: 'HRDAINdexCtrl'
  });
}])
*/
WorkflowIndexModule.controller('WorkflowIndexCtrl', 
    function($scope,$uibModal,//UserWS,
    $log,store,jwtHelper,$rootScope,$window//,
    //FRONTENDNAME,FrontHomePageAddr
            ) {
        $scope.user = "NON-LOGIN";
        
        
        var OpuserIndexCtrl = this;
        OpuserIndexCtrl.isShowIt = false;
        
        if(store.get('jwt_opuser')!==null){
            OpuserIndexCtrl.isShowIt = true;
            $log.log('there is jwt_opuser');
        }
        else{
            OpuserIndexCtrl.isShowIt = false;
            $log.log('there is no jwt_opuser');
        }
        return;
        if(!OpuserIndexCtrl.isShowIt){
            //The login is automatically invoked.
        
            var loginModalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'WorkflowIndex/tmpl/WorkflowLogin.html',
                controller: 'WorkflowLoginCtrl',
                keyboard:false,
                backdrop: 'static',
                size: 'sm',
                resolve: {
                  UserName: function () {
                    return 'Try Login Opuser';
                  }//,
                  //myUserWS: function()
                  //{
                  //    return UserWS;
                  //}
                }
            });
            
            loginModalInstance.result.then(function (selectedItem) {
                $scope.user = selectedItem;

            }, function () {
              $log.info('Modal dismissed at: ' + new Date());
            });
        
        }
     
        
        $scope.$on('event:auth-opuserLoginConfirmed',function(event,msg){
            $log.log('on event auth-opuserLoginConfirmed. msg:'+msg);
            OpuserIndexCtrl.isShowIt = true;
        });
        
        $scope.$on('event:auth-opuserLogoutConfirmed',function(event,msg){
            $log.log('on event auth-opuserLogoutConfirmed. msg:'+msg);
            OpuserIndexCtrl.isShowIt = false;
        });
       
        
        OpuserIndexCtrl.logout=function(){
            OpuserIndexCtrl.isShowIt = false;
            var logoutMsg = 'Non-user logout'; 
            if(store.get('jwt_opuser')!==null){
                var tokenPayload = jwtHelper.decodeToken(store.get('jwt_opuser'));
                logoutMsg = 'user:' + tokenPayload.username;
            }        
            store.remove('jwt_opuser');
            $rootScope.$broadcast('event:auth-opuserLogoutConfirmed',logoutMsg);
            $window.location =   FrontHomePageAddr;//"/"+FRONTENDNAME+"/index.html";
            $log.log('opuser log out');
            
        };
});


