"use strict";

angular.module('bahmni.cashier').controller('paid_ordersController', ['$scope',
    '$rootScope', '$stateParams', '$state', '$q',
    'orderTypeService', 'sessionService', 'encounterService',
    'spinner', 'messagingService', 'appService', '$anchorScroll',
    'contextChangeHandler',
    '$bahmniCookieStore', 'ngDialog', 'getSaleOrdersService',
    function ($scope, $rootScope, $stateParams, $state, $q,
              orderTypeService, sessionService, encounterService, spinner,
              messagingService, appService, $anchorScroll,
              contextChangeHandler, $bahmniCookieStore, ngDialog, getSaleOrdersService) {
        $scope.devShow = null;
        $scope.gTotal = 0;
        var init = function () {
            getPaidOrders();
            //test for request reconciliation
            // $scope.requestReconciliation('SO1538669669068');
        };

        var getPaidOrders = function () {
            var search = '';
            spinner.forPromise(
                getSaleOrdersService.getPaidOrders(search).then(function (response) {
                    console.log(response.data);
                    $scope.orders = response.data;
                }));

        };
        $scope.getReconciliation = function () {
            var search = '';
            spinner.forPromise(
                getSaleOrdersService.getPaidOrders(search).then(function (response) {
                    console.log(response.data);
                    $scope.reconciliations = response.data;
                }));

        };

        $scope.getOrderLines = function (oder_id, fullName, discount) {
            console.log(oder_id);
            $scope.fullName = fullName;
            $scope.oder_id = oder_id;
            $scope.discount = discount;
            spinner.forPromise(
                getSaleOrdersService.getSalesOrders_line_other(oder_id).then(function (response) {
                    $scope.orderLines = response.data;
                    getTotalSum($scope.orderLines);
                    ngDialog.open({
                        template: 'views/orderLines_paid.html',
                        scope: $scope
                    });
                    return;

                }))
        };

        // var requestReconciliation = function (order_id) {
        $scope.requestReconciliation = function(order_id) {
            console.log("Reconciliation Request for :" + order_id);
            spinner.forPromise(
                getSaleOrdersService.reconcileRequest(order_id).then(function (response) {
                    console.log(response.data);
                    if(response.data.status == 'success') {
                      messagingService.showMessage('info', response.data.message);
                    } else {
                      messagingService.showMessage('error', response.data.message);
                    }
                }).catch(function (err) {
                    console.log(err);
                    messagingService.showMessage('info', err.data);
                }));
        }


        //helps with the filtration of field with control number
        $scope.checkControlNumber = function (item) {
            if (item.Ctrl_number != null) {
              return item;
            }
        };

        var getTotalSum = function (orderLines) {
            $scope.total = 0;
            orderLines.forEach(function (orderLine) {
                $scope.total = $scope.total + orderLine.amount * orderLine.qty;
            })


        }
        $scope.getPaidsearch = function () {
            var search = $scope.searchName;
            spinner.forPromise(
                getSaleOrdersService.getPaidOrders(search).then(function (response) {
                    console.log(response.data);
                    $scope.orders = response.data;
                }));
        };

        init();
    }

]);
