import angular from 'angular';

export class HorizontalStepperComponent {
}

export default angular.module('directives.horizontalStepper', [])
  .component('horizontalStepper', {
    template: require('./horizontal-stepper.html'),
    controller: HorizontalStepperComponent,
    transclude: true,
    bindings: {
      steps: '='
    }
  })
  .name;
