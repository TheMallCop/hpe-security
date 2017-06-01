import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {

  /*@ngInject*/
  constructor($mdStepper) {
    this.$mdStepper = $mdStepper;
  }

  $onInit() {
    this.nextStep = () => {
      this.$mdStepper('hpe-stepper').next();
    };
    this.previousStep = () => {
      this.$mdStepper('hpe-stepper').back();
    };
  }
}

export default angular.module('hpeSecurityApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController,
    controllerAs: '$ctrl'
  })
  .name;
