'use strict';

var workflowIndexModule = angular.module('workflowapp.WorkflowIndex');
workflowIndexModule.controller('WFTemplateDesignerCtrl',
   function($location,$log,WFTemplateWS,$routeParams,$scope,
        WFCmpntParamWS,
        $uibModal){//,getJWTuseridByStore){
       var WFTemplateDesignerCtrl = this;
       /*var getUserIdFromStore = function (store_tar){
           
       };*/
       var nextNodeID = 0;

       var tarTmplId = $routeParams.idwftemplate;
       WFTemplateDesignerCtrl.WFTemplate=WFTemplateWS.get({id:tarTmplId},
       function(tar_tmpl){
           $log.log("current node number:"+tar_tmpl.nodeidmax);
           nextNodeID = tar_tmpl.nodeidmax;
       });
       
       //WFTemplateDesignerCtrl.WFTemplate.opusersIdopusers = {};
       //WFTemplateDesignerCtrl.WFTemplate.opusersIdopusers.idopusers = getJWTuseridByStore();       

       $log.log('WFTemplateDesignerCtrl');
       
       /*
        * 
       WFTemplateDesignerCtrl.createWFTemplate=function(){
           WFTemplateDesignerCtrl.WFTemplate.$update({id:WFTemplateDesignerCtrl.WFTemplate.idwftemplates},function(){
              $log.log('Success after Designer Template');
              $location.path('/WFTemplateList');    
           },function(err){
               $log.log('err:'+err);
           });          
       };
       */
       
       //
	// Setup the data-model for the chart.
	//
        /*
	var chartDataModel = {

		nodes: [
			{
				name: "Example Node 1",
				id: 0,
				x: 0,
				y: 0,
				width: 350,
				inputConnectors: [
					{
						name: "A",
					},
					{
						name: "B",
					},
					{
						name: "C",
					},
				],
				outputConnectors: [
					{
						name: "A",
					},
					{
						name: "B",
					},
					{
						name: "C",
					},
				],
			},

			{
				name: "Example Node 2",
				id: 1,
				x: 400,
				y: 200,
				inputConnectors: [
					{
						name: "A",
					},
					{
						name: "B",
					},
					{
						name: "C",
					},
				],
				outputConnectors: [
					{
						name: "A",
					},
					{
						name: "B",
					},
					{
						name: "C",
					},
				],
			},

		],

		connections: [
			{
				name:'Connection 1',
				source: {
					nodeID: 0,
					connectorIndex: 1,
				},

				dest: {
					nodeID: 1,
					connectorIndex: 2,
				},
			},
			{
				name:'Connection 2',
				source: {
					nodeID: 0,
					connectorIndex: 0,
				},

				dest: {
					nodeID: 1,
					connectorIndex: 0,
				},
			},

		]
	};
        */
       
       var chartDataModel = {

		nodes: [			
		],

		connections: [
                ]
	};
        
        
        
        $scope.addNewNode = function(){
            var addNodeModalInstance = $uibModal.open({
                animation:    true,
                templateUrl: 'WorkflowIndex/tmpl/WFComponentListChooser.html',
                controller:  'WFComponentListChooserCtrl',
                size:        'lg'
            });
            
            addNodeModalInstance.result.then(function (selectedItem) {
                $log.log('After choose component:' + selectedItem);
                //Load Param w.r.t selected component
                $scope.tarparamswrt = WFCmpntParamWS.query(
                        {action: 'bycmpnt', id: selectedItem.idwfcomponent},
                        function (response) {
                            $log.log("Response:" + response);
                            $log.log("addNodeModalInstance:(Succ)" + response);//JSON.parse(
                            var inputParams = [];
                            var outputParams = []; 
                            //for(var param_el in response){
                            for(var i=0;i<response.length;i++){
                                var param_el = response[i];
                                $log.log("name:"+param_el.paramname);
                                $log.log("dir:"+param_el.direction);                                
                                $log.log("id:"+param_el.idwfcmpntparams);
                                if(param_el.direction===0)
                                    inputParams.push({name:param_el.paramname,paramid:param_el.idwfcmpntparams});
                                else
                                    outputParams.push({name:param_el.paramname,paramid:param_el.idwfcmpntparams});
                            }
                            
                            //output the fields into node
                            var newNodeDataModel = {
                                name: selectedItem.exec,
                                id: nextNodeID++,
                                cmpntid:selectedItem.idwfcomponent,
                                cmpntworkdri: selectedItem.workdir,
                                x: 0,
                                y: 0,
                                outputConnectors: inputParams,
                                inputConnectors: outputParams,
                            };

                            $scope.chartViewModel.addNode(newNodeDataModel);
                        }, function (error) {
                    $log.log("addNodeModalInstance:(Error)" + error);
                });
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });//end addNodeModalInstance
             
       };//end addNewNode()
        
        $scope.save = function(){
            $log.log('tar text:'+ JSON.stringify($scope.chartViewModel.data,null,4));
            WFTemplateWS.update({action:'editcontent',id:tarTmplId},
            {                
                tmplID:tarTmplId,
                nodeIDMax:nextNodeID,
                dataModelStr:JSON.stringify($scope.chartViewModel.data,null,4)
            },
            function(){
                $log.log('WFTemplateDesignerCtrl success');
                $location.path('/WFTemplateList');
            },
            function(error){
                $log.log('WFTemplateDesignerCtrl[error on $scope.save]:'+error)
            });
                    
            //JSON.stringify($scope.chartViewModel.data, null, 4); 
        };//end save
        
        $scope.open = function(){
            $log.log('open remote data file');
            WFTemplateWS.get({action:'getcontent',id:tarTmplId},
            function(data){
                if(data!='empty'){
                    chartDataModel = data;
                    $scope.chartViewModel = new flowchart.ChartViewModel(data);

                }
            },function(error){
                $log.log();
            });
        };
        
        $scope.deleteSelected = function () {

		$scope.chartViewModel.deleteSelected();
	};
        
        $scope.addTmplInputParam = function(){
            var nodeName = prompt("Enter a Template Input Parameter name:", "New Template Input Parameter");
            if (!nodeName) {
                    return;
            }

            //
            // Template for a new node.
            //
            var newNodeDataModel = {
                    name: nodeName,
                    id: nextNodeID++,
                    x: 0,
                    y: 0,                    
                    outputConnectors: [ 
                            {
                                    name: "1"
                            }
                    ],
            };

            $scope.chartViewModel.addNode(newNodeDataModel);
        };
        
        $scope.addTmplOutputParam = function(){
            var nodeName = prompt("Enter a Template Output Parameter name:", "New Template Output Parameter");
            if (!nodeName) {
                    return;
            }

            //
            // Template for a new node.
            //
            var newNodeDataModel = {
                    name: nodeName,
                    id: nextNodeID++,
                    x: 0,
                    y: 0,                    
                    inputConnectors: [ 
                            {
                                    name: "1"
                            }
                    ],
            };

            $scope.chartViewModel.addNode(newNodeDataModel);
        };
        
        $scope.chartViewModel = new flowchart.ChartViewModel(chartDataModel);
        $scope.open();
   });

