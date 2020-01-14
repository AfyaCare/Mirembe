'use strict';
angular.module('bahmni.warehouse')
    .factory('getItemsService', ['$http', function ($http) {
        var getItem = function (name) {
            var params = {
                name: name
            };

            return $http.get(Bahmni.Common.Constants.getDrud, {
                method: "GET",
                params: params,
                withCredentials: true
            });
        };

        var outOfStock = function () {
            return $http.get(Bahmni.Common.Constants.outOfStockUrl, {
                method: "GET",
                withCredentials: true
            });
        };

        var updateStatus = function (item_id, drug_id, status) {
            var params = {
                drug_id: item_id,
                concept_id: drug_id,
                status: status
            };

            return $http.get(Bahmni.Common.Constants.updateStatusad, {
                method: "GET",
                params: params,
                withCredentials: true
            });
        };

        var createItem = function (name, category, strength, dosageForm) {
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

        var SearchItem = function (name) {
            var params = {
                name: name
            };

            return $http.get(Bahmni.Common.Constants.getAddItems, {
                method: "GET",
                params: params,
                withCredentials: true
            });

        };

        var getConcept = function (conceptName) {
            return $http.get(Bahmni.Common.Constants.conceptSearchByFullNameUrl +
                "&name=" + conceptName +
                "&v=full", {cache: true});
        };

        var getAllItems = function () {
            return $http.get(Bahmni.Common.Constants.getItems_all);
        };

        var editItem = function (conceptNameId, itemDrugId, itemId, name, strength, dosageForm, dateCreated) {
            var params = {
                conceptNameId: conceptNameId,
                itemDrugId: itemDrugId,
                itemId: itemId,
                name: name,
                strength: strength,
                dosageForm: dosageForm,
                dateCreated: dateCreated
            };
            console.log(params);
            return $http.get(Bahmni.Common.Constants.editItems, {
                method: "GET",
                params: params,
                withCredentials: true
            });
        };


        return {
            getAllItems: getAllItems,
            getItem: getItem,
            updateStatus: updateStatus,
            createItem: createItem,
            SearchItem: SearchItem,
            outOfStock: outOfStock,
            getConcept: getConcept,
            editItem: editItem
        };
    }]);