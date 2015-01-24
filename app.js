angular.module("App", [])
.controller("MainController", ["$scope", function($scope) {
	// TODOリスト
	$scope.todos = [];

	// TODOリストへの追加
	$scope.addTodo = function () {
		$scope.todos.push({
			title: Math.random(),
			done: false
		});
	};
}]);
