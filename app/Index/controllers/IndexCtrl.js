/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

var IndexModule = angular.module('XYWorkbench.Index');
/*
 .config(['$routeProvider', function($routeProvider) {
 $routeProvider.when('/hrdaindex', {
 templateUrl: 'HRDAIndex/hrda_index.html',
 controller: 'HRDAINdexCtrl'
 });
 }])
 */
IndexModule.controller('IndexCtrl',
        function ($scope, $log) {

            $scope.qqff = "Under Construction";
            var IndexCtrl = this;
            IndexCtrl.outputtxt = "Under Construction";
            IndexCtrl.qq = "fff";

            $scope.items = [
                'The first choice!',
                'And another choice for you.',
                'but wait! A third!'
            ];

            $scope.status = {
                isopen: false
            };

            $scope.toggled = function (open) {
                $log.log('Dropdown is now: ', open);
            };


            $log.log('IndexCtrl Loaded ' + IndexCtrl.outputtxt);


        }
);

