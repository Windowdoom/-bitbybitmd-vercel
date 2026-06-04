/* Book 1 - Biology · MCAT-style practice passages.
   Each chapter gets 1-2 passages (4-6 questions each). They render through
   the same passage shell the CARS course uses, with answer reveal, score
   tracking in localStorage (book2_practice_v1), and a per-skill breakdown.

   Pilot ships with the scaffolding wired and a single sample passage on
   Chapter 1 (Amino Acids). Real question sets drop in chapter-by-chapter
   as they're supplied. */

window.BOOK2_PRACTICE=[
 {
  id:'ch1-p1',
  ch:1,
  title:'Sickle Cell on the Wards',
  origin:'Sample passage · pilot · primary-structure → disease',
  paras:[
   'A 9-year-old child of West African descent presents to the emergency department with severe pain in the long bones and chest. Hemoglobin electrophoresis reveals a band that migrates more slowly toward the anode at pH 8.6 than normal adult hemoglobin (HbA). DNA sequencing of the β-globin gene shows a single base change in codon 6, converting GAG to GTG.',
   'The investigators hypothesize that the slower migration of the variant hemoglobin (HbS) on electrophoresis reflects a change in the protein\'s net surface charge at pH 8.6. They further note that, under low oxygen tension, HbS polymerizes into long fibers that deform the red blood cell into the characteristic sickle shape, occluding small vessels and producing the pain crisis.',
   'The team contrasts HbS with HbC, another β-globin variant in which the same glutamate at position 6 is replaced by lysine instead of valine. HbC does not polymerize like HbS, although it does crystallize at high concentration. The team is interested in how a single amino acid change can have such different physical and clinical consequences.'
  ],
  questions:[
   { skill:'Translation', type:'Discrete · molecular',
     stem:'The GAG → GTG mutation in codon 6 of β-globin substitutes which amino acid for which?',
     choices:['Valine for glutamate','Glutamate for valine','Lysine for glutamate','Aspartate for glutamate'],
     answer:0,
     why:['GAG codes for glutamate (Glu, E); GTG codes for valine (Val, V). The mutation replaces a negatively charged side chain with a hydrophobic one, exposing a sticky patch that drives HbS polymerization in deoxy conditions.',
          'Reversed - the mutation is FROM glutamate TO valine.',
          'Glutamate → lysine is the HbC mutation described in paragraph 3, not HbS.',
          'No such substitution in this passage; both Glu and Asp are acidic so a Glu↔Asp swap would not change charge.']},

   { skill:'Protein chemistry', type:'Conceptual',
     stem:'Why does HbS migrate more slowly than HbA toward the anode (positive electrode) at pH 8.6?',
     choices:['HbS is larger so it sieves more slowly through the gel','HbS has lost a negative charge (Glu→Val), reducing its net negative charge at pH 8.6','HbS denatures partially at alkaline pH','HbS forms tetramers; HbA forms dimers at pH 8.6'],
     answer:1,
     why:['Mass change from one residue is negligible; charge dominates electrophoresis under these conditions.',
          'At pH 8.6, Glu is deprotonated (-COO⁻). Replacing it with valine (neutral) removes one negative charge per β-chain, so HbS is less negatively charged and migrates more slowly toward the anode.',
          'Hemoglobin is stable at pH 8.6; denaturation is not the explanation.',
          'Both HbA and HbS are α₂β₂ tetramers at physiological conditions.']},

   { skill:'Mechanism', type:'Conceptual',
     stem:'HbC (Glu→Lys at β6) carries the same residue substitution position as HbS but does not polymerize into fibers. The most likely explanation is that:',
     choices:['Lysine is too large to fit into β-globin','Lysine is positively charged, not hydrophobic, so it does not form the hydrophobic sticky patch that drives HbS fiber formation','Lysine cannot be incorporated by the ribosome','HbC and HbS have different α-chain sequences'],
     answer:1,
     why:['Lysine is well tolerated at the surface - many natural proteins have surface Lys.',
          'HbS fibers form because deoxy-HbS exposes a hydrophobic pocket that the valine of one molecule fits into on a neighboring molecule. Lysine is hydrophilic and positively charged, so it cannot make that hydrophobic contact - HbC stays soluble (though it can crystallize at high concentration).',
          'Lysine is a standard amino acid encoded by AAA/AAG; translation is fine.',
          'Only the β-chain differs between HbS, HbC, and HbA.']},

   { skill:'Clinical reasoning', type:'Discrete',
     stem:'Heterozygotes for HbS (sickle cell trait) are common in regions where which infectious disease is endemic?',
     choices:['Tuberculosis','Malaria (Plasmodium falciparum)','Cholera','Schistosomiasis'],
     answer:1,
     why:['No selection link to TB.',
          'P. falciparum parasites grow poorly in red cells that carry HbS. Heterozygote advantage maintained the HbS allele at high frequency in malaria-endemic regions of Africa, the Mediterranean, and South Asia.',
          'Cholera is unrelated to red-cell biology.',
          'Schistosoma do not parasitize red cells in a way HbS affects.']}
  ]
 }
];

