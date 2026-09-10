function setLang(lang) {

  // Change translated text
  document.querySelectorAll('[data-ja]').forEach(el => {
    const text = el.getAttribute('data-' + lang);

    if (text) {
      el.innerHTML = text;
    }
  });

  // Update HTML language
  document.documentElement.lang = lang;

  // Language button/menu
  const langBtn = document.getElementById('langBtn');
  const langMenu = document.getElementById('langMenu');

  if (langBtn) {
    langBtn.textContent = '🌐 ▼';
  }

  if (langMenu) {
    langMenu.classList.remove('open');
  }

  // Save language
  localStorage.setItem('lang', lang);

  // Landing page:
  // pass the selected language to each shop
  document.querySelectorAll('.branch-card').forEach(a => {
    try {
      const url = new URL(a.href);
      url.searchParams.set('lang', lang);
      a.href = url.toString();
    } catch (err) {
      // Ignore invalid URLs
    }
  });
}


// ==========================================
// LANGUAGE BUTTON
// ==========================================

const langBtnEl = document.getElementById('langBtn');

if (langBtnEl) {

  langBtnEl.addEventListener('click', (e) => {

    e.stopPropagation();

    const langMenu = document.getElementById('langMenu');

    if (langMenu) {
      langMenu.classList.toggle('open');
    }

  });

}


// ==========================================
// LANDING PAGE LANGUAGE OPTIONS
// Uses <li data-lang="ja">
// ==========================================

document.querySelectorAll('#langMenu li[data-lang]').forEach(li => {

  li.addEventListener('click', (e) => {

    e.stopPropagation();

    const lang = li.dataset.lang;

    if (lang) {
      setLang(lang);
    }

  });

});


// ==========================================
// INNER PAGE LANGUAGE OPTIONS
// Uses <button onclick="setLang('ja')">
// ==========================================

document.querySelectorAll('#langMenu button').forEach(button => {

  button.addEventListener('click', (e) => {

    e.stopPropagation();

    const onclick = button.getAttribute('onclick');

    if (onclick) {

      const match = onclick.match(
        /setLang\(['"]([^'"]+)['"]\)/
      );

      if (match) {
        setLang(match[1]);
      }

    }

  });

});


// ==========================================
// CLOSE MENU WHEN CLICKING OUTSIDE
// ==========================================

document.addEventListener('click', (e) => {

  if (!e.target.closest('.lang-dropdown')) {

    const langMenu = document.getElementById('langMenu');

    if (langMenu) {
      langMenu.classList.remove('open');
    }

  }

});


// ==========================================
// LOAD LANGUAGE
// ==========================================

// ==========================================
// LOAD LANGUAGE
// ==========================================

function loadSavedLanguage() {
  const urlLang = new URLSearchParams(window.location.search).get('lang');
  const savedLang = localStorage.getItem('lang');

  const supported = ['ja', 'en', 'hi', 'ko', 'es'];

  // URL language has priority
  if (urlLang && supported.includes(urlLang)) {
    setLang(urlLang);
    return;
  }

  // Otherwise use saved language
  if (savedLang && supported.includes(savedLang)) {
    setLang(savedLang);
  }
}

// Run after DOM is ready, or immediately if it already is
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadSavedLanguage);
} else {
  loadSavedLanguage();
}

