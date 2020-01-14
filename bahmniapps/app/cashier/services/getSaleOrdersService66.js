'use strict';
// import {or} from "../../components/lovefield/dist/lovefield";

angular.module('bahmni.cashier')
  .factory('getSaleOrdersService', ['$http', function($http) {

    var getOrders = function(search) {
      var params = {
        search: search
      };

      return $http.get(Bahmni.Common.Constants.getSalesOrders, {
        method: "GET",
        params: params,
        withCredentials: true
      });
    };

    var updateStatus = function(name, status) {
      var params = {
        drug_id: name,
        status: status
      };

      return $http.get(Bahmni.Common.Constants.updateStatusad, {
        method: "GET",
        params: params,
        withCredentials: true
      });
    };

    var getControlNumber = function(saleOrderID, fullName, amount, identifier, BillGenBy) {
      var params = {
        saleOrderID: saleOrderID,
        fullName: fullName,
        amount: amount,
        identifier: identifier,
        BillGenBy: BillGenBy
      };

      return $http.get(Bahmni.Common.Constants.requestControlNumber, {
        method: "GET",
        params: params,
        withCredentials: true
      });
    };
    var paymentConfirmed = function(orderID) {
      var params = {
        orderID: orderID
      };

      return $http.get(Bahmni.Common.Constants.paymentConfirmed, {
        method: "GET",
        params: params,
        withCredentials: true
      });
    };

    var getOrdersLines = function(orderID) {
      var params = {
        orderID: orderID
      };

      return $http.get(Bahmni.Common.Constants.getSalesOrders_line, {
        method: "GET",
        params: params,
        withCredentials: true
      });


    };
    var getSalesOrders_line_other = function(orderID) {
      var params = {
        orderID: orderID
      };

      return $http.get(Bahmni.Common.Constants.getSalesOrders_line_other, {
        method: "GET",
        params: params,
        withCredentials: true
      });


    };
    var cancelOrder = function(orderID) {
      var params = {
        orderID: orderID
      };

      return $http.get(Bahmni.Common.Constants.cancelOrder, {
        method: "GET",
        params: params,
        withCredentials: true
      });


    };
    var cancelOrderLine = function(orderlineID) {
      var params = {
        orderlineID: orderlineID
      };

      return $http.get(Bahmni.Common.Constants.cancelOrderLine, {
        method: "GET",
        params: params,
        withCredentials: true
      });


    };

    var cancelControlNumberRequest = function(orderID) {
      var params = {
        BillId: orderID
      };

      return $http.get(Bahmni.Common.Constants.cancelControlNumberRequest, {
        // method: "GET",
        params: params,
        withCredentials: true
      });
    };

    var reconcileRequest = function(orderID) {
      var params = {
        bill_id: orderID
      };

      return $http.get(Bahmni.Common.Constants.reconciliationRequest, {
        method: "GET",
        params: params,
        withCredentials: true
      });
    };

    var createItem = function(name, category, strength, dosageForm) {
      var params = {
        name: name,
        category: category,
        strength: strength,
        dosageForm: dosageForm
      };

      return $http.get(Bahmni.Common.Constants.createItem, {
        method: "GET",
        params: params,
        withCredentials: true
      });

    };

    var SearchItem = function(name) {
      var params = {
        name: name
      };

      return $http.get(Bahmni.Common.Constants.getAddItems, {
        method: "GET",
        params: params,
        withCredentials: true
      });

    };

    var getPaidOrders = function(search) {
      var params = {
        search: search
      };

      return $http.get(Bahmni.Common.Constants.getPaidorders, {
        method: "GET",
        params: params,
        withCredentials: true
      });

    };

    var getReconciledOrders = function(search) {
      var params = {
        keyword: search
      };
      return $http.get(Bahmni.Common.Constants.getReconciledOrders, {
        method: "GET",
        params: params,
        withCredentials: true
      });

    };

    var getCancelledorders = function(search) {
      var params = {
        search: search
      };

      return $http.get(Bahmni.Common.Constants.getCancelledorders, {
        method: "GET",
        params: params,
        withCredentials: true
      });

    };

    var getConcept = function(conceptName) {
      return $http.get(Bahmni.Common.Constants.conceptSearchByFullNameUrl +
        "&name=" + conceptName +
        "&v=full", {
          cache: true
        });
    };

    var testing = function(billId) {
      var params = {
        BillId: billId
      };
      return $http.get('https://192.168.1.5/openmrs/ws/rest/v1/receiveResponse/cancel_bill_request/', {
        // method: "GET",
        params: params,
        withCredentials: true
      });
    };




    return {
      getOrders: getOrders,
      updateStatus: updateStatus,
      getOrdersLines: getOrdersLines,
      cancelOrder: cancelOrder,
      cancelControlNumberRequest: cancelControlNumberRequest,
      reconcileRequest: reconcileRequest,
      paymentConfirmed: paymentConfirmed,
      getControlNumber: getControlNumber,
      cancelOrderLine: cancelOrderLine,
      getPaidOrders: getPaidOrders,
      getCancelledorders: getCancelledorders,
      SearchItem: SearchItem,
      getReconciledOrders: getReconciledOrders,
      getSalesOrders_line_other: getSalesOrders_line_other,
      getConcept: getConcept,
      testing: testing
    };
  }]);
