'use strict';

var workflowIndexModule = angular.module('workflowapp.WorkflowIndex');
workflowIndexModule.controller('WFComponentCreateCtrl',
        function ($location, $log, WFComponentWS, $scope,
                CMPNTPARAMCOLUMNS1, CMPNTPARAMCOLUMNS2, GridRowData) {

            //,getJWTuseridByStore){
            var WFComponentCreateCtrl = this;
            /*var getUserIdFromStore = function (store_tar){
             
             };
             */
            WFComponentCreateCtrl.inidselected = null;
            WFComponentCreateCtrl.outidselected = null;
            var columnDefs1 = CMPNTPARAMCOLUMNS1;
            var columnDefs2 = CMPNTPARAMCOLUMNS2;

            var data1 = [GridRowData.addNewRow(CMPNTPARAMCOLUMNS1)];
            var data2 = [GridRowData.addNewRow(CMPNTPARAMCOLUMNS2)];


            WFComponentCreateCtrl.WFComponent = {inputparams: data1, outputparams: data2};

            WFComponentCreateCtrl.tarRow = {entity: 'empty'};
            //WFComponentCreateCtrl.WFComponent.opusersIdopusers = {};e
            //WFComponentCreateCtrl.WFComponent.opusersIdopusers.idopusers = getJWTuseridByStore();       

            $log.log('WFComponentCreateCtrl');
            WFComponentCreateCtrl.createWFComponent = function () {
                WFComponentCreateCtrl.WFComponent = {inputparams: JSON.stringify(data1, null, 4), outputparams: JSON.stringify(data2, null, 4), exec: WFComponentCreateCtrl.WFComponent.exec, workdir: WFComponentCreateCtrl.WFComponent.workdir};
                $log.log(WFComponentCreateCtrl.WFComponent);
                WFComponentWS.create(WFComponentCreateCtrl.WFComponent, function () {
                    $log.log('Success after ComponentCreate');
                    $location.path('/WFComponentList');
                }, function (err) {
                    $log.log('err:' + err);
                });
                $log.log('Success after post');
            };

//Inputparams part
            $scope.InputgridOpts = {
                enableRowSelection: true,
                enableRowHeaderSelection: false,
                modifierKeysToMultiSelect: false,
                multiSelect: false,
                columnDefs: columnDefs1,
                data: data1
            };

            $scope.addInputData = function () {
                var n = $scope.InputgridOpts.data.length + 1;
                $scope.InputgridOpts.data.push(GridRowData.addNewRow(CMPNTPARAMCOLUMNS1));
            };



            $scope.InputgridOpts.onRegisterApi = function (gridApi) {
                //set gridApi1 on scope
                $scope.gridApi1 = gridApi;
                gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    var msg = 'input row selected ' + row.isSelected;
                    $log.log(msg);
                    WFComponentCreateCtrl.inidselected = row.isSelected;

                });
                gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
                    var msg = 'input rows changed ' + rows.length;
                    $log.log(msg);
                });
            };

            $scope.inputdeleteSelected = function (inidselected) {
                $log.log('inputparams delete');
                $log.log(WFComponentCreateCtrl.inidselected);
                angular.forEach($scope.gridApi1.selection.getSelectedRows(), function (data, index) {
                    $scope.InputgridOpts.data.splice($scope.InputgridOpts.data.lastIndexOf(data), 1);
                });
                WFComponentCreateCtrl.inidselected = null;
            };
//Outputparams part
            $scope.OutputgridOpts = {
                enableRowSelection: true,
                enableRowHeaderSelection: false,
                modifierKeysToMultiSelect: false,
                multiSelect: false,
                columnDefs: columnDefs2,
                data: data2
            };

            $scope.addOutputData = function () {
                var n = $scope.OutputgridOpts.data.length + 1;
                $scope.OutputgridOpts.data.push(GridRowData.addNewRow(CMPNTPARAMCOLUMNS2));
            };



            $scope.OutputgridOpts.onRegisterApi = function (gridApi) {
                //set gridApi on scope
                $scope.gridApi2 = gridApi;
                gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    var msg = 'output row selected ' + row.isSelected;
                    WFComponentCreateCtrl.outidselected = row.isSelected;
                    $log.log(msg);

                });

                gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
                    var msg = 'output rows changed ' + rows.length;
                    $log.log(msg);
                });
            };
            $scope.outputdeleteSelected = function () {
                $log.log('outputparams delete');
                $log.log(WFComponentCreateCtrl.outidselected);
                angular.forEach($scope.gridApi2.selection.getSelectedRows(), function (data, index) {
                    $scope.OutputgridOpts.data.splice($scope.OutputgridOpts.data.lastIndexOf(data), 1);
                });
                WFComponentCreateCtrl.outidselected = null;
            };
        });

