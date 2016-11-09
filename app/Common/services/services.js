/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';
var commonModule = angular.module('XYWorkbench.Common');

commonModule.constant('ISDEBUG', true);//!!192.168.153.123//192.168.153.8//localhost

commonModule.factory('BackendAddr', function (ISDEBUG) {
    var backend_addr = '';
    var backend_config_tar = {};

    var backend_config_debug = {
        backend_host: 'localhost', //localhost
        backend_name: 'XYHRDAServer',
        backend_port: '8080' //8080
    };

    var backend_config_production = {
        backend_host: 'store.test.nebulagene.com',
        backend_name: 'XYGeneStoreServer',
        backend_port: '18080'
    };

    if (ISDEBUG)
        backend_config_tar = backend_config_debug;
    else
        backend_config_tar = backend_config_production;

    backend_addr = 'http://' + backend_config_tar.backend_host + ':' +
            backend_config_tar.backend_port + '/' +
            backend_config_tar.backend_name + '/' +
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

/*-------Talbe: Study Result: Study Filter:Wildcard in Fulltext(FT)---------*/
commonModule.factory('GetHRDADataByFilterWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/:entity/byfilter', {}, {
        list: {method: 'PUT', isArray: true}
    });
});

commonModule.factory('HRDACountByFilterWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/:entity/countbyfilter', {}, {
        count: {method: 'PUT'}
    });
});

commonModule.factory('GetHRDADataByPageWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/:entity/bypage/:pagenum/:pagesize', {}, {
        list: {method: 'GET', isArray: true}
    });
});

commonModule.factory('HRDACountWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/:entity/count', {}, {
        count: {method: 'GET'}
    });
});

commonModule.factory('Studies', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/study/:id', {}, {
        create: {method: 'POST'},
        update: {method: 'PUT'},
        delme: {method: 'DELETE'}
    });
});

commonModule.factory('studys', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/study/:id', {}, {
        findAll: {method: 'GET', isArray: true}

    });
});
// Filters for study
commonModule.factory('GetTaxonsByFilterForStudyWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/taxons/onePageByFilterForStudyFT', {}, {
        gettaxons: {method: 'PUT', isArray: true}
    });
});

commonModule.factory('GetTaxonsCountByFilterForStudyWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/taxons/countByFilterForStudyFT', {}, {
        count: {method: 'PUT'}
    });
});

commonModule.factory('GetTypeByFilterForStudyWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/type/onePageByFilterForStudyFT', {}, {
        gettype: {method: 'PUT', isArray: true}
    });
});

commonModule.factory('GetTypeCountByFilterForStudyWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/type/countByFilterForStudyFT', {}, {
        count: {method: 'PUT'}
    });
});

commonModule.factory('GetSubmitterByFilterForStudyWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/submitter/onePageByFilterForStudyFT', {}, {
        getsubmitter: {method: 'PUT', isArray: true}
    });
});

commonModule.factory('GetSubmitterCountByFilterForStudyWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/submitter/countByFilterForStudyFT', {}, {
        count: {method: 'PUT'}
    });
});

commonModule.factory('GetInstrumentByFilterForStudyWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/instrument/onePageByFilterForStudyFT', {}, {
        getinstrument: {method: 'PUT', isArray: true}
    });
});

commonModule.factory('GetInstrumentCountByFilterForStudyWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/instrument/countByFilterForStudyFT', {}, {
        count: {method: 'PUT'}
    });
});


// Filters for experiment

commonModule.factory('GetTaxonsByFilterForExperimentWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/taxons/onePageByFilterForExperimentFT', {}, {
        gettaxons: {method: 'PUT', isArray: true}
    });
});

commonModule.factory('GetTaxonsCountByFilterForExperimentWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/taxons/countByFilterForExperimentFT', {}, {
        count: {method: 'PUT'}
    });
});

commonModule.factory('GetTypeByFilterForExperimentWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/type/onePageByFilterForExperimentFT', {}, {
        gettype: {method: 'PUT', isArray: true}
    });
});

commonModule.factory('GetTypeCountByFilterForExperimentWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/type/countByFilterForExperimentFT', {}, {
        count: {method: 'PUT'}
    });
});

commonModule.factory('GetSubmitterByFilterForExperimentWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/submitter/onePageByFilterForExperimentFT', {}, {
        getsubmitter: {method: 'PUT', isArray: true}
    });
});

commonModule.factory('GetSubmitterCountByFilterForExperimentWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/submitter/countByFilterForExperimentFT', {}, {
        count: {method: 'PUT'}
    });
});

commonModule.factory('GetInstrumentByFilterForExperimentWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/instrument/onePageByFilterForExperimentFT', {}, {
        getinstrument: {method: 'PUT', isArray: true}
    });
});

commonModule.factory('GetInstrumentCountByFilterForExperimentWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/instrument/countByFilterForExperimentFT', {}, {
        count: {method: 'PUT'}
    });
});

