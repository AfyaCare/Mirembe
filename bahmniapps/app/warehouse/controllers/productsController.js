"use strict";

angular.module('bahmni.warehouse').controller('productsController', ['$scope',
    '$rootScope', '$stateParams', '$state', '$q',
    'orderTypeService', 'sessionService', 'encounterService',
    'spinner', 'messagingService', 'appService', '$anchorScroll',
    'contextChangeHandler',
    '$bahmniCookieStore', 'getItemsService','$filter',
    function ($scope, $rootScope, $stateParams, $state, $q,
              orderTypeService, sessionService, encounterService, spinner,
              messagingService, appService, $anchorScroll,
              contextChangeHandler, $bahmniCookieStore, getItemsService, $filter) {
        $scope.devShow = null;
        var init = function () {
            getItems();
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
                getItemsService.getAllItems().then(function (response) {
                  console.log(response.data);
                  $scope.Itemss = response.data;
                }));
        };
        var getItems = function () {
            spinner.forPromise(
                getItemsService.getConcept("Dose Quantity Units").then(function (response) {
                    console.log(response.data.results[0].setMembers);
                    $scope.dosageForms = response.data.results[0].setMembers;
                }));
        };

        $scope.save_item = function () {
            spinner.forPromise(
                getItemsService.createItem($scope.item.name, $scope.item.category, $scope.item.strength, $scope.item.dosageForm).then(function (response) {
                    if (response.data === "updated".toUpperCase()) {
                        messagingService.showMessage('info', "{{'SAVE'}}");
                        //  $state.go("products");
                        getItems();
                    }

                }));
            $scope.reset();
        };

        $scope.update_item = function(item) {
          spinner.forPromise(
              getItemsService.editItem(item.concept_name_id, item.item_drug_id,item.drug_id, item.name, item.strength, item.dose_name, $filter('date')(Date.parse(item.date_created), "yyyy-MM-dd")).then(function (response) {
                  console.log(response.data);
                  getItems();
              })
          )
        };
        $scope.editDrug = function(item) {
            item.edit = true;
            angular.forEach($scope.dosageForms, function (val, key) {
                if(val.display.toUpperCase() === item.dose_name.toUpperCase()) {
                    item.dose_name = val.uuid;
                }
            });
            $scope.item = item;
        };

        $scope.searchItems = function (name) {
            spinner.forPromise(
                getItemsService.SearchItem(name).then(function (response) {
                    // console.log(response.data);
                    $scope.Itemss = response.data;

                }));

        };

        $scope.liveSearch = function (name) {
            // console.log("Input length :" + name.length);
            if (name.length >= 3) {
                spinner.forPromise(
                    getItemsService.SearchItem(name).then(function (response) {
                        // console.log(response.data);
                        $scope.Itemss = response.data;
                    })
                )
            }
        };


        init();
    }
]);