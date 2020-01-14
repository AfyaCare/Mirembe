'use strict';
angular.module('bahmni.store')
    .service('storeService', ['$http', function ($http) {
        return {
            getAllStores: function (includeRetired) {
                return $http.get(Bahmni.Common.Constants.getAllStores, {
                    params: {
                        IncludeRetired: includeRetired
                    }
                });
            },

            getAllSubStores: function (includeRetired) {
                return $http.get(Bahmni.Common.Constants.getAllSubStores, {
                    params: {
                        IncludeRetired: includeRetired
                    }
                });
            },

            getStoreSubStore: function (uiid, includeRetired) {
                return $http.get(Bahmni.Common.Constants.getStoreSubStore + uiid + "/substores", {
                    params: {
                        IncludeRetired: includeRetired
                    }
                });
            },

            getStoreBySubName: function (name) {
                return $http.get(Bahmni.Common.Constants.getStoreBySubName, {
                    params: {
                        containing: name
                    }
                });
            },

            getStoreByName: function (name) {
                return $http.get(Bahmni.Common.Constants.getStoreByName, {
                    params: {
                        StoreName: name
                    }
                });
            },

            getStoreByUIID: function (uiid, IncludeRetired) {
                return $http.get(Bahmni.Common.Constants.getStoreByUIID + uiid + '/read', {
                    params: {
                        IncludeRetired: IncludeRetired
                    }
                });
            },

            createSubStore: function (name, parentStoreUIID) {
                return $http.get(Bahmni.Common.Constants.createNewSubStore, {
                    params: {
                        StoreName: name,
                        ParentStoreUuid: parentStoreUIID
                    }
                });
            },

            updateSubStore: function (uiid, parentUuid, name, IncludeRetired) {
                return $http.get(Bahmni.Common.Constants.updateSubStore + uiid + '/update', {
                    params: {
                        StoreName: name,
                        ParentUuid: parentUuid,
                        retired: IncludeRetired
                    }
                });
            },

            deleteSubStore: function (uiid) {
                return $http.get(Bahmni.Common.Constants.updateSubStore + uiid + '/delete');
            },

            createStore: function (name) {
                return $http.get(Bahmni.Common.Constants.createNewStore,{
                    params: {
                        StoreName: name.name
                    }
                });
            },

            editStore: function (store) {
                return $http.get(Bahmni.Common.Constants.getStoreByUIID + store.uuid + '/update', {
                    params: {
                        StoreName: store.name,
                        retired: store.retired
                    }
                });
            },

            deleteStore: function (store) {
                return $http.get(Bahmni.Common.Constants.getStoreByUIID + store.uuid + '/delete', {});
            },
        };
    }]);