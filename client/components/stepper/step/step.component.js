import angular from 'angular';

export class StepComponent {
	// Get the active step
	$doCheck() {
	  if (this.stepperCtrl.activeStep === this.label) {
	  	this.active = true;
	  } else {
	  	this.active = false;
	  }
	  if (this.stepperCtrl.completedSteps.includes(this.label)) {
	  	this.complete = true;
	  } else {
	  	this.complete = false;
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
