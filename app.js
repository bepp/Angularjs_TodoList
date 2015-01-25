angular.module("App", [])
.controller("MainController", ["$scope", function($scope) {
	// TODOリスト
	$scope.todos = [];

	// TODOのタイトル
	$scope.newTitle = "";

	// フィルタリング条件モデル
	$scope.filter = {
		done: {done: true},	// 完了
		remaining: {done: false}	// 未完了
	}

	// 現在のフィルタリング条件
	$scope.currentFilter = null;

	// TODOリストへの追加
	$scope.addTodo = function () {
		$scope.todos.push({
			title: $scope.newTitle,
			done: false
		});
		$scope.newTitle = "";
	};

	// フィルタリング条件変更
	$scope.changeFilter = function(filter) {
		$scope.currentFilter = filter;
	};

	// フィルタリング条件によりボタンを無効化
	$scope.disabledButton = function(filter) {
		if($scope.currentFilter == filter) {
			return true;
		}
		else {
			return false;
		}
	}
}]);
