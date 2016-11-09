'use strict';


var entitySampleModule = angular.module('XYWorkbench.Sample');
entitySampleModule.controller('SampleCreateCtrl',
        function ($scope, $location, $log, Samples, $uibModal, submissions) {
            $log.log("Call SampleCreateCtrl");
            var SampleCreateCtrl = this;
            SampleCreateCtrl.Sample = {};
            SampleCreateCtrl.SampleRefsubmissionAccession = '';
            SampleCreateCtrl.$log = $log;


            SampleCreateCtrl.createSample = function () {
                Samples.create(SampleCreateCtrl.Sample, function () {
                    $log.log('Success after Samplecreate');
                    $location.path('/SampleList');
                });
            };
            $scope.animationsEnabled = true;

            SampleCreateCtrl.openSubmission = function (size_in) {

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
                    SampleCreateCtrl.Sample.submissionAccession = selectedItem.submissionAccession;
                    SampleCreateCtrl.SampleRefsubmissionAccession = selectedItem.submissionAccession;
                    $log.log('After modal close, selectedItem:' + selectedItem);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
                
                $scope.toggleAnimation = function () {
                    $scope.animationsEnabled = !$scope.animationsEnabled;
                };


            };
        });

