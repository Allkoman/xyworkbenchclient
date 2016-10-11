'use strict';

var workflowIndexModule = angular.module('workflowapp.WorkflowIndex');
workflowIndexModule.controller('WFComponentCreateCtrl',
        function ($location, $log, WFComponentWS, $scope,
                CMPNTPARAMCOLUMNS, GridRowData) {

            var seen = [];



            //,getJWTuseridByStore){
            var WFComponentCreateCtrl = this;
            /*var getUserIdFromStore = function (store_tar){
             
             };
             */

            var columnDefs1 = CMPNTPARAMCOLUMNS;

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
            var data1 = [GridRowData.addNewRow(CMPNTPARAMCOLUMNS)];


            WFComponentCreateCtrl.WFComponent = {inputparams: data1};
            WFComponentCreateCtrl.tarRow = {entity:'empty'};
            //WFComponentCreateCtrl.WFComponent.opusersIdopusers = {};
            //WFComponentCreateCtrl.WFComponent.opusersIdopusers.idopusers = getJWTuseridByStore();       

            $log.log('WFComponentCreateCtrl');

            WFComponentCreateCtrl.createWFComponent = function () {
                WFComponentWS.create(WFComponentCreateCtrl.WFComponent, function () {
                    $log.log('Success after ComponentCreate');
                    $location.path('/WFComponentList');
                }, function (err) {
                    $log.log('err:' + err);
                });
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


            $scope.gridOpts = {
                enableRowSelection: true,
                enableRowHeaderSelection: false,
                modifierKeysToMultiSelect: false,
                multiSelect: false,
                columnDefs: columnDefs1,
                data: data1
            };

            $scope.addData = function () {
                var n = $scope.gridOpts.data.length + 1;
                $scope.gridOpts.data.push(GridRowData.addNewRow(CMPNTPARAMCOLUMNS));
            };

            $scope.gridOpts.onRegisterApi = function (gridApi) {
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
                                $log.log('it has been seen before! key:'+key);
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

