'use strict';

// Declare app level module which depends on views, and components
angular.module('XYWorkbench', [
  'ngRoute',
  'ngAnimate',
  'ui.bootstrap',
  'ngResource',
  'checklist-model',
  'angucomplete-alt',
  'XYWorkbench.Common',
  'XYWorkbench.Index',
  'XYWorkbench.Home',
  'XYWorkbench.Search',  
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        //$locationProvider.hashPrefix('!');
        //Otherwise, the href location has to be prefixed with !
        $routeProvider.
                when('/Home',{
                    templateUrl:'Home/tmpl/Home.html'
                }).
                when('/SearchStudy',{
                    templateUrl:'Search/tmpl/SearchStudy.html'
                }).
                otherwise({redirectTo: '/Home'});
}]);
