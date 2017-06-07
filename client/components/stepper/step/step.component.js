import angular from 'angular';

export class StepComponent {
	// Get the active step
	$doCheck() {
	  console.log('ch ch ch changes');
	  if (this.stepperCtrl.activeStep === this.label) {
	  	this.active = true;
	  } else {
	  	this.active = false;
	  }
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
