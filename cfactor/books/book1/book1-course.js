/* Book 1 — Biology (The Living Code) · course content + renderer.
   Ported from the BBB Book Biology PDF (374pg).
   Section-level progress, sticky right-rail TOC, resume, inline quick-checks. */

/* ---------- MODULE GROUPING (left sidebar) ---------- */
var MODULES=[
 {name:'Posture',     chs:[0],          ca:'var(--gold)',  desc:'Why carbon, the hierarchy, the method.'},
 {name:'Biomolecules',chs:[1,2,3,4],    ca:'var(--teal)',  desc:'Amino acids → enzymes → carbs/lipids → nucleotides.'},
 {name:'The Cell',    chs:[5,6],        ca:'var(--blue)',  desc:'Organelles, cycle, mitosis/meiosis, cancer.'},
 {name:'Energy',      chs:[7,8],        ca:'var(--purple)',desc:'Respiration, ATP, and photosynthesis.'},
 {name:'Heredity',    chs:[9,10,11],    ca:'var(--red)',   desc:'Inheritance, molecular genetics, evolution.'},
 {name:'Diversity',   chs:[12],         ca:'var(--gold)',  desc:'Microbes, viruses, the tree of life.'},
 {name:'Physiology',  chs:[13,14],      ca:'var(--green)', desc:'Integrated whole-body systems.'}
];

/* ---------- BOOK 1 COURSE DATA ---------- */
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

