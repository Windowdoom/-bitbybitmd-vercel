/* Bit by Bit Pedagogy - lightweight content protection.
   Deliberately does NOT disable text selection (that hurts real students,
   accessibility, and SEO). Instead it watermarks copied text and guards images. */
(function(){
  // 1) Append an attribution + copyright line to any sizeable copied text.
  document.addEventListener('copy', function(e){
    try{
      var sel = (window.getSelection && window.getSelection().toString()) || '';
      if (sel.length > 60 && e.clipboardData){
        var note = '\n\n© 2026 Bit by Bit Pedagogy · ' + location.href +
                   '\nFor personal study use only. Do not redistribute. ' +
                   'Not affiliated with the AAMC, NBME, USMLE, or NBOME.';
        e.clipboardData.setData('text/plain', sel + note);
        e.preventDefault();
      }
    }catch(_){}
  }, true);

  // 2) Discourage casual image saving / dragging (deterrent only).
  document.addEventListener('dragstart', function(e){
    if (e.target && e.target.tagName === 'IMG') e.preventDefault();
  }, false);
  document.addEventListener('contextmenu', function(e){
    if (e.target && e.target.tagName === 'IMG') e.preventDefault();
  }, false);

  // 3) Site-wide "Buy me a coffee" support button.
  function injectSupport(){
    if (document.getElementById('bbb-support')) return;
    var css = [
      '#bbb-support{',
        'position:fixed;right:18px;bottom:18px;z-index:9999;',
        'display:inline-flex;align-items:center;gap:8px;',
        'padding:10px 14px;border-radius:999px;',
        'background:#112238;color:#f6b552;',
        'border:1px solid rgba(246,181,82,0.55);',
        'font:600 12.5px/1 "JetBrains Mono",ui-monospace,SFMono-Regular,Menlo,monospace;',
        'letter-spacing:0.4px;text-decoration:none;',
        'box-shadow:0 4px 14px rgba(0,0,0,0.35);',
        'transition:transform .15s,border-color .15s,background .15s,color .15s;',
      '}',
      '#bbb-support:hover{',
        'background:#f6b552;color:#1a1303;',
        'border-color:#f6b552;transform:translateY(-1px);',
        'text-decoration:none;',
      '}',
      '#bbb-support .bbb-support-dot{',
        'width:8px;height:8px;border-radius:50%;background:#f6b552;',
        'box-shadow:0 0 0 3px rgba(246,181,82,0.18);',
      '}',
      '#bbb-support:hover .bbb-support-dot{background:#1a1303;box-shadow:none}',
      '@media print{#bbb-support{display:none}}',
      '@media (max-width:520px){#bbb-support{right:12px;bottom:12px;padding:9px 12px;font-size:12px}}'
    ].join('');
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var a = document.createElement('a');
    a.id = 'bbb-support';
    a.href = 'https://dannyabbas.gumroad.com/coffee';
    a.target = '_blank';
    a.rel = 'noopener';
    a.setAttribute('aria-label', 'Support Bit by Bit Pedagogy — buy me a coffee');
    a.innerHTML = '<span class="bbb-support-dot" aria-hidden="true"></span><span>Support the site</span>';
    document.body.appendChild(a);
  }
  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', injectSupport);
  } else {
    injectSupport();
  }
})();
