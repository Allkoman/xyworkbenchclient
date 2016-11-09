
'use strict';

var entityExperimentModule = angular.module('XYWorkbench.Experiment');
entityExperimentModule.controller('ExperimentStudyShowCtrl',
        function ($log, studyaccession, $routeParams) {
            $log.log('into');
            var ExperimentStudyShowCtrl = this;
            ExperimentStudyShowCtrl.tar_studyAccession = $routeParams.studyAccession;
                   $log.log('Loaded Controller: ExperimentStudyShow id:'+
              ExperimentStudyShowCtrl.tar_studyAccession);
            ExperimentStudyShowCtrl.showstudy = studyaccession.findAll({studyAccession:ExperimentStudyShowCtrl.tar_studyAccession},function () {
                $log.log('After Experiments.findAll');
            });
            $log.log('Loaded ExperimentStudyShowCtrl');
        });