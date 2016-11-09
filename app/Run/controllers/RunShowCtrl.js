
'use strict';

var entityRunModule = angular.module('XYWorkbench.Run');
entityRunModule.controller('RunShowCtrl',
        function ($log, runaccession, $routeParams, Local, GetmessageByfilter, Localshell) {
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
            
            //Stitching the URL
            var str = RunShowCtrl.tar_runAccession;
            var str1 = str.substring(0, 3);
            var str2 = str.substring(0, 6);
            RunShowCtrl.str3 = " ftp://ftp-trace.ncbi.nlm.nih.gov/sra/sra-instant/reads/ByRun/sra/" + str1 + "/" + str2 + "/" + RunShowCtrl.tar_runAccession + "/" + RunShowCtrl.tar_runAccession + ".sra";

            RunShowCtrl.Run.localsrapath = "/home/zhangchao/nicb/public/sra";
            $log.log('Loaded Controller: RunShow id:' +RunShowCtrl.tar_runAccession);
            
            RunShowCtrl.showrun = runaccession.findAll({runAccession: RunShowCtrl.tar_runAccession}, function () {
                $log.log('After Runs.findAll');
            });//Get data by run_accession
            
            $log.log('Loaded RunShowCtrl');

            RunShowCtrl.message = GetmessageByfilter.list(RunShowCtrl.RunParam, function (responseObj) {
                $log.log('message is ' + responseObj);
                if (RunShowCtrl.message[0] != null)
                    RunShowCtrl.flag = RunShowCtrl.message[0].localsrapath;
                $log.log(RunShowCtrl.flag);
                if (RunShowCtrl.flag == null) {
                    RunShowCtrl.showmessage = "Not Found In Nebulagene Server, Please Download From Remote Server";
                } else if (RunShowCtrl.flag != null) {
                    RunShowCtrl.showmessage = "Found Srafile In Nebulagene Server, Click Download From Nebulagene Server to Save PC,Or Download From Remote Server :" + RunShowCtrl.str3;
                }
            });//judge if there is a record in Mysql related to run_accession

            RunShowCtrl.downloadSra = function () {
                Local.create(RunShowCtrl.Run, function () {
                    RunShowCtrl.CallShell = Localshell.get(function (responseObj) {
                        $log.log('Sucess after callshell' + responseObj);
                        $log.log(responseObj);
                    });
                    $log.log('Success after downloadSra');
                    $log.log(RunShowCtrl.Run)
                });
            };//write records to Mysql and Call Shell to run ./sh


        });