window.BOOK1_COURSE=[

/* =========================================================== */
/* CHAPTER 0 — ORIENTATION (FULLY PORTED) */
/* =========================================================== */
{
 n:0,
 title:'Orientation: How to Use This Book',
 subtitle:'The Posture of the Learner · Why Carbon · The Hierarchy of Life · The Method',
 tag:'Posture',
 foundational:'Course Roadmap — read first',
 buildsOn:null,
 setsUp:'Ch 1 — The chemistry of life is built on carbon and the hierarchy.',
 objectives:[
  'Adopt the learning posture that makes deep understanding possible: humility before mastery',
  'Explain why carbon is the chemical foundation of all known life',
  'Order the hierarchy of life from atom to biosphere and locate the cell as its pivot',
  'State the five unifying themes of biology and connect each to medicine',
  'Apply the method of this book: think mechanism, trust the discriminator, pivot fast, revisit',
  'Use the discriminators, clinical bridges, and high-yield anchors to study actively'
 ],
 opener:'Before the first fact, the posture. This short opening chapter installs the way of thinking the rest of the book assumes: why carbon anchors all of biology, why the cell is the pivot of the living hierarchy, the five themes that unify the field, and the method—mechanism first—that makes what you learn survive the exam and the wards. Get the posture right and everything after it becomes easier.\n\nThe beginning of wisdom is knowing that you do not know. Every student who fails to learn deeply fails the same way: they mistook recognizing a fact for understanding it. This chapter is the posture that prevents that mistake.\n\nWelcome to The C-Factor, a complete foundation in the biology that medicine is built on. This is not a list of facts to memorize; it is a way of seeing life, from the single carbon atom to the whole body, in which every level explains the one above it. By the end you will understand how a change in one chemical bond can impair one enzyme, disrupt one pathway, damage one organ, and present as a syndrome a physician must recognize on sight.\n\nEverything in this book follows one method and one structure. The method is mechanism first, memorization last. The structure repeats in every chapter: teaching prose builds the concept, a DISCRIMINATOR box sharpens the one distinction that is easy to get wrong, a CLINICAL BRIDGE shows where the concept reappears in medicine, and HIGH-YIELD ANCHORS compress what must survive forgetting. Read actively: predict the discriminator before you read it, and explain each clinical bridge to yourself in plain language.',
 pinnedDisc:{t:'MECHANISM vs MEMORIZATION', x:'Memorization stores an isolated fact; it is brittle and collapses when the question is reworded. Mechanism stores the why; it regenerates the fact on demand and transfers to questions you have never seen. Always build the mechanism first and let the facts hang off it. A fact without its mechanism is a fact you will lose.'},
 sections:[

  { id:'0.1', num:'0.1', title:'The Posture Principle: Humility as a Tool',
    blocks:[
     {t:'p',x:'Most learning failures are not failures of intelligence; they are failures of posture. The student who believes they already understand a topic stops processing it, and stops learning, the moment a familiar word appears. This is the most expensive habit in all of studying, and it has a name: premature closure. The cure is intellectual humility — the deliberate assumption that you do not yet fully understand, which keeps the mind open long enough to actually learn.'},
     {t:'p',x:'Humility is not modesty for its own sake; it is a cognitive tool. When you assume you might be wrong, you check your reasoning, you look for the detail that separates two similar ideas, and you notice the gap between recognizing a term and being able to explain it. The arrogant learner sees a word they have seen before and moves on; the humble learner asks whether they could rebuild the idea from scratch. Only the second kind of learner is actually studying.'},
     {t:'box',kind:'disc',label:'⚡ DISCRIMINATOR · RECOGNITION vs UNDERSTANDING',
       x:'RECOGNITION is the feeling that you have seen something before; it is fast, comfortable, and almost worthless under exam pressure. UNDERSTANDING is the ability to rebuild the idea from its mechanism and explain it in plain language. The trap is mistaking the first for the second. Test yourself constantly: not "have I seen this?" but "could I explain why this is true, from the ground up, right now?" If not, you do not own it yet, no matter how familiar it feels.'},
     {t:'box',kind:'bridge',label:'🌉 CLINICAL BRIDGE · WHY THIS COSTS POINTS ON EXAM DAY',
       x:'Exam questions are built to punish recognition and reward understanding. The wrong answers are engineered to look familiar, so a student running on recognition is drawn straight to them. The student who understands the mechanism is not fooled by a familiar-looking distractor because they can trace why it is wrong. Every time you settle for recognizing a fact instead of understanding it, you leave a trap armed for test day. Humility now is points later.'},
     {t:'box',kind:'hy',label:'◆ HIGH-YIELD',items:[
      'Premature closure (stopping when a pattern looks familiar) is the most expensive study habit',
      'Intellectual humility is a tool: assume you do not yet understand, and keep processing',
      'Test of understanding: can you rebuild it from mechanism and explain it in plain language?',
      'Recognition is fast and nearly worthless under pressure; understanding survives the exam'
     ]}
    ],
    quickcheck:[
     { stem:'A student reads a passage about competitive inhibition, recognizes the term, and moves on without pausing. Two weeks later they miss a question that reframes the same concept as "a drug that occupies the active site is displaced by adding more substrate." What study failure does this best illustrate?',
       choices:['Inadequate memorization of definitions','Premature closure: mistaking recognition for understanding','Insufficient practice question volume','Poor time management on test day'],
       answer:1,
       why:'The student recognized the term but never built the mechanism. The reworded question exposes that recognition without understanding is brittle — exactly the trap Section 0.1 warns about.'}
    ]
  },

  { id:'0.2', num:'0.2', title:'Why Carbon: The Atom That Anchors Life',
    blocks:[
     {t:'p',x:'This book is built around one atom: carbon. The reason is structural. Carbon has four valence electrons — exactly half of a full outer shell — so it forms four strong covalent bonds and shows no strong tendency to either give electrons away or take them. That balance lets carbon bond with itself and with many other elements in long chains, branched structures, and rings, building molecules of almost unlimited size and variety. No other common element is so versatile, which is why all known life is carbon-based and why the chemistry of carbon is the chemistry of life.'},
     {t:'p',x:'Carbon\'s four-bond versatility is the foundation everything else rests on. The proteins, carbohydrates, lipids, and nucleic acids of the coming chapters are all carbon skeletons decorated with functional groups. The enzymes that run metabolism, the membranes that build cells, the DNA that stores heredity — every one is a carbon-based molecule. Understand why carbon can build such diversity and you understand why biology has the molecular richness it does.'},
     {t:'vbox',head:'CARBON · WHY IT WINS THE LIFE LOTTERY',html:
      '<div class="compare">'+
      '<div class="cmp-card" style="--ca:var(--teal)"><div class="ct">CARBON</div><p>4 valence electrons → 4 covalent bonds. Stable enough to last; weak enough that enzymes can remake at body temperature. Chains, branches, rings: the molecular alphabet of life.</p><span class="ck">STABLE · REVERSIBLE</span></div>'+
      '<div class="cmp-card" style="--ca:var(--gold)"><div class="ct">SILICON</div><p>Also 4 valence electrons. But Si-Si bonds lock into rigid solids (sand, quartz). Cannot form the long flexible chains that life\'s remodeling chemistry demands.</p><span class="ck">RIGID · LOCKED</span></div>'+
      '</div>'},
     {t:'box',kind:'disc',label:'⚡ DISCRIMINATOR · CARBON vs SILICON',
       x:'Silicon also has four valence electrons, so why is life not silicon-based? Because carbon\'s bonds are the right strength: strong enough to be stable, weak enough to be broken and rebuilt by enzymes at body temperature. Silicon\'s bonds lock into rigid solids (sand, quartz) rather than the flexible, reversible chemistry life needs, and it cannot form stable long chains with itself the way carbon does. Carbon hits the unique sweet spot of stable-but-reversible.'},
     {t:'box',kind:'hy',label:'◆ HIGH-YIELD',items:[
      'Carbon has 4 valence electrons → 4 covalent bonds → chains, branches, and rings',
      'Carbon bonds are stable enough to last but reversible enough for enzymes to remake at body temperature',
      'All four biomolecule classes are carbon skeletons; the chemistry of carbon is the chemistry of life'
     ]}
    ],
    quickcheck:[
     { stem:'Why is life on Earth not built on silicon, even though silicon also has four valence electrons?',
       choices:['Silicon is too rare in Earth\'s crust','Silicon cannot form four bonds at body temperature','Silicon\'s bonds form rigid solids and lack the reversibility enzymes need','Silicon atoms repel water'],
       answer:2,
       why:'Carbon wins because its bonds are stable enough to persist but weak enough that enzymes can break and remake them at body temperature. Silicon-silicon bonds lock into rigid networks (quartz, sand) and cannot support the flexible, reversible chemistry life requires.'}
    ]
  },

  { id:'0.3', num:'0.3', title:'The Hierarchy of Life and the Five Themes',
    blocks:[
     {t:'p',x:'Biology is organized as a nested hierarchy, each level built from the one below and showing properties the lower level lacks: atom, molecule, organelle, cell, tissue, organ, organ system, organism, population, community, ecosystem, biosphere. This book walks up that ladder. A central idea makes it more than a list: emergent properties. At each level, new properties appear that none of the parts had alone — a single water molecule is not wet, a single neuron does not think. Life itself is an emergent property that appears at one specific rung, and that rung is the cell.'},
     {t:'vbox',head:'THE HIERARCHY · WHERE LIFE BEGINS',html:
      '<div class="hier">'+
      '<div class="hier-row" style="--lc:var(--text-dim)"><span class="hier-n">01</span><div class="hier-w">Atom<span>The chemical unit</span></div><span class="hier-tag">chemistry</span></div>'+
      '<div class="hier-row" style="--lc:var(--text-dim)"><span class="hier-n">02</span><div class="hier-w">Molecule<span>Atoms bonded</span></div><span class="hier-tag">chemistry</span></div>'+
      '<div class="hier-row" style="--lc:var(--text-dim)"><span class="hier-n">03</span><div class="hier-w">Organelle<span>Functional sub-cell unit</span></div><span class="hier-tag">chemistry</span></div>'+
      '<div class="hier-row" style="--lc:var(--gold)"><span class="hier-n">04</span><div class="hier-w">CELL · the pivot<span>The smallest living thing</span></div><span class="hier-tag">LIFE BEGINS</span></div>'+
      '<div class="hier-row" style="--lc:var(--teal)"><span class="hier-n">05</span><div class="hier-w">Tissue<span>Cells of one type</span></div><span class="hier-tag">life</span></div>'+
      '<div class="hier-row" style="--lc:var(--teal)"><span class="hier-n">06</span><div class="hier-w">Organ → Organ system<span>Tissues working together</span></div><span class="hier-tag">life</span></div>'+
      '<div class="hier-row" style="--lc:var(--teal)"><span class="hier-n">07</span><div class="hier-w">Organism<span>The whole patient</span></div><span class="hier-tag">life</span></div>'+
      '<div class="hier-row" style="--lc:var(--teal)"><span class="hier-n">08</span><div class="hier-w">Population → community → ecosystem → biosphere<span>Life in context</span></div><span class="hier-tag">life</span></div>'+
      '</div>'+
      '<div class="vnote">The cell is the smallest unit at which metabolism, reproduction, and response to environment all emerge together. Below the cell: chemistry. At and above the cell: life.</div>'},
     {t:'p',x:'Across all its complexity, biology returns to five unifying themes, and naming them now gives you hooks for every later fact. Structure determines function (form fits function at every level — shaped wrong means works wrong, a huge share of disease). Information flows (DNA stores and transmits life\'s instructions). Energy and matter are captured and transformed (metabolism). Parts interact within and between systems (homeostasis and feedback). And evolution unifies all life (descent with modification). Of these, structure–function is the one you will use most, and evolution is the frame that makes the rest cohere.'},
     {t:'box',kind:'disc',label:'⚡ DISCRIMINATOR · THE CELL: WHERE NON-LIFE BECOMES LIFE',
       x:'The single most important boundary in the hierarchy is the CELL. Everything below it (atoms, molecules, even organelles) is chemistry, not alive on its own. The cell is the smallest unit that is alive, where metabolism, reproduction, and response to the environment all emerge together. This is why a virus (molecules, not a cell) sits in a gray zone, and why the cell is the pivot of the whole hierarchy. Below the cell: chemistry. At and above the cell: life.'},
     {t:'box',kind:'bridge',label:'🌉 CLINICAL BRIDGE · DISEASE LIVES AT EVERY LEVEL AT ONCE',
       x:'A single disease threads through every rung of the hierarchy simultaneously. A mutation (a change in a molecule) alters a protein, disables a cell process, damages a tissue and organ, and presents as a syndrome in the whole person. Sickle cell disease is one changed amino acid that deforms a protein that deforms a red cell that blocks a vessel that infarcts an organ. Learning to read disease up and down the hierarchy — from molecule to patient — is exactly what clinical reasoning is, and it is the skill this book trains.'},
     {t:'box',kind:'hy',label:'◆ HIGH-YIELD',items:[
      'Hierarchy: atom → molecule → organelle → cell → tissue → organ → system → organism → population → community → ecosystem → biosphere',
      'Emergent properties: each level has properties its parts lack; life emerges at the CELL (the pivot)',
      'Five themes: structure/function, information flow, energy/matter, interactions, evolution',
      'Structure–function is used most; evolution is the unifying frame; disease threads every level at once'
     ]}
    ],
    quickcheck:[
     { stem:'Where in the biological hierarchy does "life" first emerge?',
       choices:['At the molecule (DNA can replicate)','At the organelle (mitochondria make ATP)','At the cell (metabolism, reproduction, and response all emerge together)','At the tissue (cells coordinate)'],
       answer:2,
       why:'The cell is the pivot of the hierarchy — the smallest unit at which all three defining properties of life appear together. Everything below it is chemistry; viruses (mere molecules) sit in the gray zone for exactly this reason.'}
    ]
  },

  { id:'0.4', num:'0.4', title:'The Method: How to Use This Book',
    blocks:[
     {t:'p',x:'Every chapter is built around the same four cognitive moves, and by the end they should feel like reflexes. Think mechanism: before memorizing any fact, ask what is actually happening at the molecular or cellular level — because the mechanism survives when the memorized fact dissolves under pressure. Trust the discriminator: for any two ideas that are easy to confuse, find the one detail that separates them, since most exam errors come from picking the familiar neighbor of the right answer. Pivot fast: once you know the answer, commit and move on. Revisit in 48 hours: re-explain each new concept from memory two days later — the window where memory is most fragile and most improvable.'},
     {t:'vbox',head:'THE FOUR MOVES · THE METHOD OF THIS BOOK',html:
      '<div class="path">'+
      '<div class="pstep"><div class="pnum">1</div><div class="pbody"><b>THINK MECHANISM</b><span>Ask what is physically happening before you memorize any fact. Mechanism regenerates the fact; memorization alone forgets it.</span></div></div>'+
      '<div class="pstep"><div class="pnum">2</div><div class="pbody"><b>TRUST THE DISCRIMINATOR</b><span>For any two confusable ideas, find the one detail that separates them. Most wrong answers are the familiar neighbor of the right answer.</span></div></div>'+
      '<div class="pstep"><div class="pnum">3</div><div class="pbody"><b>PIVOT FAST</b><span>Once you know the answer, commit and move on. Lingering is a losing trade against the clock.</span></div></div>'+
      '<div class="pstep"><div class="pnum">4</div><div class="pbody"><b>REVISIT IN 48 HOURS</b><span>Re-explain from memory two days later — the window where memory is most fragile and most improvable.</span></div></div>'+
      '</div>'},
     {t:'p',x:'The boxes in every chapter map onto these moves. Gold DISCRIMINATOR boxes are the one distinction to master. Blue CLINICAL BRIDGE boxes show where the science becomes medicine. Green HIGH-YIELD ANCHOR boxes compress the must-know facts. Use them actively — predict, explain, and self-test — rather than reading passively, and the book becomes a training program for clinical reasoning, not just a reference.'},
     {t:'box',kind:'disc',label:'⚡ DISCRIMINATOR · MECHANISM vs MEMORIZATION',
       x:'MEMORIZATION stores an isolated fact; it is brittle and collapses when the question is reworded. MECHANISM stores the why; it regenerates the fact on demand and transfers to questions you have never seen. Always build the mechanism first and let the facts hang off it. A fact without its mechanism is a fact you will lose. Flashcards retain what you have already understood; they never substitute for understanding it.'},
     {t:'box',kind:'hy',label:'◆ HIGH-YIELD',items:[
      'Think mechanism (what is physically happening) before memorizing the fact',
      'Trust the discriminator: find the one detail separating two confusable ideas',
      'Pivot fast (commit and move on); revisit in 48 hours (re-explain from memory)',
      'Mechanism regenerates facts and transfers to new questions; memorization alone does not',
      'Use the boxes actively: predict the discriminator, explain the clinical bridge, self-test the anchors'
     ]}
    ],
    quickcheck:[
     { stem:'You learn that competitive inhibitors raise apparent Km but leave Vmax unchanged. Two days later, you can\'t recall it. Which of the "four moves" did you most likely skip?',
       choices:['Pivot fast','Trust the discriminator','Think mechanism (and revisit in 48h)','Read more carefully the first time'],
       answer:2,
       why:'The fact was memorized but the mechanism — that the inhibitor competes with substrate, so adding more substrate outcompetes it (Vmax preserved) but you need MORE substrate to reach it (Km up) — was never built. With the mechanism, the fact regenerates itself.'}
    ]
  }
 ],
 bottomLine:'Carbon\'s four-bond versatility is the chemical foundation of all life, and biology is a hierarchy from atom to biosphere in which the cell is the pivot where chemistry becomes life. Five themes unify the field: structure/function (used most), information flow, energy/matter, interactions, and evolution (the frame that makes the rest cohere). The posture that makes it all stick is humility: assume you do not yet understand, build mechanism before memorizing, trust the discriminator, pivot fast, and revisit in 48 hours. Recognition is not understanding, and only understanding survives the exam and the wards.',
 nextHint:'With the posture set and carbon at the center, Chapter 1 builds the complete chemistry foundation — atoms, bonds, water, pH, functional groups, the four biomolecule classes, and enzyme kinetics — that every later chapter depends on.'
},

/* =========================================================== */
/* CHAPTER 1 — AMINO ACIDS, PEPTIDES, AND PROTEINS (STRUCTURE + KEY BOXES) */
/* =========================================================== */
{
 n:1,
 title:'Amino Acids, Peptides, and Proteins',
 subtitle:'Foundational Concept 1 · AAMC Content Category 1A · Biochemistry',
 tag:'Biomolecules',
 foundational:'The verbs of biology — and the most-tested unit on the MCAT',
 buildsOn:'Ch 0 — carbon\'s four-bond versatility and the hierarchy of life.',
 setsUp:'Ch 2 — enzymes (folded proteins that do catalysis); Ch 13–14 — hemoglobin physiology.',
 objectives:[
  'Draw the general amino acid; classify all 20 by side-chain chemistry including every special case',
  'Predict charge at any pH and calculate isoelectric point (pI) with worked numeric examples',
  'Explain the peptide bond geometry and why it dictates the allowed backbone conformations',
  'Describe all four levels of protein structure and the exact force stabilizing each',
  'Explain protein folding, chaperones, and what happens when folding fails (amyloid, prions)',
  'Describe how proteins are separated, sequenced, and quantified in the laboratory',
  'Explain hemoglobin cooperativity, allostery, and the Bohr effect as the bridge to physiology',
  'Trace single sequence changes and amino-acid metabolic blocks to specific diseases'
 ],
 opener:'Proteins are not a topic. They are the verbs of biology. Almost everything a cell does, it does with a protein, and almost everything that goes wrong in medicine is a protein doing its job wrong.\n\nStart with a number that reframes the chapter: proteins make up more than half of the dry mass of most cells. They are the enzymes that run metabolism, the antibodies that fight infection, the channels that fire a neuron, the collagen that holds your skin together, the hemoglobin that carries your oxygen, and the receptors that every drug you will ever prescribe must bind. Understand proteins and you are not learning one MCAT topic — you are learning the machinery the rest of biology, all of biochemistry, and most of pathology are built on.\n\nThis chapter has two jobs at once. First, teach the college-level chemistry of amino acids and proteins completely, because it is the foundation everything else rests on. Second, at every step, answer the question college courses skip: so what, and why does it matter at the bedside.',
 pinnedDisc:{t:'WHAT HOLDS EACH LEVEL OF PROTEIN STRUCTURE TOGETHER',
  x:'Primary = covalent peptide bonds. Secondary = backbone H-bonds (α-helix and β-sheet). Tertiary = side-chain interactions (hydrophobic core, H-bonds, ionic pairs, disulfides). Quaternary = the same forces between separate subunits. Get these four bonds right and most protein-structure questions resolve themselves.'},
 sections:[
  { id:'1.1', num:'1.1', title:'The Amino Acid: One Design, Twenty Personalities',
    blocks:[
     {t:'p',x:'Every amino acid in your body shares the same skeleton: a central carbon (the α-carbon) with four groups attached — an amino group (–NH₂), a carboxyl group (–COOH), a hydrogen, and a variable side chain (R). Twenty different R groups produce twenty different amino acids, but the shared backbone is what makes them chain together identically into proteins. The R group is the personality; the backbone is the framework.'},
     {t:'formula',x:'H₂N — Cα(H)(R) — COOH',note:'The general amino acid. The α-carbon is the chiral center (except in glycine, where R = H).'},
     {t:'p',x:'Side chains sort into four functional families: nonpolar (hydrophobic), polar uncharged, acidic (negative at physiological pH), and basic (positive at physiological pH). You do not need to draw all 20 from memory, but you must classify them on sight — because charge, polarity, and the special cases (glycine, proline, cysteine) drive every downstream question on folding, enzyme catalysis, and disease.'},
     {t:'box',kind:'bridge',label:'🌉 CLINICAL BRIDGE · ESSENTIAL AMINO ACIDS AND PKU',
       x:'Nine amino acids are "essential" — you must eat them. The most clinically famous is phenylalanine: in phenylketonuria (PKU), a defective enzyme cannot convert it to tyrosine, so phenylalanine accumulates and damages the developing brain. PKU is the template for the entire class of inborn errors of metabolism: one missing enzyme, one accumulating substrate, one diagnosable syndrome.'},
     {t:'scaffold',x:'Full content for §1.1 (all 20 side-chain classifications, the special cases — Gly, Pro, Cys — and worked examples) is being ported from the book in the next pass. The discriminator and clinical bridge above are the chapter\'s anchors for this section.'}
    ],
    quickcheck:[
     { stem:'Which amino acid is the only one without a chiral α-carbon?',
       choices:['Alanine','Glycine','Serine','Proline'],
       answer:1,
       why:'Glycine\'s R group is just a hydrogen, so its α-carbon has two identical H substituents — no chirality. Proline is also unusual (its R loops back to the amino group, making it the only secondary amine) but it remains chiral.'}
    ]
  },
  { id:'1.2', num:'1.2', title:'Charge, pKa, and the Isoelectric Point',
    blocks:[
     {t:'box',kind:'disc',label:'⚡ DISCRIMINATOR · pKa vs pI',
       x:'pKa is a property of one ionizable group — the pH at which that group is half protonated, half deprotonated. pI is a property of the whole amino acid — the pH at which the molecule\'s net charge is zero. For a simple amino acid with no charged side chain, pI = (pKa₁ + pKa₂) / 2. For acidic or basic side chains, average the two pKa\'s flanking the neutral form. Mix these up and every titration problem will look wrong.'},
     {t:'box',kind:'bridge',label:'🌉 CLINICAL BRIDGE · HISTIDINE, THE BUFFER IN YOUR BLOOD',
       x:'Histidine\'s imidazole side chain has a pKa near 6.0 — uniquely close to physiological pH 7.4. That makes histidine residues the dominant pH buffers in proteins like hemoglobin, and they are exactly the residues that pick up the proton when CO₂ rises (the Bohr effect). One amino acid, one pKa, one mechanism behind the entire respiratory acid-base story.'},
     {t:'scaffold',x:'Full §1.2 with worked pI calculations and titration curves is being ported next.'}
    ]
  },
  { id:'1.3', num:'1.3', title:'The Peptide Bond and Primary Structure',
    blocks:[{t:'scaffold',x:'Section structure in place — peptide bond geometry, planarity, partial double-bond character, and why this geometry dictates the allowed backbone conformations. Full prose ports in the next pass.'}]
  },
  { id:'1.4', num:'1.4', title:'The Four Levels of Protein Structure',
    blocks:[
     {t:'vbox',head:'THE FOUR LEVELS · WHAT HOLDS EACH ONE TOGETHER',html:
      '<div class="path">'+
      '<div class="pstep"><div class="pnum">1°</div><div class="pbody"><b>PRIMARY · sequence</b><span>Covalent peptide bonds. The amino-acid sequence written N→C.</span></div></div>'+
      '<div class="pstep"><div class="pnum">2°</div><div class="pbody"><b>SECONDARY · local fold</b><span>Backbone hydrogen bonds — α-helix (intra-strand H-bonds) and β-sheet (inter-strand H-bonds).</span></div></div>'+
      '<div class="pstep"><div class="pnum">3°</div><div class="pbody"><b>TERTIARY · 3D shape</b><span>Side-chain interactions: hydrophobic core, H-bonds, ionic pairs (salt bridges), and disulfide bonds (Cys–Cys).</span></div></div>'+
      '<div class="pstep"><div class="pnum">4°</div><div class="pbody"><b>QUATERNARY · assembly</b><span>The same forces, but BETWEEN separate polypeptide subunits (e.g. hemoglobin\'s two α + two β chains).</span></div></div>'+
      '</div>'},
     {t:'scaffold',x:'Worked examples (collagen triple helix, β-barrels, hemoglobin assembly) and the "what disrupts which force" discriminator port next.'}
    ]
  },
  { id:'1.5', num:'1.5', title:'Protein Folding: The Most Important Reaction You Cannot See',
    blocks:[{t:'scaffold',x:'Chaperones, the folding funnel, denaturation vs misfolding vs mutation, and the amyloid/prion clinical bridge port next.'}]
  },
  { id:'1.6', num:'1.6', title:'Separating, Sequencing, and Quantifying Proteins',
    blocks:[{t:'scaffold',x:'Electrophoresis (SDS-PAGE, isoelectric focusing), chromatography, Edman/mass spec, ELISA / Western — what each one separates by and when to pick which.'}]
  },
  { id:'1.7', num:'1.7', title:'Sickle Cell Disease: Primary Structure Controls Everything',
    blocks:[{t:'scaffold',x:'One amino acid (Glu→Val at β6) → one deformed protein → one sickled red cell → one infarcted organ. The template for tracing disease up the hierarchy.'}]
  },
  { id:'1.8', num:'1.8', title:'Hemoglobin Cooperativity and the Oxygen Curve',
    blocks:[{t:'scaffold',x:'Hb vs Mb, cooperativity, the sigmoidal curve, the Bohr effect, 2,3-BPG, fetal Hb.'}]
  },
  { id:'1.9', num:'1.9', title:'Collagen and the Fibrous Proteins',
    blocks:[{t:'scaffold',x:'Gly-X-Y repeat, hydroxylation (vitamin C), triple helix, and the classic discriminators: collagen vs elastin vs fibrillin (scurvy, Ehlers-Danlos, Marfan).'}]
  },
  { id:'1.10', num:'1.10', title:'Post-Translational Modification',
    blocks:[{t:'scaffold',x:'Phosphorylation, glycosylation, ubiquitination, lipidation — modifications as the dynamic regulator of protein function (and as drug targets).'}]
  },
  { id:'1.11', num:'1.11', title:'Worked MCAT-Style Passages',
    blocks:[{t:'scaffold',x:'A pair of MCAT-format passages with full answer keys will be wired here — the assessment loop is already plumbed in book1-practice.js.'}]
  },
  { id:'1.12', num:'1.12', title:'High-Yield Cheat Sheet',
    blocks:[{t:'scaffold',x:'One-page review of everything in this chapter — the exact card you scan five minutes before a test.'}]
  }
 ],
 bottomLine:'Twenty amino acids, four side-chain families, four levels of structure, four stabilizing forces. The primary sequence is the only thing the genome specifies — everything else (fold, function, disease) follows from chemistry. One wrong amino acid (sickle cell) deforms the protein; one missing enzyme (PKU) accumulates the substrate; one misfold (amyloid, prions) kills the cell. Proteins are the verbs of biology.',
 nextHint:'Chapter 1 ended with a folded protein. Chapter 2 is about what most folded proteins do for a living: catalysis. Same chemistry, new question — how fast.'
},

/* =========================================================== */
/* CHAPTER 2 — ENZYMES (STRUCTURE + KEY BOXES) */
/* =========================================================== */
{
 n:2,
 title:'Enzymes and Enzyme Kinetics',
 subtitle:'Foundational Concept 1 · AAMC Content Category 1D · Biochemistry',
 tag:'Biomolecules',
 foundational:'How proteins do work — and why most drugs are enzyme inhibitors',
 buildsOn:'Ch 1 — the folded protein and its active site.',
 setsUp:'Ch 7 — every metabolic step is an enzyme; Ch 10 — DNA/RNA polymerases.',
 objectives:[
  'Explain what an enzyme does (lowers activation energy) and what it does not (change ΔG)',
  'Describe the active site, induced fit, and transition-state stabilization',
  'Classify enzymes by the six IUBMB classes and recognize each from a reaction',
  'Distinguish cofactors from coenzymes and connect vitamins to enzyme failures',
  'Derive and interpret Michaelis-Menten kinetics: Km, Vmax, kcat, kcat/Km',
  'Read a Lineweaver-Burk plot and identify inhibitor type from x- and y-intercepts',
  'Discriminate competitive, noncompetitive, uncompetitive, and mixed inhibition',
  'Explain allosteric regulation, cooperativity, and feedback inhibition',
  'Recognize covalent regulation (phosphorylation, zymogen cleavage)',
  'Use enzymes as diagnostic windows (troponin, AST/ALT, lipase, creatine kinase)'
 ],
 opener:'Chapter 1 ended with a folded protein. This chapter is about what most folded proteins do for a living: catalysis. An enzyme is a protein that speeds up a chemical reaction by many orders of magnitude without being consumed. That single ability is what makes life chemistry — without enzymes, your reactions would happen, but on geological timescales. With enzymes, the same reactions happen in milliseconds, under precise control, exactly where and when the cell needs them.',
 pinnedDisc:{t:'COMPETITIVE vs NONCOMPETITIVE INHIBITION',
  x:'Competitive: inhibitor binds the active site, competes with substrate. Outcompeted by adding more substrate → Vmax UNCHANGED, apparent Km UP. Noncompetitive: binds a different site, can\'t be outcompeted. Vmax DOWN, Km unchanged. Memorize this pair and 80% of enzyme inhibitor questions resolve themselves.'},
 sections:[
  { id:'2.1', num:'2.1', title:'What an Enzyme Does: Activation Energy',
    blocks:[
     {t:'p',x:'Every chemical reaction must climb an energy hill called the activation energy (Eₐ) before products can form. An enzyme lowers that hill without changing where the reaction ends up — the equilibrium constant and ΔG are fixed by thermodynamics, untouched by any catalyst. The enzyme changes how fast you get there, not where you go.'},
     {t:'box',kind:'disc',label:'⚡ DISCRIMINATOR · WHAT AN ENZYME CHANGES vs WHAT IT DOES NOT',
       x:'Enzymes lower activation energy — they speed BOTH the forward and reverse reactions by the same factor. They do NOT change ΔG, Keq, the position of equilibrium, or whether the reaction is favorable. A favorable reaction with no enzyme still happens; it just takes geological time. An unfavorable reaction with the world\'s best enzyme still does not run. Catalysis is about kinetics, not thermodynamics.'},
     {t:'scaffold',x:'Full §2.1 prose + the coupling-vs-catalysis discriminator + the cyanide/ATP clinical bridge port next.'}
    ],
    quickcheck:[
     { stem:'An enzyme lowers the activation energy of a reaction by 25 kJ/mol. Which of the following also changes?',
       choices:['The equilibrium constant (Keq) shifts toward products','ΔG becomes more negative','The reaction reaches equilibrium faster, but Keq and ΔG are unchanged','The reverse reaction is now slower than the forward'],
       answer:2,
       why:'Enzymes are kinetic, not thermodynamic. They speed both directions equally — Keq and ΔG are fixed by the chemistry of reactants and products and are untouched by the catalyst. The reaction simply reaches the same equilibrium faster.'}
    ]
  },
  { id:'2.2', num:'2.2', title:'The Active Site and Induced Fit',
    blocks:[{t:'scaffold',x:'Lock-and-key vs induced fit, transition-state stabilization, and why drug specificity is possible.'}]
  },
  { id:'2.3', num:'2.3', title:'The Six Enzyme Classes',
    blocks:[{t:'scaffold',x:'Oxidoreductases, transferases, hydrolases, lyases, isomerases, ligases — recognize each from a reaction.'}]
  },
  { id:'2.4', num:'2.4', title:'Cofactors, Coenzymes, and Vitamins',
    blocks:[{t:'scaffold',x:'NAD+/FAD/CoA from B-vitamins; a vitamin deficiency IS an enzyme failure.'}]
  },
  { id:'2.5', num:'2.5', title:'Michaelis-Menten: Km and Vmax',
    blocks:[
     {t:'formula',x:'v = Vmax · [S] / (Km + [S])',note:'Km is the substrate concentration at which v = ½Vmax. Low Km = high affinity.'},
     {t:'box',kind:'disc',label:'⚡ DISCRIMINATOR · Km vs Vmax',
      x:'Vmax is the ceiling — the rate when every enzyme molecule is saturated with substrate. It depends on [enzyme] and how fast the enzyme can turn over (kcat). Km is the substrate concentration at half-Vmax — a measure of enzyme-substrate AFFINITY (low Km = tight binding). Add inhibitor: competitive raises Km, leaves Vmax; noncompetitive lowers Vmax, leaves Km.'},
     {t:'scaffold',x:'Worked Km/Vmax problems and the fomepizole/alcohol-dehydrogenase clinical bridge port next.'}
    ]
  },
  { id:'2.6', num:'2.6', title:'The Lineweaver-Burk Plot',
    blocks:[
     {t:'formula',x:'1/v = (Km/Vmax)(1/[S]) + 1/Vmax',note:'Double-reciprocal plot: y-intercept = 1/Vmax, x-intercept = −1/Km, slope = Km/Vmax.'},
     {t:'scaffold',x:'Reading the four inhibitor types from intercept changes.'}
    ]
  },
  { id:'2.7', num:'2.7', title:'Enzyme Inhibition: The Heart of Pharmacology',
    blocks:[
     {t:'vbox',head:'THE FOUR INHIBITOR TYPES',html:
      '<div class="compare" style="grid-template-columns:repeat(2,1fr)">'+
      '<div class="cmp-card" style="--ca:var(--teal)"><div class="ct">COMPETITIVE</div><p>Binds active site. Outcompeted by more substrate. <b>Vmax unchanged · Km ↑</b></p><span class="ck">e.g. methotrexate vs dihydrofolate</span></div>'+
      '<div class="cmp-card" style="--ca:var(--gold)"><div class="ct">NONCOMPETITIVE</div><p>Binds allosteric site. Cannot be outcompeted. <b>Vmax ↓ · Km unchanged</b></p><span class="ck">e.g. cyanide on cytochrome c</span></div>'+
      '<div class="cmp-card" style="--ca:var(--purple)"><div class="ct">UNCOMPETITIVE</div><p>Binds only the ES complex. <b>Vmax ↓ · Km ↓</b> (both fall proportionally)</p><span class="ck">e.g. lithium on inositol monophosphatase</span></div>'+
      '<div class="cmp-card" style="--ca:var(--red)"><div class="ct">MIXED</div><p>Binds either E or ES with different affinity. <b>Vmax ↓ · Km may shift either way</b></p><span class="ck">most "real" inhibitors</span></div>'+
      '</div>'},
     {t:'scaffold',x:'Full §2.7 worked examples and the "every inhibitor type is a real drug" clinical bridge port next.'}
    ],
    quickcheck:[
     { stem:'A drug binds an enzyme at the active site and competes directly with substrate. Adding excess substrate restores activity. On a Lineweaver-Burk plot, which intercept changes?',
       choices:['Y-intercept rises (Vmax falls)','X-intercept moves toward zero (Km rises)','Both intercepts move together','Neither — competitive inhibitors don\'t show on Lineweaver-Burk'],
       answer:1,
       why:'Competitive inhibition: Vmax unchanged (y-intercept fixed) but apparent Km rises, so the x-intercept (−1/Km) moves toward zero. The plot rotates around its y-intercept.'}
    ]
  },
  { id:'2.8', num:'2.8', title:'Allosteric Regulation and Cooperativity',
    blocks:[{t:'scaffold',x:'Sigmoidal kinetics, T/R states, feedback inhibition.'}]
  },
  { id:'2.9', num:'2.9', title:'Covalent Modification and Zymogens',
    blocks:[{t:'scaffold',x:'Phosphorylation cascades and pancreatitis as a zymogen activated in the wrong place.'}]
  },
  { id:'2.10', num:'2.10', title:'Temperature, pH, and the Limits of an Enzyme',
    blocks:[{t:'scaffold',x:'Pepsin at pH 2 vs trypsin at pH 8 — pH optima match anatomy.'}]
  },
  { id:'2.11', num:'2.11', title:'Enzymes as Diagnostic Windows',
    blocks:[{t:'scaffold',x:'Troponin (MI), AST/ALT (liver), lipase (pancreas), CK (muscle).'}]
  },
  { id:'2.12', num:'2.12', title:'Worked MCAT-Style Passages',
    blocks:[{t:'scaffold',x:'Two MCAT-style passages wired through book1-practice.js.'}]
  },
  { id:'2.13', num:'2.13', title:'High-Yield Cheat Sheet',
    blocks:[{t:'scaffold',x:'One-page review.'}]
  }
 ],
 bottomLine:'An enzyme is a folded protein that lowers activation energy without changing thermodynamics. Michaelis-Menten describes how fast (Km = affinity, Vmax = ceiling). Inhibitors are the basis of pharmacology — competitive raises Km, noncompetitive lowers Vmax, uncompetitive lowers both. Allostery and covalent modification are how cells turn enzymes on and off. Diagnostic enzymes in blood are the bedside readout of which organ is failing.',
 nextHint:'Chapters 1–2 built proteins and the enzymes that run on them. Chapter 3 covers the other two great classes of biomolecules: carbohydrates (the fast fuel) and lipids (the membranes and stores).'
},

/* =========================================================== */
/* CHAPTERS 3–14 — SCAFFOLDED (titles + sections + dependency hints) */
/* Section titles ported directly from the BBB Biology PDF. */
/* =========================================================== */

mkScaffold(3,'Carbohydrates and Lipids','Biomolecules','Sugars, fats, membranes, lipoproteins',
 'Ch 1–2 — protein chemistry; Ch 0 — carbon skeletons','Ch 7 — these are the fuels respiration burns.',
 ['What a Carbohydrate Is: The Building Block','Stereochemistry of Sugars: D/L and Anomers','Glycosidic Bonds, Disaccharides, and Polysaccharides','Reducing Sugars and the Chemistry of Glucose Testing','When Sugar Metabolism Breaks: Inherited Disorders','What a Lipid Is: The Unifying Property','Fatty Acids and Triacylglycerols: Saturation and Cis/Trans','The Major Lipid Classes','The Cell Membrane: Bilayers, Fluid Mosaic, and Fluidity','Lipids in the Blood: Lipoproteins and Cardiovascular Disease','Worked MCAT-Style Passages','High-Yield Cheat Sheet']),

mkScaffold(4,'Nucleotides and Nucleic Acids','Biomolecules','DNA/RNA structure, base pairing, the central dogma',
 'Ch 1–3 — the other three biomolecule classes','Ch 6 — cell cycle; Ch 10 — molecular genetics.',
 ['The Nucleotide: Three Parts','Functional Groups and Their Chemistry','The Backbone: Phosphodiester Bonds and Directionality','The Double Helix: Base Pairing, Antiparallel Strands, Chargaff','DNA vs RNA: Same Idea, Different Jobs','The RNA Cast and the Central Dogma (Overview)','Nucleotide Metabolism: Synthesis and Salvage','When Nucleotide Metabolism Breaks: Inherited Disease','DNA Packaging and a Glimpse of Replication','Worked MCAT-Style Passages','High-Yield Cheat Sheet']),

mkScaffold(5,'The Cell: Structure and Organelles','The Cell','Compartments, transport, organelle disease',
 'Ch 1–4 — all four biomolecule classes','Ch 6 — cycle and cancer; Ch 13–14 — physiology.',
 ['Cell Theory and How We See Cells','Two Kinds of Cell: Prokaryote vs Eukaryote','The Nucleus: The Cell\'s Archive','The Endomembrane System: Manufacturing and Shipping','Lysosomes, Peroxisomes, and the Proteasome','Mitochondria: Power, Origins, and Death','Ribosomes: Where Proteins Are Made','The Cytoskeleton and Molecular Motors','Cilia and Flagella: Movement and Kartagener','Crossing the Membrane: Transport In and Out','Junctions and the Extracellular Matrix','Worked MCAT-Style Passages','High-Yield Cheat Sheet']),

mkScaffold(6,'The Cell Cycle, Mitosis, Meiosis, and Cancer','The Cell','Checkpoints, division, aneuploidy, cancer',
 'Ch 5 — the cell','Ch 9 — inheritance; Ch 10 — molecular genetics.',
 ['The Cell Cycle: Phases and Purpose','Checkpoints: Cyclins, CDKs, and Tumor Suppressors','Mitosis: Making Two Identical Cells','Meiosis: Making Eggs and Sperm, and Genetic Diversity','When Division Goes Wrong I: Nondisjunction and Aneuploidy','When Division Goes Wrong II: Cancer','Worked Passages','High-Yield Cheat Sheet']),

mkScaffold(7,'Cellular Respiration and Metabolism','Energy','Glycolysis, citric acid cycle, ATP, fuel use',
 'Ch 2 — enzymes; Ch 3 — fuels','Ch 8 — photosynthesis runs it in reverse.',
 ['The Logic of Energy Harvest: Oxidation, ATP, Electron Carriers','Glycolysis: Splitting Glucose in the Cytosol','The Fates of Pyruvate and the Link Reaction','The Citric Acid Cycle','Oxidative Phosphorylation: The Electron Transport Chain','Adding It Up: Why ~30–32 ATP, Not 36–38','No Oxygen? Fermentation and the Oxygen Debt','Burning Fat and Protein: When Glucose Is Not Enough','Storing and Remaking Fuel: Fed and Fasting States','Controlling and Integrating the Engine','Metabolism in Disease and Medicine','Worked Passages','High-Yield Cheat Sheet']),

mkScaffold(8,'Photosynthesis: Capturing the Energy of Light','Energy','Light reactions, Calvin cycle, the energy source',
 'Ch 7 — respiration (this is the reverse)','Ch 12 — the diversity of life starts here.',
 ['The Big Picture: Photosynthesis as Reverse Respiration','The Chloroplast: Structure Built for the Job','Pigments, Light, and Why Plants Are Green','The Light Reactions: From Photon to ATP and NADPH','Photophosphorylation: Making ATP from the Proton Gradient','Cyclic vs Noncyclic Electron Flow','The Calvin Cycle: Building Sugar from Air','Photorespiration and the C4 / CAM Solutions','Closing the Loop: Energy Flow Through Life','Worked Passages','Discrete Question Bank','High-Yield Cheat Sheet']),

mkScaffold(9,'Genetics: Patterns of Inheritance','Heredity','Mendel, pedigrees, inheritance patterns',
 'Ch 6 — meiosis is the engine','Ch 10 — molecular genetics; Ch 11 — evolution.',
 ['The Gene Concept and Mendel\'s Method','The Law of Segregation and the Monohybrid Cross','Independent Assortment, the Dihybrid Cross, and Probability','Extensions of Mendel: When One Gene Bends the Rules','Gene Interaction: Epistasis and Polygenic Traits','Linkage, Recombination, and Genetic Maps','The Chromosomal Basis of Inheritance and Sex Linkage','Pedigree Analysis','Quantitative Tools: Probability, the Chi-Square Test','Integration: Reading Inheritance From Mechanism to Pattern','Variation, Mutation, and the Source of New Alleles','Synthesis: One Framework, Many Faces']),

mkScaffold(10,'Molecular Genetics: From DNA to Protein','Heredity','Replication, transcription, translation, regulation',
 'Ch 4 — nucleic acid structure; Ch 9 — inheritance','Ch 11 — evolution; Ch 12 — microbiology.',
 ['DNA Replication: Copying the Archive','The Central Dogma and Transcription: DNA to RNA','RNA Processing: Editing the Eukaryotic Transcript','The Genetic Code: Reading Three Letters at a Time','Translation: Building the Protein on the Ribosome','After Translation: Modification, Folding, and Targeting','Mutations: When the Sequence Changes','Prokaryotic Gene Regulation: lac and trp Operons','Eukaryotic Gene Regulation and Epigenetics','Epigenetics in Disease: Repeat Expansion and Anticipation','Biotechnology: Reading and Rewriting DNA','Worked Passages','High-Yield Cheat Sheet']),

mkScaffold(11,'Evolution: The Logic of Life\'s Change','Heredity','Selection, drift, speciation, the clinical payoff',
 'Ch 9–10 — variation source','Ch 12 — diversity is evolution\'s record.',
 ['Natural Selection: Darwin\'s Logic and the Evidence','The Raw Material: Sources of Genetic Variation','Populations Evolve, Not Individuals: Fitness and Adaptation','The Agents of Microevolution','Hardy-Weinberg: The Non-Evolving Baseline','Modes of Selection: Directional, Stabilizing, Disruptive','Speciation and Reproductive Isolation','Large-Scale Patterns: Convergence, Coevolution, Radiation','Phylogenetics, Cladistics, and the Origin of Life','Evolution in the Clinic: Resistance, Heterozygote Advantage','Worked Passages','High-Yield Cheat Sheet']),

mkScaffold(12,'The Diversity of Life: Microbes and the Tree of Life','Diversity','Bacteria, archaea, viruses, fungi, protists',
 'Ch 11 — evolution explains all of this','Ch 13–14 — and is the context for disease.',
 ['Classifying Life: The Three Domains and the Hierarchy','Prokaryote vs Eukaryote: The Differences That Become Drug Targets','Bacterial Form: Shapes, Arrangements, and Surface','The Bacterial Cell Wall and the Gram Stain','Bacterial Growth: Binary Fission and the Growth Curve','Bacterial Genetics: Plasmids, Gene Transfer, Antibiotic Resistance','Targeting Bacteria: Antibiotics and Selective Toxicity','Archaea: Prokaryotes at the Extremes','Viruses: Life at the Edge','Viral Replication: Lytic vs Lysogenic','Retroviruses: HIV as the Model','Prions and Viroids','Protists: The Clinically Important Parasites','Fungi: Structure, Reproduction, Antifungal Targets','The Rest of the Tree: Plants and Animals in Brief','Worked Passages','Discrete Question Bank','High-Yield Cheat Sheet']),

mkScaffold(13,'Animal Form & Function I: Homeostasis, Heart, Lungs, Kidneys','Physiology','Cardiovascular, respiratory, renal — the regulator triad',
 'Ch 1 — hemoglobin; Ch 2 — enzymes; Ch 5 — cells','Ch 14 — the nervous & endocrine systems that control them.',
 ['Organization of the Body and the Logic of Homeostasis','The Cardiovascular System: Heart, Vessels, Blood Flow','The Cardiac Cycle, Conduction, and Cardiac Output','Blood Pressure and Its Regulation','Blood: Composition, Oxygen Transport, the Dissociation Curve','The Respiratory System: Airways, Mechanics, Gas Exchange','The Renal System: The Nephron and the Four Processes','Renal Regulation of Water and Sodium: ADH and Aldosterone','Acid-Base Balance: Lungs and Kidneys Together','Worked Passages','High-Yield Cheat Sheet']),

mkScaffold(14,'Animal Form & Function II: Nervous, Endocrine, Immune, Muscular','Physiology','The signaling and defense systems that integrate the body',
 'Ch 13 — the systems being controlled','End of Book 1 — onward to Books 2–6.',
 ['The Neuron and the Resting Membrane Potential','The Action Potential','The Synapse and Neurotransmission','Organization of the Nervous System','The Endocrine System: Hormone Classes and Signaling','The Hypothalamic-Pituitary Axis and Negative Feedback','The Immune System: Innate and Adaptive Defense','Adaptive Immunity: Humoral and Cell-Mediated','The Muscular System: From Signal to Force','Integration: How the Four Systems Work as One'])

];

