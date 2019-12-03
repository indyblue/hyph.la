var Hypher = require('./hypher.js'),
	patEnUS = require('./en-us.js'),
	patEnGB = require('./en-gb.js');

var patLA = {
	'id': ['la'],
	'leftmin': 1,
	'rightmin': 2,
	'patterns': {}
};

function addpat() {
	for (var i = 0; i < arguments.length; i++) {
		var pat = arguments[i];
		if (!pat) continue;
		var len = pat.length;
		if (typeof patLA.patterns[len] == 'undefined') patLA.patterns[len] = '';
		patLA.patterns[len] += pat;
	}
}

var fs = require('fs');
var path = require('path');
var output = 'module.exports = ' + JSON.stringify(patLA, null, 3) + ';';
var dpath = path.join(__dirname, 'hyph.la.liturgical.txt');
// var dpath = path.join(__dirname, 'hyph.la.modern.txt');
var dtxt = fs.readFileSync(dpath, 'utf-8');
dtxt = dtxt.replace(/\./g, '_');
var darr = dtxt.split(/[\r\n]+/g);
for (let d of darr) addpat(d);

/*
Barabbam
Barachia
Barachiae
Barachisii
Barachisius
Barachía
Barachísii
Barachísius
Barachíæ
Barat
Barensi
Barii
Baroni
Barontii
Barula
Barábbam
Barénsi
Baróni
Baróntii
*/
addpat('_ba8r9abb');
addpat('_ba8r9ach');
// console.log(JSON.stringify(patLA, null, 2).substr(0,300));

var hyphUS = new Hypher(patEnUS);
var hyphGB = new Hypher(patEnGB);
var hyphLA = new Hypher(patLA);

var hyph = function(str, lang) {
	if (typeof lang != 'string') lang = 'LA';
	else lang = lang.toUpperCase();

	var hyph = hyphLA;
	if (lang == 'US') hyph = hyphUS;
	if (lang == 'GB') hyph = hyphGB;
	if (lang == 'EN') hyph = hyphGB;

	var hc = '-';
	hc = String.fromCharCode(173);
	str = hyph.hyphenateText(str, hc, 3);
	return str;
};


module.exports = hyph;

if (!module.parent) {
	var output = 'module.exports = ' + JSON.stringify(patLA, null, 2) + ';';
	var fname = path.join(__dirname, 'la.js');
	console.log('writing', fname);
	fs.writeFileSync(fname, output);

	var outjq = [
		'(function() {',
		'var module = { exports: null };',
		output,
		"var h = new window['Hypher'](module.exports);",
		"if (typeof module.exports.id === 'string') {",
		'   module.exports.id = [module.exports.id];',
		'}',
		'for (var i = 0; i < module.exports.id.length; i += 1) {',
		"   window['Hypher']['languages'][module.exports.id[i]] = h;",
		'} }());'
	].join('\n');
	fname = path.join(__dirname, 'jquery_hypher', 'la.js');
	fs.writeFileSync(fname, output);

	//*
	var txt = 'amœ́na cǽsari judǽos judǽi judǽis judǽus sǽcula';
	txt = 'adoro coagulátum exstíngue frigus fíguli fúlgura gubernáre insúrgunt jugum largus linguam linguis lingua pinguédine regum sanguínibus singuláriter sánguinem ánguli árguit comedamus noster surréximus redémptio redemptio custodíri transíbunt Barabbas Barachiae';
	var htxt = hyph(txt)
	console.log(htxt);
}
// */

/* commands to get all words from brevrom and whitaker

g/\v^(\[|!|\&|#|\$)/d
g/=/d
%s/{[^}]\+}\|_//eig | %s/\~//eig | %s/[;0-9]\+$//eig | %s/[0-9]\+//eig
%s/[ ():;.,?"']\+/\r/g

find . -iname '*.txt' > latin.vi
find . -iname '*.txt' | sed -e 's/\(.*\)/iconv -t UTF-8 "\1"/e' > latin.vi
*/

