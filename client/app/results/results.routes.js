'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('results', {
    url: '/results',
    template: '<results></results>'
  });
}
