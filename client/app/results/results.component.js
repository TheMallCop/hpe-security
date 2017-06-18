import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './results.routes';

export class ResultsController {
  $onInit() {
    this.sliderScores = {
      governance: 4,
      construction: 7,
      verification: 5,
      deployment: 10,

    };
    this.readOnly = true;
  }
}

export default angular.module('hpeSecurityApp.results', [uiRouter])
  .config(routing)
  .component('results', {
    template: require('./results.html'),
    controller: ResultsController,
    controllerAs: '$ctrl'
  })
  .name;
