function setLang(lang) {
  document.querySelectorAll('[data-ja]').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (text) el.innerHTML = text;
  });

  const labels = { ja: '🇯🇵 日本語', en: '🇬🇧 English', hi: '🇮🇳 हिंदी', ko: '🇰🇷 한국어',es: '🇪🇸 Español' };
  document.getElementById('langBtn').textContent = '🌐 ▼';
  document.getElementById('langMenu').classList.remove('open');
  localStorage.setItem('lang', lang);
}

// Toggle dropdown open/close
const langBtnEl = document.getElementById('langBtn');
if (langBtnEl) {
  langBtnEl.addEventListener('click', () => {
    document.getElementById('langMenu').classList.toggle('open');
  });
}

// Close when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.lang-dropdown')) {
    document.getElementById('langMenu').classList.remove('open');
  }
});

// Remember on reload
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('lang');
  if (saved) setLang(saved);
});