angular.module('profile')
    .directive('profileDetail', [
        function profileDetail() {
            'use strict';

            return {
                restrict: 'AE',
                scope: '=',
                controller: ['$scope', '$state', '$stateParams', '$q', 'baasicUserProfileService',
                    function ($scope, $state, $stateParams, $q, baasicUserProfileService) {
                        function loadProfile() {
                        baasicUserProfileService.get($state.params.profileId,
                        {
                            embed: 'work,educations,skills,educations.organization,skills.skill,work.company,membership'
                        })
                            .success(function (data) {
                                $scope.profile = data;
                            })
                            .error(function (error) {
                                console.log(error); //jshint ignore: line
                            })
                            .finally(function () {
                            });
                        }

                        loadProfile();

                    }
                ],
                templateUrl: 'templates/profile/template-profile-detail.html'
            };
        }
    ]
);