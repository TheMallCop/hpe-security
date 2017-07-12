'use strict';

export default function routes($stateProvider) {
    'ngInject';

    $stateProvider.state('results', {
      url: '/?reg',
      template: '<results></results>'
    });
}
