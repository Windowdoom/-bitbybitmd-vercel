/* CARS course - hand-built visual layouts (flowcharts, diagrams) that replace
   the book's tables for the key systematic concepts. Injected after a section
   heading; CARS_SUP lists the section tables those visuals replace. */
window.CARS_SUP={1:["1.2"],2:["2.1"],3:[],4:["4.4","4.5"],5:["5.6"],6:["6.1","6.2"],7:[],8:["8.1","8.3"],9:["9.1","9.2"],10:[]};
window.CARS_VIS={
 1:{
  "1.2":'<div class="vbox"><div class="vhead">What the 53 questions test</div>'+
   '<div class="seg">'+
   '<div class="segpart" style="flex:30"><b>30%</b><span>Foundations of Comprehension</span></div>'+
   '<div class="segpart" style="flex:30;background:rgba(77,159,255,.16);color:var(--blue)"><b>30%</b><span>Reasoning Within the Text</span></div>'+
   '<div class="segpart" style="flex:40;background:rgba(168,85,247,.16);color:var(--purple)"><b>40%</b><span>Reasoning Beyond the Text</span></div>'+
   '</div>'+
   '<div class="vcards">'+
   '<div class="vcard" style="--ca:var(--teal)"><div class="vc-top"><b>Foundations</b><span class="wt hi">30%</span></div><p>Did you understand the basic content - main idea, a stated detail, a word in context, simple supported inferences.</p></div>'+
   '<div class="vcard" style="--ca:var(--blue)"><div class="vc-top"><b>Within the Text</b><span class="wt hi">30%</span></div><p>Can you integrate parts - argument structure, tone, an unstated assumption, the relation between two ideas.</p></div>'+
   '<div class="vcard" style="--ca:var(--purple)"><div class="vc-top"><b>Beyond the Text</b><span class="wt hi">40%</span></div><p>Can you take the passage somewhere new - apply, strengthen/weaken, predict the author\'s response to a new case.</p></div>'+
   '</div><div class="vnote">The section is dominated by the hardest skill - the 40% that asks you to <i>do</i> something with the passage, not just recall it.</div></div>'
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
   '<div class="fstep"><div class="fnum">2</div><div class="fbody"><b>Paragraph skeletons</b><span>Tag each paragraph with a one-word function - setup, evidence, critique, conclusion - so you can back-scan without re-reading.</span></div></div>'+
   '<div class="fstep"><div class="fnum">3</div><div class="fbody"><b>Track the argument turns</b><span>Follow the pivots - <i>but, yet, however</i> - the places where the author\'s position actually moves.</span></div></div>'+
   '<div class="fstep"><div class="fnum">4</div><div class="fbody"><b>The closing question</b><span>Before reading a single stem, answer: what was the author <i>trying to do?</i> That one sentence is your Mental Map.</span></div></div>'+
   '</div></div>'
 },
 5:{
  "5.1":'<div class="vbox"><div class="vhead">The four wrong-answer archetypes · ~90% of all wrong answers</div>'+
   '<div class="vcards">'+
   '<div class="vcard" style="--ca:var(--red)"><div class="vc-top"><b>Out of Scope</b><span class="wt lo">tag: outside</span></div><p>Brings in content the passage never discusses. True or not, it isn\'t in the text - so it\'s wrong.</p></div>'+
   '<div class="vcard" style="--ca:var(--gold)"><div class="vc-top"><b>Distortion</b><span class="wt lo">tag: distorted</span></div><p>Takes a real passage claim and changes its degree, scope, causation, or relationship.</p></div>'+
   '<div class="vcard" style="--ca:var(--purple)"><div class="vc-top"><b>Extreme Language</b><span class="wt lo">tag: extreme</span></div><p><i>Always, never, only, all, none, must.</i> Eliminate unless the passage itself was that absolute.</p></div>'+
   '<div class="vcard" style="--ca:var(--blue)"><div class="vc-top"><b>Faulty Use of Detail</b><span class="wt lo">tag: wrong question</span></div><p>States something true about the passage that does not answer <i>this</i> question.</p></div>'+
   '</div></div>',
  "5.6":'<div class="vbox"><div class="vhead">The wrong-answer decision tree</div><div class="vnote">Run all five checks on each of the four choices (~2-3 sec each). If any check triggers, eliminate immediately. The choice that triggers nothing is the answer.</div>'+
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
  "6.1":'<div class="vbox"><div class="vhead">The elimination protocol · ~40-60 sec per question</div>'+
   '<div class="flow">'+
   '<div class="fstep"><div class="fnum">1</div><div class="fbody"><b>Classify the stem</b><span>Name the question type in your head (main idea, detail, application…).</span><span class="ftime">3 sec</span></div></div>'+
   '<div class="fstep"><div class="fnum">2</div><div class="fbody"><b>Predict the answer shape</b><span>One-sentence prediction based on the type and your Mental Map.</span><span class="ftime">5 sec</span></div></div>'+
   '<div class="fstep"><div class="fnum">3</div><div class="fbody"><b>Tag all four choices</b><span>Assign each a one-word tag as you read: match, outside, extreme, distorted, wrong question, opposite.</span><span class="ftime">20 sec</span></div></div>'+
   '<div class="fstep"><div class="fnum">4</div><div class="fbody"><b>Eliminate by archetype</b><span>Cross off everything tagged with a wrong-answer archetype - usually two or three.</span><span class="ftime">5 sec</span></div></div>'+
   '<div class="fstep"><div class="fnum">5</div><div class="fbody"><b>One survivor? Mark it, move on.</b><span>Don\'t re-read a question you\'ve solved.</span><span class="ftime">2 sec</span></div></div>'+
   '<div class="fstep"><div class="fnum">6</div><div class="fbody"><b>Two survivors? Run the tiebreaker.</b><span>Apply the stuck-between-two tests (Chapter 7).</span><span class="ftime">25 sec</span></div></div>'+
   '</div></div>',
  "6.2":'<div class="vbox"><div class="vhead">The six answer-choice tags · only MATCH survives</div><div class="vnote">Five tags eliminate; one keeps. The default disposition is to eliminate - an answer earns MATCH by surviving every check.</div>'+
   '<div class="tags">'+
   '<div class="tag keep"><b>MATCH</b><span>Fits your predicted shape and the Mental Map.</span><i>KEEP</i></div>'+
   '<div class="tag cut"><b>OUTSIDE</b><span>Mentions content not in the passage.</span><i>ELIMINATE</i></div>'+
   '<div class="tag cut"><b>EXTREME</b><span>Absolute language: always, never, only, all, none, must.</span><i>ELIMINATE*</i></div>'+
   '<div class="tag cut"><b>DISTORTED</b><span>Changes a claim\'s degree, scope, causation, or relationship.</span><i>ELIMINATE</i></div>'+
   '<div class="tag cut"><b>WRONG QUESTION</b><span>A true detail that doesn\'t answer this question.</span><i>ELIMINATE</i></div>'+
   '<div class="tag cut"><b>OPPOSITE</b><span>Reverses the author\'s view - often a missing or added ‘not’.</span><i>ELIMINATE</i></div>'+
   '</div><div class="vnote" style="margin-top:1rem;margin-bottom:0">*Keep EXTREME only if the passage itself made an equally absolute claim.</div></div>'
 },
 4:{
  "4.4":'<div class="vbox"><div class="vhead">The universal procedure · every question, same six moves</div>'+
   '<div class="flow">'+
   '<div class="fstep"><div class="fnum">1</div><div class="fbody"><b>Classify the question type</b><span>Read the stem; name the type from the taxonomy below.</span><span class="ftime">3 sec</span></div></div>'+
   '<div class="fstep"><div class="fnum">2</div><div class="fbody"><b>Predict the right-answer shape</b><span>Each type has a shape; say it before you read the choices.</span><span class="ftime">5 sec</span></div></div>'+
   '<div class="fstep"><div class="fnum">3</div><div class="fbody"><b>Tag all four choices</b><span>Match or mismatch - assign each a one-word tag as you read.</span><span class="ftime">20 sec</span></div></div>'+
   '<div class="fstep"><div class="fnum">4</div><div class="fbody"><b>Eliminate mismatches</b><span>Usually two of four fall away immediately.</span><span class="ftime">10 sec</span></div></div>'+
   '<div class="fstep"><div class="fnum">5</div><div class="fbody"><b>Compare the survivors</b><span>Use the type-specific discriminator to separate the last two.</span><span class="ftime">20 sec</span></div></div>'+
   '<div class="fstep"><div class="fnum">6</div><div class="fbody"><b>Pick, mark, move on</b><span>Commit and don\'t look back.</span><span class="ftime">5 sec</span></div></div>'+
   '</div></div>',
  "4.5":'<div class="vbox"><div class="vhead">The eleven question types, grouped by skill</div><div class="vnote">Classify any stem in five seconds. The stem language in each card tells you which type - and which trap to expect.</div>'+
   '<div class="vsub" style="--ca:var(--teal)">FOUNDATIONS OF COMPREHENSION · ~30%</div><div class="vcards">'+
   '<div class="vcard" style="--ca:var(--teal)"><div class="vc-top"><b>1 · Main Idea</b></div><p><i>"central thesis", "primary purpose"</i> - the whole-passage position.</p></div>'+
   '<div class="vcard" style="--ca:var(--teal)"><div class="vc-top"><b>2 · Detail Recall</b></div><p><i>"according to the passage"</i> - a stated fact, findable in 5 sec.</p></div>'+
   '<div class="vcard" style="--ca:var(--teal)"><div class="vc-top"><b>3 · Word-in-Context</b></div><p><i>"the author uses X to mean"</i> - meaning here, not the dictionary.</p></div>'+
   '<div class="vcard" style="--ca:var(--teal)"><div class="vc-top"><b>4 · Simple Inference</b></div><p><i>"the passage implies / suggests"</i> - one step from the text.</p></div>'+
   '</div>'+
   '<div class="vsub" style="--ca:var(--blue)">REASONING WITHIN THE TEXT · ~30%</div><div class="vcards">'+
   '<div class="vcard" style="--ca:var(--blue)"><div class="vc-top"><b>5 · Argument Structure</b></div><p><i>"the function of paragraph X"</i> - what a part <i>does</i>, not what it says.</p></div>'+
   '<div class="vcard" style="--ca:var(--blue)"><div class="vc-top"><b>6 · Author Tone</b></div><p><i>"the author\'s attitude toward"</i> - one of the eight postures.</p></div>'+
   '<div class="vcard" style="--ca:var(--blue)"><div class="vc-top"><b>7 · Unstated Assumption</b></div><p><i>"the author assumes"</i> - the claim that, if false, breaks the argument.</p></div>'+
   '</div>'+
   '<div class="vsub" style="--ca:var(--purple)">REASONING BEYOND THE TEXT · ~40%</div><div class="vcards">'+
   '<div class="vcard" style="--ca:var(--purple)"><div class="vc-top"><b>8 · Application</b></div><p><i>"how would the author respond to"</i> - apply the author\'s framework to a new case.</p></div>'+
   '<div class="vcard" style="--ca:var(--purple)"><div class="vc-top"><b>9 · Strengthen / Weaken</b></div><p><i>"would most strengthen / weaken"</i> - hit the specific claim, not the topic.</p></div>'+
   '<div class="vcard" style="--ca:var(--purple)"><div class="vc-top"><b>10 · New-Info Integration</b></div><p><i>"suppose X is true, in light of the passage"</i> - combine, don\'t ignore the text.</p></div>'+
   '<div class="vcard" style="--ca:var(--purple)"><div class="vc-top"><b>11 · Author Prediction</b></div><p><i>"the author would most likely agree about Y"</i> - what the framework entails.</p></div>'+
   '</div></div>'
 },
 7:{
  "7.1":'<div class="vbox"><div class="vhead">Stuck between two? Run these four tests in order</div><div class="vnote">When two answers survive elimination, the difference is almost always small and deliberate. Work down the list - the first test that separates them wins.</div>'+
   '<div class="flow">'+
   '<div class="fstep"><div class="fnum">1</div><div class="fbody"><b>The single-word check</b><span>Find the one word that differs and matters - a frequency, strength, causation, inclusion, direction, or scope word. The AAMC\'s favorite two-answer design.</span></div></div>'+
   '<div class="fstep"><div class="fnum">2</div><div class="fbody"><b>The qualifier check</b><span>Does one answer drop the passage\'s hedge? <i>"in most cases"</i> becoming <i>"always"</i> is a trap; the hedged version usually matches.</span></div></div>'+
   '<div class="fstep"><div class="fnum">3</div><div class="fbody"><b>The scope check</b><span>Is one answer too broad, too narrow, wrong domain, or wrong time frame relative to what the author actually claimed?</span></div></div>'+
   '<div class="fstep"><div class="fnum">4</div><div class="fbody"><b>The author-tone match</b><span>Which survivor carries the tone in your Mental Map? A critic\'s answer limits; an advocate\'s supports; a skeptic\'s hedges.</span></div></div>'+
   '</div></div>'
 },
 8:{
  "8.1":'<div class="vbox"><div class="vhead">The ten-minute rule · why it isn\'t optional</div><div class="vnote">At the ten-minute mark for any passage, you are done with it. The cost of overstaying compounds - it isn\'t linear.</div>'+
   '<div class="ladder">'+
   '<div class="lrow" style="--lc:var(--green)"><div class="lwhat">Ran exactly to budget<span>10:00 each</span></div><div class="lcost">0 lost</div></div>'+
   '<div class="lrow" style="--lc:var(--green)"><div class="lwhat">One slow passage (12 min)<span>+2 min over</span></div><div class="lcost">0-1 lost</div></div>'+
   '<div class="lrow" style="--lc:var(--gold)"><div class="lwhat">Two slow passages<span>+4 min total</span></div><div class="lcost">1-2 lost</div></div>'+
   '<div class="lrow" style="--lc:var(--gold)"><div class="lwhat">Three slow passages<span>+6 min · panic begins</span></div><div class="lcost">2-4 lost</div></div>'+
   '<div class="lrow" style="--lc:var(--red)"><div class="lwhat">One locked-up passage (15 min)<span>+5 min · others rushed</span></div><div class="lcost">2-3 lost</div></div>'+
   '<div class="lrow" style="--lc:var(--red)"><div class="lwhat">Two locked-up passages<span>+10 min · section in trouble</span></div><div class="lcost">5-7 lost</div></div>'+
   '</div></div>',
  "8.3":'<div class="vbox"><div class="vhead">The emergency 7-3 split · when you\'ve fallen behind</div><div class="vnote">A rescue tool, not a default - accuracy drops because the question phase is rushed. Use it only when you\'re already behind.</div>'+
   '<div class="compare">'+
   '<div class="vcard" style="--ca:var(--teal)"><div class="vc-top"><b>Standard 5-5</b><span class="wt hi">DEFAULT</span></div><p><b>Read:</b> 4-5 min, full method.<br><b>Mental Map:</b> 30 sec.<br><b>Questions:</b> 5-6 min for 5-7.<br><b>Hard Qs:</b> full elimination protocol.</p></div>'+
   '<div class="vcard" style="--ca:var(--red)"><div class="vc-top"><b>Emergency 7-3</b><span class="wt med">RESCUE</span></div><p><b>Read:</b> up to 7 min, no re-reads.<br><b>Mental Map:</b> 30 sec - non-negotiable.<br><b>Questions:</b> 3 min, ~30 sec each.<br><b>Hard Qs:</b> abbreviated - classify, cut the obvious, pick fast.</p></div>'+
   '</div></div>'
 },
 9:{
  "9.1":'<div class="vbox"><div class="vhead">The four humanities genres</div><div class="vnote">Recognizing the genre in the first lines tells you the likely structure, tone, and question types before you\'ve read a word of argument.</div>'+
   '<div class="vcards">'+
   '<div class="vcard" style="--ca:var(--gold)"><div class="vc-top"><b>Philosophical Argument</b></div><p>Argues for/against a position with explicit logic. <i>"argues, claims, objects, concedes."</i><br><em>Expect:</em> assumption (7), application (8).</p></div>'+
   '<div class="vcard" style="--ca:var(--gold)"><div class="vc-top"><b>Literary / Aesthetic Analysis</b></div><p>Reinterprets a work or movement against the received view. <i>"reads as, can be understood as."</i><br><em>Expect:</em> main idea (1), tone (6).</p></div>'+
   '<div class="vcard" style="--ca:var(--gold)"><div class="vc-top"><b>Historical Thesis</b></div><p>A causal/interpretive claim that corrects a standard account. <i>"has traditionally been."</i><br><em>Expect:</em> structure (5), strengthen/weaken (9).</p></div>'+
   '<div class="vcard" style="--ca:var(--gold)"><div class="vc-top"><b>Cultural / Anthropological</b></div><p>Examines a practice or way of life, often against ethnocentric readings. <i>"practice, meaning, context."</i><br><em>Expect:</em> application (8), tone (6).</p></div>'+
   '</div></div>',
  "9.2":'<div class="vbox"><div class="vhead">The four social-science genres</div>'+
   '<div class="vcards">'+
   '<div class="vcard" style="--ca:var(--blue)"><div class="vc-top"><b>Theoretical Model</b></div><p>Presents and evaluates a model of behavior or society. <i>"posits, predicts, accounts for."</i><br><em>Expect:</em> structure (5), assumption (7).</p></div>'+
   '<div class="vcard" style="--ca:var(--blue)"><div class="vc-top"><b>Empirical Sociology</b></div><p>Discusses research on a social phenomenon. <i>"data show, findings indicate."</i> Careful, hedged tone.<br><em>Expect:</em> detail (2), inference (4).</p></div>'+
   '<div class="vcard" style="--ca:var(--blue)"><div class="vc-top"><b>Normative / Political Theory</b></div><p>Argues how things <i>ought</i> to be. <i>"ought, should, just, requires."</i> Committed, advocating tone.<br><em>Expect:</em> assumption (7), application (8).</p></div>'+
   '<div class="vcard" style="--ca:var(--blue)"><div class="vc-top"><b>Methodological</b></div><p>About <i>how</i> a discipline does its work. <i>"methodology, approach, framework."</i> Reformist tone.<br><em>Expect:</em> structure (5), application (8).</p></div>'+
   '</div></div>'
 },
 10:{
  "10.1":'<div class="vbox"><div class="vhead">The six-week training program · at a glance</div><div class="vnote">Volume ramps from one passage a day to full timed sections. Read on for each week\'s daily drills.</div>'+
   '<div class="flow">'+
   '<div class="fstep"><div class="fnum">1</div><div class="fbody"><b>Build the reader\'s eye</b><span>Install the perceptual habits - sentence types, translation, transitions, tone. No questions yet.</span><span class="ftime">~30 min/day</span></div></div>'+
   '<div class="fstep"><div class="fnum">2</div><div class="fbody"><b>Add the question phase</b><span>The four-move method + the elimination protocol. Untimed questions.</span><span class="ftime">~60 min/day</span></div></div>'+
   '<div class="fstep"><div class="fnum">3</div><div class="fbody"><b>Time the question phase</b><span>Three passages a day; cap the questions to budget. Read still untimed.</span><span class="ftime">~75 min/day</span></div></div>'+
   '<div class="fstep"><div class="fnum">4</div><div class="fbody"><b>Full ten-minute budget</b><span>Five passages a day, ten minutes each. The common plateau week - push through it.</span><span class="ftime">~60 min/day</span></div></div>'+
   '<div class="fstep"><div class="fnum">5</div><div class="fbody"><b>Full sections + targeting</b><span>Complete 9-passage sections in 90 min, alternating with weak-area practice.</span><span class="ftime">90-120 min/day</span></div></div>'+
   '<div class="fstep"><div class="fnum">6</div><div class="fbody"><b>Simulation + mistake repair</b><span>Test-condition sections; deep-dive the wrong-answer patterns that persist. Taper before test day.</span><span class="ftime">90-180 min/day</span></div></div>'+
   '</div></div>'
 }
};
