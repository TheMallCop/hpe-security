import angular from 'angular';

export class QuestionComponent {
	$onInit() {
		this.model = {};
		this.updateCtrl = (index) => {
			this.sectionResponses[index].responded = true;
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
    	dbEntity: '@',
    	analyticsName: '@',
    	sectionResponses: '='
    }
  })
  .name;
