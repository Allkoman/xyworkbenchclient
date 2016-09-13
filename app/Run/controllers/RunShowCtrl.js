
'use strict';

var entityRunModule = angular.module('XYWorkbench.Run');
entityRunModule.controller('RunShowCtrl',
        function ($log, runaccession, $routeParams) {
            $log.log('into');
            var RunShowCtrl = this;
            RunShowCtrl.tar_runAccession = $routeParams.runAccession;
                   $log.log('Loaded Controller: RunShow id:'+
              RunShowCtrl.tar_runAccession);
            RunShowCtrl.showrun = runaccession.findAll({runAccession:RunShowCtrl.tar_runAccession},function () {
                $log.log('After Runs.findAll');
            });
            $log.log('Loaded RunShowCtrl');
        });