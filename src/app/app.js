angular.module('profile', [
    'baasic.userProfile'
]);

angular.module('profile', [
  'ui.router',
  'ngAnimate',
  //'btford.markdown',
  //'ngTagsInput',
  'smoothScroll',
  'baasic.security',
  'baasic.membership',
  'baasic.dynamicResource',
  'baasic.userProfile'
])
.config(['$locationProvider', '$urlRouterProvider', '$stateProvider', 'baasicAppProvider', 'baasicAppConfigProvider',
    function config($locationProvider, $urlRouterProvider, $stateProvider, baasicAppProvider, baasicAppConfigProvider) {
        'use strict';

        baasicAppProvider.create(baasicAppConfigProvider.config.apiKey, {
            apiRootUrl: baasicAppConfigProvider.config.apiRootUrl,
            apiVersion: baasicAppConfigProvider.config.apiVersion
        });

        $locationProvider.html5Mode({
            enabled: true
        });

        $urlRouterProvider.when('', '/');

        $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get('$state');
            $state.go('404');
        });

        $urlRouterProvider.rule(function ($injector, $location) {
            var path = $location.path();

            // check to see if the path ends in '/'
            if (path[path.length - 1] === '/') {
                $location.replace().path(path.substring(0, path.length - 1));
            }
        });

        $stateProvider
            .state('master', {
                abstract: true,
                url: '/',
                templateUrl: 'templates/master.html'
            })
            .state('master.main', {
                abstract: true,
                templateUrl: 'templates/main.html',
                controller: 'MainCtrl'
            })
            .state('master.main.index', {
                url: '?{page,search}',
                templateUrl: 'templates/profile/profile-list.html'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            })
            .state('master.profile-detail', {
                url: 'profile/{profileId}',
                templateUrl: 'templates/profile/profile-detail.html',
            })
            .state('master.main.profile-search', {
                url: 'profile-search?{search}',
                templateUrl: 'templates/profile/profile-search-results.html',
            })
            .state('404', {
                templateUrl: 'templates/404.html'
            });
    }
])
.constant('recaptchaKey', '6LcmVwMTAAAAAKIBYc1dOrHBR9xZ8nDa-oTzidES')
.controller('MainCtrl', ['$scope', '$state', '$rootScope', '$browser',
    function MainCtrl($scope, $state, $rootScope, $browser) {
        'use strict';

        // http://stackoverflow.com/questions/8141718/javascript-need-to-do-a-right-trim
        var rightTrim = function (str, ch){
            if (!str){
                return '';
            }
            for (var i = str.length - 1; i >= 0; i--)
            {
                if (ch !== str.charAt(i))
                {
                    str = str.substring(0, i + 1);
                    break;
                }
            }
            return str ? str : '';
        };

        $rootScope.baseHref = rightTrim($browser.baseHref.href, ('/'));
        if ($rootScope.baseHref === '/') {
            $rootScope.baseHref = '';
        }


        $scope.setEmptyUser = function setEmptyUser() {
            $scope.$root.user = {
                isAuthenticated: false
            };
        };
    }
])
.controller('SearchCtrl', ['$scope', '$state', '$stateParams', function ($scope, $state, $stateParams) {
    'use strict';
    
    $scope.searchFor = $stateParams.search || '';

    $scope.searchProfile = function searchProfile() {
            $state.go('master.main.index', { search: $scope.searchFor, page: 1 });            
        };
}])
.run(['$rootScope', '$window', 'baasicAuthorizationService',
    function moduleRun($rootScope, $window, baasicAuthService) {
        'use strict';

        var token = baasicAuthService.getAccessToken();
        var userDetails;
        if (token) {
            userDetails = baasicAuthService.getUser();
        }

        var user;
        if (userDetails !== undefined && userDetails !== null) {
            user = {
                isAuthenticated: true,
                isAdmin: userDetails.roles.indexOf('Administrators') !== -1
            };

            angular.extend(user, userDetails);
        } else {
            user = {
                isAuthenticated: false
            };
        }

        $rootScope.user = user;
    }
]);