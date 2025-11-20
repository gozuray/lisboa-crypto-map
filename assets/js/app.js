const state = {
  businesses: [],
  filtered: [],
  selectedZone: null,
  map: null,
  markers: [],
};

async function loadBusinesses() {
  const dataPath = document.body.dataset.dataPath || 'data/businesses.json';
  const response = await fetch(dataPath);
  state.businesses = await response.json();
  state.filtered = [...state.businesses];
  renderList();
  renderHeroBadges();
  initMap();
}

function renderHeroBadges() {
  const badges = document.querySelector('#badges');
  if (!badges) return;
  const zones = [...new Set(state.businesses.map((b) => b.zone))];
  badges.innerHTML = zones
    .map((zone) => `<span class="badge">${zone}</span>`)
    .join('');
}

function createMarker(business) {
  if (!state.map) return;
  const marker = L.marker([business.coords.lat, business.coords.lng], {
    title: business.name,
  });
  marker.bindPopup(`
    <strong>${business.name}</strong><br/>
    ${business.zone} · ${business.category}<br/>
    <a href="business.html?id=${business.id}">View profile</a>
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

function renderList() {
  const list = document.querySelector('#business-list');
  if (!list) return;

  list.innerHTML = state.filtered
    .map(
      (business) => `
        <article class="card">
          <div class="title">
            <h3>${business.name}</h3>
            <span class="pill">${business.zone}</span>
          </div>
          <p class="muted">${business.description}</p>
          <div class="highlight-list">
            ${business.highlights.map((h) => `<span class="pill">${h}</span>`).join('')}
          </div>
          <div class="actions">
            <a class="button primary" href="business.html?id=${business.id}">View profile</a>
            <a class="button" href="${business.googleMaps}" target="_blank" rel="noopener">Google Maps</a>
            <a class="button" href="${business.whatsapp}" target="_blank" rel="noopener">WhatsApp</a>
          </div>
        </article>
      `
    )
    .join('');
}

function filterByZone(zone) {
  state.selectedZone = zone;
  if (!zone) {
    state.filtered = [...state.businesses];
  } else {
    state.filtered = state.businesses.filter((b) => b.zone === zone);
  }
  setActiveZone(zone);
  renderList();
  renderMarkers(state.filtered);
}

function setActiveZone(zone) {
  document.querySelectorAll('nav a[data-zone]').forEach((link) => {
    const isActive = link.dataset.zone === zone;
    link.classList.toggle('active', isActive);
  });
}

function registerZoneLinks() {
  document.querySelectorAll('nav a[data-zone]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      filterByZone(link.dataset.zone || null);
    });
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
    business.highlights = business.highlights
      .split(',')
      .map((h) => h.trim())
      .filter(Boolean);
    business.googleMaps = `https://www.google.com/maps?q=${business.coords.lat},${business.coords.lng}`;
    business.whatsapp = `https://wa.me/${business.phone.replace(/[^\d]/g, '')}?text=${encodeURIComponent("Hi, I'm interested!")}`;

    state.businesses.push(business);
    filterByZone(state.selectedZone);
    form.reset();

    const toast = document.querySelector('#form-toast');
    if (toast) {
      toast.textContent = 'Business added locally (demo)';
      toast.style.opacity = '1';
      setTimeout(() => (toast.style.opacity = '0'), 2500);
    }
  });
}

function renderZonePage(zone) {
  const headline = document.querySelector('[data-zone-headline]');
  const summary = document.querySelector('[data-zone-summary]');
  if (!headline || !summary) return;

  headline.textContent = `${zone}`;
  summary.textContent = `Explore crypto spots in ${zone}. This selection updates from JSON to keep data consistent across zones.`;
  filterByZone(zone);

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
    container.innerHTML = '<p class="muted">Business not found.</p>';
    return;
  }

  container.innerHTML = `
    <div class="card">
      <div class="title">
        <div>
          <p class="pill">${business.zone} · ${business.category}</p>
          <h2 style="margin: 6px 0 0;">${business.name}</h2>
        </div>
        <a class="button" href="index.html">← Back</a>
      </div>
      <p class="muted">${business.description}</p>
      <div class="list-item">
        <div>
          <h4>Address</h4>
          <small>${business.address}</small>
        </div>
        <a class="button" href="${business.googleMaps}" target="_blank">Open in Google Maps</a>
      </div>
      <div class="list-item">
        <div>
          <h4>Contact</h4>
          <small>Phone: ${business.phone}</small>
        </div>
        <a class="button" href="${business.whatsapp}" target="_blank">Send WhatsApp</a>
      </div>
      <ul class="highlight-list">
        ${business.highlights.map((h) => `<li>${h}</li>`).join('')}
      </ul>
      <div id="detail-map" style="height:320px;border-radius:16px; overflow:hidden;"></div>
    </div>
  `;

  const detailMap = L.map('detail-map').setView([business.coords.lat, business.coords.lng], 15);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(detailMap);
  L.marker([business.coords.lat, business.coords.lng]).addTo(detailMap).bindPopup(business.name);
}

function detectContext() {
  const params = new URLSearchParams(window.location.search);
  const page = document.body.dataset.page;

  if (page === 'home') {
    registerZoneLinks();
    handleForm();
    loadBusinesses();
  }

  if (page === 'zone') {
    const zoneFromBody = document.body.dataset.zone;
    const zone = params.get('zone') || zoneFromBody || 'Baixa';
    loadBusinesses().then(() => renderZonePage(zone));
  }

  if (page === 'detail') {
    const id = params.get('id');
    loadBusinesses().then(() => renderBusinessDetail(id));
  }
}

document.addEventListener('DOMContentLoaded', detectContext);
