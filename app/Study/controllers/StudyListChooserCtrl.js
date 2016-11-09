'use strict';

var entityStudyModule = angular.module('XYWorkbench.Study');
entityStudyModule.controller('StudyListChooserCtrl',
        function ($scope, $uibModalInstance, $log, studys) {
            var StudyListChooserCtrl = this;
            $scope.idselected = null;
            $scope.selectrow = function (tarid) {
                $scope.idselected = tarid;
                $log.log('selectrow:' + tarid);
            }

            $scope.Study = studys.findAll(function () {
                $log.log('After studys.findAll');
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