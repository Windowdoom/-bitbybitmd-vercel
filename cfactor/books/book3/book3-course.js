/* Book 3 - Organic Chemistry (Carbon's Architecture) · course content + renderer.
   Ported from the BBB Book Organic_Chemistry PDF (371pg).
   Section-level progress, sticky right-rail TOC, resume, inline quick-checks. */

/* ---------- MODULE GROUPING (left sidebar) ---------- */

/* Course roadmap (was Ch 0 / Orientation). Surfaced on the overview page. */
var BOOK3_ROADMAP = { sections: [] };

var MODULES=[
 {name:'Foundations',      chs:[1,2,3,4], ca:'var(--teal)',  desc:'Structure, nomenclature, stereochemistry, conformations.'},
 {name:'Reactivity',       chs:[5,6],     ca:'var(--blue)',  desc:'Substitution, elimination, and addition reactions.'},
 {name:'Spectroscopy',     chs:[7],       ca:'var(--purple)',desc:'IR, NMR, mass spectrometry, UV-Vis.'},
 {name:'Carbonyl Chem',    chs:[8,9,10,11],ca:'var(--red)',  desc:'Alcohols, aldehydes, carboxylic acids, enolates.'},
 {name:'Nitrogen & Bio',   chs:[12,13],   ca:'var(--gold)',  desc:'Amines, and the biomolecules of Book 1.'}
];

/* ---------- BOOK 3 COURSE DATA ---------- */
/* Chapter shape:
   { n, title, subtitle, tag, foundational, objectives:[..],
     buildsOn:'..', setsUp:'..',
     opener:'..',           // 1-2 paragraphs framing
     pinnedDisc:{t,x},      // chapter-wide discriminator banner
     sections:[
       { id:'1.1', num:'1.1', title:'..',
         blocks:[ {t:'p',x}, {t:'box',kind:'disc'|'bridge'|'hy',label,title?,x|items}, {t:'vbox',head,html}, ... ],
         quickcheck:[{stem,choices:[..],answer:0,why:'..'}, ...] (optional)
       }
     ],
     bottomLine:'..',
     nextHint:'..'
   }
*/

window.BOOK3_COURSE=[
null
/* CHAPTERS 1-13 INTEGRATE HERE */
];

/* ====================================================================
   RENDERER · format upgrades over the CARS course:
     • section-level progress (each section can be checked off)
     • sticky right-rail "In this chapter" TOC with scroll-spy
     • resume-where-you-left-off
     • dependency hints (builds on / sets up)
     • discriminator banner pinned at top
     • inline quick-check blocks (1-2 Qs per section, instant feedback)
     • search filter in sidebar
   ==================================================================== */

var DONE_KEY='book3_done_v1';   /* section-level: {"0.1":true, "1.4":true, ...} */
var LAST_KEY='book3_last_v1';   /* {ch:N, sec:"x.y"} */

