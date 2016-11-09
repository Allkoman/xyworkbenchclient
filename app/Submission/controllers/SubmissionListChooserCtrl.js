'use strict';

var entitySubmissionModule = angular.module('XYWorkbench.Submission');
entitySubmissionModule.controller('SubmissionListChooserCtrl',
        function ($scope, $uibModalInstance, $log, submissions) {
            var SubmissionListChooserCtrl = this;
            $scope.idselected = null;
            $scope.selectrow = function (tarid) {
                $scope.idselected = tarid;
                $log.log('selectrow:' + tarid);
            }

            $scope.Submission = submissions.findAll(function () {
                $log.log('After submissions.findAll');
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