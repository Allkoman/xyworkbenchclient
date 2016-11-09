'use strict';


var entityStudyModule = angular.module('XYWorkbench.Study');
entityStudyModule.controller('StudyCreateCtrl',
        function ($scope, $location, $log, Studies, $uibModal, submissions) {
            $log.log("Call StudyCreateCtrl");
            var StudyCreateCtrl = this;
            StudyCreateCtrl.Study = {};
            StudyCreateCtrl.StudyRefsubmissionAccession = '';
            StudyCreateCtrl.$log = $log;


            StudyCreateCtrl.createStudy = function () {
                Studies.create(StudyCreateCtrl.Study, function () {
                    $log.log('Success after Studycreate');
                    $location.path('/StudyList');
                });
            };
            $scope.animationsEnabled = true;

            StudyCreateCtrl.openSubmission = function (size_in) {

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
                    StudyCreateCtrl.Study.submissionAccession = selectedItem.submissionAccession;
                    StudyCreateCtrl.StudyRefsubmissionAccession = selectedItem.submissionAccession;
                    $log.log('After modal close, selectedItem:' + selectedItem);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
                
                $scope.toggleAnimation = function () {
                    $scope.animationsEnabled = !$scope.animationsEnabled;
                };


            };
        });