commonModule.factory('GetStrategyByFilterForExperimentWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/strategy/onePageByFilterForExperimentFT', {}, {
        getstrategy: {method: 'PUT', isArray: true}
    });
});

commonModule.factory('GetStrategyCountByFilterForExperimentWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/strategy/countByFilterForExperimentFT', {}, {
        count: {method: 'PUT'}
    });
});

commonModule.factory('GetSourceByFilterForExperimentWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/source/onePageByFilterForExperimentFT', {}, {
        getsource: {method: 'PUT', isArray: true}
    });
});

commonModule.factory('GetSourceCountByFilterForExperimentWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/source/countByFilterForExperimentFT', {}, {
        count: {method: 'PUT'}
    });
});

commonModule.factory('GetSelectionByFilterForExperimentWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/selection/onePageByFilterForExperimentFT', {}, {
        getselection: {method: 'PUT', isArray: true}
    });
});

commonModule.factory('GetSelectionCountByFilterForExperimentWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/selection/countByFilterForExperimentFT', {}, {
        count: {method: 'PUT'}
    });
});




// Filters for sample
commonModule.factory('GetTaxonsByFilterForSampleWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/taxons/onePageByFilterForSampleFT', {}, {
        gettaxons: {method: 'PUT', isArray: true}
    });
});

commonModule.factory('GetTaxonsCountByFilterForSampleWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/taxons/countByFilterForSampleFT', {}, {
        count: {method: 'PUT'}
    });
});

commonModule.factory('GetTypeByFilterForSampleWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/type/onePageByFilterForSampleFT', {}, {
        gettype: {method: 'PUT', isArray: true}
    });
});

commonModule.factory('GetTypeCountByFilterForSampleWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/type/countByFilterForSampleFT', {}, {
        count: {method: 'PUT'}
    });
});

commonModule.factory('GetSubmitterByFilterForSampleWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/submitter/onePageByFilterForSampleFT', {}, {
        getsubmitter: {method: 'PUT', isArray: true}
    });
});

commonModule.factory('GetSubmitterCountByFilterForSampleWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/submitter/countByFilterForSampleFT', {}, {
        count: {method: 'PUT'}
    });
});

commonModule.factory('GetInstrumentByFilterForSampleWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/instrument/onePageByFilterForSampleFT', {}, {
        getinstrument: {method: 'PUT', isArray: true}
    });
});

commonModule.factory('GetInstrumentCountByFilterForSampleWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/instrument/countByFilterForSampleFT', {}, {
        count: {method: 'PUT'}
    });
});
// Filters for run
commonModule.factory('GetTaxonsByFilterForRunWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/taxons/onePageByFilterForRunFT', {}, {
        gettaxons: {method: 'PUT', isArray: true}
    });
});

commonModule.factory('GetTaxonsCountByFilterForRunWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/taxons/countByFilterForRunFT', {}, {
        count: {method: 'PUT'}
    });
});

commonModule.factory('GetSubmitterByFilterForRunWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/submitter/onePageByFilterForRunFT', {}, {
        getsubmitter: {method: 'PUT', isArray: true}
    });
});

commonModule.factory('GetSubmitterCountByFilterForRunWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/submitter/countByFilterForRunFT', {}, {
        count: {method: 'PUT'}
    });
});

commonModule.factory('GetInstrumentByFilterForRunWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/instrument/onePageByFilterForRunFT', {}, {
        getinstrument: {method: 'PUT', isArray: true}
    });
});

commonModule.factory('GetInstrumentCountByFilterForRunWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/instrument/countByFilterForRunFT', {}, {
        count: {method: 'PUT'}
    });
});


/*-------Talbe: Submission Result: Submission Filter:Wildcard in Fulltext(FT)---------*/

commonModule.factory('submissions', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/submission/:id', {}, {
        findAll: {method: 'GET', isArray: true}

    });
});

commonModule.factory('GetSubDataByPageWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/submission/bypage/:pagenum/:pagesize', {}, {
        list: {method: 'GET', isArray: true}
    });
});

commonModule.factory('SubCountWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/submission/count', {}, {
        count: {method: 'GET'}
    });
});




/*-------filter:get full list by page---------*/

//:entity = {study,experiment,sample,run,submission,fastq ??sra}
commonModule.factory('GetRunDataByPageWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/run/bypage/:pagenum/:pagesize', {}, {
        list: {method: 'GET', isArray: true}
    });
});

commonModule.factory('GetRunDataByFilterWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/run/byfilter', {}, {
        list: {method: 'PUT', isArray: true}
    });
});

commonModule.factory('RunCountByFilterWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/run/countbyfilter', {}, {
        count: {method: 'PUT'}
    });
});

commonModule.factory('RunCountWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/run/count', {}, {
        count: {method: 'GET'}
    });
});

commonModule.factory('Runs', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/run/:id', {}, {
        create: {method: 'POST'},
        update: {method: 'PUT'},
        delme: {method: 'DELETE'}
    });
});

