import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {

  $onInit() {
    var steps = ['A', 'B', 'C', 'D'];
    var stepCounter = 0;
    this.completedSteps = [];
    this.activeStep = steps[stepCounter];
    this.nextStep = () => {
      this.completedSteps.push(this.activeStep);
      stepCounter += 1;
      this.activeStep = steps[stepCounter]; 
    };
    this.previousStep = () => {
      this.completedSteps.pop();
      stepCounter -= 1;
      this.activeStep = steps[stepCounter]; 
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
