'use strict';

var workflowIndexModule = angular.module('workflowapp.WorkflowIndex');
workflowIndexModule.controller('WFTemplateDesignerCtrl',
   function($location,$log,WFTemplateWS,$routeParams,$scope){//,getJWTuseridByStore){
       var WFTemplateDesignerCtrl = this;
       /*var getUserIdFromStore = function (store_tar){
           
       };*/
       var tarTmplId = $routeParams.idwftemplate;
       WFTemplateDesignerCtrl.WFTemplate=WFTemplateWS.get({id:tarTmplId});
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
        
        
        var nextNodeID = 1;
        
        $scope.addNewNode = function(){
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
            {tmplID:tarTmplId,dataModelStr:JSON.stringify($scope.chartViewModel.data,null,4)},
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
        
        $scope.chartViewModel = new flowchart.ChartViewModel(chartDataModel);
        $scope.open();
   });

