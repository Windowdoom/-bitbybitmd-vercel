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

  // 3) Load the on-site translation widget (one script, every page).
  try {
    var i18n = document.createElement('script');
    i18n.src = '/i18n.js';
    i18n.defer = true;
    document.head.appendChild(i18n);
  } catch(_){}
})();
