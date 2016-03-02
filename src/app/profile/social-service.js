(function(angular) {
    'use strict';

    angular.module('profile')
    .service('socialService', ['baasicApiHttp', 'baasicDynamicResourceService', function (baasicApiHttp, dynamicResourceService) {
        var resourceName = 'social';

        this.get = function get(id, options) {
            return dynamicResourceService.get(resourceName, id, options);
        };
    }
    ]);

}(angular));