# eot-parser [![Build Status][ci-img]][ci]

EOT font parser

[ci-img]:  https://travis-ci.org/andyjansson/eot-parser.svg
[ci]:      https://travis-ci.org/andyjansson/eot-parser

## Installation

```js
npm install eot-parser
```

## Usage 

```js
var fs = require('fs');
var parser = require('eot-parser');

fs.readFile('font.eot', function (err, contents) {
	if (err) throw err;
	parser(contents).then(function (result) {
		console.log(result);
	});
});
```

Outputs:

```json
{
	...
	"familyName": "SourceSansPro-Regular",
	"styleName": "Regular",
	"versionName": "Version 1.050;PS 1.000;hotconv 1.0.70;makeotf.lib2.5.5900",
	"fullName": "SourceSansPro-Regular",
	...
}
```