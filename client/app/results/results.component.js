import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './results.routes';

export class ResultsController {
  $onInit() {
    this.results = [
      {
        name: 'Governance',
        score: {
          dbEntity: 'governanceScore',
          analyticsName: 'Governance Score',
          value: 0
        },
        average: {
          dbEntity: 'governanceAvg',
          analyticsName: 'Governance Average Score',
          value: 0
        }
      }, {
        name: 'Construction',
        score: {
          dbEntity: 'constructionScore',
          analyticsName: 'Construction Score',
          value: 0
        },
        average: {
          dbEntity: 'constructionAvg',
          analyticsName: 'Construction Average Score',
          value: 0
        }
      }, {
        name: 'Verification',
        score: {
          dbEntity: 'verificationScore',
          analyticsName: 'Verification Score',
          value: 0
        },
        average: {
          dbEntity: 'verificationAvg',
          analyticsName: 'Verification Average Score',
          value: 0
        }
      }, {
        name: 'Deployment',
        score: {
          dbEntity: 'deploymentScore',
          analyticsName: 'Deployment Score',
          value: 0
        },
        average: {
          dbEntity: 'deploymentAvg',
          analyticsName: 'Deployment Average Score',
          value: 0
        }
      }
    ];
    this.readOnly = true;
    this.getAvgOffset = (score) => {
      var offset = score * 10;
      return 'left: ' + offset + '%;';
    };
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
