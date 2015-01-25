angular.module("App", [])
.controller("MainController", ["$scope", "$filter", function($scope, $filter) {
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
	};

	// フィルタ関数の取得
	// 参考:https://docs.angularjs.org/api/ng/filter/filter
	var where = $filter("filter");
	// todos変更のウォッチ
	// 参考:https://docs.angularjs.org/api/ng/type/$rootScope.Scope
	$scope.$watch("todos", function(todos) {
		var length = todos.length;

		// 全件数モデル
		$scope.allCount = length;
		// 完了件数モデル
		$scope.doneCount = where(todos, $scope.filter.done).length;
		// 未完了件数モデル
		$scope.remainingCount = length - $scope.doneCount;
	}, true);

	// 編集前のタイトル
	var originalTitle;
	// 編集中のTODOモデルを示すモデル
	$scope.editing = null;

	// 任意のtodoモデルを編集中にする
	$scope.editTodo = function(todo) {
		originalTitle = todo.title;
		$scope.editing = todo;
	};

	// 編集中を解除する
	$scope.doneEdit = function(todoForm) {
		if(todoForm.$invalid) {
			$scope.editing.title = originalTitle;
		}
		$scope.editing = originalTitle = null;
	};

	// 全選択・解除
	$scope.checkAll = function() {
		var state = !!$scope.remainingCount;

		angular.forEach($scope.todos, function(todo) {
			todo.done = state;
		});
	};

}])
.directive("mySelect", [function() {
	return function(scope, $el, attrs) {
		// scope	: 現在の$scopeオブジェクト
		// $el		: jqLiteオブジェクト(参考:http://js.studio-kingdom.com/angularjs/ng_global_apis/angular_element)
		// attrs	: DOM属性のハッシュ
		scope.$watch(attrs.mySelect, function(val) {
			if(val) {
				$el[0].select();
			}
		});
	};
}]);