/* Helper: build a scaffold chapter object. Section blocks default to a single scaffold marker. */
function mkScaffold(n,title,tag,foundational,buildsOn,setsUp,sectionTitles){
 var sections=sectionTitles.map(function(t,i){
  var id=n+'.'+(i+1);
  return { id:id, num:id, title:t, blocks:[{t:'scaffold',x:'Full content for §'+id+' is being ported from the BBB Book Biology PDF. The chapter outline, dependency hints, and assessment scaffold are already wired — content drops in chapter-by-chapter as the pilot is approved.'}] };
 });
 return {
  n:n, title:title, subtitle:'C-Factor Book 1 · Biology', tag:tag, foundational:foundational,
  buildsOn:buildsOn, setsUp:setsUp,
  objectives:['Learning objectives port with the full chapter content in the next pass.'],
  opener:'Chapter '+n+' content is being ported from the book. The full course structure — section navigation, progress, in-chapter TOC, and quick-check scaffolding — is already live so you can see the format end-to-end.',
  pinnedDisc:null,
  sections:sections,
  bottomLine:null, nextHint:null,
  isScaffold:true
 };
}

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

var DONE_KEY='book1_done_v2';   /* section-level: {"0.1":true, "1.4":true, ...} */
var LAST_KEY='book1_last_v2';   /* {ch:N, sec:"x.y"} */

