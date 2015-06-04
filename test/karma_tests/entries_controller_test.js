'use strict'; 

require('../../app/js/client');
require('angular-mocks');

describe('entries controller', function() {
	var $ControllerConstructor;
	var $httpBackend;
	var $scope;

	beforeEach(angular.mock.module('entriesApp'));

	beforeEach(angular.mock.inject(function ($rootScope, $controller) {
		$scope = $rootScope.$new();
		$ControllerConstructor = $controller;
	}));

	it('should be able to create a controller', function () {
		var entriesController  = $ControllerConstructor('entriesController', {$scope: $scope});
		expect(typeof entriesController).toBe('object');
		expect(Array.isArray($scope.entries)).toBe(true);
		expect(Array.isArray($scope.errors)).toBe(true);
		expect(typeof $scope.getAll).toBe('function');
	});

		
	describe('REST functionality', function() {
		beforeEach(angular.mock.inject(function(_$httpBackend_) {
			$httpBackend = _$httpBackend_;
			this.entriesController = $ControllerConstructor('entriesController', {$scope: $scope});
		}));

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		it('should make a request on index', function() {
			$httpBackend.expectGET('/api/entries').respond(200, [{_id: 1, title: 'test entry'}]);
			$scope.getAll();
			$httpBackend.flush();
			expect($scope.entries[0].title).toBe('test entry');
			expect($scope.entries[0]._id).toBe(1);
		});

		it('should handle errors properly', function() {
			$httpBackend.expectGET('/api/entries').respond(500, {msg: 'internal server error'});
			$scope.getAll();
			$httpBackend.flush();
			expect($scope.errors.length).toBe(1);
			expect($scope.errors[0].msg).toBe('error retrieving entries');
		});

		it('should be able to save a new entry', function() {
			$scope.newEntry = {title: 'foo'};
			$httpBackend.expectPOST('/api/entries').respond(200, {id: '2', title: 'test entry'});
			$scope.createNewEntry();
			$httpBackend.flush();
			expect($scope.entries[0].title).toBe('test entry');
			expect($scope.entries[0].id).toBe('2');
			expect($scope.newEntry).toBe(null);
		});

		it('should be able to edit an entry', function() {
			var entry = {_id: '3', title: 'test entry 2'};
			entry.editing = false;
			$httpBackend.expectPUT('/api/entries/3').respond(200, {id: 3});
			$scope.editEntry(entry);
			$httpBackend.flush();
			
			expect($scope.errors.length).toBe(0);
		});

		it('should be able to delete an entry', function() {
			var entry = {_id: '4', title: 'test entry'};
			$scope.entries.push(entry);
			$httpBackend.expectDELETE('/api/entries/4').respond(200, {msg: 'success!'});
			
			expect($scope.entries.indexOf(entry)).not.toBe(-1);
			$scope.removeEntry(entry);
			expect($scope.entries.indexOf(entry)).toBe(-1);
			$httpBackend.flush();
			expect($scope.errors.length).toBe(0);
		});

		it('should delete a entry even on server error', function() {
			var entry = {_id: '4', title: 'test entry'};
			$scope.entries.push(entry);
			$httpBackend.expectDELETE('/api/entries/4').respond(500, {msg: '...deleted anyway'});
			
			expect($scope.entries.indexOf(entry)).not.toBe(-1);
			$scope.removeEntry(entry);
			expect($scope.entries.indexOf(entry)).toBe(-1);
			$httpBackend.flush();
			expect($scope.errors.length).toBe(1);
			expect($scope.errors[0].msg).toBe('could not remove entry: test entry');
		});

	});
});
