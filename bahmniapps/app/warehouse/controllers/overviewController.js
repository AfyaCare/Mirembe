"use strict";

angular.module('bahmni.warehouse').controller('overviewController', ['$scope',
    '$rootScope', '$stateParams', '$state', '$q',
    'orderTypeService', 'sessionService', 'encounterService',
    'spinner', 'messagingService', 'appService', '$anchorScroll',
    'contextChangeHandler',
    '$bahmniCookieStore', 'offlineService','overviewService',
    function ($scope, $rootScope, $stateParams, $state, $q,
              orderTypeService, sessionService, encounterService, spinner,
              messagingService, appService, $anchorScroll,
              contextChangeHandler, $bahmniCookieStore, offlineService, overviewService) {

        var init = function () {
            fetchPhysicalInventoryQuantity();
            fetchPhysicalInventoryValue();
            fetchStockQuantity();
            fetchStockValue();
            // fetchExpiredStockQuantity();
            // fetchExpiredStockValue();
        };

        var fetchPhysicalInventoryQuantity = function() {
            overviewService.getTotalQuantityPhysicalInventory().then(function (response) {
                // console.log(response.data);
                $scope.pyhsicalInventoryQuantity = response.data[0].quantity;
                console.log($scope.pyhsicalInventoryQuantity);
            }).catch(function (err) {
                console.log(err);
            })
        };

        var fetchPhysicalInventoryValue = function() {
            overviewService.getTotalValuePhysicalInventory().then(function (response) {
                // console.log(response.data);
                $scope.pyhsicalInventoryValue = response.data[0].physical_value;
            }).catch(function (err) {
                console.log(err);
            })
        };

        var fetchStockQuantity = function() {
            overviewService.getTotalQuantityStock().then(function (response) {
                // console.log(response.data);
                $scope.stockQuantity = response.data[0].stock_quantity;
            }).catch(function (err) {
                console.log(err);
            })
        };

        var fetchStockValue = function() {
            overviewService.getTotalValueStock().then(function (response) {
                // console.log(response.data);
                $scope.stockValue = response.data[0].stock_value;
            }).catch(function (err) {
                console.log(err);
            })
        };

        // var fetchExpiredStockQuantity = function() {
        //     overviewService.getTotalQuantityExpiredStock().then(function (response) {
        //         // console.log(response.data);
        //         $scope.expireStockQuanity = response.data[0].expiry_quantity;
        //     }).catch(function (err) {
        //         console.log(err);
        //     })
        // };
        //
        // var fetchExpiredStockValue = function() {
        //     overviewService.getTotalValueExpiredStock().then(function (response) {
        //         // console.log(response.data);
        //         $scope.expireStockValue = response.data[0].expiry_value;
        //     }).catch(function (err) {
        //         console.log(err);
        //     })
        // };

        init();
    }
]);