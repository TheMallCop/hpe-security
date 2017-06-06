import angular from 'angular';

export class StepComponent {
	// Get the active step
	$onInit() {
	  console.log('Step is active?', this.stepperCtrl.activeStep === this.label);
	}
}

export default angular.module('directives.step', [])
  .component('step', {
    template: require('./step.html'),
    controller: StepComponent,
    transclude: true,
    bindings: {
    	name: '@',
    	label: '@'
    },
    require: {
      stepperCtrl: '^stepper'
    },
  })
  .name;
