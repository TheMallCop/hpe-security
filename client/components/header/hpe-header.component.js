'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class HeaderComponent {
  menu = [{
    title: 'Home',
    state: 'main'
  }];
  isCollapsed = true;

}

export default angular.module('directives.hpeHeader', [])
  .component('hpeHeader', {
    template: require('./hpe-header.html'),
    controller: HeaderComponent
  })
  .name;
