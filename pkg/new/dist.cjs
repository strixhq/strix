var au = Object.create;
var L = Object.defineProperty;
var Cu = Object.getOwnPropertyDescriptor;
var lu = Object.getOwnPropertyNames;
var cu = Object.getPrototypeOf, Eu = Object.prototype.hasOwnProperty;
var z = (e, D) => () => (D || e((D = { exports: {} }).exports, D), D.exports);
var hu = (e, D, t, s) => {
	if (D && typeof D == 'object' || typeof D == 'function') {
		for (let r of lu(D)) {
			!Eu.call(e, r) && r !== t && L(e, r, { get: () => D[r], enumerable: !(s = Cu(D, r)) || s.enumerable });
		}
	}
	return e;
};
var d = (
	e,
	D,
	t,
) => (t = e != null ? au(cu(e)) : {},
	hu(D || !e || !e.__esModule ? L(t, 'default', { value: e, enumerable: !0 }) : t, e));
var _ = z((uD, N) => {
	'use strict';
	var j = '\x1B',
		F = `${j}[`,
		pu = '\x07',
		S = {
			to(e, D) {
				return D ? `${F}${D + 1};${e + 1}H` : `${F}${e + 1}G`;
			},
			move(e, D) {
				let t = '';
				return e < 0 ? t += `${F}${-e}D` : e > 0 && (t += `${F}${e}C`),
					D < 0 ? t += `${F}${-D}A` : D > 0 && (t += `${F}${D}B`),
					t;
			},
			up: (e = 1) => `${F}${e}A`,
			down: (e = 1) => `${F}${e}B`,
			forward: (e = 1) => `${F}${e}C`,
			backward: (e = 1) => `${F}${e}D`,
			nextLine: (e = 1) => `${F}E`.repeat(e),
			prevLine: (e = 1) => `${F}F`.repeat(e),
			left: `${F}G`,
			hide: `${F}?25l`,
			show: `${F}?25h`,
			save: `${j}7`,
			restore: `${j}8`,
		},
		mu = { up: (e = 1) => `${F}S`.repeat(e), down: (e = 1) => `${F}T`.repeat(e) },
		Bu = {
			screen: `${F}2J`,
			up: (e = 1) => `${F}1J`.repeat(e),
			down: (e = 1) => `${F}J`.repeat(e),
			line: `${F}2K`,
			lineEnd: `${F}K`,
			lineStart: `${F}1K`,
			lines(e) {
				let D = '';
				for (let t = 0; t < e; t++) D += this.line + (t < e - 1 ? S.up() : '');
				return e && (D += S.left), D;
			},
		};
	N.exports = { cursor: S, scroll: mu, erase: Bu, beep: pu };
});
var P = z((DD, T) => {
	var K = process.argv || [],
		f = process.env,
		du = !('NO_COLOR' in f || K.includes('--no-color')) &&
			('FORCE_COLOR' in f || K.includes('--color') || process.platform === 'win32' ||
				require != null && require('tty').isatty(1) && f.TERM !== 'dumb' || 'CI' in f),
		gu = (e, D, t = e) => (s) => {
			let r = '' + s, i = r.indexOf(D, e.length);
			return ~i ? e + $u(r, D, t, i) + D : e + r + D;
		},
		$u = (e, D, t, s) => {
			let r = '', i = 0;
			do r += e.substring(i, s) + t, i = s + D.length, s = e.indexOf(D, i); while (~s);
			return r + e.substring(i);
		},
		q = (e = du) => {
			let D = e ? gu : () => String;
			return {
				isColorSupported: e,
				reset: D('\x1B[0m', '\x1B[0m'),
				bold: D('\x1B[1m', '\x1B[22m', '\x1B[22m\x1B[1m'),
				dim: D('\x1B[2m', '\x1B[22m', '\x1B[22m\x1B[2m'),
				italic: D('\x1B[3m', '\x1B[23m'),
				underline: D('\x1B[4m', '\x1B[24m'),
				inverse: D('\x1B[7m', '\x1B[27m'),
				hidden: D('\x1B[8m', '\x1B[28m'),
				strikethrough: D('\x1B[9m', '\x1B[29m'),
				black: D('\x1B[30m', '\x1B[39m'),
				red: D('\x1B[31m', '\x1B[39m'),
				green: D('\x1B[32m', '\x1B[39m'),
				yellow: D('\x1B[33m', '\x1B[39m'),
				blue: D('\x1B[34m', '\x1B[39m'),
				magenta: D('\x1B[35m', '\x1B[39m'),
				cyan: D('\x1B[36m', '\x1B[39m'),
				white: D('\x1B[37m', '\x1B[39m'),
				gray: D('\x1B[90m', '\x1B[39m'),
				bgBlack: D('\x1B[40m', '\x1B[49m'),
				bgRed: D('\x1B[41m', '\x1B[49m'),
				bgGreen: D('\x1B[42m', '\x1B[49m'),
				bgYellow: D('\x1B[43m', '\x1B[49m'),
				bgBlue: D('\x1B[44m', '\x1B[49m'),
				bgMagenta: D('\x1B[45m', '\x1B[49m'),
				bgCyan: D('\x1B[46m', '\x1B[49m'),
				bgWhite: D('\x1B[47m', '\x1B[49m'),
			};
		};
	T.exports = q();
	T.exports.createColors = q;
});
var p = d(_(), 1), k = require('node:process');
var R = d(require('node:readline'), 1), uu = require('node:tty'), w = d(P(), 1);
function vu({ onlyFirst: e = !1 } = {}) {
	let D = [
		'[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
		'(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))',
	].join('|');
	return new RegExp(D, e ? void 0 : 'g');
}
function Du(e) {
	if (typeof e != 'string') throw new TypeError(`Expected a \`string\`, got \`${typeof e}\``);
	return e.replace(vu(), '');
}
function eu(e) {
	return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default') ? e.default : e;
}
var tu = { exports: {} };
(function (e) {
	var D = {};
	e.exports = D,
		D.eastAsianWidth = function (s) {
			var r = s.charCodeAt(0), i = s.length == 2 ? s.charCodeAt(1) : 0, u = r;
			return 55296 <= r && r <= 56319 && 56320 <= i && i <= 57343 &&
				(r &= 1023, i &= 1023, u = r << 10 | i, u += 65536),
				u == 12288 || 65281 <= u && u <= 65376 || 65504 <= u && u <= 65510
					? 'F'
					: u == 8361 || 65377 <= u && u <= 65470 || 65474 <= u && u <= 65479 || 65482 <= u && u <= 65487 ||
							65490 <= u && u <= 65495 || 65498 <= u && u <= 65500 || 65512 <= u && u <= 65518
					? 'H'
					: 4352 <= u && u <= 4447 || 4515 <= u && u <= 4519 || 4602 <= u && u <= 4607 ||
							9001 <= u && u <= 9002 || 11904 <= u && u <= 11929 || 11931 <= u && u <= 12019 ||
							12032 <= u && u <= 12245 || 12272 <= u && u <= 12283 || 12289 <= u && u <= 12350 ||
							12353 <= u && u <= 12438 || 12441 <= u && u <= 12543 || 12549 <= u && u <= 12589 ||
							12593 <= u && u <= 12686 || 12688 <= u && u <= 12730 || 12736 <= u && u <= 12771 ||
							12784 <= u && u <= 12830 || 12832 <= u && u <= 12871 || 12880 <= u && u <= 13054 ||
							13056 <= u && u <= 19903 || 19968 <= u && u <= 42124 || 42128 <= u && u <= 42182 ||
							43360 <= u && u <= 43388 || 44032 <= u && u <= 55203 || 55216 <= u && u <= 55238 ||
							55243 <= u && u <= 55291 || 63744 <= u && u <= 64255 || 65040 <= u && u <= 65049 ||
							65072 <= u && u <= 65106 || 65108 <= u && u <= 65126 || 65128 <= u && u <= 65131 ||
							110592 <= u && u <= 110593 || 127488 <= u && u <= 127490 || 127504 <= u && u <= 127546 ||
							127552 <= u && u <= 127560 || 127568 <= u && u <= 127569 || 131072 <= u && u <= 194367 ||
							177984 <= u && u <= 196605 || 196608 <= u && u <= 262141
					? 'W'
					: 32 <= u && u <= 126 || 162 <= u && u <= 163 || 165 <= u && u <= 166 || u == 172 || u == 175 ||
							10214 <= u && u <= 10221 || 10629 <= u && u <= 10630
					? 'Na'
					: u == 161 || u == 164 || 167 <= u && u <= 168 || u == 170 || 173 <= u && u <= 174 ||
							176 <= u && u <= 180 || 182 <= u && u <= 186 || 188 <= u && u <= 191 || u == 198 ||
							u == 208 || 215 <= u && u <= 216 || 222 <= u && u <= 225 || u == 230 ||
							232 <= u && u <= 234 || 236 <= u && u <= 237 || u == 240 || 242 <= u && u <= 243 ||
							247 <= u && u <= 250 || u == 252 || u == 254 || u == 257 || u == 273 || u == 275 ||
							u == 283 || 294 <= u && u <= 295 || u == 299 || 305 <= u && u <= 307 || u == 312 ||
							319 <= u && u <= 322 || u == 324 || 328 <= u && u <= 331 || u == 333 ||
							338 <= u && u <= 339 || 358 <= u && u <= 359 || u == 363 || u == 462 || u == 464 ||
							u == 466 || u == 468 || u == 470 || u == 472 || u == 474 || u == 476 || u == 593 ||
							u == 609 || u == 708 || u == 711 || 713 <= u && u <= 715 || u == 717 || u == 720 ||
							728 <= u && u <= 731 || u == 733 || u == 735 || 768 <= u && u <= 879 ||
							913 <= u && u <= 929 || 931 <= u && u <= 937 || 945 <= u && u <= 961 ||
							963 <= u && u <= 969 || u == 1025 || 1040 <= u && u <= 1103 || u == 1105 || u == 8208 ||
							8211 <= u && u <= 8214 || 8216 <= u && u <= 8217 || 8220 <= u && u <= 8221 ||
							8224 <= u && u <= 8226 || 8228 <= u && u <= 8231 || u == 8240 || 8242 <= u && u <= 8243 ||
							u == 8245 || u == 8251 || u == 8254 || u == 8308 || u == 8319 || 8321 <= u && u <= 8324 ||
							u == 8364 || u == 8451 || u == 8453 || u == 8457 || u == 8467 || u == 8470 ||
							8481 <= u && u <= 8482 || u == 8486 || u == 8491 || 8531 <= u && u <= 8532 ||
							8539 <= u && u <= 8542 || 8544 <= u && u <= 8555 || 8560 <= u && u <= 8569 || u == 8585 ||
							8592 <= u && u <= 8601 || 8632 <= u && u <= 8633 || u == 8658 || u == 8660 || u == 8679 ||
							u == 8704 || 8706 <= u && u <= 8707 || 8711 <= u && u <= 8712 || u == 8715 || u == 8719 ||
							u == 8721 || u == 8725 || u == 8730 || 8733 <= u && u <= 8736 || u == 8739 || u == 8741 ||
							8743 <= u && u <= 8748 || u == 8750 || 8756 <= u && u <= 8759 || 8764 <= u && u <= 8765 ||
							u == 8776 || u == 8780 || u == 8786 || 8800 <= u && u <= 8801 || 8804 <= u && u <= 8807 ||
							8810 <= u && u <= 8811 || 8814 <= u && u <= 8815 || 8834 <= u && u <= 8835 ||
							8838 <= u && u <= 8839 || u == 8853 || u == 8857 || u == 8869 || u == 8895 || u == 8978 ||
							9312 <= u && u <= 9449 || 9451 <= u && u <= 9547 || 9552 <= u && u <= 9587 ||
							9600 <= u && u <= 9615 || 9618 <= u && u <= 9621 || 9632 <= u && u <= 9633 ||
							9635 <= u && u <= 9641 || 9650 <= u && u <= 9651 || 9654 <= u && u <= 9655 ||
							9660 <= u && u <= 9661 || 9664 <= u && u <= 9665 || 9670 <= u && u <= 9672 || u == 9675 ||
							9678 <= u && u <= 9681 || 9698 <= u && u <= 9701 || u == 9711 || 9733 <= u && u <= 9734 ||
							u == 9737 || 9742 <= u && u <= 9743 || 9748 <= u && u <= 9749 || u == 9756 || u == 9758 ||
							u == 9792 || u == 9794 || 9824 <= u && u <= 9825 || 9827 <= u && u <= 9829 ||
							9831 <= u && u <= 9834 || 9836 <= u && u <= 9837 || u == 9839 || 9886 <= u && u <= 9887 ||
							9918 <= u && u <= 9919 || 9924 <= u && u <= 9933 || 9935 <= u && u <= 9953 || u == 9955 ||
							9960 <= u && u <= 9983 || u == 10045 || u == 10071 || 10102 <= u && u <= 10111 ||
							11093 <= u && u <= 11097 || 12872 <= u && u <= 12879 || 57344 <= u && u <= 63743 ||
							65024 <= u && u <= 65039 || u == 65533 || 127232 <= u && u <= 127242 ||
							127248 <= u && u <= 127277 || 127280 <= u && u <= 127337 || 127344 <= u && u <= 127386 ||
							917760 <= u && u <= 917999 || 983040 <= u && u <= 1048573 || 1048576 <= u && u <= 1114109
					? 'A'
					: 'N';
		},
		D.characterLength = function (s) {
			var r = this.eastAsianWidth(s);
			return r == 'F' || r == 'W' || r == 'A' ? 2 : 1;
		};
	function t(s) {
		return s.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) || [];
	}
	D.length = function (s) {
		for (var r = t(s), i = 0, u = 0; u < r.length; u++) i = i + this.characterLength(r[u]);
		return i;
	},
		D.slice = function (s, r, i) {
			textLen = D.length(s), r = r || 0, i = i || 1, r < 0 && (r = textLen + r), i < 0 && (i = textLen + i);
			for (var u = '', o = 0, E = t(s), l = 0; l < E.length; l++) {
				var B = E[l], c = D.length(B);
				if (o >= r - (c == 2 ? 1 : 0)) {
					if (o + c <= i) u += B;
					else break;
				}
				o += c;
			}
			return u;
		};
})(tu);
var bu = tu.exports,
	Au = eu(bu),
	fu = function () {
		return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|(?:\uD83E\uDDD1\uD83C\uDFFF\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFC-\uDFFF])|\uD83D\uDC68(?:\uD83C\uDFFB(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|[\u2695\u2696\u2708]\uFE0F|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))?|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])\uFE0F|\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC)?|(?:\uD83D\uDC69(?:\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC69(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83E\uDDD1(?:\u200D(?:\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDE36\u200D\uD83C\uDF2B|\uD83C\uDFF3\uFE0F\u200D\u26A7|\uD83D\uDC3B\u200D\u2744|(?:(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\uD83C\uDFF4\u200D\u2620|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])\u200D[\u2640\u2642]|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u2600-\u2604\u260E\u2611\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26B0\u26B1\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0\u26F1\u26F4\u26F7\u26F8\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u3030\u303D\u3297\u3299]|\uD83C[\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]|\uD83D[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3])\uFE0F|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDE35\u200D\uD83D\uDCAB|\uD83D\uDE2E\u200D\uD83D\uDCA8|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83E\uDDD1(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83D\uDC69(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC08\u200D\u2B1B|\u2764\uFE0F\u200D(?:\uD83D\uDD25|\uD83E\uDE79)|\uD83D\uDC41\uFE0F|\uD83C\uDFF3\uFE0F|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|[#\*0-9]\uFE0F\u20E3|\u2764\uFE0F|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF4|(?:[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270C\u270D]|\uD83D[\uDD74\uDD90])(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC08\uDC15\uDC3B\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE2E\uDE35\uDE36\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5]|\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD]|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF]|[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0D\uDD0E\uDD10-\uDD17\uDD1D\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78\uDD7A-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCB\uDDD0\uDDE0-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6]|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED7\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDD77\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
	},
	yu = eu(fu);
function b(e, D = {}) {
	if (typeof e != 'string' || e.length === 0 || (D = { ambiguousIsNarrow: !0, ...D }, e = Du(e), e.length === 0)) {
		return 0;
	}
	e = e.replace(yu(), '  ');
	let t = D.ambiguousIsNarrow ? 1 : 2, s = 0;
	for (let r of e) {
		let i = r.codePointAt(0);
		if (!(i <= 31 || i >= 127 && i <= 159 || i >= 768 && i <= 879)) {
			switch (Au.eastAsianWidth(r)) {
				case 'F':
				case 'W':
					s += 2;
					break;
				case 'A':
					s += t;
					break;
				default:
					s += 1;
			}
		}
	}
	return s;
}
var O = 10,
	Z = (e = 0) => (D) => `\x1B[${D + e}m`,
	Y = (e = 0) => (D) => `\x1B[${38 + e};5;${D}m`,
	J = (e = 0) => (D, t, s) => `\x1B[${38 + e};2;${D};${t};${s}m`,
	n = {
		modifier: {
			reset: [0, 0],
			bold: [1, 22],
			dim: [2, 22],
			italic: [3, 23],
			underline: [4, 24],
			overline: [53, 55],
			inverse: [7, 27],
			hidden: [8, 28],
			strikethrough: [9, 29],
		},
		color: {
			black: [30, 39],
			red: [31, 39],
			green: [32, 39],
			yellow: [33, 39],
			blue: [34, 39],
			magenta: [35, 39],
			cyan: [36, 39],
			white: [37, 39],
			blackBright: [90, 39],
			gray: [90, 39],
			grey: [90, 39],
			redBright: [91, 39],
			greenBright: [92, 39],
			yellowBright: [93, 39],
			blueBright: [94, 39],
			magentaBright: [95, 39],
			cyanBright: [96, 39],
			whiteBright: [97, 39],
		},
		bgColor: {
			bgBlack: [40, 49],
			bgRed: [41, 49],
			bgGreen: [42, 49],
			bgYellow: [43, 49],
			bgBlue: [44, 49],
			bgMagenta: [45, 49],
			bgCyan: [46, 49],
			bgWhite: [47, 49],
			bgBlackBright: [100, 49],
			bgGray: [100, 49],
			bgGrey: [100, 49],
			bgRedBright: [101, 49],
			bgGreenBright: [102, 49],
			bgYellowBright: [103, 49],
			bgBlueBright: [104, 49],
			bgMagentaBright: [105, 49],
			bgCyanBright: [106, 49],
			bgWhiteBright: [107, 49],
		},
	};
Object.keys(n.modifier);
var wu = Object.keys(n.color), xu = Object.keys(n.bgColor);
[...wu, ...xu];
function ku() {
	let e = new Map();
	for (let [D, t] of Object.entries(n)) {
		for (let [s, r] of Object.entries(t)) {
			n[s] = { open: `\x1B[${r[0]}m`, close: `\x1B[${r[1]}m` }, t[s] = n[s], e.set(r[0], r[1]);
		}
		Object.defineProperty(n, D, { value: t, enumerable: !1 });
	}
	return Object.defineProperty(n, 'codes', { value: e, enumerable: !1 }),
		n.color.close = '\x1B[39m',
		n.bgColor.close = '\x1B[49m',
		n.color.ansi = Z(),
		n.color.ansi256 = Y(),
		n.color.ansi16m = J(),
		n.bgColor.ansi = Z(O),
		n.bgColor.ansi256 = Y(O),
		n.bgColor.ansi16m = J(O),
		Object.defineProperties(n, {
			rgbToAnsi256: {
				value: (D, t, s) =>
					D === t && t === s
						? D < 8 ? 16 : D > 248 ? 231 : Math.round((D - 8) / 247 * 24) + 232
						: 16 + 36 * Math.round(D / 255 * 5) + 6 * Math.round(t / 255 * 5) + Math.round(s / 255 * 5),
				enumerable: !1,
			},
			hexToRgb: {
				value: (D) => {
					let t = /[a-f\d]{6}|[a-f\d]{3}/i.exec(D.toString(16));
					if (!t) return [0, 0, 0];
					let [s] = t;
					s.length === 3 && (s = [...s].map((i) => i + i).join(''));
					let r = Number.parseInt(s, 16);
					return [r >> 16 & 255, r >> 8 & 255, r & 255];
				},
				enumerable: !1,
			},
			hexToAnsi256: { value: (D) => n.rgbToAnsi256(...n.hexToRgb(D)), enumerable: !1 },
			ansi256ToAnsi: {
				value: (D) => {
					if (D < 8) return 30 + D;
					if (D < 16) return 90 + (D - 8);
					let t, s, r;
					if (D >= 232) t = ((D - 232) * 10 + 8) / 255, s = t, r = t;
					else {
						D -= 16;
						let o = D % 36;
						t = Math.floor(D / 36) / 5, s = Math.floor(o / 6) / 5, r = o % 6 / 5;
					}
					let i = Math.max(t, s, r) * 2;
					if (i === 0) return 30;
					let u = 30 + (Math.round(r) << 2 | Math.round(s) << 1 | Math.round(t));
					return i === 2 && (u += 60), u;
				},
				enumerable: !1,
			},
			rgbToAnsi: { value: (D, t, s) => n.ansi256ToAnsi(n.rgbToAnsi256(D, t, s)), enumerable: !1 },
			hexToAnsi: { value: (D) => n.ansi256ToAnsi(n.hexToAnsi256(D)), enumerable: !1 },
		}),
		n;
}
var Mu = ku(),
	M = new Set(['\x1B', '\x9B']),
	ju = 39,
	I = '\x07',
	su = '[',
	Su = ']',
	ru = 'm',
	G = `${Su}8;;`,
	U = (e) => `${M.values().next().value}${su}${e}${ru}`,
	H = (e) => `${M.values().next().value}${G}${e}${I}`,
	_u = (e) => e.split(' ').map((D) => b(D)),
	W = (e, D, t) => {
		let s = [...D], r = !1, i = !1, u = b(Du(e[e.length - 1]));
		for (let [o, E] of s.entries()) {
			let l = b(E);
			if (
				u + l <= t ? e[e.length - 1] += E : (e.push(E), u = 0),
					M.has(E) && (r = !0, i = s.slice(o + 1).join('').startsWith(G)),
					r
			) {
				i ? E === I && (r = !1, i = !1) : E === ru && (r = !1);
				continue;
			}
			u += l, u === t && o < s.length - 1 && (e.push(''), u = 0);
		}
		!u && e[e.length - 1].length > 0 && e.length > 1 && (e[e.length - 2] += e.pop());
	},
	Tu = (e) => {
		let D = e.split(' '), t = D.length;
		for (; t > 0 && !(b(D[t - 1]) > 0);) t--;
		return t === D.length ? e : D.slice(0, t).join(' ') + D.slice(t).join('');
	},
	Pu = (e, D, t = {}) => {
		if (t.trim !== !1 && e.trim() === '') return '';
		let s = '', r, i, u = _u(e), o = [''];
		for (let [l, B] of e.split(' ').entries()) {
			t.trim !== !1 && (o[o.length - 1] = o[o.length - 1].trimStart());
			let c = b(o[o.length - 1]);
			if (
				l !== 0 &&
				(c >= D && (t.wordWrap === !1 || t.trim === !1) && (o.push(''), c = 0),
					(c > 0 || t.trim === !1) && (o[o.length - 1] += ' ', c++)), t.hard && u[l] > D
			) {
				let $ = D - c, A = 1 + Math.floor((u[l] - $ - 1) / D);
				Math.floor((u[l] - 1) / D) < A && o.push(''), W(o, B, D);
				continue;
			}
			if (c + u[l] > D && c > 0 && u[l] > 0) {
				if (t.wordWrap === !1 && c < D) {
					W(o, B, D);
					continue;
				}
				o.push('');
			}
			if (c + u[l] > D && t.wordWrap === !1) {
				W(o, B, D);
				continue;
			}
			o[o.length - 1] += B;
		}
		t.trim !== !1 && (o = o.map((l) => Tu(l)));
		let E = [...o.join(`
`)];
		for (let [l, B] of E.entries()) {
			if (s += B, M.has(B)) {
				let { groups: $ } =
					new RegExp(`(?:\\${su}(?<code>\\d+)m|\\${G}(?<uri>.*)${I})`).exec(E.slice(l).join('')) ||
					{ groups: {} };
				if ($.code !== void 0) {
					let A = Number.parseFloat($.code);
					r = A === ju ? void 0 : A;
				} else $.uri !== void 0 && (i = $.uri.length === 0 ? void 0 : $.uri);
			}
			let c = Mu.codes.get(Number(r));
			E[l + 1] === `
`
				? (i && (s += H('')), r && c && (s += U(c)))
				: B === `
` && (r && c && (s += U(r)), i && (s += H(i)));
		}
		return s;
	};
function Q(e, D, t) {
	return String(e).normalize().replace(
		/\r\n/g,
		`
`,
	).split(`
`).map((s) => Pu(s, D, t)).join(`
`);
}
var Ou = Object.defineProperty,
	Wu = (e, D, t) => D in e ? Ou(e, D, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[D] = t,
	h = (e, D, t) => (Wu(e, typeof D != 'symbol' ? D + '' : D, t), t);
function Ru(e, D) {
	if (e === D) return;
	let t = e.split(`
`),
		s = D.split(`
`),
		r = [];
	for (let i = 0; i < Math.max(t.length, s.length); i++) t[i] !== s[i] && r.push(i);
	return r;
}
var Vu = Symbol('clack:cancel');
function y(e, D) {
	e.isTTY && e.setRawMode(D);
}
var X = new Map([['k', 'up'], ['j', 'down'], ['h', 'left'], ['l', 'right']]),
	Iu = new Set(['up', 'down', 'left', 'right', 'space', 'enter']),
	V = class {
		constructor({ render: D, input: t = k.stdin, output: s = k.stdout, ...r }, i = !0) {
			h(this, 'input'),
				h(this, 'output'),
				h(this, 'rl'),
				h(this, 'opts'),
				h(this, '_track', !1),
				h(this, '_render'),
				h(this, '_cursor', 0),
				h(this, 'state', 'initial'),
				h(this, 'value'),
				h(this, 'error', ''),
				h(this, 'subscribers', new Map()),
				h(this, '_prevFrame', ''),
				this.opts = r,
				this.onKeypress = this.onKeypress.bind(this),
				this.close = this.close.bind(this),
				this.render = this.render.bind(this),
				this._render = D.bind(this),
				this._track = i,
				this.input = t,
				this.output = s;
		}
		prompt() {
			let D = new uu.WriteStream(0);
			return D._write = (t, s, r) => {
				this._track &&
				(this.value = this.rl.line.replace(/\t/g, ''),
					this._cursor = this.rl.cursor,
					this.emit('value', this.value)), r();
			},
				this.input.pipe(D),
				this.rl = R.default.createInterface({
					input: this.input,
					output: D,
					tabSize: 2,
					prompt: '',
					escapeCodeTimeout: 50,
				}),
				R.default.emitKeypressEvents(this.input, this.rl),
				this.rl.prompt(),
				this.opts.initialValue !== void 0 && this._track && this.rl.write(this.opts.initialValue),
				this.input.on('keypress', this.onKeypress),
				y(this.input, !0),
				this.output.on('resize', this.render),
				this.render(),
				new Promise((t, s) => {
					this.once('submit', () => {
						this.output.write(p.cursor.show),
							this.output.off('resize', this.render),
							y(this.input, !1),
							t(this.value);
					}),
						this.once('cancel', () => {
							this.output.write(p.cursor.show),
								this.output.off('resize', this.render),
								y(this.input, !1),
								t(Vu);
						});
				});
		}
		on(D, t) {
			let s = this.subscribers.get(D) ?? [];
			s.push({ cb: t }), this.subscribers.set(D, s);
		}
		once(D, t) {
			let s = this.subscribers.get(D) ?? [];
			s.push({ cb: t, once: !0 }), this.subscribers.set(D, s);
		}
		emit(D, ...t) {
			let s = this.subscribers.get(D) ?? [], r = [];
			for (let i of s) i.cb(...t), i.once && r.push(() => s.splice(s.indexOf(i), 1));
			for (let i of r) i();
		}
		unsubscribe() {
			this.subscribers.clear();
		}
		onKeypress(D, t) {
			if (
				this.state === 'error' && (this.state = 'active'),
					t?.name && !this._track && X.has(t.name) && this.emit('cursor', X.get(t.name)),
					t?.name && Iu.has(t.name) && this.emit('cursor', t.name),
					D && (D.toLowerCase() === 'y' || D.toLowerCase() === 'n') &&
					this.emit('confirm', D.toLowerCase() === 'y'),
					D === '	' && this.opts.placeholder &&
					(this.value || (this.rl.write(this.opts.placeholder), this.emit('value', this.opts.placeholder))),
					D && this.emit('key', D.toLowerCase()),
					t?.name === 'return'
			) {
				if (this.opts.validate) {
					let s = this.opts.validate(this.value);
					s && (this.error = s, this.state = 'error', this.rl.write(this.value));
				}
				this.state !== 'error' && (this.state = 'submit');
			}
			D === '' && (this.state = 'cancel'),
				(this.state === 'submit' || this.state === 'cancel') && this.emit('finalize'),
				this.render(),
				(this.state === 'submit' || this.state === 'cancel') && this.close();
		}
		close() {
			this.input.unpipe(),
				this.input.removeListener('keypress', this.onKeypress),
				this.output.write(`
`),
				y(this.input, !1),
				this.rl.close(),
				this.emit(`${this.state}`, this.value),
				this.unsubscribe();
		}
		restoreCursor() {
			let D = Q(this._prevFrame, process.stdout.columns, { hard: !0 }).split(`
`).length - 1;
			this.output.write(p.cursor.move(-999, D * -1));
		}
		render() {
			let D = Q(this._render(this) ?? '', process.stdout.columns, { hard: !0 });
			if (D !== this._prevFrame) {
				if (this.state === 'initial') this.output.write(p.cursor.hide);
				else {
					let t = Ru(this._prevFrame, D);
					if (this.restoreCursor(), t && t?.length === 1) {
						let s = t[0];
						this.output.write(p.cursor.move(0, s)), this.output.write(p.erase.lines(1));
						let r = D.split(`
`);
						this.output.write(r[s]),
							this._prevFrame = D,
							this.output.write(p.cursor.move(0, r.length - s - 1));
						return;
					} else if (t && t?.length > 1) {
						let s = t[0];
						this.output.write(p.cursor.move(0, s)), this.output.write(p.erase.down());
						let r = D.split(`
`).slice(s);
						this.output.write(r.join(`
`)), this._prevFrame = D;
						return;
					}
					this.output.write(p.erase.down());
				}
				this.output.write(D), this.state === 'initial' && (this.state = 'active'), this._prevFrame = D;
			}
		}
	};
var Gu = Object.defineProperty,
	Lu = (e, D, t) => D in e ? Gu(e, D, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[D] = t,
	zu = (e, D, t) => (Lu(e, typeof D != 'symbol' ? D + '' : D, t), t),
	x = class extends V {
		constructor(D) {
			super(D),
				zu(this, 'valueWithCursor', ''),
				this.on('finalize', () => {
					this.value || (this.value = D.defaultValue), this.valueWithCursor = this.value;
				}),
				this.on('value', () => {
					if (this.cursor >= this.value.length) {
						this.valueWithCursor = `${this.value}${w.default.inverse(w.default.hidden('_'))}`;
					} else {
						let t = this.value.slice(0, this.cursor), s = this.value.slice(this.cursor);
						this.valueWithCursor = `${t}${w.default.inverse(s[0])}${s.slice(1)}`;
					}
				});
		}
		get cursor() {
			return this._cursor;
		}
	},
	eD = globalThis.process.platform.startsWith('win');
var m = d(require('node:process'), 1), a = d(P(), 1), ou = d(_(), 1);
function Ku() {
	return m.default.platform !== 'win32'
		? m.default.env.TERM !== 'linux'
		: !!m.default.env.CI || !!m.default.env.WT_SESSION || !!m.default.env.TERMINUS_SUBLIME ||
			m.default.env.ConEmuTask === '{cmd::Cmder}' || m.default.env.TERM_PROGRAM === 'Terminus-Sublime' ||
			m.default.env.TERM_PROGRAM === 'vscode' || m.default.env.TERM === 'xterm-256color' ||
			m.default.env.TERM === 'alacritty' || m.default.env.TERMINAL_EMULATOR === 'JetBrains-JediTerm';
}
var qu = Ku(),
	C = (e, D) => qu ? e : D,
	Zu = C('\u25C6', '*'),
	Yu = C('\u25A0', 'x'),
	Ju = C('\u25B2', 'x'),
	Uu = C('\u25C7', 'o'),
	lD = C('\u250C', 'T'),
	v = C('\u2502', '|'),
	iu = C('\u2514', '\u2014'),
	cD = C('\u25CF', '>'),
	ED = C('\u25CB', ' '),
	hD = C('\u25FB', '[\u2022]'),
	pD = C('\u25FC', '[+]'),
	mD = C('\u25FB', '[ ]'),
	BD = C('\u25AA', '\u2022'),
	dD = C('\u2500', '-'),
	gD = C('\u256E', '+'),
	$D = C('\u251C', '+'),
	vD = C('\u256F', '+'),
	bD = C('\u25CF', '\u2022'),
	AD = C('\u25C6', '*'),
	fD = C('\u25B2', '!'),
	yD = C('\u25A0', 'x'),
	Hu = (e) => {
		switch (e) {
			case 'initial':
			case 'active':
				return a.default.cyan(Zu);
			case 'cancel':
				return a.default.red(Yu);
			case 'error':
				return a.default.yellow(Ju);
			case 'submit':
				return a.default.green(Uu);
		}
	},
	nu = (e) =>
		new x({
			validate: e.validate,
			placeholder: e.placeholder,
			defaultValue: e.defaultValue,
			initialValue: e.initialValue,
			render() {
				let D = `${a.default.gray(v)}
${Hu(this.state)}  ${e.message}
`,
					t = e.placeholder
						? a.default.inverse(e.placeholder[0]) + a.default.dim(e.placeholder.slice(1))
						: a.default.inverse(a.default.hidden('_')),
					s = this.value ? this.valueWithCursor : t;
				switch (this.state) {
					case 'error':
						return `${D.trim()}
${a.default.yellow(v)}  ${s}
${a.default.yellow(iu)}  ${a.default.yellow(this.error)}
`;
					case 'submit':
						return `${D}${a.default.gray(v)}  ${a.default.dim(this.value || e.placeholder)}`;
					case 'cancel':
						return `${D}${a.default.gray(v)}  ${a.default.strikethrough(a.default.dim(this.value ?? ''))}${
							this.value?.trim()
								? `
` + a.default.gray(v)
								: ''
						}`;
					default:
						return `${D}${a.default.cyan(v)}  ${s}
${a.default.cyan(iu)}
`;
				}
			},
		}).prompt();
var g = d(require('node:fs'), 1), Fu = d(require('node:process'), 1);
console.log(`
\u{1F989} \x1B[01mWelcome to Strix!\x1B[0m \u{1F989}`);
(async () => {
	let e = await nu({
			message: '\u{1F989}\u{1F4AC} PROJECT NAME:',
			placeholder: 'my-strix-project',
			validate(t) {
				if (g.existsSync(`./${t}`)) return `The directory named ${t} already exists`;
			},
		}),
		D = Fu.cwd();
	g.mkdirSync(`${D}/${e}`),
		g.cpSync('./temp/js', `${D}/${e}`, { recursive: !0 }),
		g.writeFileSync(
			`${D}/${e}/package.json`,
			`{
		"name": "${e}",
		"version": "0.0.1",
		"scripts": {
			"start": "npx jsr add @strix/std@latest @strix/client@latest && npx vite"
		}
	}`,
		),
		console.log(`
\u{1F989} \x1B[01mDone. now, enter these following commands: \x1B[0m \u{1F989}
  \u256D${'\u2500'.repeat(e.length + 13)}\u256E
  \u2502 > cd ${e + ' '.repeat(7)}\u2502
  \u2502 > npm start${' '.repeat(1 + e.length)}\u2502
  \u2570${'\u2500'.repeat(e.length + 13)}\u256F`);
})();
