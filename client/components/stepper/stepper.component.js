import angular from 'angular';

export class StepperComponent {}

export default angular.module('directives.stepper', [])
  .component('stepper', {
    template: require('./stepper.html'),
    controller: StepperComponent,
    transclude: true,
    bindings: {
    	activeStep: '@',
    	completedSteps: '@',
      steps: '='
    }
  })
  .name;
