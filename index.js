var Hypher = require('./hypher.js'),
    patEnUS = require('./en-us.js'),
    patEnGB = require('./en-gb.js');

var patLA = {
	'id': ['la'],
	'leftmin': 1,
	'rightmin': 2,
	'patterns': { }
};

function addpat(){
	for(var i=0;i<arguments.length;i++){
		var pat = arguments[i];
		var len = pat.length;
		if(typeof patLA.patterns[len]=='undefined') patLA.patterns[len]='';
		patLA.patterns[len] += pat;
	}
}

var a1='\u00e1', e1='\u00e9', i1='\u00ed', o1='\u00f3', u1='\u00fa', y1='\u00fd', 
	e2='\u00eb', ae='\u00e6', ae1='\u01fd', oe='\u0153', oe1='\u0153\u0301';

var vowel = 'aeiouy'.split('').concat([a1,e1,i1,o1,u1,y1,e2,ae,oe,ae1,oe1]),
	cons = 'bcdfghjklmnpqrstvwxz'.split('');

var all = [];
for(var i of vowel){
for(var j of cons){
	addpat(i+'1'+j);
}}
for(var i of vowel){
for(var j of vowel){
	addpat(i+'1'+j);
}}
for(var i of vowel){
	addpat('ti8'+i);
	addpat('t'+i1+'8'+i);
	addpat('q8u8'+i);
	addpat('ngu8'+i);
}
addpat('a2u', 'a2'+u1, a1+'2u', a1+'2'+u1);

for(var i of cons){
for(var j of cons){
	addpat('2'+i+'1'+j);
}}

for(var i of cons){
for(var j of cons){
	addpat('_'+i+'8'+j+'8');
	addpat('8'+i+'8'+j+'_');
}}

for(var i of cons){
for(var j of cons){
for(var k of cons){
	addpat('_'+i+'8'+j+'8'+k+'8');
	addpat('8'+i+'8'+j+'8'+k+'_');
}}}
for(var i of 'bcdgpt'.split('')){
for(var j of 'hlr'.split('')){
	addpat('3'+i+'4'+j);
}}

addpat.apply(all, ('_su5pe6r5 _co6n5 _que6m5 5e6x5 _pe6r5'+a1+'mb _pe6r5amb'
	+ ' _d'+e1+'5s6 _de5s6 _lon6g5'+a1+'6n _lon6g5a6n _a6b5u6nd').split(' '));

addpat('b5f6l', 'b5f6r', 'b5p6r', 'b5s6c', 'b6s5q', 'b5s6t', 'b5t6r',
	'c5c6b', 'c5c6h', 'c5c6l', 'c5c6r', 'c5f6l', 'c6h5l', 'c6h5m', 'c6h5n',
	'c5s6t', 'c5t6h', 'c5t6r', 'd5b6l', 'd5b6r', 'd5c6l', 'd5c6r', 'd5f6l',
	'd5f6r', 'd5g6l', 'd5g6n', 'd5g6r', 'd5p6l', 'd5p6r', 'd5s6c', 'd5s6p',
	'd5s6t', 'd5t6r', 'f5f6b', 'f5f6l', 'f5f6r', 'g5g6l', 'g5g6r', 'p6h5p6h',
	'p6h5s6l', 'p6h5t6h', 'k5t6h', 'l6c5b', 'l5c6h', 'l5c6r', 'l6c5t', 'l5f6l',
	'l6g5s', 'l5l6b', 'l5l6s', 'l5p6h', 'l5p6r', 'l6p5s', 'l6p5t', 'l5s6t',
	'l5t6h', 'l5t6r', 'm6b5b', 'm5b6l', 'm5b6r', 'm5c6l', 'm5f6l', 'm5f6r',
	'm5g6l', 'm5g6r', 'm5p6h', 'm5p6l', 'm5p6n', 'm5p6r', 'm6p5s', 'm6p5t',
	'm5s6c', 'm5s6p', 'm5s6t', 'm5t6r', 'n6c5b', 'n5c6h', 'n5c6l', 'n5c6r',
	'n5c6t', 'n5d6r', 'n5f6l', 'n5f6r', 'n5g6l', 'n5g6r', 'n5n6b', 'n5n6s',
	'n5p6l', 'n5p6r', 'n5s6c', 'n6s5d', 'n6s5f', 'n6s5j', 'n6s5l', 'n6s5m',
	'n6s5n', 'n5s6p', 'n6s5q', 'n5s6t', 'n6s5v', 'n6t5c', 'n5t6h', 'n5t6l',
	'n5t6r', 'n6t5v', 'p6h5n', 'p6h5r', 'p5s6t', 'p6t5b', 'p5t6h', 'r5b6l',
	'r6d5b', 'r5f6l', 'r5f6r', 'r6g5b', 'r5g6r', 'r6m5b', 'r6n5t', 'r5p6h',
	'r5p6l', 'r5p6r', 'r5r6h', 'r6s5b', 'r5s6c', 'r5s6p', 'r5s6t', 's5c6h',
	's5p6h', 't6h5r', 'x5s6p');

var hyphUS = new Hypher(patEnUS);
var hyphGB = new Hypher(patEnGB);
var hyphLA = new Hypher(patLA);

var hyph = function(str, lang) {
	if(typeof lang!='string') lang='LA';
	else lang = lang.toUpperCase();
	
	var hyph = hyphLA;
	if(lang=='US') hyph = hyphUS;
	if(lang=='GB') hyph = hyphGB;
	if(lang=='EN') hyph = hyphGB;

	str = hyph.hyphenateText(str,'-',3);
	return str;
};


module.exports = hyph;

/*
var txt = 'amœ́na cǽsari judǽos judǽi judǽis judǽus sǽcula';
txt = 'coagulátum exstíngue frigus fíguli fúlgura gubernáre insúrgunt jugum largus linguam linguis lingua pinguédine regum sanguínibus singuláriter sánguinem ánguli árguit';
var htxt = hyph(txt)
console.log(htxt);
// */
// %s/[ ():;.,?]\+/\r/g

