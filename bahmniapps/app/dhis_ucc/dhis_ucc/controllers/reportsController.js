"use strict";
angular.module('bahmni.report').controller('reportsController', ['$scope', '$rootScope', '$stateParams', '$state', '$q', 'orderTypeService', 'sessionService', 'encounterService', 'spinner', 'messagingService', 'appService', '$anchorScroll', 'contextChangeHandler', '$bahmniCookieStore', 'ngDialog', 'getSaleOrdersService', '$filter', '$window',
  function($scope, $rootScope, $stateParams, $state, $q, orderTypeService, sessionService, encounterService, spinner, messagingService, appService, $anchorScroll, contextChangeHandler, $bahmniCookieStore, ngDialog, getSaleOrdersService, $filter, $window) {
    $scope.devShow = null;
    $scope.gTotal = 0;
    var init = function() {
      getReports();
    };
    var getReports = function() {
      spinner.forPromise(getSaleOrdersService.readReports().then(function(response) {
        $scope.DHISReports = Object.keys(response.data).map(i => response.data[i]);
        // console.log("Success: " + angular.toJson($scope.DHISReports));
      }).catch(function(err) {
        console.log(err.data);
      }))
    };
    $scope.getDHISProgram = function(item) {
      if (item.dhis != null && item.dhis.status === true) {
        // console.log("True: " +angular.toJson(item));
        return item;
      }
    };
    var popUpErrors = function(errors, state) {
      $scope.errors = errors;
      $scope.state = state;
      ngDialog.open({
        template: 'views/pop_errors.html',
        scope: $scope
      });
    };
    $scope.fetchReport = function(report_name, time_period, year, sqlPath, period_type) {
      if (time_period != '' && year != '') {
        var time_period = year + time_period;
      } else {
        time_period = $filter('date')(time_period, "yyyy-MM-dd");
      }
      spinner.forPromise(getSaleOrdersService.requestReport(report_name, time_period, sqlPath, period_type).then(function(response) {
        console.log(response.data);
        if (response.data.importCount.updated > 0 && response.data.status == 'SUCCESS') {
          messagingService.showMessage('info', "Your request was successful");
          console.log("SUCCESS: " + response.data);
        } else if (response.data.importCount.updated > 0 && response.data.status == 'WARNING') {
          console.log("WARNING: " + angular.toJson(response.data));
          popUpErrors(response.data, 'warning');
        } else {
          console.log("Failed:" + angular.toJson(response.data));
          popUpErrors(response.data, 'fail');
        }
      }).catch(function(err) {
        console.log(err);
      }));
      // console.log("Tuma request kwa focus: " + name, period)
      console.log("Name: " + report_name, sqlPath)
      console.log("Period: " + time_period)
    }
    $scope.previewReport = function(name, startDate, type, year) {
      let urlEnding = "&responseType=text/html&paperSize=A3&appName=reports";
      startDate = $filter('date')(startDate, "yyyy-MM-dd");
      var params = null;
      var endDate = new Date(startDate);
      var y = endDate.getFullYear(),
        m = endDate.getMonth();
      if (type == 'daily') {
        params = "?name=" + name + "&startDate=" + startDate + "&endDate=" + startDate + urlEnding;
      } else if (type == 'monthly') {
        endDate = $filter('date')(new Date(y, m + 1, 0), "yyyy-MM-dd");
        params = "?name=" + name + "&startDate=" + startDate + "&endDate=" + endDate + urlEnding;
      } else if (type == 'quarterly') {
        if (startDate == 'q1') {
          startDate = $filter('date')(new Date(year, 0, 1), "yyyy-MM-dd");
          endDate = new Date(startDate);
          y = endDate.getFullYear(), m = endDate.getMonth();
        } else if (startDate == 'q2') {
          startDate = $filter('date')(new Date(year, 3, 1), "yyyy-MM-dd");
          endDate = new Date(startDate);
          y = endDate.getFullYear(), m = endDate.getMonth();
        } else if (startDate == 'q3') {
          startDate = $filter('date')(new Date(year, 6, 1), "yyyy-MM-dd");
          endDate = new Date(startDate);
          y = endDate.getFullYear(), m = endDate.getMonth();
        } else if (startDate == 'q4') {
          startDate = $filter('date')(new Date(year, 9, 1), "yyyy-MM-dd");
          endDate = new Date(startDate);
          y = endDate.getFullYear(), m = endDate.getMonth();
        } else {
          return;
        }
        endDate = $filter('date')(new Date(y, m + 3, 0), "yyyy-MM-dd");
        params = "?name=" + name + "&startDate=" + startDate + "&endDate=" + endDate + urlEnding;
      }
      //$window.open("https://192.168.1.2/bahmnireports/report"+params, "_blank"); //this is for testing
      // $window.location.href = Bahmni.Common.Constants.previewReports+params;
      $window.open(Bahmni.Common.Constants.previewReports + params, "_blank");
      console.log(params);
    }
    // var getOrders = function() {
    //   var search = '';
    //   spinner.forPromise(
    //     getSaleOrdersService.getOrders(search).then(function(response) {
    //       console.log(response.data);
    //       $scope.orders = response.data;
    //     }));
    // }
    // $scope.search = function() {
    //   spinner.forPromise(
    //     getSaleOrdersService.getOrders($scope.searchName).then(function(response) {
    //       console.log(response.data);
    //       $scope.orders = response.data;
    //     }));
    //
    // }
    //
    // $scope.getOrderLines = function(oder_id, fullName, discount) {
    //   console.log(oder_id);
    //   $scope.fullName = fullName;
    //   $scope.oder_id = oder_id;
    //   $scope.discount = discount;
    //   spinner.forPromise(
    //     getSaleOrdersService.getOrdersLines(oder_id).then(function(response) {
    //       $scope.orderLines = response.data;
    //       getTotalSum($scope.orderLines);
    //       ngDialog.open({
    //         template: 'views/orderLines.html',
    //         scope: $scope
    //       });
    //       return;
    //
    //     }))
    // };
    //
    // $scope.cancelOrder = function(oder_id) {
    //   console.log(oder_id);
    //   spinner.forPromise(
    //     getSaleOrdersService.cancelOrder(oder_id).then(function(response) {
    //
    //       if (response.data == "updated") {
    //         messagingService.showMessage('info', "{{'SAVE'}}");
    //         getOrders();
    //       }
    //
    //     }))
    // };
    //
    // $scope.confirmPay = function(orderID) {
    //   spinner.forPromise(
    //     getSaleOrdersService.paymentConfirmed(orderID).then(function(response) {
    //       if (response.data == "updated") {
    //         messagingService.showMessage('info', "{{'SAVE'}}");
    //         getOrders();
    //       }
    //
    //     }));
    //
    // };
    //
    // $scope.cancelOrderLine = function(orderlineID, fullName, orderid) {
    //   spinner.forPromise(
    //     getSaleOrdersService.cancelOrderLine(orderlineID).then(function(response) {
    //
    //       $scope.orderLines = response.data;
    //       if (response.data == "updated") {
    //         messagingService.showMessage('info', "{{'SAVE'}}");
    //         $scope.getOrderLines(orderid, fullName);
    //         getOrders();
    //
    //       }
    //
    //     }))
    // };
    // var getTotalSum = function(orderLines) {
    //   $scope.total = 0;
    //   orderLines.forEach(function(orderLine) {
    //     $scope.total = $scope.total + orderLine.amount * orderLine.qty;
    //   })
    //
    //
    // }
    init();
  }
]);
