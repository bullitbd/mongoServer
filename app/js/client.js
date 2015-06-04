'use strict';

require('angular/angular');

var entriesApp = angular.module('entriesApp', []);

require('./entries/controllers/entries_controller')(entriesApp);