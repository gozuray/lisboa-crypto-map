const state = {
  businesses: [],
  filtered: [],
  filters: {
    query: '',
    zone: null,
    category: '',
    token: '',
    verified: false,
    promo: false,
    openNow: false,
    raypay: false,
  },
  map: null,
  markers: [],
  detailMap: null,
};

const tokenIcons = {
  SOL: '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sol" x1="11.5" y1="5" x2="27.5" y2="21" gradientUnits="userSpaceOnUse"><stop stop-color="#00ffa3"/><stop offset="1" stop-color="#03e1ff"/></linearGradient></defs><path fill="url(#sol)" d="M4 22.7c.2-.3.6-.7 1.1-.7h20.5c.4 0 .6.4.3.7l-3.3 3.7c-.2.3-.6.6-1.1.6H1.1c-.4 0-.6-.3-.3-.6Zm0-8.9c.2-.3.6-.6 1.1-.6h20.5c.4 0 .6.3.3.6l-3.3 3.7c-.2.3-.6.6-1.1.6H1.1c-.4 0-.6-.3-.3-.6Zm0-8.9C4.2 4.6 4.6 4 5.1 4h20.5c.4 0 .6.6.3.9l-3.3 3.7c-.2.3-.6.4-1.1.4H1.1c-.4 0-.6-.2-.3-.5Z"/></svg>',
  USDC: '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path fill="#2775ca" d="M16 32C7.2 32 0 24.8 0 16S7.2 0 16 0s16 7.2 16 16-7.2 16-16 16Z"/><path fill="#fff" d="M20.7 18.5c0-2.2-1.3-3-3.9-3.3-1.9-.3-2.3-.8-2.3-1.7 0-.9.6-1.5 1.9-1.5 1.1 0 1.8.4 2 .9.1.2.3.3.5.3h1.2c.3 0 .5-.2.5-.5v-.1c-.3-1.3-1.3-2.3-2.8-2.6V7.9c0-.3-.2-.5-.5-.6h-1.1c-.3 0-.5.2-.5.5v1c-1.8.2-3 1.4-3 3 0 2 1.2 2.8 3.7 3.2 2 .4 2.4.9 2.4 1.8 0 1-1 1.7-2.1 1.7-1 0-2-.4-2.2-1-.1-.2-.3-.4-.6-.4h-1c-.3 0-.5.2-.5.5v.1c.4 1.4 1.4 2.3 3.3 2.6V24c0 .3.2.5.5.6h1.1c.3 0 .5-.2.5-.5v-1.1c1.9-.2 3.1-1.5 3.1-3.5Z"/><path fill="#fff" d="M12 24.3c0 .2-.1.4-.4.5-4-1.4-6.1-5.8-4.7-9.9.9-2.6 3-4.6 5.6-5.3.2 0 .4.1.4.3v1.1c0 .2-.2.4-.4.5-3.2 1-4.9 4.4-3.9 7.5.6 1.9 2.1 3.3 3.9 3.9.2 0 .4.2.4.5v1.4Zm8.6.5c-.2 0-.4-.1-.4-.3v-1.1c0-.2.2-.4.4-.5 3.2-1 4.9-4.4 3.9-7.5-.6-1.9-2.1-3.3-3.9-3.9-.2 0-.4-.2-.4-.5V9.6c0-.2.1-.4.4-.5 4 1.4 6.1 5.8 4.7 9.9-.9 2.6-3 4.6-5.6 5.3Z"/></svg>',
  BTC: '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#f7931a"/><path fill="#fff" d="M19.4 14.7c.5-.8.7-1.7.4-2.8-.3-1.8-1.8-2.6-3.8-2.7V6.5h-1.6v2.7h-1.3V6.5h-1.6v2.7h-2.2v1.7h1.6c.2 0 .3.2.3.3v7.5c0 .2-.1.3-.3.3h-1.6v1.8h2.2v2.8h1.6v-2.8h1.3v2.8h1.6v-2.8c2.6-.2 4.1-1.6 4.1-3.7 0-1.6-.8-2.6-2-3.1Zm-4.7-3.7c1.2 0 2.2.3 2.4 1.4.2 1-.6 1.6-1.8 1.7h-1.8v-3.1h1.2Zm.6 8.7h-1.8v-3.3h1.9c1.4 0 2.2.5 2.2 1.6 0 1.2-.9 1.7-2.3 1.7Z"/></svg>',
  ETH: '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#627eea"/><path fill="#fff" d="M16.1 4.6 10 16.5l6.1 3.6 6-3.6-6-11.9Zm0 22.8 6.1-8.6-6.1 3.6-6.1-3.6 6.1 8.6Z"/></svg>',
  USDT: '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#26a17b"/><path fill="#fff" d="M18.2 15.2v-1.5h4V9.8H9.8v3.9h4v1.5c-3.9.2-6.8.9-6.8 1.8s3 1.6 6.8 1.8v6.2h4.3v-6.2c3.8-.2 6.8-.9 6.8-1.8 0-.8-3-1.6-6.8-1.8Zm0 3.1v-.8c3.5 0 6-.5 6-.9s-2.5-.9-6-.9V14h-4.3v1.8c-3.6 0-6 .4-6 .9s2.4.9 6 .9v.8c-3.7-.1-6.6-.7-6.6-1.5 0-.7 2.9-1.3 6.6-1.4v-1.7h4.3v1.7c3.7.1 6.6.7 6.6 1.4-.1.8-3 1.4-6.6 1.5Z"/></svg>',
};

