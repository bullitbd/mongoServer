'use strict';

module.exports = function(app) {
	app.controller('entriesController', ['$scope', '$http', function($scope, $http){
		var	current = {};
		$scope.errors = [];
		$scope.entries = [];

		$scope.getAll = function() {
			$http.get('/api/entries')
				.success(function(data) {
					$scope.entries = data;
				})
				.error(function(data) {
					console.log(data);
					$scope.errors.push({msg: 'error receiving Entries'});
				});
		};

		$scope.createNewEntry = function() {
			$http.post('/api/entries', $scope.newEntry) 
				.success(function(data) {
					$scope.entries.push(data);
					$scope.newEntry = null;
				})
				.error(function(data) {
					console.log(data);
					$scope.errors.push({msg: 'error creating entry'});
				});
		};

		$scope.editEntry = function(entry) {
			entry.editing = false;
			$http.put('/api/entries/' + entry._id, entry)
				.error(function(data) {
					console.log(data);
					$scope.errors.push({msg: 'couldn\'t update note: ' + entry.title});
				});
		};

		$scope.removeEntry = function(entry) {
			$scope.entries.splice($scope.entries.indexOf(entry), 1);
			$http.delete('/api/entries/' + entry._id) 
				.error(function(data) {
					console.log(data);
					$scope.errors.push({msg: 'could not remove note: ' + entry.title});
				});
		};

		$scope.clearErrors = function() {
			$scope.errors = [];
			$scope.getAll();
		};

		$scope.editingEntry = function(entry) {
			angular.copy(entry, current);
			entry.editing = true;
			console.log(current);
		};

		$scope.resetEntry = function(entry) {
			angular.copy(current, entry);
			entry.editing = false;
		};

		
	}]);
};