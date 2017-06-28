import angular from 'angular';

export class HorizontalStepComponent {}

export default angular.module('directives.horizontalStep', [])
  .component('horizontalStep', {
    template: require('./horizontal-step.html'),
    controller: HorizontalStepComponent,
    transclude: true
  })
  .name;
