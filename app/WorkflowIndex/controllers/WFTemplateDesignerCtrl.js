'use strict';

var workflowIndexModule = angular.module('workflowapp.WorkflowIndex');
workflowIndexModule.controller('WFTemplateDesignerCtrl',
   function($location,$log,WFTemplateWS,$routeParams,$scope){//,getJWTuseridByStore){
       var WFTemplateDesignerCtrl = this;
       /*var getUserIdFromStore = function (store_tar){
           
       };*/
       
       WFTemplateDesignerCtrl.WFTemplate=WFTemplateWS.get({id:$routeParams.idwftemplate});
       //WFTemplateDesignerCtrl.WFTemplate.opusersIdopusers = {};
       //WFTemplateDesignerCtrl.WFTemplate.opusersIdopusers.idopusers = getJWTuseridByStore();       

       $log.log('WFTemplateDesignerCtrl');
       
       WFTemplateDesignerCtrl.createWFTemplate=function(){
           WFTemplateDesignerCtrl.WFTemplate.$update({id:WFTemplateDesignerCtrl.WFTemplate.idwftemplates},function(){
              $log.log('Success after Designer Template');
              $location.path('/WFTemplateList');    
           },function(err){
               $log.log('err:'+err);
           });          
       };
       
       //
	// Setup the data-model for the chart.
	//
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
        
        $scope.chartViewModel = new flowchart.ChartViewModel(chartDataModel);

   });

