angular.module("App", [])
.controller("MainController", ["$scope", function($scope) {
	// TODOリスト
	$scope.todos = [];

	// TODOのタイトル
	$scope.newTitle = "";

	// TODOリストへの追加
	$scope.addTodo = function () {
		$scope.todos.push({
			title: $scope.newTitle,
			done: false
		});
		$scope.newTitle = "";
	};
}]);
