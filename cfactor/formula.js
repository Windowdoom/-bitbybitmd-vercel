// /cfactor/formula.js
// Lightweight math-notation formatter for the C-Factor courses.
// Input: plain-text formulas like "v = v0 + a*t" or "Delta G = -nFE"
// Output: HTML with proper Unicode glyphs and sub/sup tags.
//
// The formulas are authored in the book content files (trusted source),
// so this does not HTML-escape input. The .formula container uses overflow
// auto so long expressions wrap or scroll cleanly.

window.fmtFormula = (function(){

  // Greek letter map. Order matters: longer/capitalized variants before
  // shorter/lowercase variants so substring matches do not cascade.
  // Each replacement is bounded by word boundaries to avoid mid-word hits.
  var GREEK = [
    ['Theta','Θ'], ['theta','θ'],
    ['Phi','Φ'],   ['phi','φ'],
    ['Psi','Ψ'],   ['psi','ψ'],
    ['Pi','Π'],    ['pi','π'],
    ['Lambda','Λ'],['lambda','λ'],
    ['Sigma','Σ'], ['sigma','σ'],
    ['Omega','Ω'], ['omega','ω'],
    ['Gamma','Γ'], ['gamma','γ'],
    ['Delta','Δ'], ['delta','δ'],
    ['Epsilon','Ε'],['epsilon','ε'],
    ['Alpha','Α'], ['alpha','α'],
    ['Beta','Β'],  ['beta','β'],
    ['Tau','Τ'],   ['tau','τ'],
    ['Rho','Ρ'],   ['rho','ρ'],
    ['Mu','Μ'],    ['mu','μ'],
    ['Nu','Ν'],    ['nu','ν'],
    ['Eta','Η'],   ['eta','η'],
    ['Kappa','Κ'], ['kappa','κ'],
    ['Xi','Ξ'],    ['xi','ξ'],
    ['Zeta','Ζ'],  ['zeta','ζ'],
    ['Chi','Χ'],   ['chi','χ'],
  ];

  // Operator and symbol map. Applied in order; each replacement is a
  // straightforward token substitution.
  // These run AFTER escHtml so we match the escaped forms for comparison
  // operators (&lt; instead of <). The literal +/-, !=, etc. survive escHtml
  // unchanged.
  var SYMBOLS = [
    [' dot ',  ' · '],
    [' cross ',' × '],
    ['&lt;=', '≤'],
    ['&gt;=', '≥'],
    ['<=',    '≤'],   // pre-escape variants kept as defense
    ['>=',    '≥'],
    ['!=',    '≠'],
    ['+/-',   '±'],
    ['infinity','∞'],
    ['inf',   '∞'],
    [' approx ',' ≈ '],
    [' propto ',' ∝ '],
  ];

  // Single-character superscript map (Unicode).
  var SUP = {
    '0':'⁰','1':'¹','2':'²','3':'³',
    '4':'⁴','5':'⁵','6':'⁶','7':'⁷',
    '8':'⁸','9':'⁹','-':'⁻','+':'⁺',
    'n':'ⁿ','i':'ⁱ',
  };
  // Single-character subscript map.
  var SUB = {
    '0':'₀','1':'₁','2':'₂','3':'₃',
    '4':'₄','5':'₅','6':'₆','7':'₇',
    '8':'₈','9':'₉',
  };

  function escHtml(s){
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  // Convert multi-char superscript groups like "10^-19" or "10^40"
  // into Unicode superscript digits (or fallback <sup>).
  function unicodeSup(str){
    var out = '';
    for (var i = 0; i < str.length; i++) {
      var c = str.charAt(i);
      if (SUP[c]) out += SUP[c];
      else return null; // bail to <sup>
    }
    return out;
  }
  function unicodeSub(str){
    var out = '';
    for (var i = 0; i < str.length; i++) {
      var c = str.charAt(i);
      if (SUB[c]) out += SUB[c];
      else return null;
    }
    return out;
  }

  // Convert v0, v1, F_net, mu_s, x^2, e^(-x), 10^-19, 10^40, and friends.
  function applySubSup(s){
    // a^(...) groups: wrap the parenthesized content in <sup>
    s = s.replace(/\^\(([^()]+)\)/g, function(_, g){
      return '<sup>' + g + '</sup>';
    });
    // Multi-char numeric exponents with optional sign: 10^-19, 2^32, x^-3
    s = s.replace(/\^(-?\d+)/g, function(_, num){
      var u = unicodeSup(num);
      return u !== null ? u : ('<sup>' + num + '</sup>');
    });
    // a^n single char (letters, +)
    s = s.replace(/\^([A-Za-z\+])/g, function(_, c){
      return SUP[c] || ('<sup>' + c + '</sup>');
    });

    // a_(...) groups
    s = s.replace(/_\(([^()]+)\)/g, function(_, g){
      return '<sub>' + g + '</sub>';
    });
    // a_word (multi-char identifier like F_net, mu_s, v_max)
    s = s.replace(/_([A-Za-z][A-Za-z0-9]*)/g, function(_, w){
      return '<sub>' + w + '</sub>';
    });
    // a_(multi-digit)
    s = s.replace(/_(\d+)/g, function(_, num){
      var u = unicodeSub(num);
      return u !== null ? u : ('<sub>' + num + '</sub>');
    });

    // Implicit subscripts on common single-letter variables followed by a
    // single digit, when standing as a token: v0, m1, q2 etc.
    // Whitelist of variables that commonly take numeric subscripts in
    // physics, chemistry, and biology: position/velocity/time, mass, energy,
    // charge, distance, etc. Excludes letters that commonly stand alone in
    // prose (a, e, g, i, o, u).
    s = s.replace(/\b([vxytmnqphlcswfrk])([0-9])\b/g, function(_, v, d){
      return v + (SUB[d] || ('<sub>' + d + '</sub>'));
    });

    return s;
  }

  // Replace " * " between operands with the multiplication dot.
  // Run BEFORE subscript handling so we can rely on \w on both sides.
  // Use a lookahead for the right operand so chained multiplications
  // (a*b*c) all convert in a single pass.
  // Greek letters (already substituted at this point) sit outside \w,
  // so we add Unicode \p{L} (letter category) to the operand classes.
  function applyMultiplication(s){
    s = s.replace(/\s\*\s/g, ' · ');
    s = s.replace(/([\p{L}\w\)\]\|])\*(?=[\p{L}\w\(\[\|])/gu, '$1·');
    return s;
  }

  // Scientific-notation multiplication: "9 x 10^9", "1.6 x 10^-19".
  // Only convert " x " when both sides are digits / closing-paren on left
  // and digit on right. The character "x" is otherwise common in prose.
  function applyTimesSign(s){
    s = s.replace(/(\d)\s+x\s+(\d)/g, '$1 × $2');
    return s;
  }

  // Simple sqrt(...) -> √(...) for visual identifier.
  function applySqrt(s){
    return s.replace(/\bsqrt\(([^()]+)\)/g, '√($1)');
  }

  // Boundary replace for an array of [from, to] pairs.
  // Each "from" is treated as a literal token (no regex meta).
  // For pure-letter tokens we use a custom boundary that treats letters as
  // the only "inside" character. This means epsilon_0 matches (the "_" is
  // treated as outside), but the "epsilon" inside "encepsilonal" would not.
  function applyTokens(s, pairs){
    for (var i = 0; i < pairs.length; i++) {
      var from = pairs[i][0];
      var to   = pairs[i][1];
      var safe = from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      var pattern;
      if (/^[A-Za-z]+$/.test(from)) {
        // (?<![A-Za-z]) before and (?![A-Za-z]) after lets underscore,
        // digit, punctuation, or whitespace bound the match.
        pattern = '(?<![A-Za-z])' + safe + '(?![A-Za-z])';
      } else {
        pattern = safe;
      }
      s = s.replace(new RegExp(pattern, 'g'), to);
    }
    return s;
  }

  return function fmtFormula(raw){
    if (raw == null) return '';
    var s = String(raw);
    s = escHtml(s);              // safe first
    s = applyTokens(s, GREEK);   // theta -> θ etc.
    s = applyTokens(s, SYMBOLS); // <=, >=, dot, cross, etc.
    s = applySqrt(s);
    // Multiplication BEFORE subscripts so m1*m2 cleanly becomes m₁·m₂
    // (subscript Unicode chars are not in \w so * detection breaks if we
    // subscripted first).
    s = applyMultiplication(s);
    s = applySubSup(s);          // v0, F_net, x^2, 10^-19 etc.
    s = applyTimesSign(s);       // 9 x 10^9 -> 9 × 10⁹
    return s;
  };
})();
