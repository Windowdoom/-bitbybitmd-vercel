/* Bit by Bit - discreet "support / buy me a coffee" corner link.
   Injected on every page via a shared include. Intentionally low-key:
   bottom-left, low opacity, brightens on hover. Bottom-right is reserved
   for the QOTD widget on the homepage, so this lives on the opposite corner. */
(function () {
  if (window.__bbbSupport) return;
  window.__bbbSupport = true;

  function mount() {
    if (document.getElementById('bbb-support')) return;
    var a = document.createElement('a');
    a.id = 'bbb-support';
    a.href = 'https://dannyabbas.gumroad.com/coffee';
    a.target = '_blank';
    a.rel = 'noopener';
    a.title = 'Support this project ☕';
    a.setAttribute('aria-label', 'Support this project');
    a.textContent = '☕'; // coffee cup

    a.style.cssText = [
      'position:fixed', 'left:14px', 'bottom:14px', 'z-index:40',
      'width:36px', 'height:36px',
      'display:flex', 'align-items:center', 'justify-content:center',
      'font-size:16px', 'line-height:1', 'text-decoration:none',
      'border-radius:50%',
      'background:rgba(17,34,56,.6)',
      'border:1px solid rgba(130,160,190,.22)',
      'color:#c9d6e5',
      'opacity:.4',
      'box-shadow:0 4px 14px rgba(0,0,0,.28)',
      'transition:opacity .18s ease, transform .18s ease',
      'cursor:pointer'
    ].join(';');

    a.addEventListener('mouseenter', function () {
      a.style.opacity = '1';
      a.style.transform = 'translateY(-2px)';
    });
    a.addEventListener('mouseleave', function () {
      a.style.opacity = '.4';
      a.style.transform = 'none';
    });

    document.body.appendChild(a);

    addFooterLink();
  }

  /* Second, equally low-key placement: a small text link tucked into the
     page footer. Adapts to either footer style (.site-footer text footer or
     the cfactor .f-links row) and inherits the surrounding muted color. */
  function addFooterLink() {
    if (document.getElementById('bbb-support-footer')) return;
    var foot = document.querySelector('.f-links') || document.querySelector('footer');
    if (!foot) return;

    var isLinkRow = foot.classList.contains('f-links');
    var link = document.createElement('a');
    link.id = 'bbb-support-footer';
    link.href = 'https://dannyabbas.gumroad.com/coffee';
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = '☕ Support';
    link.style.cssText = 'color:inherit;text-decoration:none;opacity:.7;';
    link.addEventListener('mouseenter', function () { link.style.opacity = '1'; });
    link.addEventListener('mouseleave', function () { link.style.opacity = '.7'; });

    if (isLinkRow) {
      // .f-links is a row of anchors — just append another one
      foot.appendChild(link);
    } else {
      // text footer — prepend a subtle separator
      foot.appendChild(document.createTextNode(' · '));
      foot.appendChild(link);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
