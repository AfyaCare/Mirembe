'use strict'

angular.module('store')
    .service('IssueService', ['$http', function ($http) {
        return {
            processRequestedIssue: function (uuid, LocationUuid, ItemBatches) {
                return $http.get(Bahmni.Common.Constants.processRequestedIssue + uuid + '/issue', {
                    params: {
                        LocationUuid: LocationUuid,
                        ItemBatches: ItemBatches
                    }
                })
            }
        }
    }]);