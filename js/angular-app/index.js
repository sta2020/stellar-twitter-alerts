
var app = angular.module('stellarAlerts', 
                        [ 
                          'ui.router',
                          
                        ]);


app.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $provide) {

	$urlRouterProvider.otherwise('/');

	$stateProvider
    .state('home', {
      url: '/',
      views:{
        'frontPage' : {
          templateUrl: 'js/angular-app/views/front.html',
          controller: 'frontController'
        },
            
      }
    });

  $locationProvider.html5Mode(true);
  

});

