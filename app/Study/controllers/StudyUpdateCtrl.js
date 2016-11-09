'use strict';


var entityStudyModule = angular.module('XYWorkbench.Study');
entityStudyModule.controller('StudyUpdateCtrl',
        function ($scope, $uibModal, $location, $log, $routeParams, Studies, submissions) { //StudytypesGet){//
            var StudyUpdateCtrl = this;
            StudyUpdateCtrl.tar_studyId = $routeParams.studyId;
            StudyUpdateCtrl.StudyRefsubmissionAccession = '';

            $log.log('Loaded Controller: StudyUpdate id:' +
                    StudyUpdateCtrl.tar_studyId);
            StudyUpdateCtrl.Study = Studies.get(
                    {id: StudyUpdateCtrl.tar_studyId},function(){
                        StudyUpdateCtrl.StudyRefsubmissionAccession=
                                StudyUpdateCtrl.Study.submissionAccession;
                        $log.log('After get study:'+StudyUpdateCtrl.StudyRefsubmissionAccession);
                    });

            StudyUpdateCtrl.$log = $log;
            $log.log('Loading');

            StudyUpdateCtrl.updateStudy = function () {
                $log.log('on updateStudy,it is going to save:' + StudyUpdateCtrl.Study.studyId);
                StudyUpdateCtrl.Study.$update({id: StudyUpdateCtrl.Study.studyId}, function () {
                    $log.log('Success after studyUpdate');
                    $location.path('/StudyList');
                });
            };

            StudyUpdateCtrl.openSubmission = function (size_in) {

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
                    StudyUpdateCtrl.Study.submissionAccession = selectedItem.submissionAccession;
                    StudyUpdateCtrl.StudyRefsubmissionAccession = selectedItem.submissionAccession;
                    $log.log('After modal close, selectedItem:' + selectedItem);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });

            };
        });

