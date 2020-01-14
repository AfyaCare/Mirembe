'use strict'

angular.module('store')
    .controller('ManageController', ['$scope', 'ngDialog', 'storeService', 'spinner', 'messagingService',
        function ($scope, ngDialog, storeService, spinner, messagingService) {


            var init = function () {
                getStoreAllStores();
            };

            var getStoreAllStores = function () {
                storeService.getAllStores(true)
                    .then(function (response) {
                        if (response.data === 'empty') {
                            $scope.allStores = '';
                        } else {
                            $scope.allStores = response.data;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            };

            //create store
            $scope.createStore = function () {
                ngDialog.open({
                    scope: $scope,
                    templateUrl: 'views/create-store.html'
                });
            };

            //save store
            $scope.saveStore = function (data) {
                spinner.forPromise(storeService.createStore(data)
                    .then(function (response) {
                        if (response.data === 'success') {
                            messagingService.showMessage('info', 'Store created successfully');
                            getStoreAllStores();
                        } else {
                            messagingService.showMessage('error', response.data);
                            console.log(response);
                        }
                    })
                    .catch(function (error) {
                        messagingService.showMessage('error', 'Failed to create store');
                        console.log(error);
                    }));
                ngDialog.close();
            };


            var getStore = function (data) {
                $scope.store = data;
            };

            //edit store
            $scope.editStore = function (store) {
                getStore(store);
                ngDialog.open({
                    scope: $scope,
                    templateUrl: 'views/edit-store.html'
                });
            };

            //update store
            $scope.updateStore = function (store) {
                spinner.forPromise(
                    storeService.editStore(store)
                        .then(function (response) {
                            if (response.data === 'success') {
                                messagingService.showMessage('info', 'Store updated successfully');
                            } else {
                                messagingService.showMessage('error', 'Failed to update store');
                                console.log(response);
                            }
                        })
                        .catch(function (error) {
                            messagingService.showMessage('error', error.data);
                            console.log(error);
                        }));
                ngDialog.close();

            };

            //delete store
            $scope.deleteStore = function (store) {
                var confirrm = window.confirm('Are you sure?');
                if (confirrm) {
                    spinner.forPromise(
                        storeService.deleteStore(store)
                            .then(function (response) {
                                if (response.data === 'success') {
                                    messagingService.showMessage('info', 'Store Retired');
                                    var index = $scope.allStores.indexOf(store);
                                    $scope.allStores.splice(index, 1);
                                } else {
                                    messagingService.showMessage('error', 'Failed to retire store');
                                    console.log(response);
                                }
                            })
                            .catch(function (error) {
                                messagingService.showMessage('error', error.data);
                                console.log(error);
                            }));
                }
            };


            $scope.$watch('allStores', function () {
                getStoreAllStores();
            });

            init();
        }
    ]);