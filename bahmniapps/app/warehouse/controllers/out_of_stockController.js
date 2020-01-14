"use strict";

angular.module('bahmni.warehouse').controller('out_of_stockController', ['$scope',
    '$rootScope', '$stateParams', '$state', '$q', "$filter",
    'orderTypeService', 'sessionService', 'encounterService',
    'spinner', 'messagingService', 'appService', '$anchorScroll',
    'contextChangeHandler',
    '$bahmniCookieStore', 'offlineService', 'priceListService', 'getItemsService','overviewService',
    function ($scope, $rootScope, $stateParams, $state, $q, $filter,
              orderTypeService, sessionService, encounterService, spinner,
              messagingService, appService, $anchorScroll,
              contextChangeHandler, $bahmniCookieStore, offlineService, priceListService, getItemsService, overviewService) {


        var init = function () {
            $scope.item = {};
            getItemsList();
            fetchExpiredStock();
        };


        var fetchExpiredStock = function () {
            overviewService.getExpiredStock().then(function (response) {
                console.log(response.data);
                $scope.expiredDrugs = response.data;
            });
        };

        var getItemsList = function () {
            spinner.forPromise(
                getItemsService.outOfStock().then(function (response) {

                    $scope.OutOfStockData = response.data;

                }));

        };


        init();
    }
]);