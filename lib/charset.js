module.exports = function (charset) {
	switch (charset) {
		case 0x01: return "Default";
		case 0x02: return "Symbol";
		case 0xFF: return "OEM";
		case 0x00: return "ANSI";
		case 0xCC: return "Russian";
		case 0xEE: return "EE";
		case 0xA1: return "Greek";
		case 0xA2: return "Turkish";
		case 0xBA: return "Baltic";
		case 0xB1: return "Hebrew";
		case 0xB2: return "Arabic";
		case 0x80: return "Shiftjis";
		case 0x81: return "Hangeul";
		case 0x86: return "GB2313";
		case 0x88: return "Chinese BIG5";
	}
	
	console.log("??? " + (charset == 0x01));
	console.log(0x01);
};