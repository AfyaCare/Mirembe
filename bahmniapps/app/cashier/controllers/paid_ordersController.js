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

                }));
        };

        $scope.printReceipt = function (data) {
            console.log(data);


			   spinner.forPromise(getSaleOrdersService.getSalesOrders_line_other(data.order_id).then(function(response) {
					$scope.orderLines = response.data;
			//getTotalSum($scope.orderLines) 
			 //mickidadimsoka@gmail.com;
			 //location Mirembe Hospital
			 //Date 09/06/2019  getloginfullname
			//$scope.inWords=12313;
			//console.log(covertWords(data.total_amount));
                   spinner.forPromise(getSaleOrdersService.getloginfullname(data.order_id).then(function(response) {
                       $scope.login_full_name = response.data.login_full_name;
                       var formatter = new Intl.NumberFormat('en-IN', {
                           minimumFractionDigits: 2,
                       });
                   //console.log($scope.login_full_name);
            var mywindow = window.open();
		    mywindow.document.write('<html><head><title>' + 'MIREMEBE HOSPITAL' + '</title>');
            mywindow.document.write('</head><body><div style="width: 500px;padding: 1em 1em; border: 1px solid; font-family: Futura; font-size: 30px"> <center>');
                       mywindow.document.write('<p style="margin: 1px;">');
                       mywindow.document.write('<img alt="mirembe logo"  src="https://192.168.1.105/bahmni/images/tanzania-logo.png" style="width:100px">');
                       mywindow.document.write('</p>');
            mywindow.document.write('<p style="margin: 1px;">Jamuhuri ya Muungano wa Tanzania</p>');
            mywindow.document.write('<p style="margin: 1px;"> MIREMBE HOSPITAL</p>');
            mywindow.document.write('<p style="margin: 1px;"> Service Provider Code: SP222</p>');
            mywindow.document.write('<h5 style="margin: 1px;"> Stakabadhi ya Malipo ya Serekali</h5><hr></center>');
            mywindow.document.write('<table width="100%" style="font-family: serif;border: 0;font-size: 15pt;" cellpadding="2">');
            mywindow.document.write('<tr><td width="40%">Receipt No:</td><td width="60%" style="border-bottom: 0.1mm dotted #888888;">'+data.receipt_number+'</td></tr>');
            mywindow.document.write('<tr><td width="40%">Received from:</td><td width="60%" style="border-bottom: 0.1mm dotted #888888;">'+data.full_name+'</td></tr>');
            mywindow.document.write('<tr><td width="40%" >Amount:</td><td width="60%" style="border-bottom: 0.1mm dotted #888888;">' + formatter.format(Math.round(data.total_amount)) + ' (TZS)</td></tr>');
            mywindow.document.write('<tr><td width="40%">Amount in Words:</td><td width="60%" style="border-bottom: 0.1mm dotted #888888;">'+covertWords(Math.round(data.total_amount))+' Tanzanian Shilling Only</td></tr></table>');
            mywindow.document.write('<p style="margin: 1px;"> Inrespect of :</p>');
            mywindow.document.write('<table class="items" width="100%" style="font-size: 15pt; border-collapse: collapse; " cellpadding="8">');
            mywindow.document.write('<thead><tr><td width="45%">Item</td><td width="10%">Quantity</td><td width="15%">Unit Price</td><td width="20%">Total Amount</td></tr></thead><tbody>');
             $scope.total = 0;
			 angular.forEach($scope.orderLines, function(value, key){
				   
		mywindow.document.write('<tr><td align="center">'+value.item_name+'</td><td align="center">'+value.qty+'</td><td class="totals cost">'+formatter.format(value.amount)+'</td><td class="totals cost">'+formatter.format(value.amount*value.qty)+'</td></tr>');
		     $scope.total = $scope.total + value.amount * value.qty;
			 });
			mywindow.document.write('<tr><td class="blanktotal" colspan="2" rowspan="3"></td><td class="totals">SubTotal:</td><td class="totals cost">'+formatter.format($scope.total)+'</td></tr>');

			mywindow.document.write('<tr><td class="totals"><b>Total:</b></td><td class="totals cost"><b>'+formatter.format($scope.total)+'</b></td></tr></tbody></table>');
		    mywindow.document.write('<table width="100%" style="font-family: serif;border: 0;font-size: 13pt;" cellpadding="2">');
		    mywindow.document.write('<tr><td width="40%" >Billing Reference:</td><td width="60%" style="border-bottom: 0.1mm dotted #888888;">'+data.order_id+'</td></tr>');
			mywindow.document.write('<tr><td width="40%" >Payment Control Number:</td><td width="60%" style="border-bottom: 0.1mm dotted #888888;">'+data.Ctrl_number+'</td></tr>');
                       var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                       var received1 = data.date_receipt_received.slice(0, 10).toString();
                       var d = new Date(received1);
                       var received = d.toLocaleDateString("en-US", options);
            mywindow.document.write('<tr><td width="40%" >Payment Date:</td><td width="60%" style="border-bottom: 0.1mm dotted #888888;">'+received+'</td></tr>');

                       var today  = new Date();
            mywindow.document.write('<tr><td width="40%" >Issued Date:</td><td width="60%" style="border-bottom: 0.1mm dotted #888888;">'+today.toLocaleDateString("en-US", options)+'</td></tr>');
                       mywindow.document.write('<tr><td width="40%" >Issued By  : </td><td width="60%" style="border-bottom: 0.1mm dotted #888888;">'+$scope.login_full_name+'</td></tr>');
                       mywindow.document.write('<tr><td width="40%" >Signature</td><td width="60%" style="border-bottom: 0.1mm dotted #888888;">....................................</td></tr>');

			mywindow.document.write('</table></div></body></html>');
            mywindow.focus();
            //mywindow.print();
            ///mywindow.close();
			  return;
                   }));
				  }));
         // mywindow.document.write('<p style="margin: 1px;"> Name: ' + data.full_name + '</p>');
        };

        // var requestReconciliation = function (order_id) {
        $scope.requestReconciliation = function (order_id) {
            console.log("Reconciliation Request for :" + order_id);
            spinner.forPromise(
                getSaleOrdersService.reconcileRequest(order_id).then(function (response) {
                    console.log(response.data);
                    if (response.data.status == 'success') {
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