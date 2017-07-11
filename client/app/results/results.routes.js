'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('results', {
    url: '/results?reg',
    template: '<results></results>'
  });
}
