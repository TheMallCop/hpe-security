import angular from 'angular';

export class QuestionComponent {
	$onInit() {
		this.updateCtrl = (sectionIndex, responseValue) => {
			this.sectionResponses[sectionIndex].responded = true;
      this.sectionResponses[sectionIndex].value = this.value;
		}
	}
}

export default angular.module('directives.question', [])
  .component('question', {
    template: require('./question.html'),
    controller: QuestionComponent,
    bindings: {
    	questionNumber: '@',
    	questionText: '@',
    	sectionResponses: '=',
    	sectionIndex: '@'
    }
  })
  .name;