const languageNames = {
  en: 'English',
  es: 'Español',
  pt: 'Português',
  fr: 'Français',
  zh: '中文',
  hi: 'हिन्दी',
  ar: 'العربية',
  bn: 'বাংলা',
};

async function loadBusinesses() {
  const fallbackPath = document.body.dataset.dataPath || 'data/businesses.json';
  const apiPath = document.body.dataset.api || fallbackPath;

  try {
    const response = await fetch(apiPath);
    if (!response.ok) throw new Error('API not available');
    state.businesses = await response.json();
  } catch (error) {
    const response = await fetch(fallbackPath);
    state.businesses = await response.json();
  }

  state.filtered = [...state.businesses];
  hydrateFiltersFromContext();
  renderHeroBadges();
  renderFilters();
  applyFilters();
  initMap();
  renderRoutes();
}

function hydrateFiltersFromContext() {
  const zone = document.body.dataset.zone;
  if (zone) {
    state.filters.zone = zone;
  }
}

function renderHeroBadges() {
  const badges = document.querySelector('#badges');
  if (!badges) return;
  const zones = [...new Set(state.businesses.map((b) => b.zone))];
  badges.innerHTML = zones
    .map((zone) => {
      const count = state.businesses.filter((b) => b.zone === zone).length;
      return `<span class="badge">${zone} · ${count}</span>`;
    })
    .join('');
}

function buildSelectOptions(values, placeholder) {
  const unique = Array.from(new Set(values)).filter(Boolean).sort();
  const options = unique.map((value) => `<option value="${value}">${value}</option>`).join('');
  return `<option value="">${placeholder}</option>${options}`;
}

function renderFilters() {
  const container = document.querySelector('#filters');
  if (!container) return;

  const categories = buildSelectOptions(state.businesses.map((b) => b.category), i18n.t('filters.category'));
  const zones = buildSelectOptions(state.businesses.map((b) => b.zone), i18n.t('filters.area'));
  const tokens = buildSelectOptions(state.businesses.flatMap((b) => b.tokens || []), i18n.t('filters.token'));

  container.innerHTML = `
    <div class="filter-grid">
      <div class="search-box">
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path d="m19 19-3.5-3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="11" cy="11" r="5.5" stroke="currentColor" stroke-width="1.5"/></svg>
        <input type="search" id="search" placeholder="${i18n.t('filters.searchPlaceholder')}" aria-label="${i18n.t(
          'filters.searchLabel'
        )}" />
      </div>
      <label>${i18n.t('filters.area')}<select id="filter-zone">${zones}</select></label>
      <label>${i18n.t('filters.category')}<select id="filter-category">${categories}</select></label>
      <label>${i18n.t('filters.token')}<select id="filter-token">${tokens}</select></label>
    </div>
    <div class="filter-row" aria-label="Quick filters">
      <button type="button" class="chip" data-filter="verified">${i18n.t('filters.chips.verified')}</button>
      <button type="button" class="chip" data-filter="promo">${i18n.t('filters.chips.promo')}</button>
      <button type="button" class="chip" data-filter="openNow">${i18n.t('filters.chips.openNow')}</button>
      <button type="button" class="chip" data-filter="raypay">${i18n.t('filters.chips.raypay')}</button>
      <button type="button" class="chip" id="reset-filters">${i18n.t('filters.chips.reset')}</button>
    </div>
  `;

  document.getElementById('search').addEventListener('input', (event) => {
    state.filters.query = event.target.value.trim().toLowerCase();
    applyFilters();
  });

  document.getElementById('filter-zone').value = state.filters.zone || '';
  document.getElementById('filter-zone').addEventListener('change', (event) => {
    state.filters.zone = event.target.value || null;
    applyFilters();
  });

  document.getElementById('filter-category').addEventListener('change', (event) => {
    state.filters.category = event.target.value;
    applyFilters();
  });

  document.getElementById('filter-token').addEventListener('change', (event) => {
    state.filters.token = event.target.value;
    applyFilters();
  });

  container.querySelectorAll('.chip[data-filter]').forEach((chip) => {
    chip.addEventListener('click', () => {
      const key = chip.dataset.filter;
      state.filters[key] = !state.filters[key];
      chip.classList.toggle('active', state.filters[key]);
      applyFilters();
    });
  });

  container.querySelector('#reset-filters').addEventListener('click', () => {
    state.filters = { query: '', zone: null, category: '', token: '', verified: false, promo: false, openNow: false, raypay: false };
    container.querySelector('#search').value = '';
    container.querySelector('#filter-zone').value = '';
    container.querySelector('#filter-category').value = '';
    container.querySelector('#filter-token').value = '';
    container.querySelectorAll('.chip[data-filter]').forEach((chip) => chip.classList.remove('active'));
    hydrateFiltersFromContext();
    applyFilters();
  });
}

