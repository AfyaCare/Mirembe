'use strict';

angular.module('bahmni.billing')
    .controller('cashierController', ['$scope', '$state', 'appService', 'locationService', 'spinner', '$bahmniCookieStore', '$window', '$q', 'messagingService','billingService',
        function($scope, $state, appService, locationService, spinner, $bahmniCookieStore, $window, $q, messagingService, billingService) {


        $scope.isEmpty = false;

        $scope.quotation = {};
        $scope.quotationsList = {};

        $scope.order = {};
        $scope.ordersList = {};

        var getTimeRangeIntoScope = function() {
            $scope.startDate = Bahmni.Common.Util.DateUtil.getDateTimeInSpecifiedFormat(Bahmni.Common.Util.DateUtil.now(), "YYYY-MM-DD HH:mm:ss");
            $scope.endDate = Bahmni.Common.Util.DateUtil.getDateTimeInSpecifiedFormat(Bahmni.Common.Util.DateUtil.subtractDays($scope.startDate,5), "YYYY-MM-DD HH:mm:ss");
        };

        var init = function() {
            getParams();
        };

        var getParams=function()
        {
            $scope.currentPage = $state.current.data.appPage;
            switch ($scope.currentPage) {
                case 'quotations':
                    //getAllQuotations();
                    getAllQuotationsByDates();
                    console.log("1");
                    break;
                case 'orders':
                    getAllSaleOrdersByDates();
                    console.log("2");
                    break;
                case 'gepg':
                    console.log("3");
                    break;
                case 'profile':
                    console.log("4");
                    break;
            }
        };

    /**
     * @author : Eric Mwailunga (UCC)
     * December, 2019
     * Sales quotations
     **/
        var getAllQuotationsByDates = function (){
            getTimeRangeIntoScope();
            var isAscending = false;
            spinner.forPromise(billingService.getAllQuotationsByDates({"startDate":$scope.startDate, "endDate":$scope.endDate, "isAscending":isAscending}))
                .then(function (response) {
                    $scope.quotationsList = response.data;
                    if($scope.quotationsList!=="empty" && $scope.quotationsList!=="failed" && $scope.quotationsList!=="EC.207.01")
                    _.forEach($scope.quotationsList, function (quotation) {
                        var totalDiscount = 0;
                        _.forEach(quotation.saleQuoteLineList, function(quotationLine){
                            totalDiscount+=quotationLine.discount.approvedDiscountAmount;
                        });
                        quotation.totalDiscountedAmount = totalDiscount;
                    });
            });
        };


    /**
     * @author : Eric Mwailunga (UCC)
     * December, 2019
     * Sales orders
     **/
        var  getAllSaleOrdersByDates = function()
        {
            getTimeRangeIntoScope();
            var isAscending = false;
            spinner.forPromise(billingService.getAllOrdersByDates({"startDate":$scope.startDate, "endDate":$scope.endDate, "isAscending":isAscending}))
                .then(function (response) {
                    //if(response.data==="empty") {
                       // $scope.isEmpty = true;
                    //}else{
                        $scope.ordersList = response.data;
                    //}
            });
        };


        init();
    }]);