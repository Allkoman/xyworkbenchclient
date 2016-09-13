'use strict';

var entitySampleModule = angular.module('XYWorkbench.Sample');
entitySampleModule.controller('SampleListChooserCtrl',
        function ($scope, $uibModalInstance, $log, samples) {
            var SampleListChooserCtrl = this;
            $scope.idselected = null;
            $scope.selectrow = function (tarid) {
                $scope.idselected = tarid;
                $log.log('selectrow:' + tarid);
            }

            $scope.Sample = samples.findAll(function () {
                $log.log('After samples.findAll');
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