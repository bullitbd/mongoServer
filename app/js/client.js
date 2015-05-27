'use strict';

var tell = require('./tell');
document.write(tell());
var entryList = document.getElementById('entryList');

var request = require('superagent');

request
	.get('./api/entries')
	.end(function(err, res) {
		if (err) {
			return console.log(err);
		}
		var entries = JSON.parse(res.text);

		entries.forEach(function(entry) {
			var entryEl = document.createElement('li');
			entryEl.innerHTML = entry.ideaBody;
			entryList.appendChild(entryEl);
		});
	});