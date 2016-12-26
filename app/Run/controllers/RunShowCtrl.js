
'use strict';

var entityRunModule = angular.module('XYWorkbench.Run');
entityRunModule.controller('RunShowCtrl',
        function ($log, runaccession, $routeParams, Local, GetmessageByfilter, $scope, ExecShell, ExecShellKill, $window) {
            $log.log('into');
            var RunShowCtrl = this;
            $scope.dynamic = 0;
            $scope.max = 100;
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
            $log.log('Loaded Controller: RunShow id:' + RunShowCtrl.tar_runAccession);

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

            $scope.tarObj = {
                str1: str1,
                str2: str2,
                str3: str,
                returned: "",
                command: " "
            };
            $scope.allreceived = {};
            //LoadFirstPage();
            $scope.max = 100;
//            $scope.reloadPage = function () {1
//                $window.location.reload();
//            }//ReloadPage
            RunShowCtrl.downloadSra = function () {
                //if (RunShowCtrl.flag == null)
                Local.create(RunShowCtrl.Run, function () {
                    $log.log("SendCmd");
                    //$scope.reloadPage();
                    ExecShell.get($scope.tarObj, function (messagein, messagetime) {
                        //$log.log("On Message:" + messagein + " |");
                        //$log.log("On Message:" + messagetime + " |");
                        if (messagein, messagetime)
                        {
                            $scope.dynamic = messagein;
                            $log.log("dynamic :" + $scope.dynamic);
                            $scope.time = messagetime;
                            if (messagein==99 && messagetime=='0s'){
                                $scope.dynamic = 100;
                                $scope.time = "Download Sucessful";
                            }

                        }
                    });
                    $scope.allreceived = ExecShell.collection;
                    //$scope.dynamic = $scope.allreceived;
                    //$log.log('Success after downloadSra');
                    //$log.log($scope.dynamic);
                });
            };//write records to Mysql and Call Shell to run ./sh


            RunShowCtrl.StopSra = function () {
                $scope.tarObj.command = "kill";
                ExecShellKill.get($scope.tarObj)
            }
        });