function applyFilters() {
  state.filtered = state.businesses.filter((business) => {
    const matchesQuery = state.filters.query
      ? `${business.name} ${business.description}`.toLowerCase().includes(state.filters.query)
      : true;
    const matchesZone = state.filters.zone ? business.zone === state.filters.zone : true;
    const matchesCategory = state.filters.category ? business.category === state.filters.category : true;
    const matchesToken = state.filters.token ? (business.tokens || []).includes(state.filters.token) : true;
    const matchesVerified = state.filters.verified ? Boolean(business.verified) : true;
    const matchesPromo = state.filters.promo ? Boolean(business.promo?.active) : true;
    const matchesOpen = state.filters.openNow ? Boolean(business.open_now) : true;
    const matchesRaypay = state.filters.raypay ? Boolean(business.raypay_ready) : true;

    return (
      matchesQuery &&
      matchesZone &&
      matchesCategory &&
      matchesToken &&
      matchesVerified &&
      matchesPromo &&
      matchesOpen &&
      matchesRaypay
    );
  });

  updateListMeta();
  renderList();
  renderMarkers(state.filtered);
  renderRoutes();
}

function updateListMeta() {
  const meta = document.getElementById('list-meta');
  if (!meta) return;
  const openNow = state.filtered.filter((b) => b.open_now).length;
  meta.textContent = i18n.t('listing.meta', { count: state.filtered.length, openNow });
}

function createMarker(business) {
  if (!state.map) return;
  const marker = L.marker([business.coords.lat, business.coords.lng], {
    title: business.name,
  });
  marker.bindPopup(`
    <strong>${business.name}</strong><br/>
    ${business.zone} · ${business.category}<br/>
    <a href="business.html?id=${business.id}">${i18n.t('cards.actions.viewProfile')}</a>
  `);
  marker.addTo(state.map);
  state.markers.push(marker);
}

function clearMarkers() {
  state.markers.forEach((m) => m.remove());
  state.markers = [];
}

