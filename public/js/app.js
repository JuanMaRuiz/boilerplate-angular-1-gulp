(function(){
  'use strict';
  angular
    .module('bazingaApp', ['ui.router'])
    .config(configuration)

    configuration.$inject = ['$stateProvider', '$urlRouterProvider'];

    function configuration($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'partials/state1.html'
        })
        .state('state1', {
          url: '/state1',
          templateUrl: 'partials/state1.html'
        })
        .state('state2', {
          url: '/state2',
          templateUrl: 'partials/state2.html'
        });
      $urlRouterProvider.otherwise('/');
    }
})();
