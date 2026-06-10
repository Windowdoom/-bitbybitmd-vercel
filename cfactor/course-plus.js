/* ===========================================================
   C-Factor · course-plus.js
   Shared behaviour upgrade layer for all C-Factor courses.
   Everything is feature-detected, so the same file works on
   book1-6, CARS and the Final Review without page-specific code.
   Features:
     • per-book accent (data-book attr → course-plus.css)
     • reader toolbar: focus mode, A−/A+, light theme, print
     • "~N min left" reading chip
     • sticky discriminator chip when the banner scrolls away
     • chapter-completion celebration (confetti + toast)
     • quick-check accuracy tracking (sidebar stat)
     • cross-book progress meta for the hub dashboard
   =========================================================== */
(function(){
'use strict';

/* ---------- identify the book from the URL ---------- */
var p=location.pathname, m=p.match(/books\/(book\d)/);
var BOOK=m?m[1]:(p.indexOf('/cars/')>=0?'cars':(p.indexOf('/final-review/')>=0?'book7':null));
if(!BOOK)return;
document.body.setAttribute('data-book',BOOK);

var META={
 book1:{label:'Biology',      href:'/cfactor/books/book1/', ac:'#34D399'},
 book2:{label:'Gen Chem',     href:'/cfactor/books/book2/', ac:'#4D9FFF'},
 book3:{label:'Organic',      href:'/cfactor/books/book3/', ac:'#A855F7'},
 book4:{label:'Physics',      href:'/cfactor/books/book4/', ac:'#F5A623'},
 book5:{label:'Biochem',      href:'/cfactor/books/book5/', ac:'#FF6B6B'},
 book6:{label:'Psych/Soc',    href:'/cfactor/books/book6/', ac:'#FF7AC6'},
 book7:{label:'Final Review', href:'/cfactor/final-review/',ac:'#FFD166'},
 cars:{label:'CARS',          href:'/cfactor/cars/',        ac:'#00E5A0'}
};

function ls(k){try{return JSON.parse(localStorage.getItem(k));}catch(e){return null;}}
function lset(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}

/* ---------- saved reader preferences ---------- */
var prefs=ls('cfp_prefs')||{scale:1,focus:false,light:false};
function applyPrefs(){
 document.body.style.setProperty('--rs',prefs.scale);
 document.body.classList.toggle('cfp-focus',!!prefs.focus);
 document.body.classList.toggle('cfp-light',!!prefs.light);
 var f=document.getElementById('cfpFocus'),t=document.getElementById('cfpTheme');
 if(f)f.classList.toggle('on',!!prefs.focus);
 if(t){t.classList.toggle('on',!!prefs.light);t.firstChild.textContent=prefs.light?'☾':'☼';}
}
function savePrefs(){lset('cfp_prefs',prefs);applyPrefs();}

/* ---------- reader toolbar ---------- */
function buildToolbar(){
 var bar=document.createElement('div');
 bar.className='cfp-toolbar';
 bar.innerHTML=
  '<button id="cfpFocus" aria-label="Focus mode">⛶<span class="cfp-tip">FOCUS MODE</span></button>'+
  '<button id="cfpAup" aria-label="Larger text">A+<span class="cfp-tip">LARGER TEXT</span></button>'+
  '<button id="cfpAdn" aria-label="Smaller text">A−<span class="cfp-tip">SMALLER TEXT</span></button>'+
  '<button id="cfpTheme" aria-label="Toggle light mode">☼<span class="cfp-tip">LIGHT / DARK</span></button>'+
  '<button id="cfpPrint" aria-label="Print chapter">⎙<span class="cfp-tip">PRINT CHAPTER</span></button>';
 document.body.appendChild(bar);
 document.getElementById('cfpFocus').onclick=function(){prefs.focus=!prefs.focus;savePrefs();};
 document.getElementById('cfpAup').onclick=function(){prefs.scale=Math.min(1.3,Math.round((prefs.scale+0.05)*100)/100);savePrefs();};
 document.getElementById('cfpAdn').onclick=function(){prefs.scale=Math.max(0.85,Math.round((prefs.scale-0.05)*100)/100);savePrefs();};
 document.getElementById('cfpTheme').onclick=function(){prefs.light=!prefs.light;savePrefs();};
 document.getElementById('cfpPrint').onclick=function(){window.print();};
}

/* ---------- "~N min left" chip ---------- */
var WPM=220,_chapterWords=0;
function buildTimeChip(){
 var c=document.createElement('div');
 c.className='cfp-time';c.id='cfpTime';
 c.innerHTML='≈ <b id="cfpTimeN">0</b> MIN LEFT IN CHAPTER';
 document.body.appendChild(c);
}
function measureChapter(){
 var main=document.getElementById('cmain');
 var isChapter=main&&main.querySelector('.sec-h');
 _chapterWords=isChapter?(main.innerText||'').split(/\s+/).length:0;
 updateTimeChip();
}
function updateTimeChip(){
 var chip=document.getElementById('cfpTime');if(!chip)return;
 if(!_chapterWords){chip.classList.remove('show');return;}
 var d=document.documentElement,max=d.scrollHeight-d.clientHeight;
 var prog=max>0?Math.min(1,d.scrollTop/max):1;
 var mins=Math.ceil(_chapterWords*(1-prog)/WPM);
 if(mins<1){chip.classList.remove('show');return;}
 document.getElementById('cfpTimeN').textContent=mins;
 chip.classList.add('show');
}

/* ---------- sticky discriminator chip ---------- */
var _discObs=null;
function buildDiscChip(){
 var c=document.createElement('div');
 c.className='cfp-disc';c.id='cfpDisc';
 c.innerHTML='<span class="cd-lab">⚡ CORE DISCRIMINATOR</span><span class="cd-t" id="cfpDiscT"></span>';
 c.onclick=function(){var b=document.querySelector('.disc-banner');if(b)b.scrollIntoView({behavior:'smooth',block:'center'});c.classList.remove('show');};
 document.body.appendChild(c);
}
function watchDisc(){
 if(_discObs){_discObs.disconnect();_discObs=null;}
 var chip=document.getElementById('cfpDisc');if(chip)chip.classList.remove('show');
 var banner=document.querySelector('.disc-banner');if(!banner||!chip)return;
 var t=banner.querySelector('.db-t');
 document.getElementById('cfpDiscT').textContent=t?t.textContent:'';
 _discObs=new IntersectionObserver(function(en){
  var e=en[0];
  chip.classList.toggle('show',!e.isIntersecting&&e.boundingClientRect.top<0);
 },{rootMargin:'-70px 0px 0px 0px'});
 _discObs.observe(banner);
}

/* ---------- chapter completion celebration ---------- */
function confetti(){
 var colors=[getComputedStyle(document.body).getPropertyValue('--teal').trim()||'#00E5A0','#F5A623','#4D9FFF','#FF7AC6','#2ED573'];
 for(var i=0;i<46;i++){
  var d=document.createElement('div');
  d.className='cfp-confetti';
  d.style.left=Math.random()*100+'vw';
  d.style.background=colors[i%colors.length];
  d.style.animationDuration=(1.6+Math.random()*1.6)+'s';
  d.style.animationDelay=(Math.random()*0.4)+'s';
  d.style.width=d.style.height=(5+Math.random()*6)+'px';
  document.body.appendChild(d);
  setTimeout(function(el){return function(){el.remove();};}(d),3600);
 }
}
function toast(icon,head,sub){
 var old=document.querySelector('.cfp-toast');if(old)old.remove();
 var t=document.createElement('div');
 t.className='cfp-toast';
 t.innerHTML='<span class="tt-icon">'+icon+'</span><span><span class="tt-h">'+head+'</span><span class="tt-s">'+sub+'</span></span>';
 document.body.appendChild(t);
 requestAnimationFrame(function(){t.classList.add('show');});
 setTimeout(function(){t.classList.remove('show');setTimeout(function(){t.remove();},400);},6500);
}
function wrapToggleSec(){
 if(typeof window.toggleSec!=='function'||window.toggleSec._cfp)return;
 var orig=window.toggleSec;
 window.toggleSec=function(id,n){
  var wasAll=false;
  try{wasAll=chSectionStatus(courseArr()[n]).all;}catch(e){}
  orig(id,n);
  syncMeta();
  try{
   var st=chSectionStatus(courseArr()[n]);
   if(st.all&&!wasAll){
    var pct=Math.round(doneSections()/totalSections()*100);
    confetti();
    if(pct>=100){
     toast('🏆','Book complete · 100%','Every section of '+META[BOOK].label+' is done. <a href="/cfactor/#books">Pick your next book →</a>');
    }else{
     var next=n+1<courseArr().length?'<a href="#ch'+(n+1)+'">Next: Ch '+(n+1)+' →</a>':'';
     toast('🎉','Chapter '+n+' complete','You\'re at <b style="color:var(--teal)">'+pct+'%</b> of '+META[BOOK].label+'. '+next);
    }
   }
  }catch(e){}
 };
 window.toggleSec._cfp=true;
}

/* ---------- quick-check accuracy tracking ---------- */
function qcStats(){return ls('cfp_qc_'+BOOK)||{r:0,w:0};}
function wrapCheckQC(){
 if(typeof window.checkQC!=='function'||window.checkQC._cfp)return;
 var orig=window.checkQC;
 window.checkQC=function(id){
  var meta=(window._qcStash||{})[id];
  var sel=document.querySelector('input[name="'+id+'"]:checked');
  var already=document.getElementById(id+'-exp');
  var fresh=!(already&&already.classList.contains('show'));
  orig(id);
  if(meta&&sel&&fresh){
   var s=qcStats();
   if(parseInt(sel.value)===meta.ans)s.r++;else s.w++;
   lset('cfp_qc_'+BOOK,s);
   renderAcc();
  }
 };
 window.checkQC._cfp=true;
}
function renderAcc(){
 var side=document.querySelector('.cside .side-top');if(!side)return;
 var s=qcStats(),n=s.r+s.w;
 var el=document.getElementById('cfpAcc');
 if(!n){if(el)el.remove();return;}
 var pct=Math.round(s.r/n*100);
 var html='QUICK-CHECK ACCURACY <b>'+pct+'% · '+n+' answered</b>';
 if(!el){
  el=document.createElement('div');el.className='cfp-acc';el.id='cfpAcc';
  side.parentNode.insertBefore(el,side.nextSibling);
 }
 el.innerHTML=html;
}

/* ---------- cross-book meta for hub dashboard ---------- */
function courseArr(){
 var names=['BOOK1_COURSE','BOOK2_COURSE','BOOK3_COURSE','BOOK4_COURSE','BOOK5_COURSE','BOOK6_COURSE','BOOK7_COURSE','CARS_COURSE','COURSE'];
 for(var i=0;i<names.length;i++)if(window[names[i]]&&window[names[i]].length)return window[names[i]];
 return null;
}
function syncMeta(){
 try{
  var C=courseArr();if(!C)return;
  var tot=0,i;for(i=1;i<C.length;i++)if(C[i]&&C[i].sections)tot+=C[i].sections.length;
  var done=0;try{done=doneSections();}catch(e){
   for(var k in localStorage)if(k.indexOf(BOOK+'_done')===0){var d=ls(k)||{};for(var kk in d)if(d[kk])done++;break;}
  }
  if(!tot)return;
  var last=null;
  for(var k2 in localStorage)if(k2.indexOf(BOOK+'_last')===0){last=ls(k2);break;}
  var lastTxt='';
  if(last&&last.ch&&C[last.ch])lastTxt='Ch '+last.ch+' · '+C[last.ch].title;
  lset('cfp_meta_'+BOOK,{
   pct:Math.round(done/tot*100),done:done,total:tot,
   label:META[BOOK].label,href:META[BOOK].href,ac:META[BOOK].ac,
   last:lastTxt,lastHash:last&&last.ch?('#ch'+last.ch):'',ts:Date.now()
  });
 }catch(e){}
}

/* ---------- per-render hooks ---------- */
function onRender(){
 measureChapter();
 watchDisc();
 renderAcc();
 syncMeta();
}

/* ---------- boot ---------- */
function boot(){
 buildToolbar();
 buildTimeChip();
 buildDiscChip();
 applyPrefs();
 window.addEventListener('scroll',updateTimeChip,{passive:true});
 var main=document.getElementById('cmain');
 if(main)new MutationObserver(function(){setTimeout(onRender,60);}).observe(main,{childList:true});
 /* course scripts load async — poll briefly until their globals exist */
 var tries=0,iv=setInterval(function(){
  tries++;
  wrapToggleSec();wrapCheckQC();
  if(courseArr()){onRender();}
  if((window.toggleSec&&window.toggleSec._cfp&&courseArr())||tries>50)clearInterval(iv);
 },120);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