function initMap() {
  const mapElement = document.getElementById('map');
  if (!mapElement) return;

  state.map = L.map('map').setView([38.7223, -9.1393], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(state.map);

  renderMarkers(state.filtered);
}

function renderMarkers(list) {
  if (!state.map) return;
  clearMarkers();
  list.forEach(createMarker);
}

function getPhoto(business) {
  return business.photos?.[0] || '';
}

function renderList() {
  const list = document.querySelector('#business-list');
  if (!list) return;

  list.innerHTML = state.filtered
    .map((business) => {
      const badges = [];
      if (business.verified) badges.push(`<span class="card-badge">${i18n.t('cards.badges.verified')}</span>`);
      if (business.raypay_ready) badges.push(`<span class="card-badge">${i18n.t('cards.badges.raypay')}</span>`);
      if (business.new) badges.push(`<span class="card-badge">${i18n.t('cards.badges.new')}</span>`);
      if (business.promo?.active) badges.push(`<span class="card-badge">${i18n.t('cards.badges.promo')}</span>`);

      const statusClass = business.open_now ? 'status' : 'status off';
      const statusText = business.open_now ? i18n.t('cards.status.open') : i18n.t('cards.status.closed');

      return `
        <article class="card" data-id="${business.id}">
          <div class="card-media" data-photo="${getPhoto(business)}">
            <div class="card-badges">${badges.join('')}</div>
            <div class="float-actions">
              <a class="float-button" href="${business.whatsapp}" target="_blank" rel="noopener" data-track="whatsapp" data-id="${business.id}" aria-label="${i18n.t('cards.actions.whatsapp')} - ${business.name}">💬</a>
              <a class="float-button" href="${business.googleMaps}" target="_blank" rel="noopener" data-track="maps" data-id="${business.id}" aria-label="${i18n.t('cards.actions.googleMaps')} - ${business.name}">📍</a>
            </div>
          </div>
          <div class="card-body">
            <div class="title">
              <div>
                <p class="pill">${business.zone} · ${business.category}</p>
                <h3>${business.name}</h3>
              </div>
              <span class="status ${business.open_now ? '' : 'off'}">${statusText}</span>
            </div>
            <p class="muted">${business.description}</p>
            <div class="meta-row">
              <span class="pill small">⭐ ${business.rating || 'N/A'}</span>
              ${business.promo?.active ? `<span class="pill small">${business.promo.text}</span>` : ''}
            </div>
            <div class="token-row">
              ${(business.tokens || [])
                .map((token) => `<span class="token">${tokenIcons[token] || ''}${token}</span>`)
                .join('')}
            </div>
            <div class="highlight-list">
              ${(business.highlights || []).map((h) => `<span class="pill small">${h}</span>`).join('')}
            </div>
          </div>
          <div class="card-footer">
            <div class="actions">
              <a class="button primary" href="business.html?id=${business.id}">${i18n.t('cards.actions.viewProfile')}</a>
              <a class="button" href="${business.googleMaps}" target="_blank" rel="noopener" data-track="maps" data-id="${business.id}">${i18n.t('cards.actions.googleMaps')}</a>
              <a class="button" href="${business.whatsapp}" target="_blank" rel="noopener" data-track="whatsapp" data-id="${business.id}">${i18n.t('cards.actions.whatsapp')}</a>
            </div>
            <span class="pill small">${i18n.t('cards.hours', {
              open: business.hours?.open || '--:--',
              close: business.hours?.close || '--:--',
            })}</span>
          </div>
        </article>
      `;
    })
    .join('');

  hydrateMedia();
  registerTracking(list);
}

function hydrateMedia() {
  document.querySelectorAll('.card-media').forEach((media) => {
    const url = media.dataset.photo;
    if (url) {
      media.style.backgroundImage = `url('${url}')`;
    } else {
      media.style.background = 'linear-gradient(135deg, rgba(107,230,181,0.18), rgba(107,230,181,0.04))';
    }
  });
}

function registerTracking(scope) {
  if (!scope) return;
  scope.addEventListener('click', (event) => {
    const target = event.target.closest('[data-track]');
    if (!target) return;
    const businessId = target.dataset.id;
    const type = target.dataset.track;
    fetch('/api/click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ businessId, type }),
    }).catch(() => {});
  });
}

function renderRoutes() {
  const container = document.getElementById('crypto-routes');
  if (!container) return;
  const openBusinesses = state.filtered.filter((b) => b.open_now).sort((a, b) => (b.rating || 0) - (a.rating || 0));
  const routes = openBusinesses.slice(0, 3).map((biz, index) => ({
    title: i18n.t('routes.routeTitle', { index: index + 1, zone: biz.zone }),
    stops: [biz.name, state.businesses.find((b) => b.zone === biz.zone && b.id !== biz.id)?.name].filter(Boolean),
    tokens: biz.tokens || [],
  }));

  container.innerHTML = routes
    .map(
      (route) => `
        <div class="route-card">
          <strong>${route.title}</strong>
          <p class="muted">${route.stops.join(' → ')}</p>
          <div class="token-row">
            ${route.tokens.map((token) => `<span class="token">${tokenIcons[token] || ''}${token}</span>`).join('')}
          </div>
        </div>
      `
    )
    .join('');
}

