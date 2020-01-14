'use strict';

angular.module('bahmni.billing')
    .controller('settingsController', ['$scope', '$state', 'appService', 'locationService', 'spinner', '$bahmniCookieStore', '$window', '$q', 'messagingService','billingService', 'Upload' ,
        function($scope, $state, appService, locationService, spinner, $bahmniCookieStore, $window, $q, messagingService, billingService, Upload) {


            $scope.serviceTypes = {};
            $scope.templates = {};

            $scope.criteria = {};
            $scope.discountCriteriaList = {};

            $scope.period = {};
            $scope.financialPeriodsList = {};

            $scope.version = {};
            $scope.priceListVersions = {};

            $scope.template = {};
            //$scope.versionsList = {};

            $scope.includeRetired=false;
            var init = function() {
                getParams();
            };

            var setAsChecked = function() {
                $scope.includeRetired=true;
            };

            var feedbackAfterPromise = function(response, formName, existsMessage){
                if(response.data!=null && response.data==="success") {
                    if(formName==="create_discount_criteria")
                    {
                        $scope.create_discount_criteria.$setPristine();
                        $scope.criteria = {};
                        getAllDiscountCriteria(false);
                    }
                    if(formName==="create_financial_period")
                    {
                        $scope.create_financial_period.$setPristine();
                        $scope.period = {};
                        getAllFinancialPeriods(false);
                    }
                    if(formName==="create_list_version")
                    {
                        $scope.create_list_version.$setPristine();
                        $scope.version = {};
                        getAllFinancialPeriods(false);
                        getAllPriceListVersions(false);
                    }

                    messagingService.showMessage('info','Saved!');

                }else if(response.data==="failed"){
                    messagingService.showMessage('error', 'failed!');
                }else if(response.data==="exists"){
                    messagingService.showMessage('error', existsMessage+' already exists!');
                }else{
                    messagingService.showMessage('error', 'Something went wrong!');
                }
            };

            var getParams=function()
            {
                $scope.currentPage = $state.current.data.appPage;
                switch ($scope.currentPage) {
                    case 'categories':
                        getAllServiceTypes();
                        console.log("1");
                        break;
                    case 'items':
                        console.log("2");
                        break;
                    case 'periods':
                        getAllFinancialPeriods($scope.includeRetired);
                        console.log("3");
                        break;
                    case 'versions':
                        getAllFinancialPeriods($scope.includeRetired);
                        getAllPriceListVersions($scope.includeRetired);
                        console.log("4");
                        break;
                    case 'lists':
                        console.log("5");
                        break;
                    case 'templates':
                        getAllServiceTypesForPriceTemplates();
                        getAllFinancialPeriods($scope.includeRetired);
                        console.log("6");
                        break;
                    case 'criteria':
                        getAllDiscountCriteria($scope.includeRetired);
                        console.log("7");
                        break;
                    case 'features':
                        console.log("8");
                        break;
                }
            };

            var getAllServiceTypes = function () {
                spinner.forPromise(billingService.getAllServiceTypes({"includeRetired":false}))
                    .then(function (response) {
                        $scope.serviceTypes = response.data;
                    });
            };

            var getAllServiceTypesForPriceTemplates = function(){
                spinner.forPromise(billingService.getAllServiceTypes({"includeRetired":false}))
                    .then(function (response) {
                        $scope.serviceTypes=response.data;
                        _.each($scope.serviceTypes, function (serviceType) {
                            serviceType.selected = false;
                        });
                    });

            };

            $scope.createDiscountCriteria = function() {
                var params = {"name":$scope.criteria.name, "description": $scope.criteria.description};
                spinner.forPromise(billingService.createDiscountCriteria(params))
                    .then(function (response) {
                        feedbackAfterPromise(response, "create_discount_criteria",'Criteria '+$scope.criteria.name);
                });
            };

            var getAllDiscountCriteria = function (includeRetired) {
                var param = {"includeRetired":false};
                if(includeRetired){
                    param = {"includeRetired":true};
                }
                spinner.forPromise(billingService.getAllDiscountCriteria(param))
                    .then(function (response) {
                        $scope.discountCriteriaList = response.data;
                    });
            };

            $scope.createFinancialPeriod = function() {
                var params = {"name": $scope.period.name, "startDate": Bahmni.Common.Util.DateUtil.getDateTimeInSpecifiedFormat($scope.period.startDate, "YYYY-MM-DD HH:mm:ss"), "endDate": Bahmni.Common.Util.DateUtil.getDateTimeInSpecifiedFormat($scope.period.endDate, "YYYY-MM-DD HH:mm:ss")};
                spinner.forPromise(billingService.createFinancialPeriod(params))
                    .then(function (response) {
                        feedbackAfterPromise(response, 'create_financial_period','Name '+ $scope.period.name);
                    });
            };

            var getAllFinancialPeriods = function (includeRetired) {
                var param = {"includeRetired":false};
                if(includeRetired){
                    param = {"includeRetired":true};
                }
                spinner.forPromise(billingService.getAllFinancialPeriods(param))
                    .then(function (response) {
                        $scope.financialPeriodsList = response.data;
                    });
            };


            $scope.createListVersion = function() {
                var params = {"financialPeriodUuid": $scope.version.financialPeriod.uuid, "versionName": $scope.version.name, "dateApproved": Bahmni.Common.Util.DateUtil.getDateTimeInSpecifiedFormat($scope.version.dateApproved, "YYYY-MM-DD HH:mm:ss")};
                spinner.forPromise(billingService.createPriceListVersion(params))
                    .then(function (response) {
                        feedbackAfterPromise(response, 'create_list_version','Name '+ $scope.version.name);
                    });
            };

            var getAllPriceListVersions = function (includeRetired) {
                var param = {"includeRetired":false};
                if(includeRetired){
                    param = {"includeRetired":true};
                }
                spinner.forPromise(billingService.getAllPriceListVersions(param))
                    .then(function (response) {
                        $scope.priceListVersions = response.data;
                    });
            };


            $scope.generatePriceTemplate = function()
            {
                var selectedServices = {};
                var types = selectedServices.types = {};
                var services = types.serviceTypes = [];
                var counter=0;
                _.each($scope.serviceTypes, function (serviceType) {
                    if(serviceType.selected) {
                        services.push(serviceType.name);
                        counter++
                    }
                });
                if(counter>0)
                {
                    spinner.forPromise(billingService.getPriceTemplateForServices(selectedServices))
                        .then(function(response){
                            var blob = new Blob([response.data],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
                            //saveAs(blob,'Price-Upload-Template.xlsx');
                            var fileUrl = URL.createObjectURL(blob);
                            window.open(fileUrl);
                        });
                }else{
                    messagingService.showMessage('error', 'Please! choose service(s)');
                }
            };

            $scope.updateListForPeriodInTemplate = function()
            {
                $scope.priceListVersions = $scope.template.financialPeriod.listVersions;
            };

            $scope.uploadPriceTemplate = function()
            {
                spinner.forPromise(billingService.uploadPriceTemplate($scope.template.financialPeriod.uuid, $scope.template.listVersion.uuid, $scope.templateFile))
                    .then(function(response){
                        console.log(angular.toJson(response.data));
                    });
            };

            init();
    }]);