"use strict";

angular.module('bahmni.warehouse').controller('activeproductsController', ['$scope',
    '$rootScope', '$stateParams', '$state', '$q', "$filter",
    'orderTypeService', 'sessionService', 'encounterService',
    'spinner', 'messagingService', 'appService', '$anchorScroll',
    'contextChangeHandler',
    '$bahmniCookieStore', 'offlineService', 'priceListService', 'ledgerEntryService', 'getItemsService',
    function ($scope, $rootScope, $stateParams, $state, $q, $filter,
              orderTypeService, sessionService, encounterService, spinner,
              messagingService, appService, $anchorScroll,
              contextChangeHandler, $bahmniCookieStore, offlineService, priceListService, ledgerEntryService, getItemsService) {

        var init = function () {
            $scope.item = {};
            getAllItems();
        };

        $scope.reset = function () {
            $scope.item = {};
            $scope.form.$setPristine();
        };

        var getAllItems = function () {
            spinner.forPromise(
                getItemsService.getItem("").then(function (response) {
                    console.log(response.data);
                    $scope.getItems = response.data;
                }));
        };


        $scope.save_active = function () {
            // getItemsService.updateStatus(item.item_id, item.drug_id, status).then(function (response) {
            console.log("From func:" + JSON.stringify($scope.item));
            getItemsService.updateStatus($scope.item.drug_id, $scope.item.item_id, $scope.item.status).then(function (response) {
                console.log(response.data);
                messagingService.showMessage('info', "{{'SAVE'}}");
                $state.go("activateProducts");
            });

            $scope.reset();

        };


        $scope.search = function () {
            var name = $scope.item.searchItem;
            spinner.forPromise(
                getItemsService.getItem(name).then(function (response) {
                    console.log(response.data);
                    $scope.getItems = response.data;

                }));

        };

        $scope.liveSearch = function (name) {
            // console.log("Input length :" + name.length);
            if (name.length >= 3) {
                spinner.forPromise(
                    getItemsService.getItem(name).then(function (response) {
                        console.log(response.data);
                        $scope.getItems = response.data;
                    })
                )
            }
        };


        $scope.changeItemState = function (item) {
            console.log(item);
            var status = 1;
            if (item.retired) {
                status = 0;
            }
            getItemsService.updateStatus(item.item_id, item.drug_id, status).then(function (response) {
                console.log(response.data);
                getAllItems();
                messagingService.showMessage('info', "Updated successfully");
            });
        };
        init();
    }
]);