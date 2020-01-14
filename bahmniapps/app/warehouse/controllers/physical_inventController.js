"use strict";

angular.module('bahmni.warehouse').controller('physical_inventController', ['$scope',
    '$rootScope', '$stateParams', '$state', '$q', "$filter",
    'orderTypeService', 'sessionService', 'encounterService',
    'spinner', 'messagingService', 'appService', '$anchorScroll',
    'contextChangeHandler',
    '$bahmniCookieStore', 'offlineService', 'priceListService', 'physicalInvService', 'getItemsService',
    function ($scope, $rootScope, $stateParams, $state, $q, $filter,
              orderTypeService, sessionService, encounterService, spinner,
              messagingService, appService, $anchorScroll,
              contextChangeHandler, $bahmniCookieStore, offlineService, priceListService, physicalInvService, getItemsService) {

        // $scope.searchInv.byDate = "";
        // $scope.searchInv.byBatch = "";
        // $scope.searchInv.ByName = "";
        var init = function () {
            $scope.item = {};
            getPriceList();
            getAllPhysicalInventory();
        };

        $scope.reset = function () {
            $scope.item = {};
            $scope.form.$setPristine();
        };

        var getAllPhysicalInventory = function () {
            spinner.forPromise(
                physicalInvService.getAllPhysicalInventory().then(function (response) {
                    console.log(response.data);
                    $scope.getInvs = response.data;
                }));
        };

        var getPriceList = function () {
            spinner.forPromise(
                priceListService.getPriceList().then(function (response) {
                    console.log(response.data);
                    $scope.priceLists = response.data;

                }));

        };

        $scope.savePhysicalInv = function () {
            $scope.item.receivedDate = $filter('date')($scope.item.receivedDate, "yyyy-MM-dd");
            $scope.item.recorededDate = $filter('date')($scope.item.recorededDate, "yyyy-MM-dd");
            $scope.item.expire_date = $filter("date")($scope.item.expire_date, "yyyy-MM-dd");
            spinner.forPromise(
                physicalInvService.createPysicalInv($scope.item.item_id, $scope.item.pricelist, $scope.item.quantity,
                    $scope.item.expire_date, $scope.item.recorededDate, $scope.item.batch).then(function (response) {
                        console.log(response.data);
                    if (response.data === "updated".toUpperCase()) {
                        messagingService.showMessage('info', "Successful added entry");
                        getAllPhysicalInventory();
                        // $state.go("physical_invent");
                    }

                }));
            $scope.reset();

        };

        $scope.search = function () {
            spinner.forPromise(
                physicalInvService.selectPysicalInv($scope.searchInv.ByName ? $scope.searchInv.ByName : " ", $scope.searchInv.byDate ? $filter('date')($scope.searchInv.byDate, "yyyy-MM-dd") : "" , $scope.searchInv.byBatch ? $scope.searchInv.byBatch : "").then(function (response) {
                    // console.log(response.data);
                    $scope.getInvs = response.data;
                }));
        };

        $scope.editInventory = function (item) {
            getItem(item.name);
            item.edit = true;
            angular.forEach($scope.priceLists, function (value, key) {
                if (item.price_name === value.name) {
                    item.pricelist = value.price_list_id
                }
            });
            item.quantity = item.qnty;
            item.batch = item.batchNo;
            item.expire_date = new Date(item.expire_date);
            item.recorededDate = new Date(item.inventoryDate);
            $scope.item = item;
            console.log(item);
        };


        var getItem = function (name) {
            getItemsService.getItem(name).then(function (response) {
                $scope.thisItem = response.data[0];
            })
        };

        $scope.updatePhysicalInventory = function (item) {
            console.log($scope.thisItem);
            console.log(item);
            spinner.forPromise(
                physicalInvService.updatePhysicalInventory($scope.thisItem.drug_id, item.physical_inventory_id, item.pricelist, item.quantity,
                    $filter('date')(item.expire_date, "yyyy-MM-dd"), $filter('date')(item.recorededDate, "yyyy-MM-dd"), item.batch).then(function (response) {
                    if (response.data === "updated".toUpperCase()) {
                        messagingService.showMessage('info', "Successfully updated");
                        getAllPhysicalInventory();
                        // $state.go("physical_invent");
                    }

                }));
        };


        init();
    }
]);