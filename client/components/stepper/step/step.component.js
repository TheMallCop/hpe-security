import angular from 'angular';

export class StepComponent {
}

export default angular.module('directives.step', [])
  .component('step', {
    template: require('./step.html'),
    controller: StepComponent,
    transclude: true,
    bindings: {
    	name: '@',
    	label: '@'
    }
  })
  .name;
