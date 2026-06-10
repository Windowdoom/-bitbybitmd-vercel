/* ===========================================================
   C-Factor · hub-plus.js
   Turns /cfactor/ into a progress dashboard.
   Reads the cfp_meta_* records written by course-plus.js
   (one per book: pct, done, total, last position, timestamp)
   and renders:
     • a "Your progress" strip with one ring per started book
     • a cross-book "continue where you left off" card
     • mini % badges on the library cards
   Renders nothing for brand-new visitors.
   =========================================================== */
(function(){
'use strict';
function ls(k){try{return JSON.parse(localStorage.getItem(k));}catch(e){return null;}}

var BOOKS=['book1','book2','book3','book4','book5','book6','book7','cars'];
var metas=[];
BOOKS.forEach(function(b){
 var m=ls('cfp_meta_'+b);
 if(m&&m.total)metas.push(m);
});
if(!metas.length)return;

/* most recently touched book → resume card */
var recent=metas.slice().sort(function(a,b){return (b.ts||0)-(a.ts||0);})[0];

var dash=document.createElement('div');
dash.className='cfp-dash';
var h='<div class="cfp-dash-box">';
h+='<div class="cfp-dash-tag">▸ Saved on this device · no login needed</div>';
h+='<div class="cfp-dash-h">Your progress</div>';
if(recent&&recent.last){
 h+='<div class="cfp-resume"><span class="rs-l">▸ RESUME</span>'+
    '<span class="rs-t">'+recent.label+' <span>· '+recent.last+'</span></span>'+
    '<a href="'+recent.href+(recent.lastHash||'')+'">CONTINUE →</a></div>';
}
h+='<div class="cfp-rings">';
metas.forEach(function(m){
 h+='<a class="cfp-ring-card" href="'+m.href+'" style="--ac:'+(m.ac||'var(--teal)')+'">'+
    '<div class="cfp-ring" style="--p:'+m.pct+'"><span>'+m.pct+'%</span></div>'+
    '<div class="rc-n"><b>'+m.label+'</b>'+m.done+' / '+m.total+' sections</div></a>';
});
h+='</div></div>';
dash.innerHTML=h;

var books=document.getElementById('books');
if(books&&books.parentNode)books.parentNode.insertBefore(dash,books);
else document.querySelector('main,body').appendChild(dash);

/* mini % badges on library cards */
metas.forEach(function(m){
 if(!m.pct)return;
 document.querySelectorAll('a.lib-card[href="'+m.href+'"]').forEach(function(card){
  var b=document.createElement('span');
  b.className='cfp-mini';
  b.textContent=m.pct+'%';
  card.appendChild(b);
 });
});
})();
