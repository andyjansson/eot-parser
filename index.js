var fs = require('fs');
var Promise = require('pinkie-promise');
var panose = require('./lib/panose.js');
var charset = require('./lib/charset.js');
var weight = require('./lib/weight.js');
var type = require('./lib/type.js');
var unicodeRange1 = require('./lib/unicoderange/unicoderange1.js');
var unicodeRange2 = require('./lib/unicoderange/unicoderange2.js');
var unicodeRange3 = require('./lib/unicoderange/unicoderange3.js');
var unicodeRange4 = require('./lib/unicoderange/unicoderange4.js');
var codePageRange1 = require('./lib/codepagerange/codepagerange1.js');
var codePageRange2 = require('./lib/codepagerange/codepagerange2.js');

module.exports = function (data) {
	return new Promise(function (resolve, reject) {
		var magicNumber = data.readUInt16LE(34);
		var version = data.readUInt32LE(8);
		
		if (
			magicNumber !== 0x504C ||
			!(
				version === 0x00010000 ||
				version === 0x00020001 ||
				version === 0x00020002
			)
		) {
			return reject();
		}
	
		var eot = {
			eotSize: data.readUInt32LE(0),
			fontDataSize: data.readUInt32LE(4),
			version: version,
			panose: panose(data.slice(16, 26)),
			charset: charset(data[26]),
			italic: data[27] == 0x01,
			weight: weight(data.readUInt32LE(28)),
			type: type(data.readUInt16LE(32)),
			unicodeRange1: unicodeRange1(data.readUInt32LE(36)),
			unicodeRange2: unicodeRange2(data.readUInt32LE(40)),
			unicodeRange3: unicodeRange3(data.readUInt32LE(44)),
			unicodeRange4: unicodeRange4(data.readUInt32LE(48)),
			codePageRange1: codePageRange1(data.readUInt32LE(52)),
			codePageRange2: codePageRange2(data.readUInt32LE(56)),
		};
		
		var familyNameSize = data.readUInt16LE(82);
		var offset = familyNameSize;
		eot["familyName"] = data.slice(84, 84 + offset).toString('utf16le');
		
		var styleNameSize = data.readUInt16LE(86 + offset);
		eot["styleName"] = data.slice(88 + offset, 88 + offset + styleNameSize).toString('utf16le');
		
		offset += styleNameSize;
		var versionNameSize = data.readUInt16LE(90 + offset); 
		eot["versionName"] = data.slice(92 + offset, 92 + offset + versionNameSize).toString('utf16le');
		
		offset += versionNameSize;
		var fullNameSize = data.readUInt16LE(94 + offset); 
		eot["fullName"] = data.slice(96 + offset, 96 + offset + fullNameSize).toString('utf16le');
		offset += fullNameSize;			
		
		if (version !== 0x00010000) {
			var rootStringSize = data.readUInt16LE(98 + offset);
			var rootString = data.slice(100 + offset, 100 + offset + rootStringSize).toString('utf16le');
			offset += rootStringSize;

			eot["rootString"] = rootString;
			
			if (version !== 0x00020001) {
				var rootStringCheckSum = data.readUInt32LE(100 + offset);
				var eudcCodePage = data.readUInt32LE(104 + offset);
				var signatureSize = data.readUInt16LE(110 + offset); 
				var signature = data.slice(112 + offset, 112 + offset + signatureSize).toString('utf16le');
				offset += signatureSize;
				var eudcFlags = data.readUInt32LE(112 + offset);
				var eudcFontSize = data.readUInt32LE(116 + offset);
				var eudcFontData = data.slice(120 + offset, 120 + offset + eudcFontSize);
				
				eot["eudcCodePage"] = eudcCodePage;
				eot["signature"] = signature;
				eot["eudcFlags"] = eudcFlags;
				eot["eudcFontData"] = eudcFontData;
			}
		}
		//eot["fontData"] = data.slice(data.length - eot.fontDataSize, data.length);
		
		resolve(eot);
	});
};