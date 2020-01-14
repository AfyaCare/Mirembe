'use strict'

angular.module('bahmni.billing')
    .service('billingService',['$http','Upload',function($http, Upload){

    /**
    * @author : Eric Mwailunga (UCC)
    * December, 2019
    * Service types
    **/
        this.getAllServiceTypes = function(params) {
            return $http.get(Bahmni.Common.Constants.getAllServiceTypes, {
                method: "GET",
                params: params,
                withCredentials: true
            });
        };


    /**
     * @author : Eric Mwailunga (UCC)
     * December, 2019
     * Discount criteria
     **/

        this.createDiscountCriteria = function(params) {
            return $http.get(Bahmni.Common.Constants.createDiscountCriteria, {
                method: "GET",
                params: params,
                withCredentials: true
            });
        };

        this.getAllDiscountCriteria = function(params) {
            return $http.get(Bahmni.Common.Constants.getDiscountCriteriaList, {
                method: "GET",
                params: params,
                withCredentials: true
            });
        };


    /**
     * @author : Eric Mwailunga (UCC)
     * December, 2019
     * Financial Periods
     **/

        this.createFinancialPeriod = function(params) {
            return $http.get(Bahmni.Common.Constants.createFinancialPeriod, {
                method: "GET",
                params: params,
                withCredentials: true
            });
        };

        this.getAllFinancialPeriods = function(params) {
            return $http.get(Bahmni.Common.Constants.getFinancialPeriodsList, {
                method: "GET",
                params: params,
                withCredentials: true
            });
        };


    /**
     * @author : Eric Mwailunga (UCC)
     * December, 2019
     * Price list versions
     **/

        this.createPriceListVersion = function(params) {
            return $http.get(Bahmni.Common.Constants.createPriceListVersion, {
                method: "GET",
                params: params,
                withCredentials: true
            });
        };

        this.getAllPriceListVersions = function(params) {
            return $http.get(Bahmni.Common.Constants.getPriceListVersions, {
                method: "GET",
                params: params,
                withCredentials: true
            });
        };

    /**
     * @author : Eric Mwailunga (UCC)
     * December, 2019
     * Sales quotations
     **/
        this.getAllQuotationsByDates = function(params) {
            return $http.get(Bahmni.Common.Constants.getAllQuotationsByDates,
            {
                method: "GET",
                params: params,
                withCredentials: true
            });
        };

    /**
     * @author : Eric Mwailunga (UCC)
     * December, 2019
     * Sales orders
     **/
        this.getAllOrdersByDates = function(params) {
            return $http.get(Bahmni.Common.Constants.getAllOrdersByDates,
                {
                    method: "GET",
                    params: params,
                    withCredentials: true
                });
        };


    /**
     * @author : Eric Mwailunga (UCC)
     * December, 2019
     * Price templates
     **/
        this.getPriceTemplateForServices = function(params) {
            return $http.get(Bahmni.Common.Constants.getPriceTemplateForServices,
                {
                    method: "GET",
                    params: params,
                    withCredentials: true,
                    responseType:'arraybuffer',
                    headers:{
                        'Content-type':'',
                        'Accept':'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    }
                });
        };

        this.uploadPriceTemplate = function(financialPeriodUuid, listVersionUuid, file)
        {
           return Upload.upload({
                method:"POST",
                url: Bahmni.Common.Constants.uploadPriceTemplateForServices,
                data: {'financialPeriod': financialPeriodUuid, 'listVersion': listVersionUuid, 'templateFile':file}
            });
        };

    /**
     * @author : Eric Mwailunga (UCC)
     * January, 2019
     * Creating sale quotations
     **/

        this.createSaleQuotation = function(params)
        {
            return $http.get(Bahmni.Common.Constants.createSaleQuotation,
                {
                    method: "GET",
                    params: params,
                    withCredentials: true
                });
        };

    }]);