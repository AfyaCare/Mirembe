'use strict';
angular.module('bahmni.warehouse')
    .factory('overviewService', ['$http', function ($http) {
        var getTotalQuantityPhysicalInventory = function () {
            return $http.get(Bahmni.Common.Constants.getTotalQuantityPhysicalInventory);
        };
        var getTotalValuePhysicalInventory = function () {
            return $http.get(Bahmni.Common.Constants.getTotalValuePhysicalInventory);
        };
        var getTotalQuantityStock = function () {
            return $http.get(Bahmni.Common.Constants.getTotalQuantityStock);
        };
        var getTotalValueStock = function () {
            return $http.get(Bahmni.Common.Constants.getTotalValueStock);
        };
        var getExpiredStock = function () {
            return $http.get(Bahmni.Common.Constants.getExpiredStock);
        };

        // var getTotalQuantityExpiredStock = function () {
        //     return $http.get(Bahmni.Common.Constants.getTotalQuantityExpiredStock);
        // };
        // var getTotalValueExpiredStock = function () {
        //     return $http.get(Bahmni.Common.Constants.getTotalValueExpiredStock);
        // };


        return {
            getTotalQuantityPhysicalInventory: getTotalQuantityPhysicalInventory,
            getTotalValuePhysicalInventory: getTotalValuePhysicalInventory,
            getTotalQuantityStock: getTotalQuantityStock,
            getTotalValueStock: getTotalValueStock,
            getExpiredStock: getExpiredStock
            // getTotalQuantityExpiredStock: getTotalQuantityExpiredStock,
            // getTotalValueExpiredStock: getTotalValueExpiredStock
        };
    }]);