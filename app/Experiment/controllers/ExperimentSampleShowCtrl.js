
'use strict';

var entityExperimentModule = angular.module('XYWorkbench.Experiment');
entityExperimentModule.controller('ExperimentSampleShowCtrl',
        function ($log, sampleaccession, $routeParams) {
            $log.log('into');
            var ExperimentSampleShowCtrl = this;
            ExperimentSampleShowCtrl.tar_sampleAccession = $routeParams.sampleAccession;
                   $log.log('Loaded Controller: ExperimentSampleShow id:'+
              ExperimentSampleShowCtrl.tar_sampleAccession);
            ExperimentSampleShowCtrl.showsample = sampleaccession.findAll({sampleAccession:ExperimentSampleShowCtrl.tar_sampleAccession},function () {
                $log.log('After Experiments.findAll');
            });
            $log.log('Loaded ExperimentSampleShowCtrl');
        });