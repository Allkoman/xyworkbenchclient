'use strict';

// Declare app level module which depends on views, and components
var workflowapp = angular.module('workflowapp', [
  'ngRoute',
  'ngAnimate',
  'ui.bootstrap',
  'angular-storage',
  'angular-jwt',
  'XYWorkbench.Home',
  'XYWorkbench.Common',
  'workflowapp.WorkflowIndex',
  'myApp.version'
]);
/*
 * Angular-JWT adds authroization in header by options requet.

opuserapp.config(function myAppConfig (  
  //$urlRouterProvider,
  jwtInterceptorProvider, $httpProvider) {
      
  //$urlRouterProvider.otherwise('/');

  jwtInterceptorProvider.tokenGetter = function($log,store) {
    $log.log('in tokenGetter of jwt Interceptor!');
    var jwtToken = store.get('jwt_opuser');
    $log.log('jwt_opuser:'+jwtToken);
    return jwtToken;
  };

  $httpProvider.interceptors.push('jwtInterceptor');
});
 */
workflowapp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.    
        when('/Home',{
            templateUrl:'Home/tmpl/WorkflowHome.html'
        })
    .otherwise({redirectTo: '/Home'});
}]);
