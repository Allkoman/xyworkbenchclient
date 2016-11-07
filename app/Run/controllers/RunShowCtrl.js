
'use strict';

var entityRunModule = angular.module('XYWorkbench.Run');
entityRunModule.controller('RunShowCtrl',
        function ($log, runaccession, $routeParams, Local) {
            $log.log('into');
            var RunShowCtrl = this;
            RunShowCtrl.Run = {};
            RunShowCtrl.tar_runAccession = $routeParams.runAccession;
            RunShowCtrl.Run.runAccession = RunShowCtrl.tar_runAccession;
            RunShowCtrl.Run.localsrapath = "/home/zhangchao/nicb/public/sra";
            $log.log('Loaded Controller: RunShow id:' +
                    RunShowCtrl.tar_runAccession);
            RunShowCtrl.showrun = runaccession.findAll({runAccession: RunShowCtrl.tar_runAccession}, function () {
                $log.log('After Runs.findAll');
            });
            $log.log('Loaded RunShowCtrl');

            RunShowCtrl.downloadSra = function () {
                Local.create(RunShowCtrl.Run, function () {
                    $log.log('Success after downloadSra');
                    $log.log(RunShowCtrl.Run)
                });
            };
        });