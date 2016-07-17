/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';
var commonModule = angular.module('XYWorkbench.Common');

commonModule.constant('ISDEBUG',true);//!!192.168.153.123//192.168.153.8//localhost

commonModule.factory('BackendAddr',function(ISDEBUG){
    var backend_addr = '';
    var backend_config_tar = {};
    
    var backend_config_debug={
        backend_host : 'localhost',  //localhost
        backend_name : 'XYHRDAServer',
        backend_port : '8080' //8080
    };
    
    var backend_config_production={
        backend_host : 'store.test.nebulagene.com',
        backend_name : 'XYGeneStoreServer',
        backend_port : '18080'
    };
    
    if(ISDEBUG)
        backend_config_tar = backend_config_debug;
    else
        backend_config_tar = backend_config_production;
    
    backend_addr = 'http://'+backend_config_tar.backend_host+':'+
                             backend_config_tar.backend_port+'/'+
                             backend_config_tar.backend_name+'/'+
                            'webresources';
                    
    return backend_addr;    
});

/*
 * Resource default methods:
 * { 'get':    {method:'GET'},
  'save':   {method:'POST'}, 
  #### PL####NOTICE
  ####it's different from our update{method:PUT} !!!
  'query':  {method:'GET', isArray:true},
  'remove': {method:'DELETE'},
  'delete': {method:'DELETE'} };
 */

/*-------filter:get full list by page---------*/

//:entity = {study,experiment,sample,run,submission,fastq ??sra}
commonModule.factory('GetHRDADataByPageWS',function($resource,BackendAddr){
    return $resource(BackendAddr+'/:entity/bypage/:pagenum/:pagesize',{},{
        list:{method:'GET',isArray:true}
    });
});

commonModule.factory('HRDACountWS',function($resource,BackendAddr){
    return $resource(BackendAddr+'/:entity/count',{},{
        count:{method:'GET'}
    });
});

/*-------filter:compose sql by params---------*/

commonModule.factory('GetHRDADataByFilterWS',function($resource,BackendAddr){
    return $resource(BackendAddr+'/:entity/byfilter',{},{
        list:{method:'PUT',isArray:true}
    });
});

commonModule.factory('HRDACountByFilterWS',function($resource,BackendAddr){
    return $resource(BackendAddr+'/:entity/countbyfilter',{},{
        count:{method:'PUT'}
    });
});
