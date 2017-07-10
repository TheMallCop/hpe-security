import angular from 'angular';

export class QuestionComponent {
	$onInit() {
		this.updateInputs = (value) => {
			console.log('Values are now', value);
      this.question.value = value;
      angular.element(document.getElementById(this.question.dbEntity)).triggerHandler('change')
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
