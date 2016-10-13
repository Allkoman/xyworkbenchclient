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
                        $scope.Delete = function (row) {
                            var index = $scope.InputgridOpts.data.indexOf(row.entity);
                            $scope.InputgridOpts.data.splice(index, 1);
                        };

                        $scope.InputgridOpts.onRegisterApi = function (gridApi) {
                            //set gridApi on scope
                            $scope.gridApi = gridApi;
                            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                                var msg = 'row selected ' + row.isSelected + ' val:' + row.entity.paramname;
                                WFComponentUpdateCtrl.tarRow = row;
                                $log.log(msg);

                                seen = [];
                                $log.log(JSON.stringify(row, function (key, val) {
                                    if (val != null && typeof val === "object") {
                                        if (seen.indexOf(val) >= 0) {
                                            $log.log('it has been seen before! key:' + key);
                                            return;
                                        }
                                        seen.push(val);
                                    }
                                    return val;
                                }));
                            });
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
                        $log.log($scope.OutputgridOpts.data);
                        $scope.addOutputData = function () {
                            var n = $scope.OutputgridOpts.data.length + 1;
                            $scope.OutputgridOpts.data.push(GridRowData.addNewRow(CMPNTPARAMCOLUMNS2));
                        };

                        $scope.deleteRow = function (row) {
                            var index = $scope.OutputgridOpts.data.indexOf(row.entity);
                            $scope.OutputgridOpts.data.splice(index, 1);
                        };

                        $scope.OutputgridOpts.onRegisterApi = function (gridApi) {
                            //set gridApi on scope
                            $scope.gridApi = gridApi;
                            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                                var msg = 'row selected ' + row.isSelected + ' val:' + row.entity.paramname;
                                WFComponentUpdateCtrl.tarRow = row;
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
                        };

                        //update
                        $log.log('WFComponentUpdateCtrl');
                        WFComponentUpdateCtrl.WFComponent.inputparams = $scope.InputgridOpts.data;
                        WFComponentUpdateCtrl.WFComponent.outputparams = $scope.OutputgridOpts.data;
                        WFComponentUpdateCtrl.pre = WFComponentUpdateCtrl.WFComponent;
                        $log.log(WFComponentUpdateCtrl.WFComponent);
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
        });

