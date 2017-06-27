import angular from 'angular';

export class HorizontalStepComponent {
	$onInit() {
		this.lastStep = this.horizontalStepperCtrl.steps[this.horizontalStepperCtrl.steps.length - 1];
	}
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

export default angular.module('directives.horizontalStep', [])
  .component('horizontalStep', {
    template: require('./horizontal-step.html'),
    controller: HorizontalStepComponent,
    transclude: true,
    bindings: {
    	name: '@',
    	label: '@'
    },
    require: {
      horizontalStepperCtrl: '^horizontalStepper'
    },
  })
  .name;
