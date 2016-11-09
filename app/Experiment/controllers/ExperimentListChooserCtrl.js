'use strict';

var entityExperimentModule = angular.module('XYWorkbench.Experiment');
entityExperimentModule.controller('ExperimentListChooserCtrl',
        function ($scope, $uibModalInstance, $log, experiments) {
            var ExperimentListChooserCtrl = this;
            $scope.idselected = null;
            $scope.selectrow = function (tarid) {
                $scope.idselected = tarid;
                $log.log('selectrow:' + tarid);
            }

            $scope.Experiment = experiments.findAll(function () {
                $log.log('After experiments.findAll');
            });
            /*$scope.items = items;
            $scope.selected = {
                item: $scope.items[0]
            };*/


            $scope.ok = function () {
                //$uibModalInstance.close($scope.selected.item);
                $uibModalInstance.close($scope.idselected);
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        });