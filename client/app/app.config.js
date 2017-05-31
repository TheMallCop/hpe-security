'use strict';

export function routeConfig($urlRouterProvider, $locationProvider, $mdThemingProvider) {
  'ngInject';

  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(true);

  var hpeAccentMap = $mdThemingProvider.extendPalette('green', {
    'A100': '01A982',
    'A200': '01A982',
    'A400': '01A982',
    'A700': '01A982',
    'contrastDefaultColor': 'light'
  });

  $mdThemingProvider.definePalette('hpeAccentColor', hpeAccentMap);

  $mdThemingProvider.theme('default')
    .primaryPalette('purple')
    .accentPalette('hpeAccentColor');
}
