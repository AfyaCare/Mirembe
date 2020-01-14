"use strict";

angular.module('bahmni.warehouse').controller('priceController', ['$scope',
    '$rootScope', '$stateParams', '$state', '$q', "$filter",
    'orderTypeService', 'sessionService', 'encounterService',
    'spinner', 'messagingService', 'appService', '$anchorScroll',
    'contextChangeHandler',
    '$bahmniCookieStore', 'offlineService', 'priceListService', 'priceItemService', 'getItemsService',
    function ($scope, $rootScope, $stateParams, $state, $q, $filter,
              orderTypeService, sessionService, encounterService, spinner,
              messagingService, appService, $anchorScroll,
              contextChangeHandler, $bahmniCookieStore, offlineService, priceListService, priceItemService, getItemsService) {
        var init = function () {
            $scope.item = {
                edit: false
            };
            getPriceList();
            getAllItems();
        };

        $scope.reset = function () {
            $scope.item = {
                edit: false
            };
            $scope.form.$setPristine();
        };

        var getAllItems = function () {
            spinner.forPromise(
                priceItemService.getAllPriceItems().then(function (response) {
                    // console.log("All items: " + JSON.stringify(response.data));
                    $scope.getPrices = response.data;
                    console.log(response.data);
                }));
        };
        var getPriceList = function () {
            spinner.forPromise(
                priceListService.getPriceList().then(function (response) {
                    // console.log(response.data);
                    // console.log("Price List: " + JSON.stringify(response.data));
                    $scope.priceLists = response.data;
                }));

        };

        $scope.save_price = function () {
            console.log($scope.item);
            spinner.forPromise(
                priceItemService.createPriceItem($scope.item.item_id, $scope.item.pricelist, $scope.item.buying_price, $scope.item.amount).then(function (response) {
                    console.log(response.data);
                    if (response.data === "updated".toUpperCase()) {
                        messagingService.showMessage('info', "Successfully created");
                        getAllItems();
                    }
                }));
            $scope.reset();

        };

        $scope.editPrice = function (item) {
            item.edit = true;
            spinner.forPromise(
                getItemsService.getItem(item.name).then(function (response) {
                    item.item_id = response.data[0].drug_id;
                    angular.forEach($scope.priceLists, function (value, key) {
                        if (value.name === item.priceList_name) {
                            item.pricelist = value.price_list_id;
                        }
                    });
                }));
            // console.log($scope.priceLists);
            console.log(item);
            $scope.item = item;
        };

        $scope.updatePrice = function (item) {
            console.log(item);
            spinner.forPromise(
                priceItemService.updatePriceItem(item.item_price_id, item.item_id, item.pricelist, item.buying_price, item.amount, $filter('date')(Date.parse(item.date_recorded), "yyyy-MM-dd")).then(function (response) {
                    console.log(response.data);
                    messagingService.showMessage('info', "Successfully updated");
                    getAllItems();
                }));
        };

        $scope.search = function () {
            spinner.forPromise(
                priceItemService.selectPriceItem($scope.searchPrice).then(function (response) {
                    console.log(response.data);
                    $scope.getPrices = response.data;
                }));

        };

        $scope.liveSearch = function (name) {
            // console.log("Input length :" + name.length);
            if (name.length >= 3) {
                spinner.forPromise(
                    priceItemService.selectPriceItem(name).then(function (response) {
                        // console.log(response.data);
                        $scope.getPrices = response.data;
                    })
                )
            }
        };


        init();
    }
]);