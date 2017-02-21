
"use strict";

var App = angular.module("task", [ "LocalStorageModule",'ui.bootstrap']);

App.controller("TaskCtrl", function ($scope, localStorageService, $modal) {

	$scope.init = function () {

		if (!localStorageService.get("taskList")) {
			$scope.model = [
				{
					name: "Work", list: [
						{ taskName: "Default Task Work", isDone: false }
					]
				},
				{
					name: "Personal", list: [
						{ taskName: "Default Task Personal", isDone: false }
					]
				}
			];
		}else{
			$scope.model = localStorageService.get("taskList");
		}
		$scope.show = "All";
		$scope.currentShow = 0;
	};
         $scope.open = function () {

        var modalInstance = $modal.open({
            controller: 'PopupCont',
            templateUrl: 'add.html',
            scope: $scope,
            resolve: {
                    userForm: function () {
                        return $scope.userForm;
                    }
}
        });

      };
	$scope.addTask = function () {
            if ($scope.newTask != '' && angular.isUndefined($scope.newTask) == false) {
		$scope.model[$scope.currentShow].list.splice(0, 0, {taskName: $scope.newTask, isDone: false });
		
		$scope.newTask = "";
            }
	};

	$scope.deleteTask = function (item) {
		var index = $scope.model[$scope.currentShow].list.indexOf(item);
		$scope.model[$scope.currentShow].list.splice(index, 1);
	};

        $scope.deleteCard = function (item) {//console.log(item);
		var index = $scope.model.indexOf(item);
		$scope.model.splice(index, 1);
	};

	$scope.changeTask = function (i) {
		$scope.currentShow = i;
	};

	/* Function for All | Incomplete | Complete */
	$scope.showFn = function (task) {
		if ($scope.show === "All") {
			return true;
		}else if(task.isDone && $scope.show === "Complete"){
			return true;
		}else if(!task.isDone && $scope.show === "Incomplete"){
			return true;
		}else{
			return false;
		}
	};

	$scope.$watch("model",function (newVal,oldVal) {
		if (newVal !== null && angular.isDefined(newVal) && newVal!==oldVal) {
			localStorageService.add("taskList",angular.toJson(newVal));
		}
	},true);

});

App.controller('PopupCont', function ($scope, $modalInstance, $filter) {
            $scope.close = function () {
                $modalInstance.dismiss('cancel');
            };
           

    $scope.feedbackData= {};
    
    $scope.today = new Date();
            $scope.addNewCard = function () { //console.log($scope.feedbackData.newCard);
        if ($scope.feedbackData.newCard != '' && angular.isUndefined($scope.feedbackData.newCard) == false) {
            $scope.model.push({
                name: $scope.feedbackData.newCard, list: [
						{ taskName: "default task", isDone: false }
						
					]
            })
        };
               
        $modalInstance.dismiss('cancel');
    };
        });