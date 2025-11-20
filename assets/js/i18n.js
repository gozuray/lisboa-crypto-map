(function () {
  const supportedLanguages = ['en', 'es', 'pt', 'fr', 'zh', 'hi', 'ar', 'bn'];
  const rtlLanguages = ['ar'];
  const cache = {};
  const storageKey = 'lcm-language';
  const basePath = '/assets/i18n';
  let translations = {};
  let currentLanguage = 'en';

  function normalizeLanguage(lang) {
    return (lang || 'en').toLowerCase().split('-')[0];
  }

  function isSupported(lang) {
    return supportedLanguages.includes(lang);
  }

  async function fetchTranslations(lang) {
    if (cache[lang]) return cache[lang];
    try {
      const response = await fetch(`${basePath}/${lang}.json`);
      if (!response.ok) throw new Error('Missing translations');
      const data = await response.json();
      cache[lang] = data;
      return data;
    } catch (error) {
      cache[lang] = {};
      return {};
    }
  }

  function resolveKey(key, source) {
    return key.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : null), source);
  }

  function interpolate(text, params = {}) {
    return Object.keys(params).reduce((acc, param) => acc.replaceAll(`{${param}}`, params[param]), text);
  }

  function getFallbackValue(key) {
    const fallback = cache.en || {};
    return resolveKey(key, fallback) || key;
  }

  function t(key, params = {}) {
    const value = resolveKey(key, translations);
    const template = typeof value === 'string' ? value : getFallbackValue(key);
    return interpolate(template, params);
  }

  function applyAttributeTranslations(element) {
    const attrs = element.dataset.i18nAttrs;
    if (!attrs) return;
    attrs.split(',').forEach((pair) => {
      const [attr, key] = pair.split(':').map((item) => item.trim());
      if (attr && key) {
        element.setAttribute(attr, t(key));
      }
    });
  }

  function applyTranslations(root = document) {
    root.querySelectorAll('[data-i18n]').forEach((element) => {
      const key = element.dataset.i18n;
      if (!key) return;
      element.textContent = t(key);
    });

    root.querySelectorAll('[data-i18n-attrs]').forEach(applyAttributeTranslations);
  }

  async function setLanguage(lang) {
    const normalized = normalizeLanguage(lang);
    const targetLanguage = isSupported(normalized) ? normalized : 'en';
    const [fallback, selected] = await Promise.all([
      fetchTranslations('en'),
      targetLanguage === 'en' ? Promise.resolve({}) : fetchTranslations(targetLanguage),
    ]);

    translations = { ...fallback, ...selected };
    currentLanguage = targetLanguage;

    localStorage.setItem(storageKey, currentLanguage);
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = rtlLanguages.includes(currentLanguage) ? 'rtl' : 'ltr';

    applyTranslations();
    document.dispatchEvent(new CustomEvent('i18n:changed', { detail: { language: currentLanguage } }));
    return currentLanguage;
  }

  async function init() {
    const stored = localStorage.getItem(storageKey);
    const detected = normalizeLanguage(navigator.language || navigator.userLanguage || 'en');
    const preferred = stored || detected;
    await setLanguage(preferred);
  }

  window.i18n = {
    init,
    t,
    setLanguage,
    applyTranslations,
    supportedLanguages,
    get currentLanguage() {
      return currentLanguage;
    },
  };
})();
