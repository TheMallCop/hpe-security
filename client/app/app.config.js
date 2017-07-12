'use strict';

export function routeConfig($stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider) {
    'ngInject';

    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);

    var hpeAccentMap = $mdThemingProvider.extendPalette('green', {
        'A200': '01A982',
        'A700': '1BB18E',
        'contrastDefaultColor': 'light'
    });

    $mdThemingProvider.definePalette('hpeAccentColor', hpeAccentMap);

    $mdThemingProvider.theme('default')
      .primaryPalette('purple')
      .accentPalette('hpeAccentColor');
}

export function mainstayConfig ($rootScope) {
    'ngInject';

    $rootScope.mainstayConfig = microTool.util;
}
