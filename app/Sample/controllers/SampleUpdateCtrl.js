/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';


var entitySampleModule = angular.module('XYWorkbench.Sample');
entitySampleModule.controller('SampleUpdateCtrl',
        function ($scope, $uibModal, $location, $log, $routeParams, Samples, submissions) { //SampletypesGet){//
            var SampleUpdateCtrl = this;
            SampleUpdateCtrl.tar_sampleId = $routeParams.sampleId;
            SampleUpdateCtrl.SampleRefsubmissionAccession = '';

            $log.log('Loaded Controller: SampleUpdate id:' +
                    SampleUpdateCtrl.tar_sampleId);
            SampleUpdateCtrl.Sample = Samples.get(
                    {id: SampleUpdateCtrl.tar_sampleId},function(){
                        SampleUpdateCtrl.SampleRefsubmissionAccession=
                                SampleUpdateCtrl.Sample.submissionAccession;
                        $log.log('After get sample:'+SampleUpdateCtrl.SampleRefsubmissionAccession);
                    });

            SampleUpdateCtrl.$log = $log;
            $log.log('Loading');

            SampleUpdateCtrl.updateSample = function () {
                $log.log('on updateSample,it is going to save:' + SampleUpdateCtrl.Sample.sampleId);
                SampleUpdateCtrl.Sample.$update({id: SampleUpdateCtrl.Sample.sampleId}, function () {
                    $log.log('Success after sampleUpdate');
                    $location.path('/SampleList');
                });
            };

            SampleUpdateCtrl.openSubmission = function (size_in) {

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
                    SampleUpdateCtrl.Sample.submissionAccession = selectedItem.submissionAccession;
                    SampleUpdateCtrl.SampleRefsubmissionAccession = selectedItem.submissionAccession;
                    $log.log('After modal close, selectedItem:' + selectedItem);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });

            };
        });



