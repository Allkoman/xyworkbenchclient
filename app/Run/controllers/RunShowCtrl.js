
'use strict';

var entityRunModule = angular.module('XYWorkbench.Run');
entityRunModule.controller('RunShowCtrl',
        function ($log, runaccession, $routeParams, Local, GetmessageByfilter) {
            $log.log('into');
            var RunShowCtrl = this;
            RunShowCtrl.Run = {};
            RunShowCtrl.flag = null;
            RunShowCtrl.showmessage;
            RunShowCtrl.tar_runAccession = $routeParams.runAccession;
            RunShowCtrl.Run.runAccession = RunShowCtrl.tar_runAccession;
            RunShowCtrl.RunParam = {
                "accessionlist": RunShowCtrl.tar_runAccession
            };
            RunShowCtrl.Run.localsrapath = "/home/zhangchao/nicb/public/sra";
            $log.log('Loaded Controller: RunShow id:' +
                    RunShowCtrl.tar_runAccession);
            RunShowCtrl.showrun = runaccession.findAll({runAccession: RunShowCtrl.tar_runAccession}, function () {
                $log.log('After Runs.findAll');
            });
            $log.log('Loaded RunShowCtrl');

            RunShowCtrl.message = GetmessageByfilter.list(RunShowCtrl.RunParam, function (responseObj) {
                $log.log('message is ' + responseObj);
                if (RunShowCtrl.message[0] != null)
                    RunShowCtrl.flag = RunShowCtrl.message[0].localsrapath;
                $log.log(RunShowCtrl.flag);
                if (RunShowCtrl.flag == null) {
                    RunShowCtrl.showmessage = "Not Found In Nebulagene Server, Please Download From Remote Server";
                } else if (RunShowCtrl.flag != null) {
                    RunShowCtrl.showmessage = "Found Srafile In Nebulagene Server, Click Download From Nebulagene Server";
                }
            });

            RunShowCtrl.downloadSra = function () {
                Local.create(RunShowCtrl.Run, function () {
                    $log.log('Success after downloadSra');
                    $log.log(RunShowCtrl.Run)
                });
            };
        });