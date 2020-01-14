'use strict';
angular.module('bahmni.warehouse')
    .factory('priceItemService', ['$http', function ($http) {


        var createPriceItem = function (item_id, price_list_id, buying_price, amount) {
            var params = {
                item_id: item_id,
                priceList: price_list_id,
                buying_price: buying_price,
                amount: amount

            };
            return $http.get(Bahmni.Common.Constants.insertPrice, {
                method: "GET",
                params: params,
                withCredentials: true
            });
        };

        var selectPriceItem = function (name) {
            var params = {
                name: name

            };
            return $http.get(Bahmni.Common.Constants.selectPrice, {
                method: "GET",
                params: params,
                withCredentials: true
            });
        };

        var updatePriceItem = function(itemPriceId, itemId, price_list_id, buying_price, amount, dateRecorded) {
            var params = {
                itemPriceId: itemPriceId,
                itemId: itemId,
                priceList: price_list_id,
                buying_price: buying_price,
                amount: amount,
                dateRecorded: dateRecorded
            };
            return $http.get(Bahmni.Common.Constants.updatePriceItem, {
                method: "GET",
                params: params,
                withCredentials: true
            });
        };

        var getAllPriceItems = function () {
            return $http.get(Bahmni.Common.Constants.getAllPrices);
        };


        return {
            createPriceItem: createPriceItem,
            selectPriceItem: selectPriceItem,
            updatePriceItem: updatePriceItem,
            getAllPriceItems: getAllPriceItems
        };
    }]);