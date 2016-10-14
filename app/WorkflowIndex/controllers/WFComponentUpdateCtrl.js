'use strict';

var workflowIndexModule = angular.module('workflowapp.WorkflowIndex');
workflowIndexModule.controller('WFComponentUpdateCtrl',
        function ($location, $log, $routeParams, WFComponentWS, $scope, CMPNTPARAMCOLUMNS1,
                CMPNTPARAMCOLUMNS2, GridRowData) {
            //,getJWTuseridByStore){
            var WFComponentUpdateCtrl = this;
            /*var getUserIdFromStore = function (store_tar){
             
             };
             */
            var seen = [];
            var columnDefs1 = CMPNTPARAMCOLUMNS1;
            var columnDefs2 = CMPNTPARAMCOLUMNS2;

            var data1 = [GridRowData.addNewRow(CMPNTPARAMCOLUMNS1)];
            var data2 = [GridRowData.addNewRow(CMPNTPARAMCOLUMNS2)];
            //Input define
            $scope.InputgridOpts = {
                enableRowSelection: true,
                enableRowHeaderSelection: false,
                modifierKeysToMultiSelect: false,
                multiSelect: false,
                columnDefs: columnDefs1,
                data: data1
            };
            //Output define
            $scope.OutputgridOpts = {
                enableRowSelection: true,
                enableRowHeaderSelection: false,
                modifierKeysToMultiSelect: false,
                multiSelect: false,
                columnDefs: columnDefs2,
                data: data2
            };

//get data from server 
            WFComponentUpdateCtrl.WFComponent = WFComponentWS.get({id: $routeParams.idwfcomponent},
                    function () {
                        $log.log('Success after get Comonent');
                        WFComponentUpdateCtrl.datainput = WFComponentUpdateCtrl.WFComponent.inputparams;
                        WFComponentUpdateCtrl.dataoutput = WFComponentUpdateCtrl.WFComponent.outputparams;
                        WFComponentUpdateCtrl.tarRow = {entity: 'empty'};
                        //get inputparams

                        $scope.InputgridOpts = {
                            enableRowSelection: true,
                            enableRowHeaderSelection: false,
                            modifierKeysToMultiSelect: false,
                            multiSelect: false,
                            columnDefs: columnDefs1,
                            data: JSON.parse(WFComponentUpdateCtrl.datainput)
                        };


                        $scope.addInputData = function () {
                            var n = $scope.InputgridOpts.data.length + 1;
                            $scope.InputgridOpts.data.push(GridRowData.addNewRow(CMPNTPARAMCOLUMNS1));
                        };





                        //get outputparams
                        $scope.OutputgridOpts = {
                            enableRowSelection: true,
                            enableRowHeaderSelection: false,
                            modifierKeysToMultiSelect: false,
                            multiSelect: false,
                            columnDefs: columnDefs2,
                            data: JSON.parse(WFComponentUpdateCtrl.dataoutput)
                        };


                        $scope.addOutputData = function () {
                            var n = $scope.OutputgridOpts.data.length + 1;
                            $scope.OutputgridOpts.data.push(GridRowData.addNewRow(CMPNTPARAMCOLUMNS2));
                        };



                        //update
                        $log.log('WFComponentUpdateCtrl');
                        WFComponentUpdateCtrl.WFComponent.inputparams = $scope.InputgridOpts.data;
                        WFComponentUpdateCtrl.WFComponent.outputparams = $scope.OutputgridOpts.data;
                        WFComponentUpdateCtrl.pre = WFComponentUpdateCtrl.WFComponent;
                        WFComponentUpdateCtrl.updateWFComponent = function () {
                            WFComponentUpdateCtrl.WFComponent.inputparams = JSON.stringify($scope.InputgridOpts.data);
                            WFComponentUpdateCtrl.WFComponent.outputparams = JSON.stringify($scope.OutputgridOpts.data);
                            WFComponentUpdateCtrl.WFComponent.$update({id: WFComponentUpdateCtrl.WFComponent.idwfcomponent},
                                    function () {
                                        $log.log('Success after Updating Component');
                                        $location.path('/WFComponentList');
                                    }, function (err) {
                                $log.log('err:' + err);
                            });
                        };
                    });

            $scope.InputgridOpts.onRegisterApi = function (gridApi) {
                //set gridApi1 on scope
                $scope.gridApi1 = gridApi;
                gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    var msg = 'input row selected ' + row.isSelected;
                    $log.log(msg);
                    WFComponentUpdateCtrl.inidselected = row.isSelected;

                });
                gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
                    var msg = 'input rows changed ' + rows.length;
                    $log.log(msg);
                });
            };

            $scope.inputdeleteSelected = function (inidselected) {
                $log.log('inputparams delete');
                $log.log(WFComponentUpdateCtrl.inidselected);
                angular.forEach($scope.gridApi1.selection.getSelectedRows(), function (data, index) {
                    $scope.InputgridOpts.data.splice($scope.InputgridOpts.data.lastIndexOf(data), 1);
                });
                WFComponentUpdateCtrl.inidselected = null;
            };

            $scope.OutputgridOpts.onRegisterApi = function (gridApi) {
                //set gridApi on scope
                $scope.gridApi2 = gridApi;
                gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    var msg = 'output row selected ' + row.isSelected;
                    WFComponentUpdateCtrl.outidselected = row.isSelected;
                    $log.log(msg);

                });

                gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
                    var msg = 'output rows changed ' + rows.length;
                    $log.log(msg);
                });
            };
            $scope.outputdeleteSelected = function () {
                $log.log('outputparams delete');
                $log.log(WFComponentUpdateCtrl.outidselected);
                angular.forEach($scope.gridApi2.selection.getSelectedRows(), function (data, index) {
                    $scope.OutputgridOpts.data.splice($scope.OutputgridOpts.data.lastIndexOf(data), 1);
                });
                WFComponentUpdateCtrl.outidselected = null;
            };
        });

