var CHAPTER_0 = {
 n: 0,
 title: 'Orientation: How to Use This Book',
 subtitle: 'The curved arrow, the four moves, and why mechanism beats memorization',
 tag: 'Orientation',
 foundational: 'How Book 3 is built, how to study it, and why following electrons beats memorizing reactions.',
 buildsOn: null,
 setsUp: 'Ch 1, the structural foundation.',
 objectives: [
  'Understand the learning posture this book asks of you',
  'Know the four learning moves: think mechanism, trust the discriminator, pivot fast, revisit in 48 hours',
  'See why the curved arrow is the unit of explanation in all of organic chemistry',
  'Read the box system (discriminator, clinical bridge, why, high-yield) fluently',
  'See why organic chemistry is the bridge between general chemistry and biology',
  'Plan how to move through the thirteen chapters of Book 3'
 ],
 opener: 'Organic chemistry has a reputation as the course that breaks pre-meds. It earns that reputation only from students who try to memorize it. Learn instead to follow the electrons, and the same subject becomes one of the most predictable you will ever take.\n\nThis is the orientation chapter of Book 3 of The C-Factor Series. It is short by design. Its only job is to install the posture and the method you will use for the next thirteen chapters, so that when the chemistry begins in Chapter 1 you already know how to read it. If you studied Books 1 and 2, the method is identical and this will be familiar. If Book 3 is your starting point, a few minutes here will make every later chapter easier.\n\nThis is Book 3 of The C-Factor Series, the organic-chemistry volume, and it sits at the exact center of the whole series. Book 2 taught the rules that govern every atom; Book 1 taught the biology those atoms build. Book 3 is the bridge between them, because it follows the one element, carbon, whose chemistry turns the abstract rules of general chemistry into the concrete molecules of biology. Master organic chemistry and the leap from a chemical bond to a living protein stops being a leap at all; it becomes a series of steps you can draw.\n\nOrganic chemistry is almost uniquely rewarding of the understanding approach because its reactions are so deeply patterned. There are hundreds of named reactions, and a student who tries to hold them all as separate facts is quickly buried. But almost every one of those reactions is built from the same small set of moves: a region of electron density attacks a region of electron poverty. Learn to see molecules as landscapes of charge and you can predict reactions you have never been taught, because they are all the same handful of moves rearranged.\n\nBook 3 covers the organic-chemistry canon in thirteen connected chapters. It opens with structure, bonding, and the single most important skill in the subject, predicting acidity and the movement of electrons, then builds through nomenclature, the three-dimensional shape of molecules, and the core reaction families, before turning to the functional groups in the order their chemistry builds on itself, and closing with the biomolecules that hand off directly to Book 1.',
 pinnedDisc: {
  t: 'MEMORIZING REACTIONS vs UNDERSTANDING MECHANISM',
  x: 'MEMORIZING stores reactant-arrow-product as an isolated fact; with hundreds of reactions this collapses under its own weight and fails the moment a question uses an unfamiliar substrate. UNDERSTANDING stores the mechanism, the flow of electrons, which regenerates the product for any substrate and transfers to reactions you were never explicitly taught. Memorize the few mechanisms, not the many reactions.'
 },
 sections: [
  {
   id: '0.1', num: '0.1', title: '0.1 The Posture: Follow the Electrons',
   blocks: [
    { t: 'p', x: 'Organic chemistry is the subject where memorization fails most spectacularly and understanding pays off most completely. There are hundreds of named reactions, and a student who tries to hold them all as separate facts is quickly buried. But almost every one of those reactions is built from the same small set of moves: a region of electron density attacks a region of electron poverty. A nucleophile, an electron-rich site, finds an electrophile, an electron-poor site, and a bond forms or breaks. If you learn to see molecules as landscapes of charge, where the electrons are rich and where they are poor, you can predict reactions you have never been taught, because they are all the same handful of moves rearranged.' },
    { t: 'box', kind: 'disc', label: 'DISCRIMINATOR · MEMORIZING REACTIONS vs UNDERSTANDING MECHANISM', x: 'MEMORIZING stores reactant-arrow-product as an isolated fact; with hundreds of reactions this collapses under its own weight and fails the moment a question uses an unfamiliar substrate. UNDERSTANDING stores the mechanism, the flow of electrons, which regenerates the product for any substrate and transfers to reactions you were never explicitly taught. Organic chemistry is almost uniquely rewarding of the second approach because its reactions are so deeply patterned. Memorize the few mechanisms, not the many reactions.' }
   ],
   quickcheck: [{
    stem: 'A student memorizes that NaBH4 reduces ketones to alcohols. An exam question asks about NaBH4 and an aldehyde the student has never seen. Which student is better prepared?',
    choices: [
     'A) The student who memorized the ketone reaction only',
     'B) The student who understands that hydride is a nucleophile and attacks any carbonyl carbon',
     'C) Both students are equally prepared',
     'D) Neither can answer without seeing the specific aldehyde first'
    ],
    answer: 1,
    why: 'Understanding the mechanism (nucleophilic hydride attacks the electrophilic carbonyl carbon) applies to any aldehyde or ketone without additional memorization. The memorizer is stuck with only the fact they stored.'
   }]
  },
  {
   id: '0.2', num: '0.2', title: '0.2 The Curved Arrow: The Unit of Explanation',
   blocks: [
    { t: 'p', x: 'The single most important tool in this book is the curved arrow, and it deserves its own section before anything else. A curved arrow represents the movement of a pair of electrons, drawn from where the electrons start, a lone pair or a bond, to where they end, forming a new bond or becoming a lone pair. That is the entire convention, and from it the whole subject is built. Every mechanism in this book is a sequence of curved arrows, and learning to draw them correctly, tail on the electrons, head on the destination, is learning to speak the language of organic chemistry. When you can push the arrows, you are no longer memorizing that a reaction happens; you are explaining why it must.' },
    { t: 'p', x: 'The curved arrow encodes a deep truth: chemical reactions are the rearrangement of electrons, and nuclei follow along. By tracking only the electron pairs, the arrow formalism reduces a bewildering reaction to a few simple, conservative moves. Electrons flow from rich to poor, charge is conserved, octets are respected. Once you trust this, you can reason your way through an unfamiliar mechanism step by step instead of recalling it, which is exactly the skill the MCAT and later coursework reward.' },
    { t: 'box', kind: 'why', label: 'WHY THE ARROW FORMALISM IS SO POWERFUL', x: 'The curved arrow encodes a deep truth: chemical reactions are the rearrangement of electrons, and nuclei follow along. By tracking only the electron pairs, the arrow formalism reduces a bewildering reaction to a few simple, conservative moves, electrons flow from rich to poor, charge is conserved, octets are respected. Once you trust this, you can reason your way through an unfamiliar mechanism step by step instead of recalling it, which is exactly the skill the MCAT and later coursework reward.' },
    { t: 'list', x: [
     'Tail of the arrow starts on the electrons that move (lone pair or bond)',
     'Head of the arrow points to the destination (new bond or new lone pair)',
     'A double-barbed (full) arrowhead moves a pair of electrons',
     'A single-barbed (fishhook) arrowhead moves one electron and is used only in radical chemistry',
     'Charge is conserved at every step; recount formal charges after each arrow'
    ]}
   ],
   quickcheck: [{
    stem: 'Where does the tail of a curved arrow begin?',
    choices: [
     'A) On the positive charge of the electrophile',
     'B) On the atom that will receive the electrons',
     'C) On the electrons that move: a lone pair or a bond',
     'D) On the proton being transferred'
    ],
    answer: 2,
    why: 'Curved arrows show where electrons go, and electrons are the things that move. The tail must start on the actual electrons (the lone pair or the bond), never on a positive charge or on the proton itself. The nucleophile always pushes; it never pulls.'
   }]
  },
  {
   id: '0.3', num: '0.3', title: '0.3 The Four Moves',
   blocks: [
    { t: 'p', x: 'Every chapter trains the same four cognitive moves, and by the end of the book they should feel automatic. First, think mechanism: before memorizing any product, push the arrows and ask where the electrons go. Second, trust the discriminator: for any two reactions that look alike, substitution versus elimination, SN1 versus SN2, the kinetic versus the thermodynamic product, find the single factor that decides between them. Third, pivot fast: once the mechanism is clear, commit and move on. Fourth, revisit in 48 hours: redraw each mechanism from memory two days later, the window where memory is most fragile and most improvable.' },
    { t: 'box', kind: 'hl', label: 'HIGH YIELD', x: 'Think mechanism: push the curved arrows before memorizing any product. Trust the discriminator: find the one factor that decides between look-alike reactions. Pivot fast: commit to the mechanism and move on. Revisit in 48 hours: redraw each mechanism from memory two days after learning it.' }
   ],
   quickcheck: [{
    stem: 'You finish studying the SN2 mechanism. What is the single most useful thing to do 48 hours later?',
    choices: [
     'A) Read the section again from the book',
     'B) Redraw the mechanism from memory, then check',
     'C) Move on to the next chapter immediately',
     'D) Memorize the list of SN2 substrates'
    ],
    answer: 1,
    why: 'The 48-hour redraw is the highest-return habit in the method. Memory is most fragile and most improvable at that window. Redrawing from memory reveals exactly which step broke down, so you can fix the gap before it hardens.'
   }]
  },
  {
   id: '0.4', num: '0.4', title: '0.4 The Box System',
   blocks: [
    { t: 'p', x: 'The same colored boxes appear in every chapter of the series, so you can read each one the same way. The gold DISCRIMINATOR box isolates the single distinction you are most likely to get wrong, and organic chemistry is full of them: nucleophile versus base, SN1 versus SN2, E1 versus E2, cis versus trans, R versus S. The blue CLINICAL BRIDGE box shows where the chemistry becomes a drug or a metabolite. The purple WHY box explains where a rule comes from. The HIGH-YIELD box compresses the must-know facts of a section into a short, testable list.' },
    { t: 'p', x: 'Read the boxes actively: predict each discriminator before reading it, and recall the mechanism behind each clinical bridge. Most chapters close with worked MCAT-style passages, a discrete question bank, a one-sentence summary, and a cheat sheet of high-yield anchors.' },
    { t: 'box', kind: 'bridge', label: 'CLINICAL BRIDGE · Why a Future Physician Studies Organic Chemistry', x: 'Organic chemistry is the molecular grammar of medicine. The functional groups in this book decide whether a drug is acidic or basic, and therefore where in the gut it is absorbed; whether it is water- or fat-soluble, and therefore how it travels and where it lodges; and how the liver chemically tags it for clearance. Stereochemistry explains why one mirror-image form of a drug can heal while the other harms. The carbonyl and amide chemistry of the later chapters is the chemistry of proteins, metabolism, and DNA. Learn it here and pharmacology and biochemistry arrive as applications, not new subjects.' },
    { t: 'list', x: [
     'DISCRIMINATOR (gold): the one distinction you are most likely to get wrong',
     'CLINICAL BRIDGE (blue): where the chemistry becomes a drug, amino acid, or enzyme mechanism',
     'WHY (purple): where a rule comes from, mechanistically',
     'HIGH-YIELD (green/dark): the testable anchors compressed for rapid review'
    ]}
   ],
   quickcheck: [{
    stem: 'A DISCRIMINATOR box appears on the page. What is the best way to read it?',
    choices: [
     'A) Skip it if you already think you know the distinction',
     'B) Cover the box, predict the distinguishing factor yourself, then read to check',
     'C) Read it once and move on',
     'D) It only matters for advanced coursework, not the MCAT'
    ],
    answer: 1,
    why: 'The discriminator box targets the distinction you are most likely to get wrong. Predicting it first makes the comparison active rather than passive, and active retrieval is what fixes confusions before the exam.'
   }]
  },
  {
   id: '0.5', num: '0.5', title: '0.5 How to Move Through Book 3',
   blocks: [
    { t: 'p', x: 'Read the chapters in order. The book is built so that each chapter assumes the ones before it: you cannot follow substitution and elimination without the acidity and structure of Chapter 1, cannot follow the functional-group chapters without the core mechanisms of Chapters 5 and 6, and cannot appreciate the biomolecules of Chapter 13 without all of it. On a first pass, read for mechanism and do not stop to memorize; aim to be able to push the arrows for each reaction and explain each discriminator in plain language. On a second pass, drill the high-yield anchors and the question banks, and use the cheat sheets for rapid review.' },
    { t: 'box', kind: 'why', label: 'WHY ORDER MATTERS IN THIS BOOK', x: 'Organic chemistry is relentlessly cumulative. The acidity reasoning of Chapter 1 is the engine behind every later reaction that makes or breaks a bond to hydrogen. The substitution and elimination mechanisms of Chapter 5 reappear, lightly disguised, in nearly every functional group afterward. The carbonyl chemistry of Chapter 9 is the foundation of Chapters 10 and 11 and of the biomolecules in Chapter 13. Reading in order is not a suggestion here; it is the difference between a connected understanding and a pile of disconnected reactions.' },
    { t: 'p', x: 'The 48-hour revisit is the single highest-return habit in the method: two days after a chapter, redraw its key mechanisms from memory, and wherever you cannot, return to that section.' },
    { t: 'box', kind: 'hl', label: 'HIGH YIELD · The Bottom Line', x: 'Book 3 teaches organic chemistry mechanism-first, as a small set of electron-pushing moves rather than a long list of reactions. The curved arrow, the movement of an electron pair from electron-rich to electron-poor, is the unit of explanation, and almost every reaction in the book is built from a few of them. It uses the same four moves (think mechanism, trust the discriminator, pivot fast, revisit in 48 hours) and the same box system as the rest of the series. Organic chemistry is the central bridge of the C-Factor, applying the rules of general chemistry to carbon to build the biomolecules of biology, and it is learnable, even predictable, once you follow the electrons. Read the thirteen chapters in order, for understanding first and retention second.' }
   ],
   quickcheck: [{
    stem: 'On a first pass through Chapter 5, which goal matters most?',
    choices: [
     'A) Memorize the name of every SN2 reaction product',
     'B) Be able to push the curved arrows for each mechanism and explain each discriminator',
     'C) Complete all the practice questions before reading the prose',
     'D) Read only the HIGH-YIELD boxes to save time'
    ],
    answer: 1,
    why: 'The first pass is for mechanism, not memorization. Being able to push the arrows and explain discriminators means you own the logic. Product memorization and question drilling belong on the second pass, once the mechanistic skeleton is in place.'
   }]
  }
 ]
};
