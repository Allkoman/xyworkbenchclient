'use strict';

var workflowIndexModule = angular.module('workflowapp.WorkflowIndex');
workflowIndexModule.controller('WFTemplateDesignerCtrl',
   function($location,$log,WFTemplateWS,$routeParams,$scope){//,getJWTuseridByStore){
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
            if(nextNodeID === 0){
                alert("Please Wait a Moment for update of nextNodeID;-)");
                return;
            }
            var nodeName = prompt("Enter a node name:", "New node");
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
                                    name: "X"
                            },
                            {
                                    name: "Y"
                            },
                            {
                                    name: "Z"
                            }
                    ],
                    outputConnectors: [ 
                            {
                                    name: "1"
                            },
                            {
                                    name: "2"
                            }
                    ],
            };

            $scope.chartViewModel.addNode(newNodeDataModel);
            
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

