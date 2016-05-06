// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngResource'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      // javascript error otherwise when run as cordova sim ....endless events
      logger.useConsole(false);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('x3', {
    url: "/x3",		//muss "/x3" stehen
    abstract: true,
//    views: {
//    	'x3': {
    	templateUrl: 'templates/base.html',
        controller: 'AppCtrl'
//    	}
//    }
  })


  .state('x3.todolists', {
      url: "/todolists",
      views: {
        'menuContent': {    //ist in template von abstract (base /menu) als ion-nav-view name= 
          templateUrl: "templates/todolists.html",
          controller: 'TodolistCtrl'
        }
      }
//      controller: 'TodolistCtrl'
    })

//  .state('x3.todoListView', { //state for showing single list
//    url: '/todolists/:id/view',
//    templateUrl: 'templates/todolist_view.html',
//    controller: 'TodolistViewCtrl'  
//  })
    
  .state('x3.todoListNew', { //state for adding a new list
    url: '/todolists/new',
    views: {
        'menuContent': {
		    templateUrl: 'templates/todolist_add.html',
		    controller: 'TodolistCreateCtrl'
        }
    }
  })
  
    
  .state('x3.todoListEdit', {
	  url: "/todolists/:listid",
	  views: {
	  		'menuContent': {
	  			templateUrl: "templates/todolistedit.html",
	  			controller: 'TodolistEditCtrl'
	  		}
	  }
  })
    
   .state('x3.todos', {
      url: "/todos/:listid",
      views: {
        'menuContent': {
          templateUrl: "templates/todosperlist.html",
          controller: 'TodosCtrl'
        }
      }
    })
    

  .state('x3.todoView', { //state for showing single todo
    url: '/todos/:id/view',
    views: {
		'menuContent': {
			templateUrl: 'templates/todo_view.html',
			controller: 'TodoViewCtrl'  
		}
    }
  })
  
  .state('x3.todoEdit', { //state for showing single todo
    url: '/todos/:id/edit',
    views: {
		'menuContent': {
			templateUrl: 'templates/todo_edit.html',
			controller: 'TodoEditCtrl'  
		}
    }
  })
    
    
  .state('x3.tasks', {
      url: "/tasks/:todoid",
      views: {
        'menuContent': {
          templateUrl: "templates/taskspertodo.html",
          controller: 'TaskCtrl'
        }
      }
    })

  .state('x3.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })

    
  .state('x3.task', {
    url: "/tasks/:taskid/edit",
    views: {
      'menuContent': {
        templateUrl: "templates/taskedit.html",
        controller: 'TaskSelectedCtrl'
      }
    }
  });
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/x3/todolists');
//  $urlRouterProvider.otherwise('/x3');
});
