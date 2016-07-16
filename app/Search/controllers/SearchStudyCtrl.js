/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';


var entitySearchModule = angular.module('XYWorkbench.Search');
entitySearchModule.controller('SearchStudyCtrl',
        function ($log,GetHRDADataByPageWS,HRDACountWS,HRDACountWS2,
        ISDEBUG) {
            var SearchStudyCtrl = this;
            SearchStudyCtrl.pageSize = 20;
            SearchStudyCtrl.is_debug = ISDEBUG;
            SearchStudyCtrl.count = 0;
            
            $log.log("SearchStudyCtrl Loaded");
            
            var LoadFirstPage = function(){
                $log.log('Load first page for study');
                
                /*SearchStudyCtrl.curPageItems = GetHRDADataByPageWS.list(
                        {entity:'study',pagenum:'1',pagesize:SearchStudyCtrl.pageSize},{},
                        function(responseObj){
                            $log.log('recieve remote response:'+responseObj);
                        });
                        
                        
                HRDACountWS.count({entity:"study"},{},
                    function(responseObj){
                        SearchStudyCtrl.count = responseObj; 
                        $log.log("count response:"+responseObj);
                    }); */
                HRDACountWS2.count({},{},
                    function(responseObj){
                        SearchStudyCtrl.count =parseInt(responseObj.value); 
                        $log.log("count response:"+responseObj);
                    });
            };
            
            LoadFirstPage();
        }
);

