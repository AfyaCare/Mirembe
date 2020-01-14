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
			     var ctrl_number="";
			   if(order.Ctrl_number!=null||order.Ctrl_number>0){
				   ctrl_number=order.Ctrl_number;
			   }
                   /* var img = new Image();
                    img.onload = function() { alert("Height: " + this.height); }
                    img.src = "https://192.168.1.105/bahmni/images/tanzania-logo.png";*/
			   spinner.forPromise(getSaleOrdersService.getloginfullname(order.order_id).then(function(response) {
                   $scope.login_full_name = response.data.login_full_name;
                   var formatter = new Intl.NumberFormat('en-IN', {
                       minimumFractionDigits: 2,
                   });
		    var mywindow = window.open();

            mywindow.document.write('<html><head><title>MIREMBE HOSPITAL</title>');
            mywindow.document.write('</head><body><div style="width: 500px;padding: 1em 1em; border: 1px solid; font-family: Futura; font-size: 18px"> <center>');
            mywindow.document.write('<p style="margin: 1px;">');
            mywindow.document.write('<img alt="mirembe logo"  src="https://192.168.1.105/bahmni/images/tanzania-logo.png" style="width:100px">');
            mywindow.document.write('</p>');
            mywindow.document.write('<p style="margin: 1px;">Jamuhuri ya Muungano wa Tanzania</p>');
            mywindow.document.write('<p style="margin: 1px;"> MIREMBE HOSPITAL</p>');
           // mywindow.document.write('<p style="margin: 1px;"> Service Provider Code: SP222</p>');
            mywindow.document.write('<h5 style="margin: 1px;"> Government Bill</h5><hr></center>');
            mywindow.document.write('<table width="100%" style="font-family: serif;border: 0; font-size: 18px" cellpadding="2">');
                    mywindow.document.write('<tr><td width="40%" >Control Number:</td><td width="60%" style="border-bottom: 0.1mm dotted #888888;">'+ctrl_number+'</td></tr>');
                    mywindow.document.write('<tr><td width="40%" >Payment Ref:</td><td width="60%" style="border-bottom: 0.1mm dotted #888888;">'+order.order_id+'</td></tr>');
                    mywindow.document.write('<tr><td width="40%" >Service Provider Code:</td><td width="60%" style="border-bottom: 0.1mm dotted #888888;">SP222</td></tr>');
            mywindow.document.write('<tr><td width="40%">Payer Name:</td><td width="60%" style="border-bottom: 0.1mm dotted #888888;">'+order.full_name+'</td></tr>');
            mywindow.document.write('<tr><td width="40%">Phone Number:</td><td width="60%" style="border-bottom: 0.1mm dotted #888888;"> </td></tr></table>');

            mywindow.document.write('<p style="margin: 1px;"> Inrespect of :</p>');
            mywindow.document.write('<table class="items" width="100%" style="font-size: 13pt; border-collapse: collapse; " cellpadding="8">');
            mywindow.document.write('<thead><tr><td width="45%">Item</td><td width="10%">Quantity</td><td width="15%">Unit Price</td><td width="20%">Total Amount</td></tr></thead><tbody>');
             $scope.total = 0;
			 angular.forEach($scope.orderLines, function(value, key){

		     mywindow.document.write('<tr><td align="center">'+value.item_name+'</td><td align="center">'+value.qty+'</td><td class="totals cost">'+value.amount+'/=</td><td class="totals cost">'+value.amount*value.qty+'/=</td></tr>');
		     $scope.total = $scope.total + value.amount * value.qty;
			 });
			mywindow.document.write('<tr><td class="blanktotal" colspan="2" rowspan="2"></td><td class="totals">SubTotal:</td><td class="totals cost">'+$scope.total+'/=</td></tr>');
                    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                    var today  = new Date();
			        mywindow.document.write('<tr><td class="totals"><b>Total:</b></td><td class="totals cost"><b>'+$scope.total+' (TZS)</b></td></tr></tbody></table>');
                    mywindow.document.write('<table width="100%" style="font-family: serif;border: 0; font-size: 18px;" cellpadding="2">');
                    mywindow.document.write('<tr><td width="40%">Amount in Words:</td><td width="60%" style="border-bottom: 0.1mm dotted #888888;">'+covertWords(order.total_amount)+' Tanzanian Shilling Only</td></tr>');
                   // var str=;
                    var expired1 = order.date_expired_control_number.slice(0, 10).toString();
                    var d = new Date(expired1);
                    var expired = d.toLocaleDateString("en-US", options);
                    mywindow.document.write('<tr><td width="40%" >Expiry on:</td><td width="60%" style="border-bottom: 0.1mm dotted #888888;">'+expired+'</td></tr>');
                    mywindow.document.write('<tr><td width="40%">Prepared By :</td><td width="60%" style="border-bottom: 0.1mm dotted #888888;">'+$scope.login_full_name+'</td></tr>');
                    mywindow.document.write('<tr><td width="40%">Printed on:</td><td width="60%" style="border-bottom: 0.1mm dotted #888888;">'+today.toLocaleDateString("en-US", options)+'</td></tr>');
                    mywindow.document.write('<tr><td width="40%">Signature:</td><td width="60%" style="border-bottom: 0.1mm dotted #888888;">............................................................</td></tr>');
                    mywindow.document.write('</table>');

			        mywindow.document.write('<p><strong>Jinsi ya kulipia</strong></p><ol>');
                    mywindow.document.write('<li>Kupitia Benki:Fika tawi lolote au wakala wa benk ya NMB,CRDB,BoT.Namba ya kumbukumbu <strong>'+ctrl_number+'</strong></li>');
                    mywindow.document.write('<li>Kupitia Mitandao ya Simu</li>');
                    mywindow.document.write('<ul><li>Ingia kwenye menyu ya mtandao husika</li>');
                    mywindow.document.write('<li>Chagua <strong>namba 4 </strong> Lipa Bili </li>');
                    mywindow.document.write('<li>Chagua <strong>namba 5 </strong>(Malipo ya Serikali)</li>');
                    mywindow.document.write('<li>Ingiza <strong>'+ctrl_number+'</strong> kama malipo ya kumbukumbu</li>');
                    mywindow.document.write('</ul></ol></div>');

                    /*mywindow.document.write('<div id="pay-tigopesa" style="margin-left: 450px"><strong>How to pay</strong><ol>');
                    mywindow.document.write('<li>Via Bank:Visit and branch of  bank agent of NMB,CRDB,BoT.Reference number <strong>'+ctrl_number+'</strong></li>');
                    mywindow.document.write('<li>Via Mobile Network Operator (MNO)</li>');
                    mywindow.document.write('<ul><li>Enter to the respective USSD menu of MNO</li>');
                    mywindow.document.write('<li>Select <strong>4 </strong> Make Payments</li>');
                    mywindow.document.write('<li>Select <strong> 5 </strong>(Government Payments)</li>');
                    mywindow.document.write('<li>Enter <strong>'+ctrl_number+'</strong> as reference number</li>');
                    mywindow.document.write('</ul></ol></div>');*/
		            mywindow.document.write('</div></body></html>');
            mywindow.focus();
            //mywindow.print();
           // mywindow.close();
            return;
			   }));
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
		  var covertWords = function(num) {
				var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
                var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
				if ((num = num.toString()).length > 9) return 'overflow';
                var n='';				
				n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
				if (!n)
					return; 
				var str = '';
				str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
				str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
				str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
				str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
				str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
				return str;
			};
          init();
        }]);
