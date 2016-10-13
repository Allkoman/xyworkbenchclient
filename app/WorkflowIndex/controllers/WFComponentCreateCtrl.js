'use strict';

var workflowIndexModule = angular.module('workflowapp.WorkflowIndex');
workflowIndexModule.controller('WFComponentCreateCtrl',
        function ($location, $log, WFComponentWS, $scope,
                CMPNTPARAMCOLUMNS1, CMPNTPARAMCOLUMNS2, GridRowData) {

            var seen = [];


            $scope.idselected = null;
            //,getJWTuseridByStore){
            var WFComponentCreateCtrl = this;
            /*var getUserIdFromStore = function (store_tar){
             
             };
             */

            var columnDefs1 = CMPNTPARAMCOLUMNS1;
            var columnDefs2 = CMPNTPARAMCOLUMNS2;

            /*var data1 = [
             {
             "paramname":"",
             "direction":"",
             "comment":"",
             "valtype":"",
             "paramtype":"",
             "prefix":"",            
             "post":"",
             "defaultval":"",}
             ];*/
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

            /*
             * ui-grid for component grid.
             */
            /*var columnDefs1 = [
             {name: 'firstName'},
             {name: 'lastName'},
             {name: 'company'},
             {name: 'gender'}
             ];*/

//Input
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
            $scope.Delete = function (row) {
                var index = $scope.InputgridOpts.data.indexOf(row.entity);
                $scope.InputgridOpts.data.splice(index, 1);
            };

            // $scope.addOutputData = function () {
            //var n = $scope.InputgridOpts.data.length + 1;
            // $scope.InputgridOpts.data.push(GridRowData.addNewRow(CMPNTPARAMCOLUMNS1));
            // };

            $scope.InputgridOpts.onRegisterApi = function (gridApi) {
                //set gridApi on scope
                $scope.gridApi = gridApi;
                gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    var msg = 'row selected ' + row.isSelected + ' val:' + row.entity.paramname;
                    WFComponentCreateCtrl.tarRow = row;
                    $log.log(msg);
                    seen = [];
                    $log.log(JSON.stringify(row, function (key, val) {
                        if (val != null && typeof val === "object") {
                            if (seen.indexOf(val) >= 0) {
                                //$log.log('it has been seen before! key:' + key);
                                return;
                            }
                            seen.push(val);
                        }
                        return val;
                    }));

                });

                /*
                 gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
                 var msg = 'rows changed ' + rows.length;
                 $log.log(msg);
                 });
                 */
            };


            //Output
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

            $scope.deleteRow = function (row) {
                var index = $scope.OutputgridOpts.data.indexOf(row.entity);
                $scope.OutputgridOpts.data.splice(index, 1);
            };

            // $scope.addOutputData = function () {
            //var n = $scope.OutputgridOpts.data.length + 1;
            // $scope.OutputgridOpts.data.push(GridRowData.addNewRow(CMPNTPARAMCOLUMNS2));
            // };

            $scope.OutputgridOpts.onRegisterApi = function (gridApi) {
                //set gridApi on scope
                $scope.gridApi = gridApi;
                gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    var msg = 'row selected ' + row.isSelected + ' val:' + row.entity.paramname;
                    WFComponentCreateCtrl.tarRow = row;
                    $log.log(msg);

                    seen = [];
                    $log.log(JSON.stringify(row, function (key, val) {
                        if (val != null && typeof val === "object") {
                            if (seen.indexOf(val) >= 0) {
                                //$log.log('it has been seen before! key:' + key);
                                return;
                            }
                            seen.push(val);
                        }
                        return val;
                    }));

                });
                /*
                 gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
                 var msg = 'rows changed ' + rows.length;
                 $log.log(msg);
                 });
                 */
            };
        });

