"use strict"

angular.module('bahmni.store')
    .service('StockManageService', ['$http', function ($http) {
        return {
            requestNewStock: function(RequestGroupId, SourceLocationUuid, DestinationStoreId, requests) {
                return $http.get(Bahmni.Common.Constants.requestNewStock, {
                    params: {
                        RequestGroupId: RequestGroupId,
                        SourceLocationUuid: SourceLocationUuid,
                        DestinationStoreId: DestinationStoreId,
                        requests: requests
                    }
                });
            },

            getAllRequestedStock: function(LocationUuid) {
                return $http.get(Bahmni.Common.Constants.getAllRequestedStock, {
                    params: {
                        LocationUuid: LocationUuid
                    }
                });
            },

            getAllPossibleBatches: function (uuid) {
                return $http.get(Bahmni.Common.Constants.getAllPossibleBatches + uuid + '/possiblebatches');
            },

            processRequestedIssue: function(LocationUuid) {
                return $http.get(Bahmni.Common.Constants.processRequestedIssue, {
                    params: {
                        LocationUuid: LocationUuid
                    }
                });
            },

            getAllRequestsPerDispensingPoint: function (LocationUuid) {
                return $http.get(Bahmni.Common.Constants.getAllRequestsPerDispensingPoint, {
                    params: {
                        LocationUuid: LocationUuid
                    }
                })
            },

            cancelIssuedRequest: function (uuid, LocationUuid) {
                return $http.get(Bahmni.Common.Constants.actOnIssuedRequest + uuid + '/cancel', {
                    params: {
                        LocationUuid: LocationUuid
                    }
                })
            },

            rejectIssuedRequest: function (uuid, LocationUuid) {
                return $http.get(Bahmni.Common.Constants.actOnIssuedRequest + uuid + '/reject', {
                    params: {
                        LocationUuid: LocationUuid
                    }
                })
            },

            confirmIssuedRequest: function (uuid, LocationUuid) {
                return $http.get(Bahmni.Common.Constants.actOnIssuedRequest + uuid + '/confirmreceive', {
                    params: {
                        LocationUuid: LocationUuid
                    }
                })
            },

            getAllStock: function (LocationUuid) {
                return $http.get(Bahmni.Common.Constants.getAllStock, {
                    params: {
                        LocationUuid: LocationUuid
                    }
                })
            }
        };
    }]);
