angular.module('baasic.profile')
    .service('baasicProfileService', ['baasicApiHttp', 'baasicUserProfileService',
           function baasicProfileService(baasicApiHttp, baasicUserProfileService) {
            'use strict';

            this.get = function get(id, options) {
                return baasicUserProfileService.get(id, options);
            };

            this.find = function find(options) {
                return baasicUserProfileService.find(options);
            };

            this.next = function next(profileList) {
                var nextLink = profileList.links('next');
                if (nextLink) {
                    return baasicApiHttp.get(nextLink.href);
                }
            };

            this.previous = function previous(profileList) {
                var prevLink = profileList.links('previous');
                if (prevLink) {
                    return baasicApiHttp.get(prevLink.href);
                }
            };
        }
    ]);