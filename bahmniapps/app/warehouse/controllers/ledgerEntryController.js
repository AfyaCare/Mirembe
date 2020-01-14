"use strict";

angular.module('bahmni.warehouse').controller('ledgerEntryController', ['$scope',
    '$rootScope', '$stateParams', '$state', '$q', "$filter",
    'orderTypeService', 'sessionService', 'encounterService',
    'spinner', 'messagingService', 'appService', '$anchorScroll',
    'contextChangeHandler',
    '$bahmniCookieStore', 'offlineService', 'priceListService', 'ledgerEntryService','getItemsService',
    function ($scope, $rootScope, $stateParams, $state, $q, $filter,
              orderTypeService, sessionService, encounterService, spinner,
              messagingService, appService, $anchorScroll,
              contextChangeHandler, $bahmniCookieStore, offlineService, priceListService, ledgerEntryService, getItemsService) {


        var init = function () {
            $scope.item = {};
            getPriceList();
            getLedgers();
        };

        var getPriceList = function () {
            spinner.forPromise(
                priceListService.getPriceList().then(function (response) {

                    $scope.priceLists = response.data;

                }));

        };
        $scope.search = function () {
            var name = $scope.item.searchLedger;
            var batchNo = "";
            var invNo = "";
            spinner.forPromise(
                ledgerEntryService.getLedger(name, batchNo, invNo).then(function (response) {
                    console.log(response);
                    $scope.getLedgers = response.data;

                }));

        };


        var getLedgers = function () {
            var name = "";
            var batchNo = "";
            var invNo = "";
            spinner.forPromise(
                ledgerEntryService.getLedgers().then(function (response) {
                    console.log(response.data);
                    $scope.getLedgers = response.data;

                }));

        };

        $scope.reset = function () {
            $scope.item = {};
            $scope.form.$setPristine();
        };

        $scope.save_ledger = function () {
            console.log($scope.item);
            $scope.item.expiryDate = $filter('date')($scope.item.expiry_date, "yyyy-MM-dd");
            $scope.item.receiveDate = $filter('date')($scope.item.received_date, "yyyy-MM-dd");
            var math = "-";
            $scope.item.amount = 1;
            if ($scope.item.ledger_type.indexOf("-ve") !== -1) {

                $scope.item.quantity = $scope.item.quantity * -1;
            }

            spinner.forPromise(
                ledgerEntryService.createLedgerEntry($scope.item.drug_id, $scope.item.ledger_type, $scope.item.quantity,
                    $scope.item.batchNo, $scope.item.invoice, $scope.item.expiryDate, $scope.item.receiveDate,
                    $scope.item.pricelist, $scope.item.amount, math).then(function (response) {
                    console.log(response.data);
                    if (response.data === "updated".toUpperCase()) {
                        messagingService.showMessage('info', "{{'SAVE'}}");
                        getPriceList();
                        getLedgers();
                    }


                }));
            $scope.reset();
        };

        var getItem = function (name) {
            getItemsService.getItem(name).then(function (response) {
                $scope.thisItem = response.data[0];
            })
        };

        $scope.edit_ledger = function (item) {
            getItem(item.name);
            item.edit = true;
            item.received_date = new Date(item.received_date);
            item.expiry_date = new Date(item.expiry_date);
            item.batchNo = item.batch_no;
            item.invoice = parseInt(item.invoice_no);
            angular.forEach($scope.priceLists, function (value, key) {
               if(value.name === item.price_list_name) {
                   item.price_list_id = value.price_list_id;
                   item.pricelist = value.price_list_id;
               }
            });
            $scope.item = item;
            // console.log($scope.priceLists);
            console.log(item);
            console.log($scope.thisItem);
        };

        $scope.updateLedger = function(item) {
            console.log(item);
            item.expiryDate = $filter('date')(item.expiry_date, "yyyy-MM-dd");
            item.receiveDate = $filter('date')(item.received_date, "yyyy-MM-dd");
            var math = "-";
            item.amount = 1;
            if (item.ledger_type.indexOf("-ve") !== -1) {

                item.quantity = item.quantity * -1;
            }

            spinner.forPromise(
                ledgerEntryService.updateLedgerEntry(item.item_id, item.ledger_entry_id, item.ledger_type, item.quantity,
                    item.batchNo, item.invoice, item.expiryDate, item.receiveDate,
                    item.pricelist, item.amount, math).then(function (response) {
                    console.log(response.data);
                    if (response.data === "updated".toUpperCase()) {
                        messagingService.showMessage('info', "Successfully updated entry");
                        getPriceList();
                        getLedgers();
                    }


                }));
        };


        init();
    }
]);