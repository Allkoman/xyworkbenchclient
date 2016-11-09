/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';


var entityExperimentModule = angular.module('XYWorkbench.Experiment');
entityExperimentModule.controller('ExperimentUpdateCtrl',
        function ($scope, $uibModal, $location, $log, $routeParams, Experiments, submissions, samples, studys) { //ExperimenttypesGet){//
            var ExperimentUpdateCtrl = this;
            ExperimentUpdateCtrl.tar_experimentId = $routeParams.experimentId;
            ExperimentUpdateCtrl.ExperimentRefsubmissionAccession = '';
            ExperimentUpdateCtrl.ExperimentRefsampleAccession = '';
            ExperimentUpdateCtrl.ExperimentRefstudyAccession = '';

            $log.log('Loaded Controller: ExperimentUpdate id:' +
                    ExperimentUpdateCtrl.tar_experimentId);
            ExperimentUpdateCtrl.Experiment = Experiments.get(
                    {id: ExperimentUpdateCtrl.tar_experimentId}, function () {
                ExperimentUpdateCtrl.ExperimentRefsubmissionAccession = ExperimentUpdateCtrl.Experiment.submissionAccession;
                ExperimentUpdateCtrl.ExperimentRefsampleAccession = ExperimentUpdateCtrl.Experiment.sampleAccession;
                ExperimentUpdateCtrl.ExperimentRefstudyAccession = ExperimentUpdateCtrl.Experiment.studyAccession;
                $log.log('After get experiment:' + ExperimentUpdateCtrl.ExperimentRefsubmissionAccession);
                $log.log('After get experiment:' + ExperimentUpdateCtrl.ExperimentRefstudyAccession);
                $log.log('After get experiment:' + ExperimentUpdateCtrl.ExperimentRefsampleAccession);
            });

            ExperimentUpdateCtrl.$log = $log;
            $log.log('Loading');

            ExperimentUpdateCtrl.updateExperiment = function () {
                $log.log('on updateExperiment,it is going to save:' + ExperimentUpdateCtrl.Experiment.experimentId);
                ExperimentUpdateCtrl.Experiment.$update({id: ExperimentUpdateCtrl.Experiment.experimentId}, function () {
                    $log.log('Success after experimentUpdate');
                    $location.path('/ExperimentList');
                });
            };

            ExperimentUpdateCtrl.openSubmission = function (size_in) {

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
                    ExperimentUpdateCtrl.Experiment.submissionAccession = selectedItem.submissionAccession;
                    ExperimentUpdateCtrl.ExperimentRefsubmissionAccession = selectedItem.submissionAccession;
                    $log.log('After modal close, selectedItem:' + selectedItem);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };




            ExperimentUpdateCtrl.openSample = function (size_in) {

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
                    ExperimentUpdateCtrl.Experiment.sampleAccession = selectedItem.sampleAccession;
                    ExperimentUpdateCtrl.ExperimentRefsampleAccession = selectedItem.sampleAccession;
                    $log.log('After modal close, selectedItem:' + selectedItem);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });

            };

            ExperimentUpdateCtrl.openStudy = function (size_in) {

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
                    ExperimentUpdateCtrl.Experiment.studyAccession = selectedItem.studyAccession;
                    ExperimentUpdateCtrl.ExperimentRefstudyAccession = selectedItem.studyAccession;
                    $log.log('After modal close, selectedItem:' + selectedItem);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };
        });



