import angular from 'angular';

export class HorizontalStepComponent {
	$onInit() {
    console.log('Is step active?', this.activeStep);
  }
}

export default angular.module('directives.horizontalStep', [])
  .component('horizontalStep', {
    template: require('./horizontal-step.html'),
    controller: HorizontalStepComponent,
    transclude: true,
    bindings: {
    	active: '='
    }
  })
  .name;
