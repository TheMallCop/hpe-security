import angular from 'angular';

export class QuestionComponent {
    $onInit() {
        this.updateInputs = (value) => {
            this.question.value = value;
            $('#' + this.question.dbEntity).val(this.question.value).trigger('change');
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