function renderZonePage(zone) {
  const headline = document.querySelector('[data-zone-headline]');
  const summary = document.querySelector('[data-zone-summary]');
  if (!headline || !summary) return;

  headline.textContent = `${zone}`;
  summary.textContent = i18n.t('zone.summary', { zone });
  state.filters.zone = zone;
  applyFilters();

  const zoneTitle = document.getElementById('title-listado');
  if (zoneTitle) {
    zoneTitle.textContent = i18n.t('zone.title', { zone });
  }

  const footerNote = document.querySelector('[data-i18n="zone.footer"]');
  if (footerNote) {
    footerNote.textContent = i18n.t('zone.footer', { zone });
  }

  setPageTitle(zone);

  const backLink = document.querySelector('#back-home');
  if (backLink) {
    backLink.addEventListener('click', (event) => {
      event.preventDefault();
      window.location.href = 'index.html';
    });
  }
}

function renderBusinessDetail(id) {
  const container = document.querySelector('#business-detail');
  if (!container) return;
  const business = state.businesses.find((b) => b.id === id);
  if (!business) {
    container.innerHTML = `<p class="muted">${i18n.t('detail.notFound')}</p>`;
    return;
  }

  const badges = [];
  if (business.verified) badges.push(`<span class="card-badge">${i18n.t('cards.badges.verified')}</span>`);
  if (business.raypay_ready) badges.push(`<span class="card-badge">${i18n.t('cards.badges.raypay')}</span>`);
  if (business.new) badges.push(`<span class="card-badge">${i18n.t('cards.badges.new')}</span>`);
  if (business.promo?.active) badges.push(`<span class="card-badge">${business.promo.text}</span>`);

  const photos = business.photos || [];

  container.innerHTML = `
    <article class="card" data-id="${business.id}">
      <div class="card-media" data-photo="${getPhoto(business)}">
        <div class="card-badges">${badges.join('')}</div>
      </div>
      <div class="card-body">
        <div class="title">
          <div>
            <p class="pill">${business.zone} · ${business.category}</p>
            <h2 class="detail-heading">${business.name}</h2>
          </div>
          <a class="button" href="index.html">${i18n.t('detail.back')}</a>
        </div>
        <div class="meta-row">
          <span class="status ${business.open_now ? '' : 'off'}">${business.open_now ? i18n.t('cards.status.open') : i18n.t('cards.status.closed')}</span>
          <span class="pill small">⭐ ${business.rating || 'N/A'}</span>
          <span class="pill small">${i18n.t('cards.hours', {
            open: business.hours?.open || '--:--',
            close: business.hours?.close || '--:--',
          })}</span>
        </div>
        <p class="muted">${business.description}</p>
        <div class="token-row">
          ${(business.tokens || []).map((token) => `<span class="token">${tokenIcons[token] || ''}${token}</span>`).join('')}
        </div>
        <div class="list-item">
          <div>
            <h4>${i18n.t('detail.address')}</h4>
            <small>${business.address}</small>
          </div>
          <a class="button" href="${business.googleMaps}" target="_blank" rel="noopener" data-track="maps" data-id="${business.id}">${i18n.t('detail.openMaps')}</a>
        </div>
        <div class="list-item">
          <div>
            <h4>${i18n.t('detail.contact')}</h4>
            <small>${i18n.t('detail.phone', { phone: business.phone })}</small>
          </div>
          <a class="button" href="${business.whatsapp}" target="_blank" rel="noopener" data-track="whatsapp" data-id="${business.id}">${i18n.t('detail.sendWhatsapp')}</a>
        </div>
        <ul class="highlight-list">
          ${(business.highlights || []).map((h) => `<li>${h}</li>`).join('')}
        </ul>
        ${photos.length > 1 ? `<div class="grid small-grid">${photos.map((photo) => `<div class="card-media gallery-photo" data-photo="${photo}"></div>`).join('')}</div>` : ''}
        <div id="detail-map" class="detail-map"></div>
      </div>
    </article>
  `;

  document.title = i18n.t('titles.detail');

  hydrateMedia();
  registerTracking(container);

  if (state.detailMap) {
    state.detailMap.remove();
  }

  state.detailMap = L.map('detail-map').setView([business.coords.lat, business.coords.lng], 15);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(state.detailMap);
  L.marker([business.coords.lat, business.coords.lng]).addTo(state.detailMap).bindPopup(business.name);

  const scrollMap = document.querySelector('#scroll-map');
  if (scrollMap) {
    scrollMap.addEventListener('click', (event) => {
      event.preventDefault();
      document.getElementById('detail-map')?.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

function registerZoneLinks() {
  document.querySelectorAll('nav a[data-zone]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      state.filters.zone = link.dataset.zone || null;
      applyFilters();
      setActiveZone(link.dataset.zone || null);
    });
  });
}

function setActiveZone(zone) {
  document.querySelectorAll('nav a[data-zone]').forEach((link) => {
    const isActive = link.dataset.zone === zone;
    link.classList.toggle('active', isActive);
  });
}

function handleForm() {
  const form = document.querySelector('#business-form');
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const business = Object.fromEntries(formData.entries());
    business.id = business.name.toLowerCase().replace(/\s+/g, '-');
    business.coords = { lat: parseFloat(formData.get('lat')), lng: parseFloat(formData.get('lng')) };
    business.highlights = (business.highlights || '')
      .split(',')
      .map((h) => h.trim())
      .filter(Boolean);
    business.tokens = (business.tokens || '')
      .split(',')
      .map((t) => t.trim().toUpperCase())
      .filter(Boolean);
    business.rating = parseFloat(business.rating) || 4.5;
    business.googleMaps = `https://www.google.com/maps?q=${business.coords.lat},${business.coords.lng}`;
    business.whatsapp = `https://wa.me/${business.phone.replace(/[^\d]/g, '')}?text=${encodeURIComponent('Hello, I am interested!')}`;
    business.promo = { active: false, text: '' };
    business.verified = false;
    business.raypay_ready = false;
    business.open_now = true;
    business.photos = [];

    state.businesses.push(business);
    applyFilters();
    form.reset();

    const toast = document.querySelector('#form-toast');
    if (toast) {
      toast.textContent = i18n.t('form.toast');
      toast.style.opacity = '1';
      setTimeout(() => (toast.style.opacity = '0'), 2500);
    }
  });
}

