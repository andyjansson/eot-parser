# EOT Parser

[EOT Parser] reads and returns metadata from [Embedded OpenType] (EOT) fonts.

## Usage

```js
var parser = require('eot-parser'); // parser reads raw data or a string path

var raw_buffer = fs.readFileSync('OpenSans-400-Regular.eot');

parser(raw_buffer).then(function (result) {
	console.log(result);
});
```

```js
var parser = require('eot-parser'); // parser reads raw data or a string path

parser('OpenSans-400-Regular.eot').then(function (result) {
	console.log(result);
});
```

```js
{
	...
	"italic": false,
	"weight": 400,
	"familyName": "SourceSansPro-Regular",
	"styleName": "Regular",
	"versionName": "Version 1.050;PS 1.000;hotconv 1.0.70;makeotf.lib2.5.5900",
	"fullName": "SourceSansPro-Regular",
	...
}
```

[EOT Parser]: https://github.com/andyjansson/eot-parser
[Embedded OpenType]: http://www.w3.org/Submission/EOT/
