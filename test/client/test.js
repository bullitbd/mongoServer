'use strict';

var expect = require('chai').expect;
var tell = require('../../app/js/tell');

describe('tell module', function() {
	it('should explain what this app does', function() {
		expect(tell()).to.eql('this is a simple express server with mongodb.');
	});
});