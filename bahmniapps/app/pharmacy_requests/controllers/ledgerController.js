'use strict'

angular.module('store')
    .controller('LedgerController', ['$scope', 'ngDialog', 'SettingsService', 'spinner', 'messagingService', function ($scope, ngDialog, SettingsService, spinner, messagingService) {
        $scope.ledgerTypes = [];
        $scope.edit = false;
        function init() {
            getAllLedgers();
            getLedgerTypes();
            getNonRetiredLedgerTypes();
            getPriceCategories();
            getDosageForm();
        }
        //get all ledgers
        let getAllLedgers = function() {
            SettingsService.getAllLedgers()
                .then(response => {
                    $scope.ledgers = response.data;
                })
                .catch(error => console.log(error));
        };
        //get all ledger types
        let getLedgerTypes = function() {
            SettingsService.getAllLedgerType(1)
                .then(response => {
                    $scope.ledgerTypes = response.data;
                })
                .catch(error => console.log(error));
        };
        //get all ledger types
        let getNonRetiredLedgerTypes = function() {
            SettingsService.getAllLedgerType(0)
                .then(response => {
                    $scope.activeLedgerTypes = response.data;
                })
                .catch(error => console.log(error));
        };

        let getPriceCategories = function () {
            SettingsService.getPriceCategories(1)
                .then(response => {
                    $scope.priceCategories = response.data
                })
                .catch(error => console.log(error));
        };

        let getDosageForm = function () {
            SettingsService.getDosageForm()
                .then(response => $scope.dosageForms = response.data)
                .catch(error => console.log(error));
        };

        $scope.getDrugByName = function (data) {
            if (data.length >= 3) {
                SettingsService.getItemsByName(data)
                    .then(response => {
                        $scope.items = response.data;
                        console.log(response.data);
                    })
                    .catch(error => console.log(error));
            }
        };

        $scope.fillItemTextBox = function (data) {
            $scope.ledger.drug = {
                'name': data.itemName,
                'itemId': data.itemId,
            };
            $scope.items = null;
        };

        // open ledger type entry model
        $scope.createLedgerType = function () {
            ngDialog.open({
                scope: $scope,
                templateUrl: 'views/ledger/create-type.html'
            });
        };

        // save ledger type
        $scope.saveLedgerType = function (data) {
            console.log(data);
            spinner.forPromise(SettingsService.createLedgerType(data.name, data.operation)
                .then(response => {
                    if(response.data.toUpperCase() === 'success'.toUpperCase()) {
                        messagingService.showMessage('info', 'Ledger Type Saved')
                    } else {
                        messagingService.showMessage('error', response.data)
                    }
                }).catch(error => console.log(error))
            );
            ngDialog.close();
        };

        // edit ledger entry model
        $scope.editLedgerType = function (data) {
            $scope.type = data;
            ngDialog.open({
                scope: $scope,
                templateUrl: 'views/ledger/edit-type.html'
            });
        };

        // update ledger type
        $scope.updateLedgerType = function (data) {
            console.log(data);
            spinner.forPromise(SettingsService.updateLedgerType(data.uuid, data.name, data.operation, data.retired)
                .then(response => {
                    if(response.data.toUpperCase() === 'success'.toUpperCase()) {
                        messagingService.showMessage('info', 'Ledger Type updated')
                    } else {
                        messagingService.showMessage('error', response.data)
                    }
                }).catch(error => console.log(error))
            );
            ngDialog.close();
        };

        // activate/deactivate ledger type
        $scope.activateLedgerType = function (data, retired) {
            console.log(data);
            spinner.forPromise(SettingsService.updateLedgerType(data.uuid, data.name, data.operation, retired)
                .then(response => {
                    if(response.data.toUpperCase() === 'success'.toUpperCase()) {
                        messagingService.showMessage('info', 'Ledger Type updated')
                    } else {
                        messagingService.showMessage('error', response.data)
                    }
                }).catch(error => console.log(error))
            );
            ngDialog.close();
        };

        // save ledger
        $scope.saveLedger = function (data) {
            console.log(data);
            // LedgerTypeId, ItemId, PriceCategoryId, BatchNo, InvoiceNo, BuyingPrice, quantity, DateMoved, ExpiryDate, DosageFormId, Remarks
            spinner.forPromise(SettingsService.createLedger(data.ledgerTypeID, data.drug.itemId, data.categoryId, data.batch, data.invoice, data.buyingPrice, data.quantity, moment(data.date_moved).format('YYYY-MM-DD') , moment(data.expiry_date).format('YYYY-MM-DD') , data.dosageFormId, data.remarks )
                .then(response => {
                    if(response.data.toUpperCase() === 'success'.toUpperCase()) {
                        messagingService.showMessage('info', 'Entry Saved')
                    } else {
                        messagingService.showMessage('error', response.data)
                    }
                }).catch(error => console.log(error))
            );
        };

        $scope.editLedger = function(uuid) {
            SettingsService.getLedger(uuid)
                .then(response => {
                    $scope.edit = true;
                    $scope.show = true;
                    $scope.ledger = response.data
                })
                .catch(error => console.log(error));
        };

        // update ledger
        $scope.saveLedger = function (data) {
            spinner.forPromise(SettingsService.createLedger(data.ledgerTypeID, data.drug.itemId, data.categoryId, data.batch, data.invoice, data.buyingPrice, data.quantity, moment(data.date_moved).format('YYYY-MM-DD') , moment(data.expiry_date).format('YYYY-MM-DD') , data.dosageFormId, data.remarks )
                .then(response => {
                    if(response.data.toUpperCase() === 'success'.toUpperCase()) {
                        messagingService.showMessage('info', 'Entry Saved')
                    } else {
                        messagingService.showMessage('error', response.data)
                    }
                }).catch(error => console.log(error))
            );
        };

        init();
    }]);