function getDone(){try{return JSON.parse(localStorage.getItem(DONE_KEY))||{};}catch(e){return {};}}
function setDone(d){try{localStorage.setItem(DONE_KEY,JSON.stringify(d));}catch(e){}}
function getLast(){try{return JSON.parse(localStorage.getItem(LAST_KEY))||null;}catch(e){return null;}}
function setLast(o){try{localStorage.setItem(LAST_KEY,JSON.stringify(o));}catch(e){}}
function esc(s){return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function chapLabel(n){return 'Ch '+n;}

function totalSections(){var c=window.BOOK3_COURSE,n=0;for(var i=1;i<c.length;i++)n+=c[i].sections.length;return n;}
function doneSections(){var d=getDone(),n=0;for(var k in d)if(d[k])n++;return n;}
function chSectionStatus(ch){
 var d=getDone(),done=0,total=ch.sections.length;
 for(var i=0;i<ch.sections.length;i++)if(d[ch.sections[i].id])done++;
 return {done:done,total:total,all:done===total&&total>0,any:done>0};
}

function buildNav(){
 var C=window.BOOK3_COURSE, html='', curMod=null;
 MODULES.forEach(function(mo){
  html+='<div class="mod"><div class="mod-h">'+esc(mo.name)+'</div>';
  mo.chs.forEach(function(n){
   var c=C[n]; if(!c)return;
   var st=chSectionStatus(c);
   var cls=st.all?'done':(st.any?'partial':'');
   var hint=esc(c.title.length>40?c.title.slice(0,38)+'…':c.title);
   html+='<div class="cnav-item '+cls+'" id="nav-'+n+'" onclick="toggleChNav('+n+',event)">'+
         '<span class="cn">'+chapLabel(n)+'</span>'+
         '<span>'+hint+'</span>'+
         '<span class="cnav-chev">▸</span>'+
         '</div>';
   html+='<div class="subnav" id="subnav-'+n+'">';
   c.sections.forEach(function(s){
    var sdone=getDone()[s.id]?' done':'';
    html+='<div class="subnav-item'+sdone+'" id="sub-'+s.id.replace('.','-')+'" onclick="event.stopPropagation();gotoSection('+n+',\''+s.id+'\')">'+
          '<span class="sn">§'+esc(s.num)+'</span>'+
          '<span>'+esc(s.title.length>34?s.title.slice(0,32)+'…':s.title)+'</span>'+
          '<span class="stk">✓</span></div>';
   });
   html+='</div>';
  });
  html+='</div>';
 });
 document.getElementById('cnav').innerHTML=html;
 updateProg();
}
function toggleChNav(n,e){
 if(e)e.stopPropagation();
 var sub=document.getElementById('subnav-'+n), item=document.getElementById('nav-'+n);
 if(!sub)return;
 var open=sub.classList.toggle('open');
 item.classList.toggle('open',open);
 if(open) location.hash='ch'+n;
}
function gotoSection(n,id){
 location.hash='ch'+n+'-'+id.replace('.','-');
}
function updateProg(){
 var n=doneSections(), tot=totalSections();
 var pct=tot?Math.round(n/tot*100):0;
 var ring=document.getElementById('ring');
 ring.style.setProperty('--p',pct);
 document.getElementById('ringTxt').textContent=pct+'%';
 document.getElementById('progTxt').textContent=n+' / '+tot+' sections';
}
function filterNav(q){
 q=(q||'').toLowerCase().trim();
 var nav=document.getElementById('cnav'), items=nav.querySelectorAll('.cnav-item'), subs=nav.querySelectorAll('.subnav-item');
 if(!q){items.forEach(function(i){i.style.display='';});subs.forEach(function(s){s.style.display='';});
  nav.querySelectorAll('.subnav').forEach(function(s){s.classList.remove('open');});
  nav.querySelectorAll('.cnav-item').forEach(function(i){i.classList.remove('open');});
  return;}
 var C=window.BOOK3_COURSE;
 C.forEach(function(c){
  var chMatch=c.title.toLowerCase().indexOf(q)>=0;
  var anySec=false;
  c.sections.forEach(function(s){
   var sMatch=s.title.toLowerCase().indexOf(q)>=0||s.num.indexOf(q)>=0;
   if(sMatch)anySec=true;
   var el=document.getElementById('sub-'+s.id.replace('.','-'));
   if(el)el.style.display=(chMatch||sMatch)?'':'none';
  });
  var navi=document.getElementById('nav-'+c.n);
  var sub=document.getElementById('subnav-'+c.n);
  var visible=chMatch||anySec;
  if(navi)navi.style.display=visible?'':'none';
  if(sub){sub.classList.toggle('open',visible&&(anySec||chMatch));}
  if(navi)navi.classList.toggle('open',visible&&(anySec||chMatch));
 });
}

/* ---------- BLOCK RENDERERS ---------- */
function renderBlock(b){
 if(b.t==='p')   return '<p>'+esc(b.x).replace(/\n\n/g,'</p><p>')+'</p>';
 if(b.t==='ul')  return '<ul>'+(b.items||[]).map(function(i){return '<li>'+esc(i)+'</li>';}).join('')+'</ul>';
 if(b.t==='formula') return '<div class="formula">'+esc(b.x)+(b.note?'<span class="fnote">'+esc(b.note)+'</span>':'')+'</div>';
 if(b.t==='vbox') return '<div class="vbox"><div class="vhead">'+esc(b.head||'')+'</div>'+(b.html||'')+'</div>';
 if(b.t==='scaffold') return '<div class="scaffold"><div class="scl">▸ COURSE SCAFFOLD · IN PROGRESS</div><p>'+esc(b.x)+'</p></div>';
 if(b.t==='box'){
  var k=b.kind==='disc'?'box-disc':(b.kind==='bridge'?'box-why':'box-hy');
  var body=b.items?'<ul style="margin:0;padding:0;list-style:none">'+b.items.map(function(i){return '<li style="font-size:13.5px;color:var(--text-muted);line-height:1.65;padding-left:1.2rem;position:relative;margin-bottom:6px"><span style="position:absolute;left:0;color:var(--green)">▸</span>'+esc(i)+'</li>';}).join('')+'</ul>':'<p>'+esc(b.x||'')+'</p>';
  var title=b.title?'<div class="box-title">'+esc(b.title)+'</div>':'';
  return '<div class="box '+k+'"><div class="box-label">'+esc(b.label||'')+'</div>'+title+body+'</div>';
 }
 return '';
}
function renderQuickcheck(qs,scope){
 if(!qs||!qs.length)return '';
 window._qcStash=window._qcStash||{};
 return qs.map(function(q,qi){
  var id=scope+'-qc-'+qi;
  window._qcStash[id]={ans:q.answer,why:q.why};
  return '<div class="qcheck" id="'+id+'">'+
   '<div class="qcheck-lab">▸ QUICK CHECK · §'+esc(scope)+'</div>'+
   '<div class="qc-stem">'+esc(q.stem)+'</div>'+
   '<div class="qc-choices">'+
   q.choices.map(function(c,ci){
    return '<label class="qc-choice" id="'+id+'-c'+ci+'"><input type="radio" name="'+id+'" value="'+ci+'"><span class="qc-letter">'+String.fromCharCode(65+ci)+'</span><span class="qc-text">'+esc(c)+'</span></label>';
   }).join('')+
   '</div>'+
   '<button class="btn-check" onclick="checkQC(\''+id+'\')">CHECK ANSWER</button>'+
   '<div class="qc-exp" id="'+id+'-exp"></div>'+
   '</div>';
 }).join('');
}
window.checkQC=function(id){
 var meta=(window._qcStash||{})[id]; if(!meta)return;
 var ans=meta.ans, why=meta.why;
 var picked=-1;
 document.querySelectorAll('input[name="'+id+'"]').forEach(function(r){if(r.checked)picked=parseInt(r.value);});
 if(picked<0){alert('Pick an answer first.');return;}
 var n=document.querySelectorAll('input[name="'+id+'"]').length;
 for(var i=0;i<n;i++){
  var el=document.getElementById(id+'-c'+i);
  el.classList.remove('is-correct','is-wrong');
  if(i===ans)el.classList.add('is-correct');
  else if(i===picked)el.classList.add('is-wrong');
 }
 var exp=document.getElementById(id+'-exp');
 exp.innerHTML='<b>'+(picked===ans?'✓ Correct.':'✗ Not quite.')+'</b> '+esc(why);
 exp.classList.add('show');
};

/* ---------- RENDER: OVERVIEW ---------- */
function renderHome(){
 setActive('nav-home');
 var C=window.BOOK3_COURSE, done=getDone(), last=getLast();
 var nSec=totalSections(), dSec=doneSections();
 document.getElementById('cmob-title').textContent='Book 3 · Organic Chemistry - Course Overview';
 document.getElementById('crail').innerHTML='';

 var resume='';
 if(last){
  var lc=C[last.ch];
  var ls=lc&&lc.sections.find(function(s){return s.id===last.sec;});
  if(lc&&ls){
   resume='<div class="ov-resume"><span class="rs-lab">▸ RESUME</span>'+
     '<span class="rs-where">'+chapLabel(last.ch)+' · §'+esc(last.sec)+' '+esc(ls.title)+' <span>· '+esc(lc.title)+'</span></span>'+
     '<a href="#ch'+last.ch+'-'+last.sec.replace('.','-')+'">CONTINUE →</a></div>';
  }
 }

 var h='';
 h+='<div class="ov-hero">';
 h+='<span class="badge badge-free">★ FREE · NO LOGIN · INTERACTIVE</span>';
 h+='<h1 class="ph-title">Carbon\'s Architecture<br><em>MCAT Organic Chemistry</em>, mechanism-first.</h1>';
 h+='<p class="ph-sub">Book 3 of the C-Factor Series. Every orgo mechanism derived from electron-pushing fundamentals, from hybridization to biomolecules, taught mechanism-first. Section-level progress saves automatically. The PDF version is $40 (founders price; was $65) if you want the artifact. The content here is free, forever.</p>';
 var firstUndone=null;
 for(var i=1;i<C.length;i++){var anyUndone=C[i].sections.find(function(s){return !done[s.id];});if(anyUndone){firstUndone={ch:i,sec:anyUndone.id};break;}}
 if(!firstUndone)firstUndone={ch:1,sec:'1.1'};
 h+='<div class="btn-row">';
 h+='<a class="btn-p" href="#ch'+firstUndone.ch+'-'+firstUndone.sec.replace('.','-')+'">'+(dSec?'CONTINUE · '+chapLabel(firstUndone.ch):'START THE COURSE →')+'</a>';
 h+='<a class="btn-o" href="#ch0">★ READ CH 0 · ORIENTATION</a>';
 h+='</div>';
 h+=resume;
 h+='<div class="hero-pricing">FREE COURSE · PDF OPTIONAL · <s>$65</s> <b>$40 FOUNDERS</b> · ANKI DECK <b>$5</b></div>';
 h+='</div>';

 
 // ROADMAP: posture, why carbon, hierarchy, method (was Orientation chapter)
 h+='<div style="margin:2rem 0 2.4rem;border:1px solid var(--border);border-radius:14px;overflow:hidden;background:var(--bg-card);">';
 h+='<div style="padding:1.4rem 1.6rem;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap;">';
 h+='<div><div style="font-family:var(--mono);font-size:10px;color:var(--gold);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:4px;">Read this first</div><h2 style="font-family:var(--mono);font-size:22px;color:var(--text);margin:0;">Course Roadmap</h2></div>';
 h+='<div style="font-family:var(--mono);font-size:11px;color:var(--text-dim);">Curved arrows, carbon\'s geometry, the learning moves</div>';
 h+='</div>';
 if(window.BOOK3_ROADMAP&&window.BOOK3_ROADMAP.sections){
  window.BOOK3_ROADMAP.sections.forEach(function(s,si){
   var open=si===0?' open':'';
   h+='<details'+open+' style="border-top:1px solid var(--border);padding:0;">';
   h+='<summary style="cursor:pointer;list-style:none;padding:1rem 1.6rem;font-family:var(--mono);font-size:14px;color:var(--text);display:flex;justify-content:space-between;align-items:center;">';
   h+='<span><span style="color:var(--teal);margin-right:8px;">'+esc(s.num)+'</span>'+esc(s.title)+'</span>';
   h+='<span style="font-size:14px;color:var(--text-dim);">+</span></summary>';
   h+='<div style="padding:0 1.6rem 1.4rem;border-top:1px solid var(--border);"><div class="prose">';
   s.blocks.forEach(function(b){h+=renderBlock(b);});
   h+='</div></div></details>';
  });
 }
 h+='</div>';

 h+='<div class="ov-stats">'+
    '<div class="ov-stat"><b>13</b><span>chapters</span></div>'+
    '<div class="ov-stat"><b>'+nSec+'</b><span>sections</span></div>'+
    '<div class="ov-stat"><b>371</b><span>pg source</span></div>'+
    '<div class="ov-stat"><b>'+dSec+'/'+nSec+'</b><span>your progress</span></div></div>';

 h+='<h2 style="font-family:var(--mono);font-size:20px;margin:2.4rem 0 .4rem;color:var(--text)">The five modules</h2>';
 h+='<div class="modcards">';
 MODULES.forEach(function(mo){
  var sd=0,st=0;
  mo.chs.forEach(function(n){var ch=C[n];if(ch){var s=chSectionStatus(ch);sd+=s.done;st+=s.total;}});
  h+='<div class="modcard" style="--ca:'+mo.ca+'" onclick="location.hash=\'ch'+mo.chs[0]+'\'">'+
     '<div class="mc-n">'+mo.chs.map(chapLabel).join(' · ')+'</div>'+
     '<h4>'+esc(mo.name)+'</h4><p>'+esc(mo.desc)+'</p>'+
     '<div class="mc-n" style="margin-top:10px;color:'+(sd===st&&st?'var(--green)':'var(--text-dim)')+'">'+sd+' / '+st+' sections</div></div>';
 });
 h+='</div>';

 h+='<div style="background:linear-gradient(135deg,rgba(0,229,160,.06),transparent);border:1px solid var(--border);border-radius:var(--r);padding:1.6rem 1.8rem;margin:2.4rem 0 1.4rem;display:flex;gap:1.6rem;align-items:center;flex-wrap:wrap">'+
   '<div style="flex:1;min-width:240px"><h3 style="font-family:var(--mono);font-size:17px;color:var(--text);margin-bottom:6px">★ Free, on-site, no gate</h3>'+
   '<p style="font-size:13.5px;color:var(--text-muted);line-height:1.7">All MCAT content here is free. If you want the PDF artifact (a portable, offline-readable book), the optional PDF set (all 6 books) is $40 founders price (was $65) on Payhip. The Anki deck is $5 separately.</p></div>'+
   '<div style="display:flex;flex-direction:column;gap:8px"><a class="btn-o" href="https://payhip.com/b/dAnUk" target="_blank" rel="noopener">PDF SET · $40 ↗</a>'+
   '<a class="btn-o" href="/cfactor/#anki">ANKI DECK · $5</a></div></div>';
 setMain(h);
}

/* ---------- RENDER: CHAPTER ---------- */
function render(n,secId){
 var C=window.BOOK3_COURSE, c=C[n];
 if(!c){renderHome();return;}
 var done=getDone();
 setActive('nav-'+n);
 var sub=document.getElementById('subnav-'+n), navi=document.getElementById('nav-'+n);
 if(sub){sub.classList.add('open'); if(navi)navi.classList.add('open');}
 document.getElementById('cmob-title').textContent=chapLabel(n)+' · '+c.title;

 var part=''; MODULES.forEach(function(mo){if(mo.chs.indexOf(n)>=0)part=mo.name;});
 var st=chSectionStatus(c);

 var h='';
 h+='<div class="crumb"><a href="#home">Book 3 · Organic Chemistry</a> <span>/</span> '+esc(part)+(c.isScaffold?' <span style="color:var(--purple)">/ scaffold</span>':'')+'</div>';
 h+='<div class="cmeta">'+
    '<span>'+('Chapter '+n+' of 13')+'</span>'+
    '<span class="dot">•</span><span>'+st.done+'/'+st.total+' sections done</span>'+
    (c.foundational?'<span class="dot">•</span><span style="color:var(--gold)">'+esc(c.foundational)+'</span>':'')+
    '</div>';
 h+='<h1 class="ph-title">'+esc(c.title)+'</h1>';
 if(c.subtitle) h+='<p class="ph-sub" style="margin-bottom:1rem">'+esc(c.subtitle)+'</p>';

 if(c.buildsOn||c.setsUp){
  h+='<div class="conn">';
  if(c.buildsOn) h+='<div class="conn-c from"><b>↩ BUILDS ON</b><span>'+esc(c.buildsOn)+'</span></div>';
  if(c.setsUp)   h+='<div class="conn-c to"><b>↪ SETS UP</b><span>'+esc(c.setsUp)+'</span></div>';
  h+='</div>';
 }

 if(c.objectives&&c.objectives.length){
  h+='<div class="obj-box"><div class="box-label">◎ WHAT YOU\'LL BE ABLE TO DO</div><ul>'+c.objectives.map(function(o){return '<li>'+esc(o)+'</li>';}).join('')+'</ul></div>';
 }

 if(c.pinnedDisc){
  h+='<div class="disc-banner"><div class="db-lab">⚡ THE CHAPTER\'S CORE DISCRIMINATOR</div><div class="db-t">'+esc(c.pinnedDisc.t)+'</div><p>'+esc(c.pinnedDisc.x)+'</p></div>';
 }

 if(c.opener){
  h+='<div class="prose"><p>'+esc(c.opener).replace(/\n\n/g,'</p><p>')+'</p></div>';
 }

 // sections
 h+='<div class="prose">';
 c.sections.forEach(function(s){
  var sdone=done[s.id]?' done':'';
  var anchor='sec-'+s.id.replace('.','-');
  h+='<div class="sec-h" id="'+anchor+'">'+
     '<h2><span class="pn">§'+esc(s.num)+'</span> '+esc(s.title)+'</h2>'+
     '<button class="sec-check'+(done[s.id]?' done':'')+'" title="Mark section complete" onclick="toggleSec(\''+s.id+'\','+n+')">'+(done[s.id]?'✓':'')+'</button>'+
     '</div>';
  s.blocks.forEach(function(b){h+=renderBlock(b);});
  if(s.quickcheck&&s.quickcheck.length) h+=renderQuickcheck(s.quickcheck,s.id);
 });
 h+='</div>';

 if(c.bottomLine){
  h+='<div class="box box-hy" style="margin-top:2.4rem"><div class="box-label">★ THE BOTTOM LINE</div><p>'+esc(c.bottomLine)+'</p></div>';
 }
 if(c.nextHint){
  h+='<div class="box" style="border-left-color:var(--blue);background:linear-gradient(135deg,rgba(77,159,255,.06),transparent);"><div class="box-label" style="color:var(--blue)">↪ NEXT CHAPTER</div><p>'+esc(c.nextHint)+'</p></div>';
 }

 var prev=n>1?'<a class="btn-o" href="#ch'+(n-1)+'">‹ '+chapLabel(n-1)+'</a>':'<a class="btn-o" href="#home">‹ Overview</a>';
 var next=n<C.length-1?'<a class="btn-o" href="#ch'+(n+1)+'">'+chapLabel(n+1)+' ›</a>':'<a class="btn-gold" href="/cfactor/books/book4/">Next: Book 4 (Physics) →</a>';
 h+='<div class="cnav-foot">'+prev+'<span style="font-family:var(--mono);font-size:11px;color:var(--text-dim)">'+st.done+'/'+st.total+' sections complete</span>'+next+'</div>';

 setMain(h);
 buildRail(c);
 setLast({ch:n,sec:c.sections[0]?c.sections[0].id:'1.1'});
 if(secId){var el=document.getElementById('sec-'+secId.replace('.','-'));if(el)setTimeout(function(){el.scrollIntoView({behavior:'smooth',block:'start'});},20);}
}

function buildRail(c){
 var rail=document.getElementById('crail'); if(!rail)return;
 var done=getDone();
 var h='<div class="crail-h">▸ In this chapter</div>';
 c.sections.forEach(function(s){
  var d=done[s.id]?' done':'';
  h+='<div class="crail-item'+d+'" id="rail-'+s.id.replace('.','-')+'" onclick="jumpSec(\''+s.id+'\')">'+
    '<span class="crn">§'+esc(s.num)+'</span><span>'+esc(s.title)+'</span><span class="crk">✓</span></div>';
 });
 rail.innerHTML=h;
 setTimeout(setupScrollSpy,80);
}
window.jumpSec=function(id){
 var el=document.getElementById('sec-'+id.replace('.','-'));
 if(el){el.scrollIntoView({behavior:'smooth',block:'start'});}
 var ls=getLast()||{};ls.sec=id;setLast(ls);
};
var _spyObs=null;
function setupScrollSpy(){
 if(_spyObs)_spyObs.disconnect();
 var rail=document.getElementById('crail'); if(!rail)return;
 var secs=document.querySelectorAll('.sec-h');
 _spyObs=new IntersectionObserver(function(entries){
  entries.forEach(function(en){
   if(en.isIntersecting){
    var id=en.target.id.replace('sec-','');
    rail.querySelectorAll('.crail-item').forEach(function(el){el.classList.remove('active');});
    var act=document.getElementById('rail-'+id);
    if(act)act.classList.add('active');
    var ls=getLast()||{};ls.sec=id.replace('-','.');setLast(ls);
   }
  });
 },{rootMargin:'-25% 0px -65% 0px'});
 secs.forEach(function(s){_spyObs.observe(s);});
}
window.toggleSec=function(id,n){
 var d=getDone(); d[id]=!d[id]; if(!d[id])delete d[id]; setDone(d);
 // update mark button + nav + rail
 var sh=document.querySelector('.sec-h[id="sec-'+id.replace('.','-')+'"]');
 if(sh){
  var btn=sh.querySelector('.sec-check');
  if(btn){var on=!!d[id]; btn.classList.toggle('done',on); btn.textContent=on?'✓':'';}
 }
 var sub=document.getElementById('sub-'+id.replace('.','-'));
 if(sub)sub.classList.toggle('done',!!d[id]);
 var rl=document.getElementById('rail-'+id.replace('.','-'));
 if(rl)rl.classList.toggle('done',!!d[id]);
 // update chapter-level partial/done state
 var C=window.BOOK3_COURSE, c=C[n], st=chSectionStatus(c);
 var item=document.getElementById('nav-'+n);
 if(item){item.classList.remove('done','partial'); if(st.all)item.classList.add('done');else if(st.any)item.classList.add('partial');}
 updateProg();
};

function setActive(id){document.querySelectorAll('.cnav-item').forEach(function(e){e.classList.remove('active');});var el=document.getElementById(id);if(el)el.classList.add('active');}
function setMain(html){var m=document.getElementById('cmain');m.innerHTML='<div class="cinner">'+html+'</div>';window.scrollTo(0,0);document.getElementById('cside').classList.remove('open');updateReadbar();}
function updateReadbar(){var d=document.documentElement,max=d.scrollHeight-d.clientHeight;document.getElementById('readbar').style.width=(max>0?(d.scrollTop/max*100):0)+'%';}
window.addEventListener('scroll',updateReadbar,{passive:true});
document.addEventListener('keydown',function(e){
 if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA')return;
 var m=(location.hash||'').match(/ch(\d+)/);if(!m)return;var n=parseInt(m[1]);
 if(e.key==='ArrowRight'&&n<window.BOOK3_COURSE.length-1)location.hash='ch'+(n+1);
 if(e.key==='ArrowLeft'){if(n>1)location.hash='ch'+(n-1);else location.hash='home';}
});
function route(){
 if(!window.BOOK3_COURSE)return;
 var hs=location.hash||'';
 if(hs.indexOf('home')>=0||hs===''||hs==='#'){renderHome();return;}
 var m=hs.match(/ch(\d+)(?:-(\d+)-(\d+))?/);
 if(!m){renderHome();return;}
 var n=parseInt(m[1]); var secId=m[2]&&m[3]?(m[2]+'.'+m[3]):null;
 if(n<1||n>window.BOOK3_COURSE.length)n=1;
 render(n,secId);
}
function init(){if(!window.BOOK3_COURSE){setTimeout(init,40);return;}buildNav();route();}
window.addEventListener('hashchange',route);
document.addEventListener('DOMContentLoaded',init);
init();
