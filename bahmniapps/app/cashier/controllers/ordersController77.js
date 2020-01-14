"use strict";
angular.module('bahmni.cashier').controller('ordersController', ['$scope', '$rootScope', '$stateParams', '$state', '$q', 'orderTypeService', 'sessionService', 'encounterService', 'spinner', 'messagingService', 'appService', '$anchorScroll', 'contextChangeHandler', '$bahmniCookieStore', 'ngDialog', 'getSaleOrdersService',
      function($scope, $rootScope, $stateParams, $state, $q, orderTypeService, sessionService, encounterService, spinner, messagingService, appService, $anchorScroll, contextChangeHandler, $bahmniCookieStore, ngDialog, getSaleOrdersService) {
        $scope.devShow = null;
        $scope.gTotal = 0;
        var init = function() {
          $scope.allOrders = getOrders();
          // cancel control number request
          // $scope.cancelControlNumberRequest('SO1538669669068');
        };
        var getOrders = function() {
          var search = '';
          spinner.forPromise(getSaleOrdersService.getOrders(search).then(function(response) {
            console.log(response.data);
            $scope.orders = response.data;
          }));
        };
        //helps with the filtration of field with control number
        $scope.checkControlNumber = function(item) {
          if (item.Ctrl_number != null) {
            return item;
          }
        };
        $scope.search = function() {
          spinner.forPromise(getSaleOrdersService.getOrders($scope.searchName).then(function(response) {
            console.log(response.data);
            $scope.orders = response.data;
          }));
        };
        $scope.getOrderLines = function(oder_id, fullName, discount, total, identifier, billGen = "Mirember Hospital", request_status) {
          $scope.fullName = fullName;
          $scope.oder_id = oder_id;
          $scope.gTotal = total - discount;
          $scope.identifier = identifier;
          $scope.billGen = billGen;
          $scope.request_status = request_status;
          spinner.forPromise(getSaleOrdersService.getOrdersLines(oder_id).then(function(response) {
            $scope.orderLines = response.data;
            getTotalSum($scope.orderLines);
            ngDialog.open({
              template: 'views/orderLines.html',
              scope: $scope
            });
            return;
          }))
        };
        $scope.requestControlNumber = function(saleOrderID, fullName, amount, identifier, BillGenBy) {
          spinner.forPromise(getSaleOrdersService.getControlNumber(saleOrderID, fullName, amount, identifier, BillGenBy).then(function(response) {
              if (response.data.status == 'success') {
                messagingService.showMessage('info', response.data.message);
              } else {
                messagingService.showMessage('error', response.data.message);
              }}).catch(function(err) {
              messagingService.showMessage('error', "Failed, please try again");
              console.log(err)
            }));
          };
          // var cancelControlNumberRequest = function (order_id) {
          $scope.cancelControlNumberRequest = function(order_id) {
            console.log("Cancel Control Number request :" + order_id);
            spinner.forPromise(getSaleOrdersService.cancelControlNumberRequest(order_id).then(function(response) {
              console.log(response.data);
              if (response.data.status == 'success') {
                messagingService.showMessage('info', response.data.message);
              } else {
                messagingService.showMessage('error', response.data.message);
              }
              // messagingService.showMessage('info', "Request has been canceled");
            }).catch(function(err) {
              console.log(err);
              messagingService.showMessage('error', "Failed, please try again");
            }));
          };
          $scope.cancelOrder = function(oder_id) {
            console.log(oder_id);
            spinner.forPromise(getSaleOrdersService.cancelOrder(oder_id).then(function(response) {
              if (response.data == "updated") {
                messagingService.showMessage('info', "{{'SAVE'}}");
                getOrders();
              }
            }))
          };
          //print order
          $scope.printOrder = function(name, amount, cntl_number) {
            console.log(name, amount, cntl_number);
            var mywindow = window.open();
            mywindow.document.write('<html><head><title>' + 'MIREMEBE HOSPITAL' + '</title>');
            mywindow.document.write('</head><body > <div style="width: 300px;padding: 1em 3em; border: 1px solid; font-family: Futura; font-size: 18px">');
            mywindow.document.write('<p style="margin: 1px;"> MIREMBE HOPSPITAL</p>');
            mywindow.document.write('<p style="margin: 1px;"> Name: ' + name + '</p>');
            mywindow.document.write('<p style="margin: 1px;"> Control Number: ' + cntl_number + '</p>');
            mywindow.document.write('<p style="margin: 1px;"> Amount: ' + amount + '</p>');
            mywindow.document.write('</div></body></html>');
            mywindow.focus();
            mywindow.print();
            mywindow.close();
            return;
          };
          $scope.confirmPay = function(orderID) {
            spinner.forPromise(getSaleOrdersService.paymentConfirmed(orderID).then(function(response) {
              if (response.data == "updated") {
                messagingService.showMessage('info', "{{'SAVE'}}");
                getOrders();
              }
            }));
          };
          $scope.cancelOrderLine = function(orderlineID, fullName, orderid) {
            spinner.forPromise(getSaleOrdersService.cancelOrderLine(orderlineID).then(function(response) {
              $scope.orderLines = response.data;
              if (response.data == "updated") {
                messagingService.showMessage('info', "{{'SAVE'}}");
                $scope.getOrderLines(orderid, fullName);
                getOrders();
              }
            }))
          };
          var getTotalSum = function(orderLines) {
            $scope.total = 0;
            orderLines.forEach(function(orderLine) {
              $scope.total = $scope.total + orderLine.amount * orderLine.qty;
            })
          };
          init();
        }]);
