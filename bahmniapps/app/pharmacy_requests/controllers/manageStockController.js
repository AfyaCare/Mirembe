'use strict'

angular.module('store')
    .controller('ManageStockController', ['$scope', 'ngDialog', 'StockManageService', 'SettingsService', 'storeService', 'spinner', 'messagingService', '$bahmniCookieStore','$stateParams', function ($scope, ngDialog, StockManageService, SettingsService, storeService, spinner, messagingService, $bahmniCookieStore, $stateParams) {

        $scope.locationUiid = $bahmniCookieStore.get(Bahmni.Common.Constants.locationCookieName).uuid;
        $scope.itemRequested = $stateParams.item;
        $scope.itemRequestedUuid = $stateParams.id;

        var init = function () {
            getAllStock();
            getSubStores();
            getPriceCategories();
            getAllRequestsPerDispensingPoint();
        };


        let getAllStock = function () {
            StockManageService.getAllStock($scope.locationUiid)
                .then(response => {
                    $scope.stocks = response.data;
                })
                .catch(error => console.log(error));
        };


        let getAllRequestsPerDispensingPoint = function () {
            StockManageService.getAllRequestsPerDispensingPoint($scope.locationUiid)
                .then(response => {
                    $scope.requests = response.data;
                    console.log($scope.locationUiid);
                    console.log(response.data);
                })
                .catch(error => console.log(error));
        };
        $scope.getItemByName = function (data) {
            if (data.length >= 3) {
                SettingsService.searchItemsByName(data, 0)
                    .then(response => {
                        $scope.items = response.data;
                        console.log(response.data);
                    })
                    .catch(error => console.log(error));
            }
        };

        $scope.fillItemTextBox = function (data) {
            $scope.item.drug = {
                'name': data.itemName,
                'uuid': data.itemUuid,
            };
            $scope.items = null;
        };

        let getSubStores = function () {
            //inject main store uuid programmatically
            storeService.getStoreSubStore('fe1bd33a-95ff-11e9-b403-080027e99513', 0)
                .then(response => {
                    $scope.substores = response.data;
                    console.log(response.data);
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

        $scope.expiredStyle = function (expiryDate) {
            var today = moment();
            var three_months = today.subtract(3, 'months').format();
            // console.log(moment(expiryDate).diff(today, 'months'));
            // console.log(expiryDate);

            return moment(expiryDate).diff(today, 'months') <= 4;
        };

        let getDrugs = function (data) {
            $scope.drug = data;
        };
        //handle drug returns
        $scope.returnDrug = function (data) {
            getDrugs(data);
            ngDialog.open({
                scope: $scope,
                templateUrl: 'views/stock/return-drug.html'
            });
            // console.log(data);
        };

        $scope.saveItemRequested = function (data) {
            let time = moment(new Date()).format("X");
            let requests = {
                requests: [
                    {
                        ItemUuid: data.drug.uuid,
                        PriceCategoryUuid: data.paymentCategoryUuid,
                        quantity: data.issuing_amount
                    }
                ]
            };

            //destination store id is hardcoded for now
            spinner.forPromise(
                StockManageService.requestNewStock(time, $scope.locationUiid, '1', requests)
                    .then(response => {
                        if(response.data.toUpperCase() === 'success'.toUpperCase() ) {
                            messagingService.showMessage('info', response.data)
                            $scope.item = "";
                        } else {
                            messagingService.showMessage('error', response.data)
                        }
                        console.log(response.data)
                    })
                    .catch(error => console.log(error)));
        };

        //handle drug requests
        $scope.requestDrug = function (data) {
            getDrugs(data);
            ngDialog.open({
                scope: $scope,
                templateUrl: 'views/stock/request-drug.html'
            });
            // console.log(data);
        };

        $scope.submitReturn = function () {
            $scope.drug.event = 'event_return';
            StockManageService.returnDrugs($scope.drug).then(function (response) {
                console.log(response.data);
            });
            ngDialog.close();
            console.log($scope.drug)
            $scope.drug = {};

        };

        $scope.submitRequest = function () {
            $scope.drug.event = 'event_request';
            StockManageService.requestDrugs($scope.drug).then(function (response) {
                console.log(response.data);
            });
            ngDialog.close();
            console.log($scope.drug)
            $scope.drug = {};

        };

        $scope.acceptRequest = function (uuid) {
            spinner.forPromise(
                StockManageService.confirmIssuedRequest(uuid, $scope.locationUiid)
                    .then(response => {
                        if (response.data.toUpperCase() === 'success'.toUpperCase()) {
                            messagingService.showMessage('info', response.data);
                        } else {
                            messagingService.showMessage('error', response.data);
                        }
                    })
                    .catch(error => console.log(error))
            );
        };

        $scope.cancelRequest = function (uuid) {
            spinner.forPromise(
                StockManageService.cancelIssuedRequest(uuid, $scope.locationUiid)
                    .then(response => {
                        if (response.data.toUpperCase() === 'success'.toUpperCase()) {
                            messagingService.showMessage('info', response.data);
                        } else {
                            messagingService.showMessage('error', response.data);
                        }
                    })
                    .catch(error => console.log(error))
            );
        };

        $scope.rejectRequest = function (uuid) {
            spinner.forPromise(
                StockManageService.rejectIssuedRequest(uuid, $scope.locationUiid)
                    .then(response => {
                        if (response.data.toUpperCase() === 'success'.toUpperCase()) {
                            messagingService.showMessage('info', response.data);
                        } else {
                            messagingService.showMessage('error', response.data);
                        }
                    })
                    .catch(error => console.log(error))
            );
        };

        init();
    }]);
