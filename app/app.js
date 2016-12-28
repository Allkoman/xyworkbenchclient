'use strict';

// Declare app level module which depends on views, and components
angular.module('XYWorkbench', [
    'ngRoute',
    'ngAnimate',
    'ui.bootstrap',
    'ngResource',
    'checklist-model',
    'angucomplete-alt',
    'XYWorkbench.Common',
    'XYWorkbench.Index',
    'XYWorkbench.Home',
    'XYWorkbench.SearchStudy',
    'XYWorkbench.SearchSample',
    'XYWorkbench.SearchRun',
    'XYWorkbench.SearchExperiment',
    'XYWorkbench.Study',
    'XYWorkbench.Submission',
    'XYWorkbench.Run',
    'XYWorkbench.Experiment',
    'XYWorkbench.Sample',
    'XYWorkbench.ClusterFile',
    'myApp.view1',
    'myApp.view2',
    'ngWebSocket',
    'myApp.version'
]).
        config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
                //$locationProvider.hashPrefix('!');
                //Otherwise, the href location has to be prefixed with !
                $routeProvider.
                        when('/Home', {
                            templateUrl: 'Home/tmpl/Home.html'
                        }).
                        when('/SearchStudy', {
                            templateUrl: 'SearchStudy/tmpl/SearchStudy.html'
                        }).
                        when('/SearchExperiment', {
                            templateUrl: 'SearchExperiment/tmpl/SearchExperiment.html'
                        }).
                        when('/SearchSample', {
                            templateUrl: 'SearchSample/tmpl/SearchSample.html'
                        }).
                        when('/SearchRun', {
                            templateUrl: 'SearchRun/tmpl/SearchRun.html'
                        }).
                        when('/StudyCreate', {
                            templateUrl: 'Study/tmpl/StudyCreate.html'
                        }).
                        when('/StudyList', {
                            templateUrl: 'Study/tmpl/StudyList.html'
                        }).
                        when('/StudyUpdate/:studyId', {
                            templateUrl: 'Study/tmpl/StudyUpdate.html'
                        }).
                        when('/RunList', {
                            templateUrl: 'Run/tmpl/RunList.html'
                        }).
                        when('/RunCreate', {
                            templateUrl: 'Run/tmpl/RunCreate.html'
                        }).
                        when('/RunUpdate/:runId', {
                            templateUrl: 'Run/tmpl/RunUpdate.html'
                        }).
                        when('/RunExperimentShow/:experimentAccession', {
                            templateUrl: 'Run/tmpl/RunExperimentShow.html'
                        }).
                        when('/RunShow/:runAccession', {
                            templateUrl: 'Run/tmpl/RunShow.html'
                        }).
                        when('/ExperimentList', {
                            templateUrl: 'Experiment/tmpl/ExperimentList.html'
                        }).
                        when('/ExperimentCreate', {
                            templateUrl: 'Experiment/tmpl/ExperimentCreate.html'
                        }).
                        when('/ExperimentUpdate/:experimentId', {
                            templateUrl: 'Experiment/tmpl/ExperimentUpdate.html'
                        }).
                        when('/ExperimentStudyShow/:studyAccession', {
                            templateUrl: 'Experiment/tmpl/ExperimentStudyShow.html'
                        }).
                        when('/ExperimentSampleShow/:sampleAccession', {
                            templateUrl: 'Experiment/tmpl/ExperimentSampleShow.html'
                        }).
                        when('/SampleList', {
                            templateUrl: 'Sample/tmpl/SampleList.html'
                        }).
                        when('/SampleCreate', {
                            templateUrl: 'Sample/tmpl/SampleCreate.html'
                        }).
                        when('/SampleUpdate/:sampleId', {
                            templateUrl: 'Sample/tmpl/SampleUpdate.html'
                        }).
                        when('/ClusterFile', {
                            templateUrl: 'ClusterFile/tmpl/ClusterFileList.html'
                        })
                        .otherwise({redirectTo: '/Home'});
            }]);
