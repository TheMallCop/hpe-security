import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  constructor($state, $location, $anchorScroll) {
    this.$state = $state;
    this.$location = $location;
    this.$anchorScroll = $anchorScroll;
  }
  $onInit() {
    var scrollToTop = () => {
      this.$location.hash('stepper');
      this.$anchorScroll();
    };
    this.steps = [
      {
        label: 'A',
        name: 'Governance',
        complete: false,
        active: true
      }, {
        label: 'B',
        name: 'Construction',
        complete: false,
        active: false
      }, {
        label: 'C',
        name: 'Verification',
        complete: false,
        active: false
      }, {
        label: 'D',
        name: 'Deployment',
        complete: false,
        active: false
      }
    ];
    this.nextStep = () => {
      var nextStep = false;
      this.steps.forEach((step, index) => {
        if (step.active && !nextStep) {
          if (index === this.steps.length -1) {
            this.$state.go('results');
          }
          step.active = false;
          step.complete = true;
          nextStep = index + 1;
          this.steps[nextStep].active = true;
        }
      })
      scrollToTop();
    };
    this.previousStep = () => {
      var previousStep = false;
      this.steps.forEach((step, index) => {
        if (step.active && !previousStep) {
          step.active = false;
          previousStep = index - 1;
          this.steps[previousStep].active = true;
          this.steps[previousStep].complete = false;
        }
      })
      scrollToTop();
    };
    this.questions = {
      sectionA: [
        {
          number: 1,
          content: 'We have completed an inventory of our software portfolio (including in-house development, COTS, third-party development, etc.)',
          dbEntity: 'hpeQuestion1',
          analyticsName: 'Question 1',
          responded: false
        }, {
          number: 2,
          content: 'Applications in our portoflio have been classified according to data type',
          dbEntity: 'hpeQuestion2',
          analyticsName: 'Question 2',
          responded: false
        }, {
          number: 3,
          content: 'We have completed a risk exposure anlaysis of our business critical applications',
          dbEntity: 'hpeQuestion3',
          analyticsName: 'Question 3',
          responded: false
        }, {
          number: 4,
          content: 'Our security goals are documented and communciated to stakeholders',
          dbEntity: 'hpeQuestion4',
          analyticsName: 'Question 4',
          responded: false
        }, {
          number: 5,
          content: 'There is a specific group/team that is responsible for Appsec',
          dbEntity: 'hpeQuestion5',
          analyticsName: 'Question 5',
          responded: false
        }, {
          number: 6,
          content: 'We have documented and communicated secure coding standards to everyone involved in software development',
          dbEntity: 'hpeQuestion6',
          analyticsName: 'Question 6',
          responded: false
        }, {
          number: 7,
          content: 'Our software suppliers and development partners are required to find and fix security vulnerabilities',
          dbEntity: 'hpeQuestion7',
          analyticsName: 'Question 7',
          responded: false
        }, {
          number: 8,
          content: 'We have a role-based security education program in place  to support application security awareness',
          dbEntity: 'hpeQuestion8',
          analyticsName: 'Question 8',
          responded: false
        }
      ], 
      sectionB: [
        {
          number: 9,
          content: 'Secure frameworks and design features are considered during the design process',
          dbEntity: 'hpeQuestion9',
          analyticsName: 'Question 9',
          responded: false
        }, {
          number: 10,
          content: 'We have a documented process track use of open source components and verify their security',
          dbEntity: 'hpeQuestion10',
          analyticsName: 'Question 10',
          responded: false
        }, {
          number: 11,
          content: 'Development teams follow secure coding practices',
          dbEntity: 'hpeQuestion11',
          analyticsName: 'Question 11',
          responded: false
        }, {
          number: 12,
          content: 'Threat models are built and maintained on a per-application basis',
          dbEntity: 'hpeQuestion12',
          analyticsName: 'Question 12',
          responded: false
        }
      ], 
      sectionC: [
        {
          number: 13,
          content: 'We conduct regular secure code reviews',
          dbEntity: 'hpeQuestion13',
          analyticsName: 'Question 13',
          responded: false
        }, {
          number: 14,
          content: 'We conduct secure design reviews for new projects',
          dbEntity: 'hpeQuestion14',
          analyticsName: 'Question 14',
          responded: false
        }, {
          number: 15,
          content: 'Software architects are involved in the secure design reviews',
          dbEntity: 'hpeQuestion15',
          analyticsName: 'Question 15',
          responded: false
        }, {
          number: 16,
          content: 'We have an established security checkpoint and stakeholders are involved in go/no go decision before application goes into production',
          dbEntity: 'hpeQuestion16',
          analyticsName: 'Question 16',
          responded: false
        }, {
          number: 17,
          content: 'Stakeholders regularly review the results or metrics from the security code review activities',
          dbEntity: 'hpeQuestion17',
          analyticsName: 'Question 17',
          responded: false
        }, {
          number: 18,
          content: 'Development teams regularly  perform source code analysis as part of their workflow',
          dbEntity: 'hpeQuestion18',
          analyticsName: 'Question 18',
          responded: false
        }, {
          number: 19,
          content: 'We perform penetration tests on software releases',
          dbEntity: 'hpeQuestion19',
          analyticsName: 'Question 19',
          responded: false
        }
      ], 
      sectionD: [
        {
          number: 20,
          content: 'In addition to our app security testing program, we wrap additional protection around  high-risk applications',
          dbEntity: 'hpeQuestion20',
          analyticsName: 'Question 20',
          responded: false
        }, {
          number: 21,
          content: 'We monitor applications running in production to collect and respond to threat intelligence',
          dbEntity: 'hpeQuestion21',
          analyticsName: 'Question 21',
          responded: false
        }, {
          number: 22,
          content: 'We have a complete feedback loop to share incidents and identified vulnerabilitiy information back to development and design teams',
          dbEntity: 'hpeQuestion22',
          analyticsName: 'Question 22',
          responded: false
        }
      ]
    };
  }
}

MainController.$inject = ['$state', '$location', '$anchorScroll'];

export default angular.module('hpeSecurityApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController,
    controllerAs: '$ctrl'
  })
  .name;
