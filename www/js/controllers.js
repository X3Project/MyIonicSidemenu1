var ctrls = angular.module('starter.controllers', ['starter.services']);

ctrls.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})


//ctrls.controller('TodolistCtrl', ['$scope', 'TodoListService', 'Shared', function($scope, $state, AllLists, TodoListService, Shared, todoLIST) {
ctrls.controller('TodolistCtrl', function($scope, $state, AllLists, TodoListService, Shared) {
	
	console.log("TodolistCtrl - ctrl reached get:" + JSON.stringify(TodoListService.todolists));
	$scope.newList = {};
	$scope.editedList = {};
	
    function findAllLists() {    	
    	console.log("findAllLists - 2 be executed"); 
		return	TodoListService.api.get({}, 
    			function success(response) {
    				if (response._embedded != undefined) {
    					$scope.alllists = response._embedded.tbllists;
	    				console.log("findAllLists success::"+ JSON.stringify($scope.alllists));
    				}
    			},
    		    function error(errorResponse) {
    				console.log("TodoListService.mylists Error:" + JSON.stringify(errorResponse));
    		    }
		)
    }

    function findList(list_id) {
    	var retList = {};
    	console.log("findList - 2 be executed for listid:"+list_id); 
    	AllLists.get({id:list_id}, 
    			function success(response) {
    		console.log("findList - response:"+JSON.stringify(response)); 
    				if (response != undefined) {
    					retList = response;
	    				console.log("TodolistCtrl.findList success::"+ JSON.stringify(retList));
	    				return retList;
    				}
    			},
    		    function error(errorResponse) {
    				console.log("TodolistCtrl.findList Error:" + JSON.stringify(errorResponse));
    				return null;
    		    }
    	);
    }

    function saveList(list) {
    	AllLists.save(list,
    			function success(resp) {
    				list.id = resp.id;
    				list.name = resp.name;
    				console.log("TodolistCtrl.save success on ID-Name:"+ list.id + "-" + list.name);
    				 findAllLists();
    			}, function error(errorResponse) {
    				//angular.copy(originalTodos, store.todos);
    				console.log("TodolistCtrl.saveList Error:" + JSON.stringify(errorResponse));
    			})
    }

    function deleteList(list) {
    	AllLists.remove({ id: list.listid },
    			function success(resp) {
    				console.log("TodolistCtrl.remove success on ID-Name:"+ list.listid + "-" + list.name);
    				 //findAllLists();
    			}, function error(errorResponse) {
    				//angular.copy(originalTodos, store.todos);
    				console.log("TodolistCtrl.remove Error:" + JSON.stringify(errorResponse));
    			})
    }
    
    

	//add a new list
	$scope.addList = function addList() {
		console.log("addList begin: name1:" + $scope.newList.name);
		if($scope.newList.name==""){
			alert("Insufficient Data! Please provide values for list name, ID");
		}
		else {
			var insList = {
					name: $scope.newList.name,
					id: $scope.newList.id
					};
			console.log("addList set name in form:" + $scope.newList.name + " name 2 add "+insList.name);;
			$scope.alllists.push(insList);
			console.log("addList pushed newList");
			saveList(insList);	
			console.log("addList saved newList");
			 // Refetching EVERYTHING every time can get expensive over time
             // Better solution would be to $http.get(headers()["location"]) and add it to the list
            
		    };
	};

	$scope.removeList = function removeList(list) {
		console.log("removeList for:" + list.name + "ID:"+list.listid);

		$scope.alllists.splice($scope.alllists.indexOf(list), 1);
		console.log("removeList splice:" + list.name);
		deleteList(list);
		console.log("removeList for:" + list.name);
		};
		
	$scope.updateList = function (list) {
		console.log("updateList for :"+ JSON.stringify(list));
		
		var updList = AllLists.get({id:list.listid},function() {
				updList.name = $scope.editedList.name;
//				updList.$update(function() {
				updList.$update(function success(response) {
					findAllLists();
					console.log("updateList - List(<"+list.listid+">) name updated to "+ $scope.editedList.name);
					setSelected(0);
//					$state.go('x3.todolists');

				})
				console.log('updateList end bbbbb');

				Shared.refresh = true;
		})		
	};	
		
/* trial navigate to another state & controller on edit, Problem navigation to other view
 * does not work
 
		$scope.goedit = function(listid) {
		console.log("goedit: to state x3.todolist with listid:"+listid);
	    $state.go('x3.todolist',{id:listid});
	    Shared.refresh = false;
	    Shared.editListId = listid;
	};	
*/

	$scope.setSelected = function(index) {
		console.log("setSelected: selected index is:"+index);
		$scope.selectedIdx = index;
	}
	
//	if (Shared.refresh == true) {
//	    //findAllLists();
//		console.log("only set lists!!");
		findAllLists();
	
		// funktioniert nicht
		//		$scope.alllists = todolistservice.todolists;
		console.log("alllists:"+JSON.stringify($scope.alllists));
		
//	} 
    
});


