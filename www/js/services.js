angular.module('starter.services', ['ngResource'])
.factory('AllLists', AllListsFactory)
.factory('TodoListService', TodoListService)
.factory('TodosPerList', TodosPerList)
.factory('TodoService', TodoService)
.factory('TasksPerTodo', TasksPerTodo)
.factory('TaskService', TaskService)
.factory('CustomerService', CustomerService)
.factory('Shared', Shared)
;

AllListsFactory.$inject = ['$resource'];
function AllListsFactory($resource) {
	var dbURL = "http://localhost:8185/tbllists/:id";
	var shared = {
		refresh: true,
		editListId: 0
	}
	return $resource (dbURL,{}, {
		get: {method: 'GET', cache: false, isArray: false},
		update: { method:'POST' }
	});			
}

TodoListService.$inject = ['$resource','AllLists'];
function TodoListService($resource,AllLists) {
	
	var dbURL = "http://localhost:8185/tbllists/:id";
	var todolists = {};
	var api = function() {
		return $resource (dbURL,{}, {
			get: {method: 'GET', cache: false, isArray: false},
			update: { method:'POST' }
		});
	}
	return {
			msg: "tryout",
			lists: {},

			api: $resource (dbURL,{}, {
				get: {method: 'GET', cache: false, isArray: false},
				update: { method:'POST' }
			}),
			getTodoLists: function () {
				console.log('todolists:'+JSON.stringify(this.todolists));
	            return this.todolists; //we need some way to access actual variable value
	        },
			mylists:  function()
			{
				return	AllLists.get({}, 
    			function success(response) {
    				if (response._embedded != undefined) {
	    				lists = response._embedded.tbllists;
	    				console.log("TodoListService.mylists success::"+ JSON.stringify(lists));
    				}
    			},
    		    function error(errorResponse) {
    				console.log("TodoListService.mylists Error:" + JSON.stringify(errorResponse));
    		    }
			)},
			get: function() {
//				return this.api.get({}, function (response) {
//					angular.copy(response._embedded.tbllists, lists2);
					console.log("in get fu:");
					return this.api.get({}, 
						function success(response) {
					
							if (response._embedded != undefined) {
								this.todolists = response._embedded.tbllists;
//								angular.copy(response._embedded.tbllists, this.todolists);
								console.log("TodoListService.get success::"+ JSON.stringify(this.todolists));
							}
						},
						function error(errorResponse) {
							console.log("TodoListService.get Error:" + JSON.stringify(errorResponse));
						} 
					);
			}
			
	}; //todoLIST	
}

function Shared() {
	var Shared = {
			refresh: true,
			editListId: 0
		};
		return Shared;		
}


TodoListService.$inject = ['$resource'];
function TodosPerList($resource) {
	var dbURL = "http://localhost:8185/tbltodoes/search/findByTbllist_listid?listid=:listId";
	return $resource (dbURL,{listId:'@id'}, {
		get: {method: 'GET', cache: false, isArray: false}
	});	
}

TodoService.$inject = ['$resource'];
function TodoService($resource) {
	var dbURL = "http://localhost:8185/tbltodoes/:id";
	var todos = {};
	return {
		api: $resource (dbURL,{}, {
			get: {method: 'GET', cache: false, isArray: false},
			update: { method:'POST' }
		})
	}		
}


TaskService.$inject = ['$resource'];
function TaskService($resource) {
	var dbURL = "http://localhost:8185/tbltasks/:id";
	var tasks = {};
	return {
		api: $resource (dbURL,{}, {
			get: {method: 'GET', cache: false, isArray: false},
			update: { method:'POST' }
		})
	}		
}

CustomerService.$inject = ['$resource'];
function CustomerService($resource) {
	var dbURL = "http://localhost:8185/tblcustomers/:id";
	return {
		api: $resource (dbURL,{}, {
			get: {method: 'GET', cache: false, isArray: false},
			update: { method:'POST' }
		})
	}		
}

//bisherige Lösung mit standard API
TasksPerTodo.$inject = ['$resource'];
function TasksPerTodo($resource) {
//	var dbURL = "http://localhost:8185/tbltasks/search/findByTbltodo_todoID?todoID=:todoId";
//	var dbURL = "http://localhost:8185/tbltasks/search/findByTodoID?todoid=:todoid";

	var dbURL = "http://localhost:8185/tbltasks/search/findByTbltodo_TodoID?todoid=:todoid";
		return $resource (dbURL,{todoId:'@id'}, {
		get: {method: 'GET', cache: false, isArray: false},
		update: {method: 'PUT', cache: false, isArray: false}
	});	
	
}