commonModule.factory('Local', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/localsra/:id', {}, {
        create: {method: 'POST'},
        update: {method: 'PUT'},
        delme: {method: 'DELETE'},
        get: {method: 'GET'}
    });
});

commonModule.factory('Localshell', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/localsra/execshell', {}, {
        get: {method: 'GET'}
    });
});//Call Shell



/*-------Talbe: Experiemnt Result: Study Filter: Taxon's id & Study's Wildcard---------*/
commonModule.factory('experimentaccession', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/experiment/byacc/:experimentAccession', {}, {
        findAll: {method: 'GET', isArray: true}
    });
});

commonModule.factory('runaccession', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/run/byacc/:runAccession', {}, {
        findAll: {method: 'GET', isArray: true}
    });
});


commonModule.factory('GetExperimentDataByPageWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/experiment/bypage/:pagenum/:pagesize', {}, {
        list: {method: 'GET', isArray: true}
    });
});

//study
commonModule.factory('GETScientificByacc', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/taxons/byacc/:studyAccession', {}, {
        list: {method: 'PUT', isArray: true}
    });
});
commonModule.factory('GETSubmissionByacc', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/submitter/byacc/:studyAccession', {}, {
        list: {method: 'PUT', isArray: true}
    });
});


//experiment
commonModule.factory('GETOriganismByacc', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/taxons/byexp/:experimentAccession', {}, {
        list: {method: 'PUT', isArray: true}
    });
});
commonModule.factory('GETSubmitterByacc', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/submitter/byexp/:experimentAccession', {}, {
        list: {method: 'PUT', isArray: true}
    });
});


//sample
commonModule.factory('GETSampleOrganismByacc', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/taxons/bysample/:sampleAccession', {}, {
        list: {method: 'PUT', isArray: true}
    });
});
commonModule.factory('GETSampleSubmissionByacc', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/submitter/bysample/:sampleAccession', {}, {
        list: {method: 'PUT', isArray: true}
    });
});
commonModule.factory('GETSampleTitleByacc', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/experiment/bysample/:sampleAccession', {}, {
        list: {method: 'PUT', isArray: true}
    });
});
commonModule.factory('GETSampleStuidiesByacc', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/study/bysample/:sampleAccession', {}, {
        list: {method: 'PUT', isArray: true}
    });
});

//run
commonModule.factory('GETRunOrganismByacc', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/taxons/byrun/:studyAccession', {}, {
        list: {method: 'PUT', isArray: true}
    });
});
commonModule.factory('GETStudiesByacc', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/sra/byrun/:studyAccession', {}, {
        list: {method: 'PUT', isArray: true}
    });
});
commonModule.factory('GETRunAliasByacc', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/experiment/byrun/:studyAccession', {}, {
        list: {method: 'PUT', isArray: true}
    });
});




commonModule.factory('studyaccession', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/study/byacc/:studyAccession', {}, {
        findAll: {method: 'GET', isArray: true}
    });
});

commonModule.factory('sampleaccession', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/sample/byacc/:sampleAccession', {}, {
        findAll: {method: 'GET', isArray: true}
    });
});

commonModule.factory('ExperimentCountWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/experiment/count', {}, {
        count: {method: 'GET'}
    });
});

commonModule.factory('Experiments', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/experiment/:id', {}, {
        create: {method: 'POST'},
        update: {method: 'PUT'},
        delme: {method: 'DELETE'}
    });
});

commonModule.factory('experiments', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/experiment/:id', {}, {
        findAll: {method: 'GET', isArray: true}

    });
});

commonModule.factory('GetExperimentDataByFilterWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/experiment/byfilter', {}, {
        list: {method: 'PUT', isArray: true}
    });
});

commonModule.factory('ExperimentCountByFilterWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/experiment/countbyfilter', {}, {
        count: {method: 'PUT'}
    });
});

/*-------Talbe: Sample Result: Study Filter: Taxon's id & Study's Wildcard---------*/

commonModule.factory('GetSampleDataByPageWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/sample/bypage/:pagenum/:pagesize', {}, {
        list: {method: 'GET', isArray: true}
    });
});

commonModule.factory('SampleCountWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/sample/count', {}, {
        count: {method: 'GET'}
    });
});

commonModule.factory('Samples', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/sample/:id', {}, {
        create: {method: 'POST'},
        update: {method: 'PUT'},
        delme: {method: 'DELETE'}
    });
});

commonModule.factory('samples', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/sample/:id', {}, {
        findAll: {method: 'GET', isArray: true}

    });
});

commonModule.factory('GetSampleDataByFilterWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/sample/byfilter', {}, {
        list: {method: 'PUT', isArray: true}
    });
});

commonModule.factory('SampleCountByFilterWS', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/sample/countbyfilter', {}, {
        count: {method: 'PUT'}
    });
});

commonModule.factory('GetmessageByfilter', function ($resource, BackendAddr) {
    return $resource(BackendAddr + '/localsra/byfilter', {}, {
        list: {method: 'PUT', isArray: true}
    });
});