function getDone(){try{return JSON.parse(localStorage.getItem(DONE_KEY))||{};}catch(e){return {};}}
function setDone(d){try{localStorage.setItem(DONE_KEY,JSON.stringify(d));}catch(e){}}
function getLast(){try{return JSON.parse(localStorage.getItem(LAST_KEY))||null;}catch(e){return null;}}
function setLast(o){try{localStorage.setItem(LAST_KEY,JSON.stringify(o));}catch(e){}}
function esc(s){return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function chapLabel(n){return n===0?'Ch 0':'Ch '+n;}

function totalSections(){var c=window.BOOK1_COURSE,n=0;for(var i=0;i<c.length;i++)n+=c[i].sections.length;return n;}
function doneSections(){var d=getDone(),n=0;for(var k in d)if(d[k])n++;return n;}
function chSectionStatus(ch){
 var d=getDone(),done=0,total=ch.sections.length;
 for(var i=0;i<ch.sections.length;i++)if(d[ch.sections[i].id])done++;
 return {done:done,total:total,all:done===total&&total>0,any:done>0};
}

function buildNav(){
 var C=window.BOOK1_COURSE, html='', curMod=null;
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
 var C=window.BOOK1_COURSE;
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
 var C=window.BOOK1_COURSE, done=getDone(), last=getLast();
 var nSec=totalSections(), dSec=doneSections();
 document.getElementById('cmob-title').textContent='Book 1 · Biology — Course Overview';
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
 h+='<h1 class="ph-title">The Living Code<br><em>MCAT Biology</em>, mechanism-first.</h1>';
 h+='<p class="ph-sub">Book 1 of the C-Factor Series — a complete biology review from the carbon atom to the whole human body. Every chapter runs the four moves: <b>mechanism</b>, <b>discriminator</b>, <b>clinical bridge</b>, <b>high-yield anchor</b>. Section-level progress saves automatically. The PDF version is $40 (founders price; was $65) if you want the artifact — the content here is free, forever.</p>';
 var firstUndone=null;
 for(var i=0;i<C.length;i++){var anyUndone=C[i].sections.find(function(s){return !done[s.id];});if(anyUndone){firstUndone={ch:i,sec:anyUndone.id};break;}}
 if(!firstUndone)firstUndone={ch:0,sec:'0.1'};
 h+='<div class="btn-row">';
 h+='<a class="btn-p" href="#ch'+firstUndone.ch+'-'+firstUndone.sec.replace('.','-')+'">'+(dSec?'CONTINUE · '+chapLabel(firstUndone.ch):'START THE COURSE →')+'</a>';
 h+='<a class="btn-o" href="#ch0">★ READ CH 0 · ORIENTATION</a>';
 h+='</div>';
 h+=resume;
 h+='<div class="hero-pricing">FREE COURSE · PDF OPTIONAL · <s>$65</s> <b>$40 FOUNDERS</b> · ANKI DECK <b>$5</b></div>';
 h+='</div>';

 h+='<div class="ov-stats">'+
    '<div class="ov-stat"><b>15</b><span>chapters</span></div>'+
    '<div class="ov-stat"><b>'+nSec+'</b><span>sections</span></div>'+
    '<div class="ov-stat"><b>374</b><span>pg source</span></div>'+
    '<div class="ov-stat"><b>'+dSec+'/'+nSec+'</b><span>your progress</span></div></div>';

 h+='<h2 style="font-family:var(--mono);font-size:20px;margin:2.4rem 0 .4rem;color:var(--text)">The seven modules</h2>';
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
 var C=window.BOOK1_COURSE, c=C[n];
 if(!c){renderHome();return;}
 var done=getDone();
 setActive('nav-'+n);
 var sub=document.getElementById('subnav-'+n), navi=document.getElementById('nav-'+n);
 if(sub){sub.classList.add('open'); if(navi)navi.classList.add('open');}
 document.getElementById('cmob-title').textContent=chapLabel(n)+' · '+c.title;

 var part=''; MODULES.forEach(function(mo){if(mo.chs.indexOf(n)>=0)part=mo.name;});
 var st=chSectionStatus(c);

 var h='';
 h+='<div class="crumb"><a href="#home">Book 1 · Biology</a> <span>/</span> '+esc(part)+(c.isScaffold?' <span style="color:var(--purple)">/ scaffold</span>':'')+'</div>';
 h+='<div class="cmeta">'+
    '<span>'+(n===0?'Orientation':'Chapter '+n+' of 14')+'</span>'+
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

 var prev=n>0?'<a class="btn-o" href="#ch'+(n-1)+'">‹ '+chapLabel(n-1)+'</a>':'<a class="btn-o" href="#home">‹ Overview</a>';
 var next=n<C.length-1?'<a class="btn-o" href="#ch'+(n+1)+'">'+chapLabel(n+1)+' ›</a>':'<a class="btn-gold" href="/cfactor/#books">Next: Book 2 →</a>';
 h+='<div class="cnav-foot">'+prev+'<span style="font-family:var(--mono);font-size:11px;color:var(--text-dim)">'+st.done+'/'+st.total+' sections complete</span>'+next+'</div>';

 setMain(h);
 buildRail(c);
 setLast({ch:n,sec:c.sections[0]?c.sections[0].id:'0.1'});
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
 var C=window.BOOK1_COURSE, c=C[n], st=chSectionStatus(c);
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
 if(e.key==='ArrowRight'&&n<window.BOOK1_COURSE.length-1)location.hash='ch'+(n+1);
 if(e.key==='ArrowLeft'){if(n>0)location.hash='ch'+(n-1);else location.hash='home';}
});
function route(){
 if(!window.BOOK1_COURSE)return;
 var hs=location.hash||'';
 if(hs.indexOf('home')>=0||hs===''||hs==='#'){renderHome();return;}
 var m=hs.match(/ch(\d+)(?:-(\d+)-(\d+))?/);
 if(!m){renderHome();return;}
 var n=parseInt(m[1]); var secId=m[2]&&m[3]?(m[2]+'.'+m[3]):null;
 if(n<0||n>=window.BOOK1_COURSE.length)n=0;
 render(n,secId);
}
function init(){if(!window.BOOK1_COURSE){setTimeout(init,40);return;}buildNav();route();}
window.addEventListener('hashchange',route);
document.addEventListener('DOMContentLoaded',init);
init();
