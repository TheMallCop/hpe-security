import angular from 'angular';

export class QuestionComponent {
	$onInit() {
		this.updateInputs = (values) => {
			console.log('Values are now', values);
		}
	}
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
