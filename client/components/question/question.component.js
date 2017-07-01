import angular from 'angular';

export class QuestionComponent {
	$onInit() {}
}

export default angular.module('directives.question', [])
  .component('question', {
    template: require('./question.html'),
    controller: QuestionComponent,
    bindings: {
    	question: '=',
    }
  })
  .name;
