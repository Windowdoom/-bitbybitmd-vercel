/* Bit by Bit Pedagogy - on-site translation widget.
   A branded language picker on top of Google's free translate engine
   (~100 languages, no API key). It writes the standard `googtrans` cookie
   and reloads; the engine re-applies the chosen language on the next load.
   This is machine translation - good for reading along, not a substitute
   for studying the terms in English (the MCAT is English-only). */
(function(){
  if (window.__bbbI18n) return; window.__bbbI18n = true;

  // Curated languages relevant to international MCAT / pre-med applicants.
  // (Native browser translate still covers every other language.)
  var LANGS = [
    ['en','English'], ['es','Español'], ['fr','Français'], ['ar','العربية'],
    ['zh-CN','中文 (简体)'], ['hi','हिन्दी'], ['ur','اردو'], ['bn','বাংলা'],
    ['pt','Português'], ['ru','Русский'], ['ko','한국어'], ['vi','Tiếng Việt'],
    ['fa','فارسی'], ['tr','Türkçe'], ['id','Bahasa Indonesia'], ['fil','Filipino']
  ];
  var RTL = { ar:1, ur:1, fa:1, he:1 };
  var NAMES = {}; LANGS.forEach(function(l){ NAMES[l[0]] = l[1]; });

  // --- cookie helpers (googtrans is read by Google's engine on load) ---
  function setCookie(v){
    var host = location.hostname.replace(/^www\./,'');
    document.cookie = 'googtrans=' + v + ';path=/;max-age=31536000';
    document.cookie = 'googtrans=' + v + ';path=/;domain=.' + host + ';max-age=31536000';
  }
  function clearCookie(){
    var host = location.hostname.replace(/^www\./,'');
    document.cookie = 'googtrans=;path=/;max-age=0';
    document.cookie = 'googtrans=;path=/;domain=.' + host + ';max-age=0';
  }
  function current(){
    var m = document.cookie.match(/googtrans=\/[^\/]*\/([^;]+)/);
    return (m && m[1]) ? decodeURIComponent(m[1]) : 'en';
  }

  function choose(code){
    if (code === 'en') { clearCookie(); }
    else { setCookie('/en/' + code); }
    location.reload();
  }

  // Note: we intentionally do NOT force dir="rtl" on the whole document.
  // Google's engine sets text direction per translated block; flipping the
  // entire (LTR-designed) layout would look broken. RTL text still reads
  // correctly inline. (RTL set kept for future per-block tuning.)
  void RTL;

  // --- styles (scoped, theme-matched, hides Google's injected banner) ---
  var css = document.createElement('style');
  css.textContent = [
    '.goog-te-banner-frame,.skiptranslate{display:none!important}',
    'body{top:0!important}',
    '#bbbLang{position:fixed;z-index:99998;bottom:16px;left:16px;font-family:inherit}',
    '#bbbLang .bbb-tog{display:flex;align-items:center;gap:7px;background:#13243d;',
      'color:#e8eef7;border:1px solid rgba(0,229,160,.35);border-radius:999px;',
      'padding:9px 14px;font:600 13px/1 system-ui,sans-serif;cursor:pointer;',
      'box-shadow:0 6px 22px rgba(0,0,0,.4)}',
    '#bbbLang .bbb-tog:hover{border-color:#00E5A0}',
    '#bbbLang .bbb-tog .gl{font-size:15px}',
    '#bbbLang .bbb-panel{position:absolute;bottom:50px;left:0;width:230px;',
      'background:#0D1B2E;border:1px solid rgba(255,255,255,.14);border-radius:14px;',
      'padding:10px;box-shadow:0 14px 40px rgba(0,0,0,.55);display:none}',
    '#bbbLang.open .bbb-panel{display:block}',
    '#bbbLang .bbb-h{font:600 11px/1.3 system-ui,sans-serif;color:#7e8aa0;',
      'letter-spacing:.04em;text-transform:uppercase;padding:4px 8px 8px}',
    '#bbbLang .bbb-grid{display:grid;grid-template-columns:1fr 1fr;gap:4px;max-height:240px;overflow:auto}',
    '#bbbLang .bbb-grid button{text-align:left;background:transparent;border:0;',
      'color:#d6deea;font:500 13px/1.2 system-ui,sans-serif;padding:8px 9px;',
      'border-radius:8px;cursor:pointer}',
    '#bbbLang .bbb-grid button:hover{background:#16294a}',
    '#bbbLang .bbb-grid button.cur{background:#16294a;color:#00E5A0;font-weight:700}',
    '#bbbLang .bbb-note{font:400 11px/1.45 system-ui,sans-serif;color:#7e8aa0;padding:9px 8px 3px}',
    '#bbbLang .bbb-note b{color:#9fb0c7}',
    '@media(max-width:560px){#bbbLang .bbb-panel{width:200px}}'
  ].join('');
  document.head.appendChild(css);

  // --- hidden engine container + script ---
  window.googleTranslateElementInit = function(){
    try {
      new google.translate.TranslateElement(
        { pageLanguage:'en', autoDisplay:false }, 'bbbGteHidden');
    } catch(_){}
  };

  function boot(){
    var hidden = document.createElement('div');
    hidden.id = 'bbbGteHidden';
    hidden.style.cssText = 'position:absolute;left:-9999px;top:-9999px;height:0;overflow:hidden';
    document.body.appendChild(hidden);

    var s = document.createElement('script');
    s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    s.async = true;
    document.body.appendChild(s);

    var cur = current();
    var wrap = document.createElement('div');
    wrap.id = 'bbbLang';
    var curLabel = NAMES[cur] || cur.toUpperCase();

    var buttons = LANGS.map(function(l){
      var on = (l[0] === cur) ? ' class="cur"' : '';
      return '<button data-c="' + l[0] + '"' + on + '>' + l[1] + '</button>';
    }).join('');

    wrap.innerHTML =
      '<button class="bbb-tog" aria-haspopup="true" aria-expanded="false">' +
        '<span class="gl">🌐</span><span>' +
        (cur==='en' ? 'Language' : curLabel) + '</span></button>' +
      '<div class="bbb-panel" role="menu">' +
        '<div class="bbb-h">Read this site in your language</div>' +
        '<div class="bbb-grid">' + buttons + '</div>' +
        '<div class="bbb-note">Machine translation. Study the <b>terms in English</b> &mdash; the MCAT is English-only.</div>' +
      '</div>';
    document.body.appendChild(wrap);

    var tog = wrap.querySelector('.bbb-tog');
    tog.addEventListener('click', function(){
      var open = wrap.classList.toggle('open');
      tog.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    wrap.querySelectorAll('.bbb-grid button').forEach(function(b){
      b.addEventListener('click', function(){ choose(b.getAttribute('data-c')); });
    });
    document.addEventListener('click', function(e){
      if (!wrap.contains(e.target)) wrap.classList.remove('open');
    });
  }

  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
