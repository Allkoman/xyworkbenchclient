/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

var workflowIndexModule = angular.module('workflowapp.WorkflowIndex');
workflowIndexModule.controller('ProgressbarCtrl',
        function ($scope, $log, Dynamics) {
            var ProgressbarCtrl = this;
            $scope.max = 120;
            $scope.dynamic = 0;
            var i = 0;
            $scope.Progressbar = function () {
                if (i < 120) {
                    i = i + 1;
                    $log.log(i);
                    $scope.dynamic = i;
                }
            };
            /*$scope.Progressbar = function () {
                $log.log(ProgressbarCtrl.WFComponent);
                Dynamics.getdy(function () {
                    $log.log('Success after ComponentCreate');
                });
            };*/


        });

