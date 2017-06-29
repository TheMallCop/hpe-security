import angular from 'angular';

export class MainstayOutputDirective {
	link(scope, element, attrs) {
	}
}

export default angular.module('directives.mainstayOutput', [])
  .directive('mainstayOutput', () => new MainstayOutputDirective)
  .name;
