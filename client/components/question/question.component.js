import angular from 'angular';

export class QuestionComponent {}

export default angular.module('directives.question', [])
  .component('question', {
    template: require('./question.html'),
    controller: QuestionComponent
  })
  .name;