/* ============== PRACTICE RENDERER ============== */
function getPScores(){try{return JSON.parse(localStorage.getItem('book2_practice_v1'))||{};}catch(e){return {};}}
function setPScore(id,pct){try{var d=getPScores();d[id]=pct;localStorage.setItem('book2_practice_v1',JSON.stringify(d));}catch(e){}}

window.renderBook2Practice=function(id){
 var P=window.BOOK2_PRACTICE||[], p=null;
 for(var i=0;i<P.length;i++){if(P[i].id===id)p=P[i];}
 if(!p){return false;}
 var esc=function(s){return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');};
 var h='';
 h+='<div class="crumb"><a href="#home">Book 1 · Biology</a> <span>/</span> Practice</div>';
 h+='<div class="cmeta"><span>MCAT-style passage · Ch '+p.ch+'</span><span class="dot">•</span><span>'+p.questions.length+' questions</span></div>';
 h+='<h1 class="ph-title">'+esc(p.title)+'</h1>';
 h+='<p class="ph-sub" style="margin-bottom:1.4rem;font-size:13.5px;color:var(--text-dim)">'+esc(p.origin)+'</p>';
 h+='<div class="resultbox" id="resultbox" style="display:none;background:linear-gradient(135deg,rgba(0,229,160,.08),transparent);border:1px solid rgba(0,229,160,.25);border-radius:8px;padding:1.6rem 1.8rem;margin-bottom:1.6rem"></div>';
 h+='<div class="passage" style="background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:1.6rem 1.8rem;margin:1rem 0 2.2rem">'+p.paras.map(function(par,ix){return '<p style="font-size:14.5px;color:var(--text);line-height:1.85;margin-bottom:1rem"><span style="font-family:var(--mono);font-size:11px;color:var(--teal);margin-right:4px">['+(ix+1)+']</span> '+esc(par)+'</p>';}).join('')+'</div>';
 p.questions.forEach(function(q,qi){
  h+='<div style="border:1px solid var(--border);border-radius:8px;padding:1.4rem 1.5rem;margin-bottom:1.2rem;background:var(--bg-card)" id="bq-'+qi+'">';
  h+='<div style="font-family:var(--mono);font-size:10px;letter-spacing:1px;color:var(--text-dim);margin-bottom:8px;text-transform:uppercase">Q'+(qi+1)+' · '+esc(q.skill)+' · '+esc(q.type)+'</div>';
  h+='<div style="font-size:14.5px;color:var(--text);font-weight:600;line-height:1.6;margin-bottom:1rem">'+esc(q.stem)+'</div>';
  h+='<div style="display:flex;flex-direction:column;gap:8px">';
  q.choices.forEach(function(c,ci){
   h+='<label class="qc-choice" id="bc-'+qi+'-'+ci+'"><input type="radio" name="bq'+qi+'" value="'+ci+'" onchange="window._bpicks=window._bpicks||{};window._bpicks['+qi+']='+ci+'"><span class="qc-letter">'+String.fromCharCode(65+ci)+'</span><span class="qc-text">'+esc(c)+'</span></label>';
  });
  h+='</div><div class="qc-exp" id="bexp-'+qi+'"></div></div>';
 });
 h+='<div class="cnav-foot"><button class="markbtn" onclick="window.checkBook2Practice(\''+p.id+'\')">CHECK ANSWERS</button><a class="btn-o" href="#ch'+p.ch+'">Back to Ch '+p.ch+'</a></div>';
 var m=document.getElementById('cmain');
 m.innerHTML='<div class="cinner">'+h+'</div>';
 window._bpicks={};
 window.scrollTo(0,0);
 return true;
};

window.checkBook2Practice=function(id){
 var P=window.BOOK2_PRACTICE||[], p=null;
 for(var i=0;i<P.length;i++){if(P[i].id===id)p=P[i];}
 if(!p)return;
 var esc=function(s){return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');};
 var picks=window._bpicks||{}, correct=0, bySkill={};
 p.questions.forEach(function(q,qi){
  var chosen=picks.hasOwnProperty(qi)?picks[qi]:-1, ok=chosen===q.answer;
  bySkill[q.skill]=bySkill[q.skill]||[0,0]; bySkill[q.skill][1]++; if(ok)bySkill[q.skill][0]++;
  for(var ci=0;ci<q.choices.length;ci++){
   var el=document.getElementById('bc-'+qi+'-'+ci); if(!el)continue;
   el.classList.remove('is-correct','is-wrong');
   if(ci===q.answer)el.classList.add('is-correct');
   else if(ci===chosen)el.classList.add('is-wrong');
  }
  if(ok)correct++;
  var exp=document.getElementById('bexp-'+qi);
  exp.innerHTML=q.choices.map(function(c,ci){var tag=ci===q.answer?'<b style="color:var(--green)">✓ Correct</b>':'<b style="color:var(--red)">✗</b>';return '<div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:9px;padding:6px 0"><span style="font-family:var(--mono);font-size:12px;color:var(--text-dim);width:18px;flex-shrink:0">'+String.fromCharCode(65+ci)+'</span><div style="font-size:12.5px;color:var(--text-muted);line-height:1.55">'+tag+' - '+esc(q.why[ci]||'')+'</div></div>';}).join('');
  exp.classList.add('show');
 });
 var pct=Math.round(correct/p.questions.length*100);
 var skillTxt=Object.keys(bySkill).map(function(s){return esc(s)+': '+bySkill[s][0]+'/'+bySkill[s][1];}).join(' &nbsp;·&nbsp; ');
 var rb=document.getElementById('resultbox');
 rb.innerHTML='<h3 style="font-family:var(--mono);font-size:20px;color:var(--text);margin-bottom:6px">'+correct+' / '+p.questions.length+' correct &nbsp;<span style="color:var(--teal)">'+pct+'%</span></h3><div style="font-size:12.5px;color:var(--text-muted);margin-top:4px">By skill - '+skillTxt+'</div><div style="margin-top:12px"><button class="btn-o" onclick="window.renderBook2Practice(\''+id+'\')" style="padding:9px 16px">RETRY ↻</button></div>';
 rb.style.display='block';
 setPScore(id,pct);
 rb.scrollIntoView({behavior:'smooth',block:'center'});
};

/* Hook the practice route into the main course router. */
(function(){
 var original=window.addEventListener;
 window.addEventListener('hashchange',function(){
  var hs=location.hash||'';
  var m=hs.match(/practice-([\w-]+)/);
  if(m){window.renderBook2Practice(m[1]);}
 });
 var initial=location.hash||'';
 var im=initial.match(/practice-([\w-]+)/);
 if(im){setTimeout(function(){window.renderBook2Practice(im[1]);},100);}
})();