function setPageTitle(zoneName) {
  const page = document.body.dataset.page;
  if (page === 'zone') {
    document.title = i18n.t('titles.zone', { zone: zoneName || document.body.dataset.zone || '' });
    return;
  }
  if (page === 'detail') {
    document.title = i18n.t('titles.detail');
    return;
  }
  document.title = i18n.t('titles.home');
}

function setupLanguageSelector() {
  const container = document.getElementById('language-switcher');
  if (!container) return;
  container.innerHTML = '';

  const label = document.createElement('label');
  label.className = 'sr-only';
  label.setAttribute('for', 'language-select');
  label.dataset.i18n = 'language.label';
  label.textContent = i18n.t('language.label');

  const select = document.createElement('select');
  select.id = 'language-select';
  select.setAttribute('aria-label', i18n.t('language.label'));

  Object.entries(languageNames).forEach(([value, name]) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = name;
    select.appendChild(option);
  });

  select.value = i18n.currentLanguage;
  select.addEventListener('change', (event) => {
    i18n.setLanguage(event.target.value);
  });

  container.appendChild(label);
  container.appendChild(select);
}

function refreshUI() {
  i18n.applyTranslations(document);
  setupLanguageSelector();
  setPageTitle(document.body.dataset.zone);

  if (!state.businesses.length) return;

  const page = document.body.dataset.page;

  if (page === 'zone') {
    renderFilters();
    renderZonePage(document.body.dataset.zone || '');
    return;
  }

  if (page === 'detail') {
    const params = new URLSearchParams(window.location.search);
    renderBusinessDetail(params.get('id'));
    return;
  }

  renderHeroBadges();
  renderFilters();
  applyFilters();
  renderRoutes();
}

async function detectContext() {
  const params = new URLSearchParams(window.location.search);
  const page = document.body.dataset.page;

  setPageTitle(document.body.dataset.zone);

  if (page === 'home') {
    registerZoneLinks();
    handleForm();
    await loadBusinesses();
  }

  if (page === 'zone') {
    const zoneFromBody = document.body.dataset.zone;
    const zone = params.get('zone') || zoneFromBody || 'Baixa';
    await loadBusinesses();
    renderZonePage(zone);
  }

  if (page === 'detail') {
    const id = params.get('id');
    await loadBusinesses();
    renderBusinessDetail(id);
  }
}

async function initializeApp() {
  document.addEventListener('i18n:changed', refreshUI);
  await i18n.init();
  setupLanguageSelector();
  await detectContext();
  i18n.applyTranslations(document);
}

document.addEventListener('DOMContentLoaded', initializeApp);