ctrls.controller('TodolistCreateCtrl', function($scope, $state, AllLists, Shared) {
	console.log("TodolistCreateCtrl - ctrl reached"); 
	
	$scope.newList = {};
//	$scope.editedList = {};
	$scope.editedList = new AllLists();

    function saveList(list) {
    	AllLists.save(list,
    			function success(resp) {
    				list.id = resp.id;
    				list.name = resp.name;
    				console.log("TodolistCreateCtrl.save success on ID-Name:"+ list.id + "-" + list.name);
    				$state.go('x3.todolists');
    	}, function error(errorResponse) {
    				//angular.copy(originalTodos, store.todos);
    				console.log("TodolistCreateCtrl.saveList Error:" + JSON.stringify(errorResponse));
    			})
    }

	//add a new list
	$scope.addList = function addList() {
		console.log("addList begin: name1:" + $scope.newList.name);
		if($scope.editedList.name==""){
			alert("Insufficient Data! Please provide value for list name");
		}
		else {
			console.log("TodolistCreateCtrl - addList set name in form:" + $scope.editedList.name);
			saveList($scope.editedList);
			console.log("addList saved newList");
			//$state.go('x3.todolists'); // on success go back to home i.e. todolists state.
			 // Refetching EVERYTHING every time can get expensive over time
             // Better solution would be to $http.get(headers()["location"]) and add it to the list
            
		    };
	};
	
});

//NICHT in Verwendung - Konzept für Todos & Co
//ctrls.controller('TodolistViewCtrl', function($scope, $stateParams, TodoListService) {
//	  $scope.movie = TodoListService.get({ id: $stateParams.id }); //Get a single todolist. Issues a GET to /api/movies/:id
//	});

ctrls.controller('TodosCtrl', function($scope, $stateParams, TodosPerList) {
	var list_id = $stateParams.listid;
	console.log("TodosCtrl - ctrl reached list_id:"+list_id);
	
    function deleteTodos(todo) {
    	TodosPerList.remove({ id: todo.toDoID },
    			function success(resp) {
    				console.log("TodosCtrl.remove success on ID-Title:"+ todo.toDoID + "-" + todo.title);
    				 //findAllLists();
    			}, function error(errorResponse) {
    				//angular.copy(originalTodos, store.todos);
    				console.log("TodosCtrl.remove Error:" + JSON.stringify(errorResponse));
    			})
    }
	
	TodosPerList.get({listId: list_id}, 
			function success(response) {
				$scope.todosonlist = response._embedded.tbltodoes;
				console.log("TodosCtrl success::"+ JSON.stringify($scope.todosonlist));
			},
		    function error(errorResponse) {
				console.log("TodosCtrl Error:" + JSON.stringify(errorResponse));
		    }
	);

	$scope.removeTodo = function removeTodo(todo) {
		console.log("removeTodo for:" + todo.title + "ID:"+todo.toDoID);

		$scope.todosonlist.splice($scope.todosonlist.indexOf(todo), 1);
		console.log("removeTodo splice:" + todo.title);
		deleteTodo(todo);
		console.log("removeList for:" + todo.title);
		};
});

ctrls.controller('TodoViewCtrl', function($scope, $stateParams, TodoService) {
	console.log("TodoViewCtrl - ctrl reached for id:"+ $stateParams.id);  
	$scope.todo = TodoService.api.get({ id: $stateParams.id }); //Get a single todo.Issues a GET to
});

ctrls.controller('TodoEditCtrl', function($scope, $state, $stateParams, TodoService) {
	$scope.todo = TodoService.api.get({ id: $stateParams.id }); 
	
	
	$scope.updateTodo = function() { //Update the edited todo. Issues a PUT to /x3/todos/:id
		console.log("updateTodo for:" + $scope.todo.title + "ID:"+$scope.todo.toDoID + "Cust:" + $scope.todo.CustomerID+"#");
		
			$scope.todo.CustomerID = 1; //temporär
			console.log("updateTodo for:" + $scope.todo.title + "ID:"+$scope.todo.toDoID + "Cust:" + $scope.todo.CustomerID+"#");
		    $scope.todo.$update(function() {
		      $state.go('x3.todos'); // on success go back to home i.e. todos state.
		    });
	  };
});

ctrls.controller('TaskCtrl', function($scope, $stateParams, TasksPerTodo) {
	var todo_id = $stateParams.todoid;
	console.log("TaskCtrl - ctrl reached todo_id:"+todo_id + JSON.stringify($stateParams));
	TasksPerTodo.get({todoid: todo_id}, 
			function success(response) {
				$scope.tasks = response._embedded.tbltasks;
				console.log("TaskCtrl success::"+ JSON.stringify($scope.tasks));
			},
		    function error(errorResponse) {
				console.log("TaskCtrl Error:" + JSON.stringify(errorResponse));
		    }
	);
	$scope.openMenu = function () {};		
});

ctrls.controller('TaskSelectCtrl', function($scope, $stateParams, TaskSelected) {
	var todo_id = $stateParams.todoid;
	console.log("TaskCtrl - ctrl reached todo_id:"+todo_id + JSON.stringify($stateParams));
	TasksPerTodo.get({todoid: todo_id}, 
			function success(response) {
				$scope.tasks = response._embedded.tbltasks;
				console.log("TaskCtrl success::"+ JSON.stringify($scope.tasks));
			},
		    function error(errorResponse) {
				console.log("TaskCtrl Error:" + JSON.stringify(errorResponse));
		    }
	);
	$scope.openMenu = function () {};		
});
