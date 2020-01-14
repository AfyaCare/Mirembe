'use strict';

angular.module('bahmni.report')
.factory('initialization', ['$rootScope', '$q', 'appService', 'spinner', 'configurations', 'orderTypeService', 'locationService','mergeService', 'offlineService',
    function ($rootScope, $q, appService, spinner, configurations, orderTypeService, locationService, mergeService, offlineService) {


        var initApp = function () {
            return appService.initApp('report', {'app': true, 'extension': true });
        };



        return spinner.forPromise(initApp());
    }
]);
