angular.module('profile')
    .directive('socialProfile', [
        function socialProfile() {
            'use strict';

            return {
                restrict: 'AE',
                scope: { socId: '=' },
                controller: ['$scope', '$state', '$stateParams', '$q', 'socialService',
                    function ($scope, $state, $stateParams, $q, socialService) {
                        function loadProfile() {
                        socialService.get($scope.socId,
                        {

                        })
                            .success(function (data) {
                                $scope.social = data;
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
                templateUrl: 'templates/profile/template-social-profile.html'
            };
        }
    ]
);