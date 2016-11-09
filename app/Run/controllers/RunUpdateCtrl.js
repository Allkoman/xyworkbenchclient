/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';


var entityRunModule = angular.module('XYWorkbench.Run');
entityRunModule.controller('RunUpdateCtrl',
        function ($scope, $uibModal, $location, $log, $routeParams, Runs, submissions, experiments) { //RuntypesGet){//
            var RunUpdateCtrl = this;
            RunUpdateCtrl.tar_runId = $routeParams.runId;
            RunUpdateCtrl.RunRefsubmissionAccession = '';
            RunUpdateCtrl.RunRefexperimentAccession = '';

            $log.log('Loaded Controller: RunUpdate id:' +
                    RunUpdateCtrl.tar_runId);
            RunUpdateCtrl.Run = Runs.get(
                    {id: RunUpdateCtrl.tar_runId}, function () {
                RunUpdateCtrl.RunRefsubmissionAccession = RunUpdateCtrl.Run.submissionAccession;
                RunUpdateCtrl.RunRefexperimentAccession = RunUpdateCtrl.Run.experimentAccession;
                $log.log('After get run:' + RunUpdateCtrl.RunRefsubmissionAccession);
                $log.log('After get run:' + RunUpdateCtrl.RunRefsubmissionAccession);
            });

            RunUpdateCtrl.$log = $log;
            $log.log('Loading');

            RunUpdateCtrl.updateRun = function () {
                $log.log('on updateRun,it is going to save:' + RunUpdateCtrl.Run.runId);
                RunUpdateCtrl.Run.$update({id: RunUpdateCtrl.Run.runId}, function () {
                    $log.log('Success after runUpdate');
                    $location.path('/RunList');
                });
            };

            RunUpdateCtrl.openSubmission = function (size_in) {

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
                    RunUpdateCtrl.Run.submissionAccession = selectedItem.submissionAccession;
                    RunUpdateCtrl.RunRefsubmissionAccession = selectedItem.submissionAccession;
                    $log.log('After modal close, selectedItem:' + selectedItem);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });

            };



            RunUpdateCtrl.openExperiment = function (size_in) {

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
                    RunUpdateCtrl.Run.experimentAccession = selectedItem.experimentAccession;
                    RunUpdateCtrl.RunRefexperimentAccession = selectedItem.experimentAccession;
                    $log.log('After modal close, selectedItem:' + selectedItem);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };
        });



