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

// vowel consonant pairs
for(var i of vowel){
for(var j of cons){
	addpat(i+'1'+j);
}}

// special cases, or vowel vowel pairs
for(var i of vowel){
	addpat('ti8'+i);
	addpat('t'+i1+'8'+i);
	addpat('q8u8'+i);
	addpat('ngu8'+i);
	for(var j of vowel) addpat(i+'1'+j);
}

// au dipthong
addpat('a2u', 'a2'+u1, a1+'2u', a1+'2'+u1);

// multi consonant pairs
for(var i of cons){
	addpat('8'+i+'_');
	for(var j of cons){
		addpat('2'+i+'1'+j);
		addpat('_'+i+'8'+j+'8');
		addpat('8'+i+'8'+j+'_');
		/* // this third full loop makes file much too large - goes from 10kb to 120kb
		for(var k of cons){
			//addpat('_'+i+'8'+j+'8'+k+'8');
			//addpat('8'+i+'8'+j+'8'+k+'_');
		} */
	}
}

// 3+ cons groups, beginning/end of word. 
// get all groups from brevrom website and from whitaker's listall
// probably a lot of these will never occur at the beginning/end of word, but what the heck.
// %s/[bcdfghjklmnpqrstvwxz]\{3,}/\r====\0====\r/eig | execute 'g!/^====/d' | %s/=//eig

var i = 'bbr bfl bfr bll bmv bpl bpr bsc bscr bsq bst bstr btr cbnd ccb cch ccl ccr cdt cfl chd chf chl chm chn chr chs chth cst cth ctr cts dbl dbr dcl dcr ddl ddr dfl dfr dgl dgn dgr dmn dnd dnt dpl dpr dsc dscb dscr dsp dst dstr dtr dvm ffb ffl ffr fth gdn gdt ggl ggr ght gnb grdv grr gtr hchr hpl jdt kgs khl kth lcb lch lchr lcr lct lctr ldk ldr lfg lfl lfr lgs lhg llb llh lls lms lph lpr lps lpt lss lst ltb lth ltr lvb mbb mbd mbl mbr mbs mchr mcl mct mfl mfr mgl mgr mmm mnns mph mphr mpl mpn mpr mps mpt mptr msc mscr msp mst mstr mth mtr mtv nbl ncb nch nchr ncl nclm ncr nct nctm nctr nctv ndb ndd ndr ndz nfl nfr nft ngd ngh ngl ngnl ngr ngs ngth nkn nktr nnb nnd nphr npl npr nsb nsc nscb nsch nscr nsd nsf nsfr nsgr nsj nsk nsl nsm nsn nsp nspl nsq nsrh nss nssc nsscr nssp nst nstr nstrln nsv ntb ntc ntf nth nthr ntl ntm ntq ntr ntrb ntrp nts ntv pcrc pdst phc phl phlm phn phph phr phsl pht phth ppb pph ppl ppr ppst psc psq pst pstr ptb pth ptr rbb rbl rbs rcb rch rchm rcl rcr rcs rct rdb rddd rdp rdph rds rfl rfr rgb rgdnd rgl rgr rks rmb rmdn rmn rnm rns rnt rnw rph rpl rpr rps rpt rrb rrh rsb rsc rscr rsm rsp rsq rss rst rstr rtb rth rthm rthr rtn rtr rts rtt rvb rzh sbr scb sch schr scl scm scr sct sdr sgr spc sph sphr spl spn spqr spr srr ssb ssj ssm ssp sss sst sstr stb stf stg sth sthm sthr stj stk stl stm stn stp stq str strm stsc stscr stt tfr thb thf thl thm thn thph thr ths tpr trb tst ttb tth ttr vnc xcb xcl xcr xgl xpl xpr xsc xscr xsf xsp xspl xst xstr xtdll xth xtr'.split(' ');
addpat.apply(null, i.map((x)=> '_' + x.replace(/(.)/g, '$18')));
addpat.apply(null, i.map((x)=> x.replace(/(.)/g, '8$1')+'_'));

// consonant special cases
for(var i of 'bcdgpt'.split('')){
for(var j of 'hlr'.split('')){
	addpat('3'+i+'4'+j);
}}

// special cases
addpat.apply(null,('_su5pe6r5 _co6n5 _que6m5 5e6x5 _pe6r5'+a1+'mb _pe6r5amb'
	+ ' _d'+e1+'5s6 _de5s6 _lon6g5'+a1+'6n _lon6g5a6n _a6b5u6nd').split(' '));

// multi consonant overrides
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

var fs = require('fs');
var path = require('path');
var output = 'module.exports = ' + JSON.stringify(patLA, null, 3) + ';';
var fname = path.join(__dirname, 'la.js');
fs.writeFile(fname, output);

/*
var txt = 'amœ́na cǽsari judǽos judǽi judǽis judǽus sǽcula';
txt = 'coagulátum exstíngue frigus fíguli fúlgura gubernáre insúrgunt jugum largus linguam linguis lingua pinguédine regum sanguínibus singuláriter sánguinem ánguli árguit';
var htxt = hyph(txt)
console.log(htxt);
// */

/* commands to get all words from brevrom and whitaker

g/\v^(\[|!|\&|#|\$)/d
g/=/d
%s/{[^}]\+}\|_//eig | %s/\~//eig | %s/[;0-9]\+$//eig | %s/[0-9]\+//eig
%s/[ ():;.,?"']\+/\r/g

find . -iname '*.txt' > latin.vi
find . -iname '*.txt' | sed -e 's/\(.*\)/iconv -t UTF-8 "\1"/e' > latin.vi
*/

