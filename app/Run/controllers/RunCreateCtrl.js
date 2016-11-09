'use strict';


var entityRunModule = angular.module('XYWorkbench.Run');
entityRunModule.controller('RunCreateCtrl',
        function ($scope, $location, $log, Runs, $uibModal, submissions, experiments) {
            $log.log("Call RunCreateCtrl");
            var RunCreateCtrl = this;
            RunCreateCtrl.Run = {};
            RunCreateCtrl.RunRefsubmissionAccession = '';
            RunCreateCtrl.RunRefexperimentAccession = '';
            RunCreateCtrl.$log = $log;


            RunCreateCtrl.createRun = function () {
                Runs.create(RunCreateCtrl.Run, function () {
                    $log.log('Success after Runcreate');
                    $location.path('/RunList');
                });
            };
            $scope.animationsEnabled = true;

            RunCreateCtrl.openSubmission = function (size_in) {

                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'Submission/tmpl/SubmissionListChooser.html',
                    controller: 'SubmissionListChooserCtrl',
                    size: size_in,
                    resolve: {
                        mysubmissions: function ()
                        {
                            return submissions;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    $scope.selected = selectedItem;
                    RunCreateCtrl.Run.submissionAccession = selectedItem.submissionAccession;
                    RunCreateCtrl.RunRefsubmissionAccession = selectedItem.submissionAccession;
                    $log.log('After modal close, selectedItem:' + selectedItem);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });

                $scope.toggleAnimation = function () {
                    $scope.animationsEnabled = !$scope.animationsEnabled;
                };
            };


            RunCreateCtrl.openExperiment = function (size_in) {

                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'Experiment/tmpl/ExperimentListChooser.html',
                    controller: 'ExperimentListChooserCtrl',
                    size: size_in,
                    resolve: {
                        myexperiments: function ()
                        {
                            return experiments;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    $scope.selected = selectedItem;
                    RunCreateCtrl.Run.experimentAccession = selectedItem.experimentAccession;
                    RunCreateCtrl.RunRefexperimentAccession = selectedItem.experimentAccession;
                    $log.log('After modal close, selectedItem:' + selectedItem);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });

                $scope.toggleAnimation = function () {
                    $scope.animationsEnabled = !$scope.animationsEnabled;
                };
            };
        });

