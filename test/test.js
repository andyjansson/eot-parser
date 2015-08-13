var path = require('path');
var fs = require('fs');
var eot = require('../');
var assert = require('assert');
var expected = require('./expected.json');

describe('eot-parser', function () {
	it('can parse .eot fonts', function (done) {
		fs.readFile(path.join(__dirname, 'pathFont.eot'), function (err, contents) {
			if (err) throw err;
			eot(contents).then(function (results) {
				assert.deepEqual(results, expected);
				done();
			}, function () {
				assert.fail("Parsing font failed");
			});
		});
	});
});
