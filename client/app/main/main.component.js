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
    this.questions = {
      sectionA: [
        {
          number: 1,
          content: 'We have completed an inventory of our software portfolio (including in-house development, COTS, third-party development, etc.)',
          dbEntity: 'hpeQuestion1',
          analyticsName: 'Question 1'
        }, {
          number: 2,
          content: 'Applications in our portoflio have been classified according to data type',
          dbEntity: 'hpeQuestion2',
          analyticsName: 'Question 2'
        }, {
          number: 3,
          content: 'We have completed a risk exposure anlaysis of our business critical applications',
          dbEntity: 'hpeQuestion3',
          analyticsName: 'Question 3'
        }, {
          number: 4,
          content: 'Our security goals are documented and communciated to stakeholders',
          dbEntity: 'hpeQuestion4',
          analyticsName: 'Question 4'
        }, {
          number: 5,
          content: 'There is a specific group/team that is responsible for Appsec',
          dbEntity: 'hpeQuestion5',
          analyticsName: 'Question 5'
        }, {
          number: 6,
          content: 'We have documented and communicated secure coding standards to everyone involved in software development',
          dbEntity: 'hpeQuestion6',
          analyticsName: 'Question 6'
        }, {
          number: 7,
          content: 'Our software suppliers and development partners are required to find and fix security vulnerabilities',
          dbEntity: 'hpeQuestion7',
          analyticsName: 'Question 7'
        }, {
          number: 8,
          content: 'We have a role-based security education program in place  to support application security awareness',
          dbEntity: 'hpeQuestion8',
          analyticsName: 'Question 8'
        }
      ]
    };
    // class="regInput microToolInput" data-dbentity=”numSysAdmins” data-analyticsname=”Number of System Administrators”
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
