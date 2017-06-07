'use strict';

import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import uiRouter from 'angular-ui-router';
import ngMessages from 'angular-messages';
import ngMaterial from 'angular-material';
import {routeConfig} from './app.config';

import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import header from '../components/header/hpe-header.component';
import footer from '../components/footer/footer.component';
import question from '../components/question/question.component';
import stepper from '../components/stepper/stepper.component';
import step from '../components/stepper/step/step.component';

import './app.scss';

angular.module('hpeSecurityApp', [ngCookies, ngResource, ngSanitize, 
	uiRouter, ngAnimate, ngMessages, ngMaterial, constants, util,
	main, header, footer, question, stepper, step
])
  .config(routeConfig);

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['hpeSecurityApp'], {
      strictDi: true
    });
  });
