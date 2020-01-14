'use strict';

angular.module('bahmni.common.services')
    .service('billingService', ['$http', function ($http) {

    /**
     * @author : Eric Mwailunga (UCC)
     * January, 2019
     * Service Type Map
     **/

        this.getServiceTypeMap = function() {
            return $http.get(Bahmni.Common.Constants.globalPropertyUrl, {
                method: "GET",
                params:{property:'billing.serviceTypeMap'},
                withCredentials: true
            });
        };

    /**
     * @author : Eric Mwailunga (UCC)
     * January, 2019
     * Sale Quotations
     **/

        this.submitQuotation = function(params) {
            return $http.get(Bahmni.Common.Constants.createSaleQuotation, {
                method: "GET",
                params: params,
                withCredentials: true
            });
        };
    }]);
