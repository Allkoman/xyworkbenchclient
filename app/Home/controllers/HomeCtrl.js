/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

var homeModule = angular.module('XYWorkbench.Home');
homeModule.controller('HomeCtrl',
        function ($log, $scope, $location
                ) {//,$uibModal) {

            $scope.myInterval = 5000;
            $scope.noWrapSlides = false;
            $scope.active = 0;
            
            var slides = $scope.slides = [
                {
                    image: 'img/img_0_b.jpg',
                    text: 'Profession',
                    id: 0,
                },
                {
                    image: 'img/img_1_b.jpg',
                    text: 'Innovation',
                    id: 1
                },
                {
                    image: 'img/img_2_b.jpg',
                    text: 'Profession',
                    id: 2
                },
                {
                    image: 'img/img_3_b.jpg',
                    text: 'Passion',
                    id: 3
                }
            ];
            var currIndex = 0;

            $log.log('HomeCtrl Loaded');
        });
