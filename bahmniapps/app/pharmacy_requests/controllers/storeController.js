'use strict'

angular.module('store')
    .controller('StoreController', ['$scope', '$stateParams', 'storeService', 'spinner', 'messagingService', 'ngDialog', function ($scope, $stateParams, storeService, spinner, messagingService, ngDialog) {
        var init = function () {
            getSubStores();
            if ($stateParams.uuid) {
                getStoreByUUID($scope.parentUuid);
            }

        };
        $scope.parentUuid = $stateParams.uuid;

        var getSubStores = function () {
            storeService.getStoreSubStore($scope.parentUuid, true)
                .then(function (response) {
                    if (response.data === 'empty') {
                        $scope.subStores = '';
                    } else {
                        $scope.subStores = response.data;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        };

        $scope.createSubStore = function () {
            getStoreByUUID();
            ngDialog.open({
                scope: $scope,
                templateUrl: 'views/create-substore.html'
            });
        };

        //save substore
        $scope.saveSubStore = function (data) {
            storeService.createSubStore(data.name, $scope.parentUuid)
                .then(function (response) {
                    if (response.data === 'success') {
                        messagingService.showMessage('info', 'Substore created successfully');
                        getSubStores();
                    } else {
                        messagingService.showMessage('error', response.data);
                        console.log(response);
                    }
                })
                .catch(function (error) {
                    messagingService.showMessage('error', error.data);
                    console.log(error);
                });
            ngDialog.close();
        };

        //edit substore
        $scope.editSubStore = function (data) {
            $scope.subStore = data;
            ngDialog.open({
                scope: $scope,
                templateUrl: 'views/edit-substore.html'
            });
        };

        //update substore
        $scope.updateSubStore = function (data) {
            console.log(data);
            storeService.updateSubStore(data.uuid, data.parentUuid, data.name, data.retired)
                .then(function (response) {
                    if (response.data === 'success') {
                        messagingService.showMessage('info', 'Substore created successfully');
                        getSubStores();
                    } else {
                        messagingService.showMessage('error', response.data);
                        console.log(response);
                    }
                })
                .catch(function (error) {
                    messagingService.showMessage('error', error.data);
                    console.log(error);
                });
            ngDialog.close();
        };

        //delete store
        $scope.deleteSubStore = function (data) {
            var confirrm = window.confirm('Are you sure?');
            if (confirrm) {
                spinner.forPromise(
                    storeService.deleteSubStore(data.uuid)
                        .then(function (response) {
                            if (response.data === 'success') {
                                messagingService.showMessage('info', 'Substore Delete');
                                var index = $scope.subStores.indexOf(data);
                                $scope.subStores.splice(index, 1);
                            } else {
                                messagingService.showMessage('error', response.data);
                                console.log(response);
                            }
                        })
                        .catch(function (error) {
                            messagingService.showMessage('error', error.data);
                            console.log(error);
                        }));
            }
        };

        var getStoreByUUID = function () {
            storeService.getStoreByUIID($scope.parentUuid, true)
                .then(function (response) {
                    $scope.parentStore = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        };


        $scope.$watch('subStores', function () {
            getSubStores();
        });

        init();
    }]);