/* CARS course — hand-built visual layouts (flowcharts, diagrams) that replace
   the book's tables for the key systematic concepts. Injected after a section
   heading; CARS_SUP lists the section tables those visuals replace. */
window.CARS_SUP={1:["1.2"],2:["2.1"],3:[],5:["5.6"],6:["6.1","6.2"]};
window.CARS_VIS={
 1:{
  "1.2":'<div class="vbox"><div class="vhead">What the 53 questions test</div>'+
   '<div class="seg">'+
   '<div class="segpart" style="flex:30"><b>30%</b><span>Foundations of Comprehension</span></div>'+
   '<div class="segpart" style="flex:30;background:rgba(77,159,255,.16);color:var(--blue)"><b>30%</b><span>Reasoning Within the Text</span></div>'+
   '<div class="segpart" style="flex:40;background:rgba(168,85,247,.16);color:var(--purple)"><b>40%</b><span>Reasoning Beyond the Text</span></div>'+
   '</div>'+
   '<div class="vcards">'+
   '<div class="vcard" style="--ca:var(--teal)"><div class="vc-top"><b>Foundations</b><span class="wt hi">30%</span></div><p>Did you understand the basic content — main idea, a stated detail, a word in context, simple supported inferences.</p></div>'+
   '<div class="vcard" style="--ca:var(--blue)"><div class="vc-top"><b>Within the Text</b><span class="wt hi">30%</span></div><p>Can you integrate parts — argument structure, tone, an unstated assumption, the relation between two ideas.</p></div>'+
   '<div class="vcard" style="--ca:var(--purple)"><div class="vc-top"><b>Beyond the Text</b><span class="wt hi">40%</span></div><p>Can you take the passage somewhere new — apply, strengthen/weaken, predict the author\'s response to a new case.</p></div>'+
   '</div><div class="vnote">The section is dominated by the hardest skill — the 40% that asks you to <i>do</i> something with the passage, not just recall it.</div></div>'
 },
 2:{
  "2.1":'<div class="vbox"><div class="vhead">The five functional sentence types</div><div class="vnote">Strong scorers read no two sentences with the same weight. Read each type for what it is doing.</div>'+
   '<div class="vcards">'+
   '<div class="vcard" style="--ca:var(--teal)"><div class="vc-top"><b>Claim</b><span class="wt hi">HIGH</span></div><p>The author\'s position. Declarative; often opens or closes a paragraph (<i>is, argues, shows</i>). <em>Read fully.</em></p></div>'+
   '<div class="vcard" style="--ca:var(--gold)"><div class="vc-top"><b>Evidence</b><span class="wt med">MEDIUM</span></div><p>Reasoning, examples, or facts that back a claim (<i>for example, as shown by</i>). <em>Skim for type, not detail.</em></p></div>'+
   '<div class="vcard" style="--ca:var(--text-dim)"><div class="vc-top"><b>Restatement</b><span class="wt lo">LOW</span></div><p>Repeats a claim in other words (<i>in other words, that is</i>). <em>Confirm, then move on.</em></p></div>'+
   '<div class="vcard" style="--ca:var(--teal)"><div class="vc-top"><b>Transition</b><span class="wt hi">HIGH</span></div><p>Marks a turn (<i>but, however, yet, nevertheless</i>). <em>Argument structure lives here.</em></p></div>'+
   '<div class="vcard" style="--ca:var(--teal)"><div class="vc-top"><b>Qualification</b><span class="wt hi">HIGH</span></div><p>Limits a claim\'s scope (<i>in some cases, generally, often</i>). <em>Questions love these.</em></p></div>'+
   '</div></div>'
 },
 3:{
  "3.1":'<div class="vbox"><div class="vhead">The four-move method · run it on every passage</div>'+
   '<div class="flow">'+
   '<div class="fstep"><div class="fnum">1</div><div class="fbody"><b>The opening sixty seconds</b><span>Read paragraph 1 at translation speed. Fix the topic in one phrase and decide whether the author has a voice.</span><span class="ftime">~60 sec</span></div></div>'+
   '<div class="fstep"><div class="fnum">2</div><div class="fbody"><b>Paragraph skeletons</b><span>Tag each paragraph with a one-word function — setup, evidence, critique, conclusion — so you can back-scan without re-reading.</span></div></div>'+
   '<div class="fstep"><div class="fnum">3</div><div class="fbody"><b>Track the argument turns</b><span>Follow the pivots — <i>but, yet, however</i> — the places where the author\'s position actually moves.</span></div></div>'+
   '<div class="fstep"><div class="fnum">4</div><div class="fbody"><b>The closing question</b><span>Before reading a single stem, answer: what was the author <i>trying to do?</i> That one sentence is your Mental Map.</span></div></div>'+
   '</div></div>'
 },
 5:{
  "5.1":'<div class="vbox"><div class="vhead">The four wrong-answer archetypes · ~90% of all wrong answers</div>'+
   '<div class="vcards">'+
   '<div class="vcard" style="--ca:var(--red)"><div class="vc-top"><b>Out of Scope</b><span class="wt lo">tag: outside</span></div><p>Brings in content the passage never discusses. True or not, it isn\'t in the text — so it\'s wrong.</p></div>'+
   '<div class="vcard" style="--ca:var(--gold)"><div class="vc-top"><b>Distortion</b><span class="wt lo">tag: distorted</span></div><p>Takes a real passage claim and changes its degree, scope, causation, or relationship.</p></div>'+
   '<div class="vcard" style="--ca:var(--purple)"><div class="vc-top"><b>Extreme Language</b><span class="wt lo">tag: extreme</span></div><p><i>Always, never, only, all, none, must.</i> Eliminate unless the passage itself was that absolute.</p></div>'+
   '<div class="vcard" style="--ca:var(--blue)"><div class="vc-top"><b>Faulty Use of Detail</b><span class="wt lo">tag: wrong question</span></div><p>States something true about the passage that does not answer <i>this</i> question.</p></div>'+
   '</div></div>',
  "5.6":'<div class="vbox"><div class="vhead">The wrong-answer decision tree</div><div class="vnote">Run all five checks on each of the four choices (~2–3 sec each). If any check triggers, eliminate immediately. The choice that triggers nothing is the answer.</div>'+
   '<div class="flow tree">'+
   '<div class="fstep"><div class="fnum">1</div><div class="fbody"><b>Something not in the passage?</b><span>→ eliminate as <b style="color:var(--red)">OUT OF SCOPE</b></span></div></div>'+
   '<div class="fstep"><div class="fnum">2</div><div class="fbody"><b>Extreme language (always, never, only, all, none, must)?</b><span>→ eliminate as <b style="color:var(--red)">EXTREME</b> (unless the passage was also extreme)</span></div></div>'+
   '<div class="fstep"><div class="fnum">3</div><div class="fbody"><b>Stretches a claim past the author\'s commitment?</b><span>→ eliminate as <b style="color:var(--red)">DISTORTED</b></span></div></div>'+
   '<div class="fstep"><div class="fnum">4</div><div class="fbody"><b>True about the passage but irrelevant to the question?</b><span>→ eliminate as <b style="color:var(--red)">WRONG QUESTION</b></span></div></div>'+
   '<div class="fstep"><div class="fnum">5</div><div class="fbody"><b>Reverses the author\'s view (watch a missing ‘not’)?</b><span>→ eliminate as <b style="color:var(--red)">OPPOSITE</b></span></div></div>'+
   '<div class="fstep keep"><div class="fnum">✓</div><div class="fbody"><b>Triggers nothing</b><span>→ this is your answer. It earns the keep by surviving, not by feeling right.</span></div></div>'+
   '</div></div>'
 },
 6:{
  "6.1":'<div class="vbox"><div class="vhead">The elimination protocol · ~40–60 sec per question</div>'+
   '<div class="flow">'+
   '<div class="fstep"><div class="fnum">1</div><div class="fbody"><b>Classify the stem</b><span>Name the question type in your head (main idea, detail, application…).</span><span class="ftime">3 sec</span></div></div>'+
   '<div class="fstep"><div class="fnum">2</div><div class="fbody"><b>Predict the answer shape</b><span>One-sentence prediction based on the type and your Mental Map.</span><span class="ftime">5 sec</span></div></div>'+
   '<div class="fstep"><div class="fnum">3</div><div class="fbody"><b>Tag all four choices</b><span>Assign each a one-word tag as you read: match, outside, extreme, distorted, wrong question, opposite.</span><span class="ftime">20 sec</span></div></div>'+
   '<div class="fstep"><div class="fnum">4</div><div class="fbody"><b>Eliminate by archetype</b><span>Cross off everything tagged with a wrong-answer archetype — usually two or three.</span><span class="ftime">5 sec</span></div></div>'+
   '<div class="fstep"><div class="fnum">5</div><div class="fbody"><b>One survivor? Mark it, move on.</b><span>Don\'t re-read a question you\'ve solved.</span><span class="ftime">2 sec</span></div></div>'+
   '<div class="fstep"><div class="fnum">6</div><div class="fbody"><b>Two survivors? Run the tiebreaker.</b><span>Apply the stuck-between-two tests (Chapter 7).</span><span class="ftime">25 sec</span></div></div>'+
   '</div></div>',
  "6.2":'<div class="vbox"><div class="vhead">The six answer-choice tags · only MATCH survives</div><div class="vnote">Five tags eliminate; one keeps. The default disposition is to eliminate — an answer earns MATCH by surviving every check.</div>'+
   '<div class="tags">'+
   '<div class="tag keep"><b>MATCH</b><span>Fits your predicted shape and the Mental Map.</span><i>KEEP</i></div>'+
   '<div class="tag cut"><b>OUTSIDE</b><span>Mentions content not in the passage.</span><i>ELIMINATE</i></div>'+
   '<div class="tag cut"><b>EXTREME</b><span>Absolute language: always, never, only, all, none, must.</span><i>ELIMINATE*</i></div>'+
   '<div class="tag cut"><b>DISTORTED</b><span>Changes a claim\'s degree, scope, causation, or relationship.</span><i>ELIMINATE</i></div>'+
   '<div class="tag cut"><b>WRONG QUESTION</b><span>A true detail that doesn\'t answer this question.</span><i>ELIMINATE</i></div>'+
   '<div class="tag cut"><b>OPPOSITE</b><span>Reverses the author\'s view — often a missing or added ‘not’.</span><i>ELIMINATE</i></div>'+
   '</div><div class="vnote" style="margin-top:1rem;margin-bottom:0">*Keep EXTREME only if the passage itself made an equally absolute claim.</div></div>'
 }
};
