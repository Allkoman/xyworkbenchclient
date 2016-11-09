'use strict';


var entityExperimentModule = angular.module('XYWorkbench.Experiment');
entityExperimentModule.controller('ExperimentCreateCtrl',
        function ($scope, $location, $log, Experiments, $uibModal, submissions, samples, studys) {
            $log.log("Call ExperimentCreateCtrl");
            var ExperimentCreateCtrl = this;
            ExperimentCreateCtrl.Experiment = {};
            ExperimentCreateCtrl.ExperimentRefsubmissionAccession = '';
            ExperimentCreateCtrl.ExperimentRefsampleAccession = '';
            ExperimentCreateCtrl.ExperimentRefstudyAccession = '';
            ExperimentCreateCtrl.$log = $log;


            ExperimentCreateCtrl.createExperiment = function () {
                Experiments.create(ExperimentCreateCtrl.Experiment, function () {
                    $log.log('Success after Experimentcreate');
                    $location.path('/ExperimentList');
                });
            };
            $scope.animationsEnabled = true;

            ExperimentCreateCtrl.openSubmission = function (size_in) {

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
                    ExperimentCreateCtrl.Experiment.submissionAccession = selectedItem.submissionAccession;
                    ExperimentCreateCtrl.ExperimentRefsubmissionAccession = selectedItem.submissionAccession;
                    $log.log('After modal close, selectedItem:' + selectedItem);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });

                $scope.toggleAnimation = function () {
                    $scope.animationsEnabled = !$scope.animationsEnabled;
                };
            };

            ExperimentCreateCtrl.openSample = function (size_in) {

                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'Sample/tmpl/SampleListChooser.html',
                    controller: 'SampleListChooserCtrl',
                    size: size_in,
                    resolve: {
                        mysamples: function ()
                        {
                            return samples;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    $scope.selected = selectedItem;
                    ExperimentCreateCtrl.Experiment.sampleAccession = selectedItem.sampleAccession;
                    ExperimentCreateCtrl.ExperimentRefsampleAccession = selectedItem.sampleAccession;
                    $log.log('After modal close, selectedItem:' + selectedItem);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });

                $scope.toggleAnimation = function () {
                    $scope.animationsEnabled = !$scope.animationsEnabled;
                };
            };

            ExperimentCreateCtrl.openStudy = function (size_in) {

                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'Study/tmpl/StudyListChooser.html',
                    controller: 'StudyListChooserCtrl',
                    size: size_in,
                    resolve: {
                        mystudys: function ()
                        {
                            return studys;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    $scope.selected = selectedItem;
                    ExperimentCreateCtrl.Experiment.studyAccession = selectedItem.studyAccession;
                    ExperimentCreateCtrl.ExperimentRefstudyAccession = selectedItem.studyAccession;
                    $log.log('After modal close, selectedItem:' + selectedItem);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });

                $scope.toggleAnimation = function () {
                    $scope.animationsEnabled = !$scope.animationsEnabled;
                };
            };
        });

