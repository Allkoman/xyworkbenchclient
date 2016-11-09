
'use strict';

var entityRunModule = angular.module('XYWorkbench.Run');
entityRunModule.controller('RunExperimentShowCtrl',
        function ($log, experimentaccession, $routeParams) {
            $log.log('into');
            var RunExperimentShowCtrl = this;
            RunExperimentShowCtrl.tar_experimentAccession = $routeParams.experimentAccession;
                   $log.log('Loaded Controller: RunExperimentShow id:'+
              RunExperimentShowCtrl.tar_experimentAccession);
            RunExperimentShowCtrl.showexperiment = experimentaccession.findAll({experimentAccession:RunExperimentShowCtrl.tar_experimentAccession},function () {
                $log.log('After Runs.findAll');
            });
            $log.log('Loaded RunExperimentShowCtrl');
        });