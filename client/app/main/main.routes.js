'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('main:reg', {
    url: '/?reg',
    template: '<main></main>'
  });
}
