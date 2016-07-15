'use strict';

// Declare app level module which depends on views, and components
angular.module('XYWorkbench', [
  'ngRoute',
  'ngAnimate',
  'ui.bootstrap',
  'XYWorkbench.Index',
  'XYWorkbench.Home',
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
                otherwise({redirectTo: '/view1'});
}]);
