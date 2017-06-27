import angular from 'angular';

export class StepperComponent {}

export default angular.module('directives.horizontalStepper', [])
  .component('horizontalStepper', {
    template: require('./horizontal-stepper.html'),
    controller: StepperComponent,
    transclude: true,
    bindings: {
    	activeStep: '@',
    	completedSteps: '@',
      steps: '='
    }
  })
  .name;
