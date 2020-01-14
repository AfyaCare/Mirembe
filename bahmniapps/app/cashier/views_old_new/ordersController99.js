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
          $scope.printOrder = function(order) {
            //console.log(name, amount, cntl_number);
			    spinner.forPromise(getSaleOrdersService.getOrdersLines(order.order_id).then(function(response) {
					$scope.orderLines = response.data;
			   //console.log("Mickidadi "+getTotalSum($scope.orderLines)) 
			 //mickidadimsoka@gmail.com;
			 //location Mirembe Hospital
			 //Date 09/06/2019
		    var mywindow = window.open();
            mywindow.document.write('<html><head><title>' + 'MIREMEBE HOSPITAL' + '</title>');
            mywindow.document.write('</head><body><div style="width: 400px;padding: 1em 1em; border: 1px solid; font-family: Futura; font-size: 18px"> <center>');
            mywindow.document.write('<p style="margin: 1px;">Jamuhuri ya Muungano wa Tanzania</p>');
            mywindow.document.write('<p style="margin: 1px;"> MIREMBE HOSPITAL</p>');
            mywindow.document.write('<p style="margin: 1px;"> Service Provider Code: SP222</p>');
            mywindow.document.write('<h5 style="margin: 1px;"> Bili ya Mteja</h5><hr></center>');
            mywindow.document.write('<table width="100%" style="font-family: serif;border: 0;" cellpadding="2">');
            mywindow.document.write('<tr><td width="40%">Payer Name:</td><td width="60%" style="border-bottom: 0.1mm dotted #888888;">'+order.full_name+'</td></tr>');
            mywindow.document.write('<tr><td width="40%">Phone Number:</td><td width="60%" style="border-bottom: 0.1mm dotted #888888;"> </td></tr>');
            mywindow.document.write('<tr><td width="40%" >Payment Ref:</td><td width="60%" style="border-bottom: 0.1mm dotted #888888;">'+order.order_id+'</td></tr>');
            mywindow.document.write('<tr><td width="40%" >Control Number:</td><td width="60%" style="border-bottom: 0.1mm dotted #888888;">'+order.Ctrl_number+'</td></tr>');
            mywindow.document.write('<tr><td width="40%" >Service Type:</td><td width="60%" style="border-bottom: 0.1mm dotted #888888;"> </td></tr>');
            mywindow.document.write('<tr><td width="40%">Amount:</td><td width="60%" style="border-bottom: 0.1mm dotted #888888;">'+order.total_amount+'</td></tr>');
            mywindow.document.write('<tr><td width="40%">Amount in Words:</td><td width="60%" style="border-bottom: 0.1mm dotted #888888;"></td></tr></table>');
            mywindow.document.write('<p style="margin: 1px;"> Inrespect of :</p>');
            mywindow.document.write('<table class="items" width="100%" style="font-size: 9pt; border-collapse: collapse; " cellpadding="8">');
            mywindow.document.write('<thead><tr><td width="45%">Item</td><td width="10%">Quantity</td><td width="15%">Unit Price</td><td width="20%">Total Amount</td></tr></thead><tbody>');
             $scope.total = 0;
			 angular.forEach($scope.orderLines, function(value, key){
				   
		mywindow.document.write('<tr><td align="center">'+value.item_name+'</td><td align="center">'+value.qty+'</td><td class="totals cost">'+value.amount+'</td><td class="totals cost">'+value.amount*value.qty+'</td></tr>');
		     $scope.total = $scope.total + value.amount * value.qty;
			 });
			mywindow.document.write('<tr><td class="blanktotal" colspan="2" rowspan="3"></td><td class="totals">SubTotal:</td><td class="totals cost">'+$scope.total+'</td></tr>');
			mywindow.document.write('<tr><td class="totals">Discount:</td><td class="totals cost">0</td></tr>');
			mywindow.document.write('<tr><td class="totals"><b>Total:</b></td><td class="totals cost"><b>'+$scope.total+'</b></td></tr></tbody></table>');
			mywindow.document.write('<div style="text-align: center; font-style: italic;">Issued By  : Mickidadi Kosiyanga</div>');
			mywindow.document.write('<div style="text-align: center; font-style: italic;">Printed By : Mickidadi Kosiyanga</div>');
			mywindow.document.write('<div style="text-align: center; font-style: italic;">Signature  : ..........................</div>');
			var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            var today  = new Date();
			 
			mywindow.document.write('<div style="text-align: right">Printed Date: '+today.toLocaleDateString("en-US", options)+'</div>');
		    mywindow.document.write('</div></body></html>');
            mywindow.focus();
            mywindow.print();
            mywindow.close();
            return;
					 
				  }));
          };
          //print receipt payment order
      
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
