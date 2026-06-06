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
  var SYMBOLS = [
    [' dot ',  ' · '],   // explicit "dot" product spelled out
    [' cross ',' × '],   // explicit "cross" product spelled out
    ['<=',    '≤'],
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

  // Convert v0, v1, F_net, mu_s, x^2, e^(-x) and friends.
  function applySubSup(s){
    // a^(...) groups: wrap the parenthesized content in <sup>
    s = s.replace(/\^\(([^()]+)\)/g, function(_, g){
      return '<sup>' + g + '</sup>';
    });
    // a^n where n is a single 0-9, n, i, +, -, or a single letter
    s = s.replace(/\^([0-9nNiI\-\+])/g, function(_, c){
      return SUP[c.toLowerCase()] || ('<sup>' + c + '</sup>');
    });
    s = s.replace(/\^([A-Za-z])/g, function(_, c){
      return '<sup>' + c + '</sup>';
    });

    // a_(...) groups
    s = s.replace(/_\(([^()]+)\)/g, function(_, g){
      return '<sub>' + g + '</sub>';
    });
    // a_n where n is a single 0-9
    s = s.replace(/_([0-9])/g, function(_, c){
      return SUB[c] || ('<sub>' + c + '</sub>');
    });
    // a_word (multi-char identifier like F_net, mu_s, v_max)
    s = s.replace(/_([A-Za-z][A-Za-z0-9]*)/g, function(_, w){
      return '<sub>' + w + '</sub>';
    });

    // Implicit subscripts on common variables followed by a digit:
    // v0 -> v<sub>0</sub>, x1 -> x<sub>1</sub>, etc.
    // Only triggered when the variable is one of these letters AND the
    // pattern stands alone (preceded by word boundary).
    s = s.replace(/\b([vxytuawpfqrnk])([0-9])\b/g, function(_, v, d){
      return v + (SUB[d] || ('<sub>' + d + '</sub>'));
    });

    return s;
  }

  // Replace " * " between operands with the multiplication dot.
  // Do this AFTER subscript handling so we do not touch v0 etc.
  function applyMultiplication(s){
    // " * " becomes " · "
    s = s.replace(/\s\*\s/g, ' · ');
    // Tight "*" without spaces: a*b -> a·b (but not at start)
    s = s.replace(/(\w)\*(\w)/g, '$1·$2');
    return s;
  }

  // Simple sqrt(...) -> √(...) for visual identifier.
  function applySqrt(s){
    return s.replace(/\bsqrt\(([^()]+)\)/g, '√($1)');
  }

  // Word-boundary replace for an array of [from, to] pairs.
  // Each "from" is treated as a literal token (no regex meta).
  function applyTokens(s, pairs){
    for (var i = 0; i < pairs.length; i++) {
      var from = pairs[i][0];
      var to   = pairs[i][1];
      // Escape regex metacharacters in the "from" string.
      var safe = from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // For pure-letter tokens, require word boundaries on both sides so
      // we do not split inside variable names.
      var pattern = /^[A-Za-z]+$/.test(from) ? '\\b' + safe + '\\b' : safe;
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
    s = applySubSup(s);          // v0, F_net, x^2 etc.
    s = applyMultiplication(s);  // * -> ·
    return s;
  };
})();
