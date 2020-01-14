'use strict';

angular.module('bahmni.billing')
    .factory('initialization', ['$rootScope', 'appService', 'spinner',
        function ($rootScope, appService, spinner) {
            var initApp = function () {
                return appService.initApp('billing', {'app': true, 'extension': true });
            };
            return function () {
                return spinner.forPromise(initApp());
            };
        }
    ]);