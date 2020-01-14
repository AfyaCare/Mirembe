'use strict'

angular.module('store')
    .controller('IssueController', ['$scope', 'ngDialog', 'SettingsService', 'storeService', 'StockManageService', 'IssueService', '$bahmniCookieStore', '$stateParams', 'spinner', 'messagingService', function ($scope, ngDialog, SettingsService, storeService, StockManageService, IssueService, $bahmniCookieStore, $stateParams, spinner, messagingService) {

        $scope.locationUiid = $bahmniCookieStore.get(Bahmni.Common.Constants.locationCookieName).uuid;

        let issueList = {batches: []};
        $scope.possibleBatches = '';

        var init = function () {
            getSubStores();
            getPriceCategories();
            if ($scope.locationUiid) {
                getAllRequestedStock();
            }
        };

        let getPossibleBatches = function (uuid) {
            StockManageService.getAllPossibleBatches(uuid)
                .then(response => {
                    $scope.possibleBatches = response.data;
                    console.log($scope.possibleBatches);
                })
                .catch(error => console.log(error));
        };

        if ($stateParams.request_uuid) {
            $scope.itemName = $stateParams.item.name;
            $scope.store = $stateParams.item.store;
            getPossibleBatches($stateParams.request_uuid);
        }

        $scope.issueDrug = function (data) {
            $scope.issue = data;
            ngDialog.open({
                'scope': $scope,
                'templateUrl': 'views/issues/approve-issue.html'
            });
            ngDialog.close();
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

        let getAllRequestedStock = function () {
            StockManageService.getAllRequestedStock($scope.locationUiid)
                .then(response => {
                    $scope.requests = response.data;
                })
                .catch(error => console.log(error));
        };

        $scope.saveItemIssued = function (data) {
            console.log(data)
        };

        $scope.saveIssue = function (data) {
            console.log(data);
        };

        $scope.addToIssueList = function (data) {
            var amount = window.prompt('How many are you giving?');
            let toBeSent = {
                quantity: amount,
                batchNo: data.toString()
            };
            issueList.batches.push(toBeSent);
            console.log(toBeSent);
        };

        $scope.issueSelectedItems = function () {
            console.log($stateParams.request_uuid);
            if (issueList.length < 1) {
                window.alert("You have to select items to be issue first")
            } else {
                spinner.forPromise(
                    IssueService.processRequestedIssue($stateParams.request_uuid, $scope.locationUiid, issueList)
                        .then(response => {
                            if (response.data.toUpperCase() === 'success'.toUpperCase()) {
                                messagingService.showMessage('info', response.data)
                            } else {
                                messagingService.showMessage('error', response.data)
                            }
                            console.log(response.data)
                        })
                        .catch(error => console.log(error)));
            }

        };


        init();

    }])
;